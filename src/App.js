//기본 제공 fetch
//axios 라이브러리 


import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 

import Landing from './pages/Landing';
import QuizSelIndex from './Quiz/Quizstart'
import QuizSelPhoto from './Quiz/Quiztest'
import QuizReult from './Quiz/Quizresult'
import Post from './PostUp/Post.js'
import Home from './Home/homepage.js'
import Login from './Home/login.js'
import Reco from './PostUp/recommend.js'
//import Lookup from './Lookup/Images_Lookup.js' // 조회
import Lookup from './Lookup/Image_Lookup_Comtest'
import  { createGlobalStyle } from "styled-components";  
import Update from './Lookup/update'
import ProfileLook from './Mypage/ProfileLook';
import PostEdit from './PostUp/PostEdit';
//style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',margin : '0 auto'}}

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
   // overflow: hidden;
  }
`;

function App() {

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

                <Route path ='/home' element={<Home />}/>
                <Route path ='/login' element={<Login />}/>
                <Route path ='/lookup/:id' element={<Lookup />}/>
                <Route path ='/update/:id' element={<Update />}/>
                
                <Route path ='/postedit/:postId' element={<PostEdit/>}/>

                <Route path='/profile' element={<ProfileLook/>}/> {/* 후에 useparams 사용해야 */}

            </Routes>
        </div>
    </BrowserRouter>


    );
}

export default App;