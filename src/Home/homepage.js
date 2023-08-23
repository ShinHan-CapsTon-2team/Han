import { useNavigate  } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs'

import styled from 'styled-components';
import HomeLogo from '../Component/HeaderHome'

const categoriesData = [
  { name: '바디프로필'},
  { name: '반려동물' },
  { name: '가족사진' },
  { name: '증명사진' },
  { name: '웨딩사진' },
];


const Homepage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  //데이터 불러오는 
  const [selectedCategory, setSelectedCategory] = useState('가족사진');
  // 버튼
  const [selectCategory, setSelectCategory] = useState('가족사진');

  const [pageNumber, setPageNumber] = useState(1);
  const limit = 20; // 한 페이지당 이미지 수 설정
  const [offset, setOffset] = useState(0); //offset 초기값

 
  //버튼 
const selectCate = (categoryName) => {
  setSelectCategory(categoryName);
};

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
  handleCategorySelect(selectedCategory, limit, offset);
  }, [selectedCategory, offset, handleCategorySelect]); 


  // page

  
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
        <HomeLogo/>

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


      <PostWrap>
            
          <StyledBsPlusCircleFill onClick={goToWorkUpload}/>
            
        </PostWrap>

      <PaginationWrap>
        <ButtonShort onClick={handleGoToPreviousPage} disabled={pageNumber === 1}>
          이전
        </ButtonShort>
        <ButtonShort onClick={() => movePage(pageNumber + 1)} disabled={!users || users.length < limit}>
          다음
        </ButtonShort>
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

      

    @media screen and (max-width: 1023px){
      * {
      font-size: 23px;
    }
    }
   
    /* mobile 규격 */
    @media screen and (max-width: 540px){
      * {
      font-size: 25px;
    }
        
    }
    /* tablet 규격 */
    @media screen and (min-width: 1024px){
      * {
      font-size: 27.5px;
    }
    }
    /* s 데스크 */
  @media screen and (min-width: 1210px){
    * {
    font-size: 33px;
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



const CategoryWrap = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈을 허용하여 가로 공간에 맞게 정렬될 수 있도록 설정 */
  justify-content: center; /* 공간을 균등하게 분배하여 가로로 정렬 */
  align-items: center; /* 수직 가운데 정렬 (선택 사항) */
  margin-top:20px;
  `;

  

  const GridWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 1fr);
    gap: 10px;
    width: 75%;
    height: auto;
    //min-height:80vh;
    padding: 20px;
    margin-top:20px;

  
    /* tablet 규격 */
    @media screen and (max-width: 1023px){
      width: 90%;
    }

    /* mobile 규격 */
    @media screen and (max-width: 540px){
      width: 93%;
      gap: 5px;
      
    }
    /* s 데스크 */
    @media screen and (min-width: 1024px){
        
    }
    /* l 데스크 */
    @media screen and (min-width: 1700px){
        
    }
  `;
  
  const GridDiv = styled.div`
      width: 100%;
      height: 36vh;
      border-radius: 10px;
      overflow: hidden;

      /* tablet 규격 */
      @media screen and (max-width: 1023px){
        height: 26vh;
      }
  
      /* mobile 규격 */
      @media screen and (max-width: 540px){
        height: 26vh;
      }
      /* s 데스크 */
      @media screen and (min-width: 1024px){
          
      }
      /* l 데스크 */
      @media screen and (min-width: 1700px){
          
      }
  `;
  
  const GridImg = styled.img`
      width: 100%;
      height: 100%;
      border-radius: 10px; 
      object-fit: cover;
  `;

  const PaginationWrap = styled.div`
      margin-top: 20px;
      margin-bottom: 40px;
      display: flex;
      justify-content: center;
  `;

 
  const Radius = styled.button`
//border: 3px #3A76EF solid;

padding: 20px;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//margin-top: 20px;
border:none;
`;

  const ButtonShort =  styled(Radius)`
  background: #798BE6;
width:10vw;
height: 7vh; 
margin-left:20px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;

position: relative;
cursor: pointer;
color: white;

&:hover {
  background:#5D6BB4;
}

      
/* tablet 규격 */
@media screen and (max-width: 1023px){
  width:16vw;
  height: 7vh;
}

/* mobile 규격 */
@media screen and (max-width: 540px){
  width:30vw;
  height: 7vh;
}
/* s 데스크 */
@media screen and (min-width: 1024px){
    
}
/* l 데스크 */
@media screen and (min-width: 1700px){
    width:10vw;
    height: 7vh;
}
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
  
  

  
  /* tablet 규격 */
  @media screen and (max-width: 1023px){
    width:19vw;
    height: 7vh; 
    margin-right:6px;
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
    width:17.5vw;
    margin-right:6px;
  }
  /* s 데스크 */
  @media screen and (min-width: 1210px){
    width:17vw;
    height: 7vh; 
      
  }
  @media screen and (min-width: 1700px) {
    width:15vw;
    height: 7vh; 
    margin-right:25px;
  }
    
  };
 `;

const PostWrap =styled.div`
text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 수평 정렬을 오른쪽으로 변경 */
    justify-content: flex-end; /* 수직 정렬을 아래쪽으로 변경 */
    position: fixed; /* 위치를 고정 */
    bottom: 100px; /* 아래쪽 여백을 20px로 설정 */
    right: 50px; /* 오른쪽 여백을 20px로 설정 */

    /* tablet 규격 */
    @media screen and (max-width: 1023px){
        
    }

    /* mobile 규격 */
    @media screen and (max-width: 540px){
      bottom: 120px; /* 아래쪽 여백을 20px로 설정 */
      right: 25px; /* 오른쪽 여백을 20px로 설정 */
    }
    /* s 데스크 */
    @media screen and (min-width: 1024px){
      
    }
    /* l 데스크 */
    @media screen and (min-width: 1700px){
      bottom: 130px; /* 아래쪽 여백을 20px로 설정 */
      right: 80px;
    }
`;

const StyledBsPlusCircleFill = styled(BsPlusCircleFill)`
    width: 70px;
    height: 70px;
    color:#798BE6;
    cursor:pointer;
    &:hover {
      color:#5D6BB4;
    }

    /* tablet 규격 */
    @media screen and (max-width: 1023px){
        width: 75px;
      height:75px;
    }

    /* mobile 규격 */
    @media screen and (max-width: 540px){
      width: 63px;
      height:63px;
    }
    /* s 데스크 */
    @media screen and (min-width: 1024px){
        
    }
    /* l 데스크 */
    @media screen and (min-width: 1700px){
      width: 90px;
      height:90px;
    }
    `;
