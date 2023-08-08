 //import React, { useState } from 'react';
 import text from '../Images/image 21.png'
 import selBody from '../Images/image 22.png'
 import selPet from '../Images/image 23.png'
 import selWedding from '../Images/image 24.png'
 import selProfile from '../Images/image 25.png'
 import selFamily from '../Images/image 26.png'
 import styled from "styled-components";
 
 import { useNavigate } from 'react-router-dom';
 
 const Quizstart = () => {
     const navigate = useNavigate();
 
     const handleCategorySelect = (category) => {
         const queryString = new URLSearchParams({ name: category }).toString();
         navigate(`/quiztest?${queryString}`);
     };
     
     return (
         <OutWrap>
             <InsidWrap>
 
                 <Text src={text} alt='' />
                 <ImgWrap>
                     <Img src={selBody} alt='' onClick={() => handleCategorySelect('body')} />
                     <Img src={selPet} alt='' onClick={() => handleCategorySelect('pet')} />
                     <Img src={selWedding} alt='' onClick={() => handleCategorySelect('wedding')} />
                     <Img src={selProfile} alt='' onClick={() => handleCategorySelect('profile')} />
                     <Img src={selFamily} alt='' onClick={() => handleCategorySelect('family')} />
                 </ImgWrap>
             </InsidWrap>
         </OutWrap>
     );
 };
 
 export default Quizstart;
 //98.8 , 98
 const OutWrap = styled.div`
 width: 100%;
 height: 97.6vh;
 
 background: white;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 
 `;
 //div wid,height 사이즈 설정 : vh,vw 으로  
 
 const InsidWrap = styled.div`
     text-align: center;
     display: flex;
     flex-direction: column;
     align-items: center;
     
 `;
 
 const Text = styled.img`
     width: 80%;
     height: 80px; 
 
 
     @media screen and (min-width: 1600px) {
         width: 95%;
         height: 100px;  
         
     };
 `;
 
 const ImgWrap = styled.div`
     text-align: center;
     display: flex;
     flex-direction: column;
     align-items: center;
     margin-top: 46px; /* marginTop -> margin-top */
     
 `;
 
 const Img = styled.img`
     width: 85%;
     height: 60px; /* height 값에 px 단위 추가 */
     margin-bottom: 16px; /* marginBottom -> margin-bottom */
 
     @media screen and (min-width: 1600px) {
         width: 95%;
         height: 80px;  
         
     };
 `;