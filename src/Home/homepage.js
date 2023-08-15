import { useNavigate  } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

import logo from '../Images/imagelogo.png';
import styled from 'styled-components';
import plus from '../Images/plus.png';

const categoriesData = [
  { name: '바디프로필'},
  { name: '반려동물' },
  { name: '가족사진' },
  { name: '증명사진' },
  { name: '웨딩사진' },
];


const OutWrap = styled.div`
      width: 100%;
      height: 100%;
      position: relative;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      * {
      font-size: 33px;
    }
    /* mobile 규격 */
    @media screen and (max-width: 540px){
      * {
      font-size: 25px;
    }
        
    }
    /* ss 데스크 */
  @media screen and (min-width: 1024px){
   *{
    font-size: 29px;
   } 
  }
    @media screen and (min-width: 1700px) {
      * {
        font-size: 39px;
      }
  `;
  
  const InsideWrap = styled.div`
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
  `;

  const LogoWrap = styled.div`
  width: 100%; 
//width: 30vw; 
height: 26vh;
 // text-align: center;
display: flex;
//flex-direction: row;
align-items: center;
justify-content: center;


@media screen and (min-height: 900px) {
    //width: 32vw; 
    width: 100%;
    height: 29vh;
};
`;


  
const Logo = styled.img`
width: 29vw; 
height: 25vh;
//margin: 0 auto;
text-align: center;
width: 31vw; 
    height: 28vh;


/* tablet 규격 */
        @media screen and (max-width: 1023px){
            
        }

        /* mobile 규격 */
        @media screen and (max-width: 540px){
          width: 60vw; 
            height: 20vh; 
        }
        /* s 데스크 */
        @media screen and (min-width: 1024px){
            
        }
        /* l 데스크 */
        @media screen and (min-width: 1700px){
            
        }
`;

 
const CategoryWrap = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 허용하여 가로 공간에 맞게 정렬될 수 있도록 설정 */
  justify-content: center; /* 공간을 균등하게 분배하여 가로로 정렬 */
  align-items: center; /* 수직 가운데 정렬 (선택 사항) */
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

  const PlusImg = styled.img`
    width: 5%;
    height: 9%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 수평 정렬을 오른쪽으로 변경 */
    justify-content: flex-end; /* 수직 정렬을 아래쪽으로 변경 */
    position: fixed; /* 위치를 고정 */
    bottom: 50px; /* 아래쪽 여백을 20px로 설정 */
    right: 50px; /* 오른쪽 여백을 20px로 설정 */
  `;
  

const Homepage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  //데이터 불러오는 
  const [selectedCategory, setSelectedCategory] = useState('가족사진');
  // 버튼
  const [selectCategory, setSelectCategory] = useState('가족사진');
  
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 10; // 한 페이지당 이미지 수 설정
  const [offset, setOffset] = useState(0); //offset 초기값
 
  //버튼 
const selectCate = (categoryName) => {
  setSelectCategory(categoryName);
};

const handleCategorySelect = useCallback((category, limit, offset) => {
  
  const queryString = new URLSearchParams({
    category,
    limit,
    offset,
  }).toString();

  console.log('Category value:', category);
  console.log('offset: ', offset);
  
  fetch(`http://localhost:4000/api/home/${category}?${queryString}`) // 요청
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // 반환
  })
  .then((data) => {
    setUsers(data); // 데이터 저장
    //console.log(data); // 받아온 데이터를 콘솔에 출력하거나 원하는 로직으로 처리합니다.
    setSelectedCategory(category);
    navigate(`/home?${queryString}`);
    
  })
  .catch((error) => {
    // 오류 처리
    console.error(error);
  });
  
 }, [navigate]);


  useEffect(() => {
    //컴포넌트가 마운트될 때 '가족사진' 데이터를 불러옵니다
  handleCategorySelect(selectedCategory, limit, offset);
  }, [selectedCategory, offset]); 


  // page

  // landing page
  const handleGoLandingClick = () => {
    navigate('/');
    };
    
  // lookup page
  const handleClick = (id) => {
    console.log('Clicked with id:', id); // 확인용
    if (id !== undefined) {
      
      navigate(`/lookup/${id}`);
    } else {
      console.error('Invalid id:', id);
    }
  };

    // 다음페이지
    const movePage = (newPageNumber) => {
      //const newPageNumber = Math.max(1, pageNumber);
      
      const newOffset = (newPageNumber - 1) * limit;
      setPageNumber(newPageNumber);
      setOffset(newOffset);
    };

    // 이전페이지
    const handleGoToPreviousPage = () => {
      const newPageNumber = pageNumber - 1;
      if (newPageNumber >= 1) {
        const newOffset  = (newPageNumber - 1) * limit;
        setPageNumber(newPageNumber);
        setOffset(newOffset);
        handleCategorySelect(selectedCategory, limit, newOffset );
      }
    };

    // 카테고리 클릭할 때마다 초기화
    const handleCategoryClick = (newCategory) => {
      const newOffset = 0; // 카테고리 클릭 시 offset 초기화
      
      setSelectedCategory(newCategory);
      setOffset(newOffset);
      movePage(1); // 첫 페이지로 이동
    };

    const goToWorkUpload = () => {
      navigate('/post');
    };


  
  return (
    <OutWrap>
      <InsideWrap>
        {/* 로고 */}        
        <LogoWrap>                
            <Logo src={logo} alt='' onClick={handleGoLandingClick}/>
        </LogoWrap>


        <CategoryWrap>
          {categoriesData&&categoriesData.map((category, index) => (
            <ButtonTwo  
            key={index}
            isselected={selectCategory === category.name ? 'true' : 'false'}
            onClick={() => {
              handleCategoryClick(category.name);
              selectCate(category.name);
            }}>
            {category.name }
            </ButtonTwo>
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

      <div className="user-onboarding">
            <PlusImg src = {plus} onClick={goToWorkUpload} alt="Upload Button"/>
        </div>

      <PaginationWrap>
        <PaginationButton onClick={handleGoToPreviousPage} disabled={pageNumber === 1}>
          이전
        </PaginationButton>
        <PaginationButton onClick={() => movePage(pageNumber + 1)} disabled={!users || users.length < limit}>
          다음
        </PaginationButton>
      </PaginationWrap>
    </OutWrap>
  );
};

export default Homepage;

const Radius = styled.button`
//border: 3px #3A76EF solid;

padding: 20px;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//margin-top: 20px;
border:none;
`;

// 버튼투
const ButtonTwo = styled(Radius)`
  //background: ${({ isSelected }) => isSelected ? '#5D6BB4' : '#798BE6'};
  background: ${({ isselected }) => (isselected === 'true' ? '#5D6BB4' : '#798BE6')};
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  cursor: pointer;
  color: white;
  //flex-wrap: wrap;
  width:17vw;
  height: 7vh; 
  

  
  /* tablet 규격 */
  @media screen and (max-width: 1023px){
      
  }
  

  /* mobile 규격 */
  @media screen and (max-width: 540px){
    width:46vw;
    height: 7vh; 
    margin-right:6px;
    margin-bottom:10px;
  }

  /* ss 데스크 */
  @media screen and (min-width: 1024px){
    width:18.5vw;
    margin-right:6px;
  }
  /* s 데스크 */
  @media screen and (min-width: 1210px){
      
  }
  @media screen and (min-width: 1700px) {
    width:15vw;
    height: 7vh; 
    margin-right:25px;
  }
    
  };
 `;

