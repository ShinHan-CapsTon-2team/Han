
import React, { useState, useEffect ,useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs'; //npm i @tensorflow/tfjs
import '@tensorflow/tfjs-backend-webgl'; //npm i @tensorflow/tfjs-backend-webgl
//useRef, useCallback
import logo from '../Images/imagelogo.png';
import { useNavigate } from 'react-router-dom';

import upload from '../Images/upload.png';

//import Inputtitle from './InTitle' 컴포넌트 

import styled from "styled-components";

const SERVER_URL= 'http://localhost:4000/api/post';

function Post() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //const [image_url, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [profile, setProfile] = useState(''); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 URL 상태
    const [prediction, setPrediction] = useState(null);
    const [selectedClass, setSelectedClass] = useState(0); // 선택한 클래스의 인덱스
    const classLabels = [
      '바디프로필',
      '반려동물',
      '가족사진',
      '증명사진',
      '웨딩사진',
    ];
    const navigate = useNavigate();

    //홈페이지
    const handleGohomeClick = () => {
        navigate('/home');
    };

    useEffect(() => {
        // 모델 로드
        const modelUrl = './model_tfjs/model.json';
        async function loadModel() {
          const model = await tf.loadLayersModel(modelUrl);
          setModel(model);
        }
        loadModel();
      }, []);
    
      const [model, setModel] = useState(null);
    
      // 이미지 분류 함수
      const classifyImage = async (img) => {
        try {
          if (!model) {
            console.error('Model not loaded yet.');
            return null;
          }
    
          const imageData = await getImageData(img);
          const tensorImg = tf.browser.fromPixels(imageData).toFloat();
          const resizedImg = tf.image.resizeBilinear(tensorImg, [500, 400]); 
          const expandedImg = resizedImg.expandDims();
          const normalizedImg = expandedImg.div(255.0);
          const prediction = await model.predict(normalizedImg).array();
          const classIndex = prediction[0].indexOf(Math.max(...prediction[0]));
          return classIndex;
        } catch (error) {
          console.error('Error classifying the image:', error);
          return null;
        }
      };
    
      // 이미지 파일을 ImageData로 변환
      //TensorFlow.js 모델에 이미지를 입력으로 제공하기 위해서 이미지 파일을 ImageData로 변환하여 모델에 전달
      //TensorFlow.js 모델은 숫자 행렬 형태인 ImageData를 입력으로 받아들이기 때문임 
      const getImageData = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              const imageData = ctx.getImageData(0, 0, img.width, img.height);
              resolve(imageData);
            };
            img.src = event.target.result;
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      };

    const handleSubmit = () => {
        //window.location.href = '/home';
        // 사용자가 게시글을 업로드한 시점의 시간
        //const currentTime = new Date().toISOString();
        // 서버로 보낼 데이터 객체를 생성
        const data = {
        title,
        description,
        //image_url: previewImage, //미리보기 이미지를 전송
        category,
        name,
        profile,
        //created_at : getCurrentTime(),
        };
        console.log(data.title);
    // 이미지 파일을 FormData로 감싸서 서버로 전송
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        formData.append('image', imageFile);
        
    // fetch()를 이용하여 서버로 데이터를 전송
        fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('서버 응답:', data);
            handleGohomeClick();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleMenuToggle = () => { //메뉴열기/닫기
        setIsMenuOpen(!isMenuOpen);
    };


    /*카테고리*/
    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    

   /*파일업로드*/
   const handleImageFileChange = async (event) => {
    const imageFile = event.target.files[0];
    if (
      imageFile &&
      (imageFile.type === 'image/jpeg' ||
        imageFile.type === 'image/png' ||
        imageFile.type === 'image/jpg') &&
      imageFile.size <= 30 * 1024 * 1024
    ) {
      setImageFile(imageFile);
      setPreviewImage(URL.createObjectURL(imageFile));
      // 이미지 파일이 업로드되면 예측 수행
      const classIndex = await classifyImage(imageFile);
      setSelectedClass(classIndex);
      const predictedLabel = classLabels[classIndex];
      setPrediction(predictedLabel);
      setCategory(classLabels[classIndex]); // 카테고리를 예측된 클래스로 설정
    } else {
      setImageFile(null);
      setPreviewImage(null);
    }
  };

    return (
        
        <OutWrap>
            <InOutWrap>            
                {/* 홈페이지 로고 같*/}        
                <LogoWrap>
                    <Logo src={logo} alt='' onClick={handleGohomeClick}/>
                </LogoWrap>
                {/* 로고 아래 */} 

                <Center>                   
                    <InLayoutOne>  
                        <Content>

                            <One> {/*제목*/}
                                <SmallWrap>
                                    <InputSmall
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="제목"
                                    />
                                </SmallWrap>
                            </One>

                            <Two>{/*이름 */}
                                <SmallWrap>
                                    <InputSmall 
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="이름"
                                    />
                                </SmallWrap>
                            </Two>

                            <Three> {/*소개 */}
                                <ProfileWrap>
                                    <ProfileArea 
                                    //ref={textRef} 길이 조절 수정해야함 
                                    //onInput={handleResizeHeight}
                                    value={profile}
                                    onChange={(e) => setProfile(e.target.value)}
                                    placeholder="소개 및 커리어"
                                    />
                                </ProfileWrap>
                            </Three>

                            <Four>{/* 설명 */}
                                {/* 드래그 방지 추가하기 */}
                                <DescriptionWrap>
                                    <DescriptArea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="설명" 
                                    />
                                </DescriptionWrap>
                                
                            </Four>                                        
                            
                            <Five>{/* 이미지 */}
                                {!previewImage && (
                                    <EmptyImg src={upload} alt="upload" />
                                )} {/*빈 이미지로 사진 올리면 없어짐 */}

                                <FindImg >
                                  <Menu onClick={() => document.getElementById('fileInput').click()}>파일 찾기</Menu>
                                </FindImg>

                                <FileBox 
                                    id="fileInput"
                                    type="file"
                                    accept="image/jpg, image/png ,image/jpeg"
                                    onChange={handleImageFileChange} 
                                />

                                {previewImage && 
                                <SelectImg src={previewImage} alt="Preview" />} 
                                
                            </Five>

                        </Content>  
                    </InLayoutOne>  

                    <InLayoutTwo>
                    
                        <Buttons>
                            <Left>
                                <ButtonOne onClick={handleMenuToggle}> {/*카테고리 */}
                                
                                {category ? (
                                    <Menu>{category}</Menu>
                                ) : (
                                    <Menu>카테고리 선택</Menu>
                                )}

                                <DropContainer>
                                
                                    {isMenuOpen && (
                                    <DropMenu > {/* 스타일 수정 */}
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[0])}>{classLabels[0]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[1])}>{classLabels[1]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[2])}>{classLabels[2]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[3])}>{classLabels[3]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[4])}>{classLabels[4]}</CateMenu>   
                                    </DropMenu>
                                    )}

                                </DropContainer>

                                </ButtonOne>
                            </Left>

                            <Right> 
                                <ButtonTwo>
                                    
                                    <Menu onClick={handleSubmit} >
                                    업로드  </Menu>
                                </ButtonTwo>
                            </Right>
                        </Buttons>
                    </InLayoutTwo>               
                </Center>
                
            </InOutWrap>
        </OutWrap>
    );
}

export default Post;

const OutWrap = styled.div`
width: 100%;
height: 97.6vh;

position: relative;

background: white;

display: flex;
flex-direction: column;
// justify-content: center;
align-items: center;

//overflow: hidden;
`;

const InOutWrap = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const LogoWrap = styled.div`
width: 30vw; 
height: 26vh;
  text-align: center;
display: flex;
flex-direction: column;
align-items: center;

@media screen and (min-height: 900px) {
    width: 32vw; 
    height: 29vh;
};
`;

const Logo = styled.img`
width: 29vw; 
height: 25vh;

@media screen and (min-height: 900px) {
    width: 31vw; 
    height: 28vh; 
}`;

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

const InLayoutTwo = styled(InLayoutOne)`
display: flex;
width:65vw;
height:12vh;
align-items: center;
//justify-content: center;

@media screen and (min-width: 1700px) {
    width: 75vw;
    height:13vh;
};
`;

const Content = styled.div`
//width:65vw;
display: flex;
flex-direction: column;
`;

const ContentRadius = styled.div`
border: 3px #3A76EF solid;
padding: 20px;
word-wrap: break-word;
border-radius: 31px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
margin-top: 20px;

@media screen and (min-height: 900px) {
    margin-top: 30px;
    border: 4px #3A76EF solid;
};
`;


// 색깔 탁하게 하는 주범 이 새기임 opacity: 0.90;
const One = styled(ContentRadius)`
display: flex;
align-items: center;
`;

const Two = styled(One)`
`;

const Three = styled(ContentRadius)`
height: auto;
flex:1;
`;

const Four = styled(ContentRadius)`
height: 25vh;
`;

const Five = styled(ContentRadius)`
position: relative;
overflow: hidden;
text-align: center;
height:75vh;
`;

const Left = styled.div`
width: 65%;
display: flex;
justify-content: center;
`;

const Right = styled.div`
display: flex;
flex-direction: column;
margin-left: auto;
margin-right:10px;
//flex:1
`;

const Radius = styled.button`
//border: 3px #3A76EF solid;

padding: 20px;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

margin-top: 20px;
border:none;

`;
const Buttons = styled.div`
  text-align: center;
  display: flex;
  justify-items: space-between;
  flex-direction: row;
  width: 100%;
`;
//파일 찾기 

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
    
   // };
  
  
`;


const ButtonOne = styled(Radius)`
background: #798BE6;
display: flex;
align-items: center;
justify-content: center;

cursor: pointer;
position: relative;
width: 40vw;
height: 7vh;

@media screen and (min-width: 1700px) {
    width: 50vw;
    height: 7.5vh;
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

 // span 
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

const Area = styled.div`
display: flex;
align-items: center;
width: 100%;
border-radius: 31px;
overflow: hidden; 
`;

const SmallWrap = styled(Area)`
height: auto;

`;
// overflow: hidden;  내용이 부모 요소를 넘어가지 않도록 함 

const DescriptionWrap = styled(Area)`
height: 100%;

`;
const inputStyle = {
color: 'black',
fontSize: 35,
fontFamily: 'Inter',
fontWeight: '400',
border: 'none',
outline: 'none',
width: '100%',

    '@media screen and (min-height: 950px)': {
        fontSize: 40,
    },
};

const InputSmall = styled.input`
${inputStyle}
height: 6vh;
`;

const DescriptArea = styled.textarea`
${inputStyle}
height: 100%;
`;

const ProfileArea = styled.textarea`
${inputStyle}
height: 100%;
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

const FileBox = styled.input`
  display:none;
`;

const SelectImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  `;

const DropContainer = styled.div`
  z-index: 2;
  color: white;
  font-size: 23px;
  position: absolute;
  align-items: center;
`;

//드롭메뉴바
const DropMenu = styled.div` 
  position: relative;
  background-color: #798BE6;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 31px;
  z-index: 2;

  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  top: -157px;

  

  @media screen and (min-height: 950px){
    top: -167px;
    };

    
  @media screen and (max-width: 1950px) {
    width:40vw;
  };
  @media screen and (max-width: 1600px) {
    width:25vw;
  };
  
`;

const CateMenu = styled.div` 
  font-size: 29px;
  font-weight: 550;
  margin-top:5px;
`;


const ProfileWrap = styled(Area)`
height:100%;
`;