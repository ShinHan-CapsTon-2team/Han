//import React, { useState, useEffect } from 'react';
//import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
//import React, { useEffect } from 'react';
//import { useSearchParams } from 'react-router-dom';

import logo from '../Images/imagelogo.png';
import family from '../Images/image 13.png';
import pet from '../Images/image 10.png';
import profile from '../Images/image 12.png';
import wedding from '../Images/image 11.png';
import body from '../Images/image 9.png';
import styled from "styled-components";


const categoriesData = [
  { name: '가족사진', src: family },
  { name: '반려동물', src: pet },
  { name: '증명사진', src: profile },
  { name: '웨딩사진', src: wedding },
  { name: '바디프로필', src: body },
];
  

const Homepage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('가족사진');
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 10; // 한 페이지당 이미지 수 설정
 
  

const handleCategorySelect = useCallback((category, limit, offset) => {
  //const queryString = new URLSearchParams({ category }).toString();
  const queryString = new URLSearchParams({
    category,
    limit,
    offset,
  }).toString();

  console.log('Category value:', category);
  
  
  fetch(`http://localhost:4000/api/home/${category}?${queryString}`) // 요청
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // 반환
  })
  .then((data) => {
    setUsers(data); // 데이터 저장
    console.log(data); // 받아온 데이터를 콘솔에 출력하거나 원하는 로직으로 처리합니다.
    navigate(`/home?${queryString}`);
    setSelectedCategory(category);
  })
  .catch((error) => {
    // 오류 처리
    console.error(error);
  });
  
 }, [navigate]);


  useEffect(() => {
    //컴포넌트가 마운트될 때 '가족사진' 데이터를 불러옵니다
    //handleCategorySelect('가족사진');
    const initialOffset = (pageNumber - 1) * limit;
    handleCategorySelect(selectedCategory, limit, initialOffset);
    
  }, [handleCategorySelect, selectedCategory, pageNumber, limit]); 

  const handleGohomeClick = () => {
  handleCategorySelect('가족사진');
  navigate('/home');
  
  };


    const handleClick = (id) => {
     console.log('Clicked with id:', id); // 확인용
      if (id !== undefined) {
        
        navigate(`/lookup/${id}`);
      } else {
       console.error('Invalid id:', id);
     }
    };

  
   
    const movePage = (pageNumber) => {
      const newPageNumber = Math.max(1, pageNumber);
      setPageNumber(newPageNumber);
      const offset = (newPageNumber - 1) * limit;
      handleCategorySelect(selectedCategory, limit, offset);
    };

  
  return (
    <OutWrap>
      <InsideWrap>
      <LogoWrap>
        <Logo src={logo} alt='' onClick={handleGohomeClick}/>
      </LogoWrap>
        <CategoryWrap>
          {categoriesData&&categoriesData.map((category, index) => (
            <CategoryImg
              key={category.name || index}
              src={category.src}
              alt=''
              onClick={() => handleCategorySelect(category.name)}
            />
          ))}
        </CategoryWrap>

        
        <GridWrap>
         {users && users.map((user) => {
          const imageUrl = user.image; // 이미지 URL 사용
          //console.log("url:", imageUrl);
          return (
            <GridDiv key={user.id}>
             <GridImg src={imageUrl} onClick={() => handleClick(user.id)} alt="사진" />
           </GridDiv>
          );
         })}
        </GridWrap>
      </InsideWrap>

      <PaginationWrap>
        <PaginationButton onClick={() => movePage(pageNumber - 1)} disabled={pageNumber === 1}>
          이전
        </PaginationButton>
        <PaginationButton onClick={() => movePage(pageNumber + 1)} disabled={!users || users.length === 0}>
          다음
        </PaginationButton>
      </PaginationWrap>
    </OutWrap>
  );
};

export default Homepage;

const OutWrap = styled.div`
      width: 100%;
      height: 100%;
      position: relative;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  `;
  
  const InsideWrap = styled.div`
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
  `;

  const LogoWrap = styled.div`
  width: 496px;
  height: 239px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-height: 864px) {
    width: 456px; height: 199px; 
  };
`;
  
const Logo = styled.img`
width: 354px; 
height: 239px; 

@media screen and (max-height: 864px) {
  width: 314px; height: 199px; 
 };
`  
  const CategoryWrap = styled.div`
  
  `;

  const CategoryImg = styled.img`
      width: 228.43px;
      height: 58px;
      margin-right: 30px;

      @media (min-width: 1920px) and (max-height: 1080px) {
        width: 256px; 
        height: 60px; 
      
       };
  `;

  const GridWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px;
    width: 100%;
    height: 100vh;
    padding: 20px;

    @media screen and (max-width: 768px) {
    /* 뷰포트 너비가 768px 이하인 경우에 적용할 스타일 */
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, 1fr);
    }

    @media screen and (max-width: 480px) {
    /* 뷰포트 너비가 480px 이하인 경우에 적용할 스타일 */
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(8, 1fr);
    }
  `;
  
  const GridDiv = styled.div`
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
  `;
  
  const GridImg = styled.img`
      width: 100%;
      height: 100%;
      border-radius: 10px; 
      object-fit: cover;
  `;

  const PaginationWrap = styled.div`
      margin-top: 20px;
  `;

  const PaginationButton = styled.button`
      margin: 0 5px;
      padding: 8px 16px;
      border: 1px solid #ccc;
      background-color: white;
      cursor: pointer;

      &:disabled {
       opacity: 0.6;
       cursor: not-allowed;
    }
  `;