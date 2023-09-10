import React ,{useEffect}from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
//import "./Font/Font.css"

//import GlobalStyles from "./GlobalStyles"; // GlobalStyles 불러오기
import Landing from './pages/Landing';
import QuizSelIndex from './Quiz/Quizstart'
import QuizSelPhoto from './Quiz/Quiztest'
import QuizReult from './Quiz/Quizresult'
import ExQuizReult from './PostUp/quizexample'
import Post from './PostUp/Post.js'
import Home from './Home/homepage.js'
import Example from './Home/example.js'
import Reco from './PostUp/Reco.js'
import Lookup from './Lookup/Image_Lookup_Comtest'
import  { createGlobalStyle } from "styled-components";  
import ProfileLook from './Mypage/ProfileLook';
import PostEdit from './PostUp/PostEdit';
import ProfileEdit from './Component/ProfileInfo_Edit';
//import OtherUserProfile from './Mypage/OtherUserProfile';

//import Test from './PostUp/Test';
// 전역 스타일 설정
const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'NanumNormal';
    font-style: normal;
    font-weight: normal;
    src: url(./Font/AnyConv.com__NanumGothic-Regular.woff);
  }
  @font-face {
    font-family: 'NanumBold';
    font-style: normal;
    font-weight: bold;
    src: url(./Font/AnyConv.com__NanumGothic-Bold.woff);
  }
  @font-face {
    font-family: 'NanumExtra';
    font-style: normal;
    font-weight: 800;
    src: url(./Font/AnyConv.com__NanumGothic-ExtraBold.woff);
  }

@font-face {
  font-family: 'NanumNormal';
  font-style: normal;
  font-weight: normal;
  src: url(./Font/AnyConv.com__NanumGothic-Regular.woff);
}
@font-face {
  font-family: 'NanumBold';
  font-style: normal;
  font-weight: bold;
  src: url(./Font/AnyConv.com__NanumGothic-Bold.woff);
}
@font-face {
  font-family: 'NanumExtra';
  font-style: normal;
  font-weight: 800;
  src: url(./Font/AnyConv.com__NanumGothic-ExtraBold.woff);
}
  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
   // overflow: hidden;
   font-family: 'NanumBold';
   
  }
  
  
`;
function App() {
    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      useEffect(() => {
        setScreenSize();
      });

    return (
    

    <BrowserRouter>
        <GlobalStyle /> 
        <div className="App" >
            
            <Routes>
                
                <Route path='/' element={<Landing />}/>

                <Route path ='/post' element={<Post />}/>
                
                <Route path ='/quizindex' element={<QuizSelIndex />}/>
                <Route path ='/quiztest' element={<QuizSelPhoto />}/>

                <Route path ='/reco' element={<Reco/>}/>
                <Route path ='/quizresult' element={<QuizReult />}/>
                <Route path ='/exquizresult' element={<ExQuizReult />}/>

                <Route path ='/home' element={<Home />}/>
                <Route path ='/example' element={<Example />}/>
                <Route path ='/lookup/:id' element={<Lookup/>}/>
                <Route path = '/postEdit/:id'  element={<PostEdit/>}/>

                <Route path='/profile/:emailId' element={<ProfileLook />}/>
                
                
            </Routes>
            
        </div>
    </BrowserRouter>


    );
}

export default App;
