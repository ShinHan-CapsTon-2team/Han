import logo from '../Images/imagelogo.png'

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from "styled-components";


function Landing(){

    const [accessToken, setAccessToken] = useState('');
const [userInfo, setUserInfo] = useState(null);


useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    
    if (code) {
        fetch('http://localhost:4001/api/example', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Received data:',data.tokenData.access_token);

            if (data.userInfoData && data.tokenData.access_token) {  
                    setAccessToken(data.tokenData.access_token);

                    const userInfoData = data.userInfoData; // 서버에서 전달받은 사용자 정보 데이터
                    setUserInfo(userInfoData.response); // 사용자 정보를 상태로 설정
                    console.log('Received user:', userInfoData);
                
            }
            // 액세스 토큰을 로컬 스토리지에 저장합니다.
            localStorage.setItem('access_token', data.tokenData.access_token);
            // 로컬 스토리지에 액세스 토큰이 정상적으로 저장되었는지 확인하고 처리합니다.
            if (localStorage.getItem('access_token')) {
            console.log('액세스 토큰이 로컬 스토리지에 저장되었습니다.');
            } else {
            console.error('액세스 토큰 저장에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('Error fetching access token:', error);
        });
    }
    }, []);



    const navigate = useNavigate();

    //퀴즈 
    const handleFitPhotoClick = () => {
        navigate('/quizindex');
    };

    //홈페이지
    const handleGohomeClick = () => {
        navigate('/home');
    };
    // 사진 등록 추천
    const handleUploadPhotoClick = () => {
        navigate('/reco');
    };
    // 사진 등록
    const handleUpPhotoClick = () => {
        navigate('/post');
    };

    const OutWrap = styled.div`

    background: white;
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 80%;
    height:100%;

	@media screen and (max-width: 1023px){
        width: 95%;
    }
	
`;

    const InsideWrap = styled.div`
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width:100%
    `;

    const LogoImg = styled.img`
        margin-top: 50px; 
        margin-bottom: 20px; 

        width: 48%;

        @media screen and (max-width: 1024px){
            width: 63%;
        }
        @media screen and (max-width: 540px){
            width: 80%;
        }
        
    `;

    const ImgWrap = styled.div`
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        width:55%;

        @media screen and (max-width: 1024px){
            
            width: 70%;
        }
        @media screen and (max-width: 540px){
            
            width: 91%;
        }

        
        
    `;


    const Radius = styled.button`
    padding: 20px;
    word-wrap: break-word;
    border-radius: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border:none;
    `;

    const Button = styled(Radius)`
    background: #798BE6;
    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    cursor: pointer;
    color: white;
    font-weight: 500;

    
    width: 100%;
    height: 9.6vh;; 
    font-size: 35px;
    margin-bottom:15px;


    /* tablet 규격 */
        @media screen and (max-width: 1023px){
            
        }

        /* mobile 규격 */
        @media screen and (max-width: 540px){
            
            height: 9.4vh;
            font-size: 24px;
            margin-bottom:12px;
        }
        /* s 데스크 */
        @media screen and (min-width: 1024px){
            
        }
        /* l 데스크 */
        @media screen and (min-width: 1700px){
            height: 9vh;
            font-size: 40px;
            
        }
`;


    // 추가 ) 로그인 부분 

    return (

        <OutWrap>
            <InsideWrap>
                
                <LogoImg src={logo} alt=''/>
                
                
                <ImgWrap> {/* 말 줄이기 ... fontsize 높여야함  */}
                    <Button onClick ={handleUploadPhotoClick}>매칭을 통해 추천받기 </Button>
                    <Button onClick={handleFitPhotoClick}> 맞는 사진 추천받기</Button>
                    <Button onClick={handleGohomeClick} > 홈페이지 방문하기</Button>
                    <Button onClick={handleUpPhotoClick} >로그인하기</Button> 
                </ImgWrap>
                
            </InsideWrap>
        </OutWrap>
    
    );
}

export default  Landing;