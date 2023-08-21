
import React , { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import logo from '../Images/imagelogo.png';
import styled from "styled-components";
//import profilelogo from '../Images/profileimg.png'
import { ProfileIcon } from '../Modal/ProfileIcon';
// 회원 아이콘 추가,,, 누를 시 1) 로그인 한 경우는 프로필 정보 페이지 2)로그인 x 로그인 페이지로 
const HeaderHome=() => 
{
    const navigate = useNavigate();

    //const [showLoginMenu, setShowLoginMenu] = useState(false);

    // 아이콘 클릭시 경우
    // 1.로그인 안한 상태면 로그인 버튼 
    /*
    const toggleLoginMenu = () => {
        setShowLoginMenu(!showLoginMenu);
    };
    //2.로그인 한 상태면 
    const handleGoProfileClick = () => {
        navigate('/profile');
    };
*/
    // landing page
    const handleGoLandingClick = () => {
        navigate('/');
        };
    

    return (

    <LogoWrap>                
        <LandingWrap> 
            <Logo src={logo} alt='' onClick={handleGoLandingClick}/> 
        </LandingWrap> 
        
        
        <ProfileIcon/>        
    </LogoWrap>

    );
};

export default HeaderHome;

const LogoWrap = styled.div`

width: 100%; 
height: 26vh;
// text-align: center;
display: flex;
//flex-direction: row;
align-items: center;
//justify-content: space-between;
//position: relative;

/* tablet 규격 */
        @media screen and (max-width: 1023px){
            
        }

        /* mobile 규격 */
        @media screen and (max-width: 540px){
            margin-top:20px;
            height: 20vh;
        }
        /* s 데스크 */
        @media screen and (min-width: 1024px){
            
        }
        /* l 데스크 */
        @media screen and (min-width: 1700px){
            width: 100%;
    height: 29vh;
        }

`;
const LandingWrap = styled.div`
`;
const HomeWrap = styled.div`
margin-right:25px;

position: absolute;
right:225px;

/* mobile 규격 */
        @media screen and (max-width: 540px){
            
            top:65px;
            right:5px;
            margin-left:10px;
        }
  
`;

const HomeLogo =styled.img`
width:50px;
height:50px;
/* tablet 규격 */
        @media screen and (max-width: 1023px){
            
        }

        /* mobile 규격 */
        @media screen and (max-width: 540px){
            width:35px;
            height:35px;
            
        }
        /* s 데스크 */
        @media screen and (min-width: 1024px){
            
        }
        /* l 데스크 */
        @media screen and (min-width: 1700px){
            width:90px;
            height:90px;
        }
`;

const Logo = styled.img`
width: 29vw; 
height: 25vh;

position: absolute;

left: 50%;
transform: translate(-50%, -50%);


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
