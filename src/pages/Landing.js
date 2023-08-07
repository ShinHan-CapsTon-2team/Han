import logo from '../Images/imagelogo.png'
import photoreco from '../Images/image 20.png'
import fitphoto from '../Images/image 19.png'
import gogohome from '../Images/image 18.png'

import { useNavigate } from 'react-router-dom';

import styled from "styled-components";


function Re_Landing(){

    const navigate = useNavigate();
    //퀴즈 
    const handleFitPhotoClick = () => {
        navigate('/quizindex');
    };


    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    console.log(`현재 웹 페이지 해상도 너비: ${screenWidth}px`);
    console.log(`현재 웹 페이지 해상도 높이: ${screenHeight}px`); 

    
    //홈페이지
    const handleGohomeClick = () => {
        navigate('/home');
    };
    // 사진 등록 추천
    const handleUploadPhotoClick = () => {
        navigate('/reco');
    };
    

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

    const LogoImg = styled.img`
        @media (min-width: 1920px) and (max-width: 1080px) {} {
         width: 90%;
         height: 100%;
        }

        width: 55%;
        height: 274px; /* height 값에 px 단위를 추가하세요 */
        margin-top: 100px; /* marginTop -> margin-top */
        margin-bottom: 50px; /* marginBottom -> margin-bottom */

       
    `;

    const ImgWrap = styled.div`
        text-align: center;
        display: flex;
        flex-direction: column;
        
        align-items: center;

        
        
    `;

    const Img = styled.img`
        width: 45%;
        height: auto;
        margin-bottom: 16px; /* marginBottom -> margin-bottom */

        @media (min-width: 1920px) and (max-width: 1080px) {} {
            width: 100%;
            height: 100%;
           }
       
    `;


    

    return (

        <OutWrap>
            <InsideWrap>
                <LogoImg src={logo} alt=''/>
                <ImgWrap>
                    <Img src={photoreco} onClick ={handleUploadPhotoClick} alt='' />
                    <Img src={fitphoto} alt=''onClick={handleFitPhotoClick}/>
                    <Img src={gogohome} onClick={handleGohomeClick} alt=''/>
                    
                </ImgWrap>
                
            </InsideWrap>
        </OutWrap>
    
    );
}

export default  Re_Landing;