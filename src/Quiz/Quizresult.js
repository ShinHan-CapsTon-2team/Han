import { useLocation } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import pic1 from '../Images/image 7.png'
import pic2 from    '../Images/image 8.png'
import styled from "styled-components";

const Quizresult  = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const categoryName = params.get('name');
    const res = params.get('res');
    //확인해보기 
    console.log('categoryName :',categoryName);
    console.log('res: ',res);

    const navigate = useNavigate();

    // 홈페이지 이동 수정 
    const handleGoHomeClick = () => {
        navigate('/home');
    };

    // 업로드 이동 수정 
    const handleGoUploadClick = () => {
        navigate('/post');
    };


    /// 퀴즈에 대한 결과 추가해야함 
    
    


    return (
        <OutWrap>
            <InsideWrap>
                <OneImg src="https://via.placeholder.com/378x482" />
                <OneImg src="https://via.placeholder.com/378x482" style={{marginLeft:20,marginRight:20}} />
                <OneImg src="https://via.placeholder.com/378x482" />
            </InsideWrap>
            <InsideNextWrap>
                <Button src={pic1} onClick={handleGoHomeClick} />
                <Button src={pic2} onClick={handleGoUploadClick}/>
            </InsideNextWrap>
        </OutWrap>
    );
};

export default Quizresult;

const OutWrap = styled.div`
    width: 100%;
    height: 97.6vh;

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
        flex-direction: row;
        justify-content: space-between;
        margin-top: 50px;
        
        @media screen and (min-width: 1600px) {
            margin-top: 70px; 
            
        }; 
    `;

    const OneImg = styled.img`
        width: 27vw;
        height: 65vh;
        opacity: 0.90;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 31px;
        border: 4px #3A76EF solid;
        
    `;
    //width: 398px;
        //height: 492px;
    //margin-left: ${({ isMargin }) => (isMargin ? '20px' : 0)};
        //margin-right: ${({ isMargin }) => (isMargin ? '20px' : 0)};

    const InsideNextWrap = styled.div`
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    `;

    const Button = styled.img`
        width: 21vw;
        height: 9vh;
        padding: 25px;

        @media screen and (min-width: 1600px) {
            width: 24vw;
            height: 10vh;
            
        };
    `;

    
    
    