import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import logo from '../Images/imagelogo.png';
import upload from '../Images/upload.png';

import styled from "styled-components";


function Reco() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 500;
        const maxHeight = 800;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resizedImageSrc = canvas.toDataURL('image/jpeg');

        setSelectedFile(file);
        setImageSrc(resizedImageSrc);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };


  //홈페이지
  const handleGohomeClick = () => {
    navigate('/home');
  };
  const handleImageUploadAndNavigate = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://example.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // 이미지 업로드 성공
        console.log('Image upload success!');
        
        // 업로드가 완료된 후 다른 페이지로 이동
        navigate('/other-page');
      } else {
        // 이미지 업로드 실패
        console.error('Image upload failed:', response.status);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  //const OutWrap = styled.div``;
  //const OutWrap = styled.div``;

  return (
    <OutWrap>
      <InOutWrap>
        <LogoWrap>
          <Logo src={logo} alt='' onClick={handleGohomeClick}/>
        </LogoWrap>

        <Center>

          <InLayoutOne>
            <Content>
              <Five> 
                  {selectedFile && (
                      <SelectImg src={imageSrc} alt="upload" />
                      )}{/* 업르드시 보이는 사진 */}
              
                  {!selectedFile && (
                      <EmptyImg src={upload} alt="up" />        
                  )}{/* 빈 이미지 로고 그림인데 업로드 하면 없어진 */}


                  
                  <FindImg >
                    <Menu onClick={() => document.getElementById('file-upload').click()}>파일 찾기</Menu>
                  </FindImg>
                  

                  <InputBox
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                  />
                  {/* 위 아래  파일찾기  버튼, 이미지 셀렉 하면 없어진다. */}
              </Five>
              
            </Content>
          </InLayoutOne>

          <InLayoutTwo>
            
            <ButtonTwo>
              <Menu onClick={handleImageUploadAndNavigate} >
                결과보기  </Menu>
            </ButtonTwo>
          </InLayoutTwo>
        </Center>
      </InOutWrap>
    </OutWrap>
  );
}

export default Reco;

const OutWrap = styled.div`
  width: 100%;
  height: 97.6vh;
  background: white;
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
 // justify-content: center;
`;
const InOutWrap = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const LogoWrap = styled.div`
width: 27vw; 
height: 23.2vh;
  text-align: center;
display: flex;
flex-direction: column;
align-items: center;

@media screen and (min-height: 900px) {
    width: 29vw; 
    height: 26.2vh;
};
`;
const Center = styled.div`
//width: 65vw;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;

`;
const InLayoutOne = styled.div`
text-align:center;
width:65vw;

@media screen and (min-width: 1700px) {
    width: 75vw;
};
`;
const Content = styled.div`
//width:65vw;
display: flex;
flex-direction: column;
`;

const Logo = styled.img`
width: 27vw; 
height: 23vh;

@media screen and (min-height: 900px) {
    width: 29vw; 
    height: 26vh; 
}`;


  const SelectImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  `;

  const EmptyImg = styled.img`
  width: 200px;
  height: 200px;
  width: 150px;
  height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @media screen and  (min-height: 950px){
      width: 200px;
      height: 200px;
  };
  `;

const InLayoutTwo = styled(InLayoutOne)`
display: flex;
width:65vw;
height:10vh;
justify-content: flex-end;
align-items: center;
margin-right:20px;

@media screen and (min-width: 1700px) {
    width: 75vw;
};
`;

const InputBox = styled.input`
display: none;
`;



  
const ContentRadius = styled.div`
border: 3px #3A76EF solid;
padding: 20px;
word-wrap: break-word;
opacity: 0.90;
border-radius: 31px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);


@media screen and (min-height: 900px) {
    border: 4px #3A76EF solid;
};
`;



const Five = styled(ContentRadius)`

position: relative;

overflow: hidden;
text-align: center;
height:58vh;
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


const FindImg = styled(Radius)` 
  background: #798BE6;
  position: absolute;
  bottom: 10px;
  right: 10px;

  display: flex;
  justify-content: center;
  align-items:center;
  
  width:18.5vw;
  height: 7.5vh;
  // 여기 적응된다고 . . .왜 다른 곳은 안되는거고 여긴 
  @media screen and (min-height: 950px) {
    width:18vw;
    height: 8vh; 
    
   };
  

`;
const ButtonTwo = styled(Radius)`
background: #798BE6;
display: flex;
align-items: center;
justify-content: center;

position: relative;
cursor: pointer;
  width:18vw;
  height: 7vh; 
  font-size: 33px;

  @media screen and (min-width: 1700px) {
    width:18vw;
    height: 7.5vh; 
  };
 `;


 const Menu = styled.span`
z-index: 2;
color: white;

position: absolute;
font-weight: 500;

font-size: 33px;
over-flow:hidden;

@media screen and (min-height: 950px) {
  
  font-size: 45px;
  
  };
`;