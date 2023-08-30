import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs'; //npm i @tensorflow/tfjs
import '@tensorflow/tfjs-backend-webgl'; //npm i @tensorflow/tfjs-backend-webgl

import { useNavigate } from 'react-router-dom';

import upload from '../Images/upload.png';

import Loogo from '../Component/Header' 
import styled from "styled-components";
import Loading from '../Component/Loading';
import Lookup_Content from '../Component/Lookup_Content';
const SERVER_URL= 'http://localhost:4000/api/postedit';

function PostEdit() {
    const [post, setPost] = useState({});
    const [updatedPost, setUpdatedPost] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [profile, setProfile] = useState(''); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // 미리보기 이미지 URL 상태
    const [prediction, setPrediction] = useState(null);
    const [selectedClass, setSelectedClass] = useState(0); // 선택한 클래스의 인덱스
    const [model, setModel] = useState(null);
    const [getloading, setGetLoading] = useState(false);

    const classLabels = [
      '바디프로필',
      '반려동물',
      '가족사진',
      '증명사진',
      '웨딩사진',
      '해당없음'
    ];
    const navigate = useNavigate();
  
    //홈페이지
    const handleGohomeClick = () => {
        navigate('/home');
    };

    //const { postId } = useParams();
    //console.log( 'postId:',postId);

    
    //데이터 가져오기 위해 
    const params = useParams(); // 
    const id = params.id; // 게시글 몇번인지 
    //console.log( 'params:',params);
    //console.log('id:',id); 

     useEffect(() => {
    const getBoard = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/${id}`);
        if (response.ok) {
          const postData = await response.json();
          console.log('Fetched data:', postData);
          setPost(postData);
          //console.log('post after setPost:', post);
          
          setUpdatedPost(postData);
          console.log('Updated post data:', postData);
        } else {
          console.error('Failed to fetch data:', response.status);
                  
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    getBoard();
    //console.log(updatedPost.title);
  }, [id]);


    /*
    if (getloading) { //데이터 가져오는 중 페이지 
        return <Loading
        what="Loading"/>; 
    } */ // 있음 실행 문제 생김 

   
    
    useEffect(() => {
      // 모델 로드
      const modelUrl = '../model_tfjs/model.json';
      async function loadModel() {
          const loadmodel = await tf.loadLayersModel(modelUrl);
          setModel(loadmodel);
          }
          loadModel();
      }, []);
    
    
    
         // 이미지 분류 함수 (소프트맥스 함수 사용)
    const classifyImage  = async (img, threshold) => {
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

            // 소프트맥스 함수 적용하여 확률로 변환
            const softmaxPrediction = tf.softmax(tf.tensor(prediction)).arraySync()[0];

            // 예측 확률 중 가장 높은 값과 해당 클래스 인덱스 가져오기
            const maxProb = Math.max(...softmaxPrediction);
            const classIndex = softmaxPrediction.indexOf(maxProb);

            // 특정 임계값 이상인 경우 해당 클래스 레이블 반환, 그렇지 않으면 "해당없음"
            if (maxProb >= threshold) {
                // 각 클래스 레이블과 예측 확률을 함께 콘솔에 출력
                console.log('Predictions with Softmax:');
                softmaxPrediction.forEach((prob, classIndex) => {
                    console.log(`${classLabels[classIndex]}: ${prob * 100}%`);
                });
            return classIndex;
        } else {
            console.log('Predictions with Softmax:');
            softmaxPrediction.forEach((prob, idx) => {
                console.log(`${classLabels[idx]}: ${prob * 100}%`);
            });
            console.log(`Predicted as: 해당없음 (Threshold: ${threshold * 100}%)`);
            return -1; // -1을 반환하여 "해당없음" 클래스를 나타냄
        }
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

    
    //text들
    const handleChange = (event, index, field)  => {
      const { value } = event.target;
      console.log(`handleChange - index: ${index}, field: ${field}, value: ${value}`);
      setUpdatedPost((prevPosts) =>
        prevPosts.map((post, i) =>
          i === index ? { ...post, [field]: value } : post
        )
      );
      console.log('Updated Post Array:', updatedPost);

    };


    /*파일업로드*/
const handleImageFileChange = async (event, index) => {
  //console.log(`handleImageFileChange - index: ${index}`);
  //이미지 파일 유효성 검사
  const imageFile = event.target.files[0];
  //console.log('Selected image file:', imageFile);
  if (
    imageFile &&
    (imageFile.type === 'image/jpeg' ||
      imageFile.type === 'image/png' ||
      imageFile.type === 'image/jpg') &&
    imageFile.size <= 30 * 1024 * 1024
  ) {
    // 이전에 생성된 URL 해제
    if (updatedPost[index].imagePreviewUrl) {
      URL.revokeObjectURL(updatedPost[index].imagePreviewUrl);
    }

    // 이미지 파일 업로드 및 미리보기 생성
    const imageUrl = URL.createObjectURL(imageFile);
    console.log('New image URL:', imageUrl); // imageUrl 값 확인
    setPreviewImage(imageUrl);

    // 이미지 예측 및 카테고리 설정
    const classIndex = await classifyImage(imageFile, 0.8); //0.8프로의정확도가 임계값
    setSelectedClass(classIndex); //인덱스를 기반으로 카테고리를 설정

    let categoryToSet; //이미지 파일 업로드 및 분류 후 설정할 카테고리를 저장하는 변수
    
    if (classIndex === -1) {
      categoryToSet = classLabels[5];
    } else {
      categoryToSet = classLabels[classIndex];
    }

    // 이미지의 카테고리를 화면에 띄우기 위해 해당 post 객체의 카테고리 정보를 업데이트
    // 저장했던 이미지의 카테고리를 가져와 화면에 표시하는 역할
    setUpdatedPost((prevPosts) => // 이전에 저장한 이미지의 post 객체를 업데이트
      prevPosts.map((post, i) =>
        i === index ? { 
          ...post, 
          imagePreviewUrl: imageUrl, 
         newImageFile: imageFile, 
          category: categoryToSet  
        } : post
      )
    );
   
    // 카테고리 정보 설정
    setCategory(categoryToSet);
    console.log('Updated image:', imageFile);
  } else {
    //선택한 파일이 이미지 파일이 아니거나 크기가 유효하지 않을 경우, 이미지 관련 상태를 초기화
    setImageFile(null);
    setPreviewImage(null);
  }
};

const handleCategorySelect = (selectedCategory, index) => {
  console.log(`handleCategorySelect - index: ${index}, selectedCategory: ${selectedCategory}`);
  setUpdatedPost((prevPosts) =>
      prevPosts.map((post, i) =>
          i === index ? { ...post, category: selectedCategory } : post
      )
  );
  console.log('Updated Post Array:', updatedPost);

};


    // 수정 업로드 버튼 
    const handleUpdate = (index) => {
      if (updatedPost[index] && updatedPost[index].newImageFile) {
      const updatedData = updatedPost[index]; // 업데이트된 데이터 가져오기
      console.log('updatedData:', updatedData);
      //updatedData.image_url = updatedData.image_url || '';
      
      //const requestData = {
        //data: updatedData,
        // Add any other properties you need to send
      //};
      //const data = {
        //updatedData,
        //};
      
      // 이미지 파일을 FormData로 감싸서 서버로 전송
      const formData = new FormData();
      formData.append('data', JSON.stringify({ updatedData  }));
      formData.append('newImageFile', updatedData.newImageFile);
      //console.log('전송할 데이터:', formData);

      for (const entry of formData.entries()) {
        const [key, value] = entry;
        console.log(`Key: ${key}`, value);
      }
      
      // 서버로 업데이트된 데이터와 이미지 함께 보내는 로직 추가
      fetch(`${SERVER_URL}/${id}`, {
        method: 'PUT',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('서버 응답:', data);
        //handleGohomeClick();

        // 서버에서 받은 이미지 URL을 업데이트된 데이터에 반영
        const updatedDataWithImageUrl = {
        ...updatedData,
        image_url: updatedData.image_url,
        imagePreviewUrl: updatedData.image_url,
      };

      // 화면을 업데이트
      const updatedPosts = [...updatedPost];
      updatedPosts[index] = updatedDataWithImageUrl;
      setUpdatedPost(updatedPosts);
      console.log(updatedPosts);

      handleGohomeClick();
      console.log('전송할 데이터:', updatedData.newImageFile);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.log("No new image file to upload.");
    }
  };
  

    // 취소 버튼 
    const handleCancel =() => {
        navigate(`/lookup/${id}`);
    }

    
    const handleMenuToggle = () => { //메뉴열기/닫기
        setIsMenuOpen(!isMenuOpen);
    };


    /*카테고리*/
    //const handleCategorySelect = (selectedCategory) => {
    //    setCategory(selectedCategory);
    //    console.log(selectedCategory);
    //};


    
    return (
        <>
        {getloading ? (
            // 로딩 중일 때
            <Loading what="Loading" />
        ) : (
            //로딩 끝나면 
            <OutWrap>
              <InOutWrap>            
                  {/* 로고 */}        
                 <Loogo/>
                  {/* 내용 */} 

                  <Center>
                    <InLayoutOne>
                      <Content>
                          {updatedPost && updatedPost.map((post, index) => {
                            const imageUrl = post.image_url;
                  
                            return (
                               <div key={index}>
                                  <One>
                                    <WrapAuto>
                                        <InputBasic
                                            type="text"
                                            name="title"
                                            value={post.title}
                                            onChange={e => handleChange(e, index, "title")}
                                        />
                                    </WrapAuto>
                                  </One>

                                  <Two>
                                    <WrapAuto>
                                        <InputBasic
                                            type="text"
                                            value={post.name}
                                            onChange={e => handleChange(e, index, "name")}
                                            placeholder="이름"
                                        />
                                    </WrapAuto>
                                  </Two>

                                  <Three>
                                    <WrapPer>
                                      <TextareaBasic
                                        value={post.description}
                                        onChange={e =>
                                          handleChange(e, index, "description")
                                        }
                                        placeholder="설명"
                                      />
                                    </WrapPer>
                                  </Three>

                                  <Four>
                                    <SelectImg src={post.imagePreviewUrl || imageUrl} alt={`게시글 이미지`} />
                     
                                    <FindImg >
                                      <Menu onClick={() => document.getElementById('fileInput').click()}>파일 찾기</Menu>
                                    </FindImg>

                                    <FileBox 
                                        id="fileInput"
                                        type="file"
                                        accept="image/jpg, image/png ,image/jpeg"
                                        onChange={(e) => handleImageFileChange(e, index, 'image_url')}
                                    />

                                    {previewImage && 
                                    <SelectImg src={previewImage} alt="Preview" />}      
                                  </Four>

                                </div>
                            );
                          })}
                       </Content>
                    </InLayoutOne>

                    <InLayoutTwo>
                        <Buttons>
                          {updatedPost.map((post, index) => (
                              <Left key={index}>
                              <ButtonOne onClick={handleMenuToggle}>
                                  {post.category ? (
                                      <Menu>{post.category}</Menu>
                                  ) : (
                                      <Menu>카테고리 선택</Menu>
                                  )}
          
         
                                  <DropContainer>

                                    {isMenuOpen && (
                                     <DropMenu > {/* 스타일 수정 */}
                                           
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[0], index)}>{classLabels[0]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[1], index)}>{classLabels[1]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[2], index)}>{classLabels[2]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[3], index)}>{classLabels[3]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[4], index)}>{classLabels[4]}</CateMenu>
                                        <CateMenu onClick={() => handleCategorySelect(classLabels[5], index)}>{classLabels[5]}</CateMenu>
                                    </DropMenu>
                                    )}

                                </DropContainer>
                            </ButtonOne>
                        </Left>
                      ))}

                        <Right>
                        {updatedPost.map((post, index) => (
                            <div key={post.id}>
                              {/* 게시물 내용 렌더링 */}
                               <EditButton onClick={() => handleUpdate(index)}>업로드</EditButton>
  </div>
))}
                          <CancelButton onClick={handleCancel}>취소</CancelButton>
                        </Right>
                      </Buttons>
                   </InLayoutTwo>
                 </Center>

              </InOutWrap>
            </OutWrap>
            
            )}
        </>
    );
}

export default PostEdit;

const OutWrap = styled.div`
width: 100%;
height: 97.6vh;

position: relative;

background: white;

display: flex;
flex-direction: column;
// justify-content: center;
align-items: center;

* {
  font-size: 33px;
}
/* mobile 규격 */
@media screen and (max-width: 540px){
  * {
  font-size: 27px;
}
    
}
@media screen and (min-width: 1700px) {
  * {
    font-size: 45px;
  }
`;

const InOutWrap = styled.div`
//text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const Center = styled.div`
//width: 65vw;
//text-align: center;
display: flex;
flex-direction: column;
align-items: center;
`;

const InLayoutOne = styled.div`
width:65vw;

/* tablet 규격 */
        @media screen and (max-width: 1023px){
            
        }

        /* mobile 규격 */
        @media screen and (max-width: 540px){
          width: 80vw;
        }
        /* s 데스크 */
        @media screen and (min-width: 1024px){
            
        }
        /* l 데스크 */
        @media screen and (min-width: 1700px){
          width: 75vw;
        }

`;

const InLayoutTwo = styled(InLayoutOne)`
display: flex;
width:65vw;
//height:21vh;
align-items: center;
margin-bottom:20px;
/* mobile 규격 */
  @media screen and (max-width: 540px){
    width: 80vw;
    height:19vh;
  }
@media screen and (min-width: 1700px) {
    width: 75vw;
    height:21vh;
};
`;



const Content = styled.div`
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

const One = styled(ContentRadius)`
display: flex;
align-items: center;
height:auto;

`;

const Two = styled(ContentRadius)`
  display: flex;
  //flex-wrap: wrap; /* 줄바꿈을 허용하여 가로 공간에 맞게 정렬될 수 있도록 설정 */
  align-items: center; /* 수직 가운데 정렬 (선택 사항) *  
`;


const Three = styled(ContentRadius)`
height: 25vh;
`;

const Four = styled(ContentRadius)`
position: relative;
overflow: hidden;
//text-align: center;
height:75vh;
`;

const Left = styled.div`
display: flex;
justify-content: center;
margin-left:auto;
`;

const Right = styled.div`
display: flex;
flex-direction: column;
margin-left: auto;

/* s 데스크 */
@media screen and (min-width: 1024px){
  margin-right:auto;
}
`;

const Radius = styled.button`
background: #798BE6;
padding: 20px;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

margin-top: 20px;
border:none;

`;
const Buttons = styled.div`
  //text-align: center;
  display: flex;
  //justify-items: space-between;
  flex-direction: row;
  width: 100%;

  /* tablet 규격 */
  @media screen and (max-width: 1023px){
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ButtonOne = styled(Radius)`

display: flex;
align-items: center;
justify-content: center;

cursor: pointer;
position: relative;
width: 40vw;
height: 7vh;

/* mobile 규격 */
@media screen and (max-width: 540px){
  width:80vw;
  height: 7vh; 
}
@media screen and (min-width: 1700px) {
    width: 50vw;
    height: 7.5vh;
};

`;
// 버튼투
const ButtonTwo = styled(Radius)`
  background: #798BE6;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  cursor: pointer;

  width:18vw;
  height: 7vh; 
  color: white;

  /* mobile 규격 */
  @media screen and (max-width: 540px){
    width:41vw;
    height: 7vh; 

  }`;

//파일 찾기 

const FindImg = styled(ButtonTwo)` 
  position: absolute;
  bottom: 30px;
  right: 10px;

  /* tablet 규격 */
  @media screen and (max-width: 1023px){
    bottom: 20px;
  }

`;
 // span 
const Menu = styled.span`
z-index: 2;
color: white;
position: absolute;
`;

const Area = styled.div`
display: flex;
align-items: center;
width: 100%;
overflow: hidden; 
`;

const WrapAuto = styled(Area)`
height: auto;

`;
const WrapPer = styled(Area)`
height: 100%;
`;

const inputStyle = {
color: 'black',
fontFamily: 'Inter',
border: 'none',
outline: 'none',
width: '100%'
};

const InputBasic = styled.input`
${inputStyle}
height: 6vh;
`;

const TextareaBasic = styled.textarea`
${inputStyle}
height: 100%;
`;

const EmptyImg = styled.img`
width: 200px;
height: 200px;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
/* tablet 규격 */
  @media screen and (max-width: 1023px){
      
  }

  /* mobile 규격 */
  @media screen and (max-width: 540px){
    width: 120px;
    height: 120px;
  }
  /* s 데스크 */
  @media screen and (min-width: 1024px){
    
  }
  /* l 데스크 */
  @media screen and (min-width: 1700px){
      
  }

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
  //font-size: 33px;
  position: absolute;
  align-items: center;
`;

//드롭메뉴바
const DropMenu = styled.div` 
  position: relative;
  background-color: #798BE6;
  //border: 1px solid #ccc;
  padding: 10px;
  border-radius: 31px;
  z-index: 2;

  //text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  top: -137px;


  /* tablet 규격 */
        @media screen and (max-width: 1023px){
            
        }

        /* mobile 규격 */
        @media screen and (max-width: 540px){
          width:45vw;
          top: -147px;
        }
        /* s 데스크 */
        @media screen and (min-width: 1024px){
          width:25vw;
        }
        /* l 데스크 */
        @media screen and (min-width: 1700px){
          width:40vw;
          top: -177px;
        }
`;

const CateMenu = styled.div` 
  font-size: 25px;
  margin-top:5px;

  /* tablet 규격 */
        @media screen and (max-width: 1023px){
            
        }

        /* mobile 규격 */
        @media screen and (max-width: 540px){
            
        }
        /* s 데스크 */
        @media screen and (min-width: 1024px){
          
        }
        /* l 데스크 */
        @media screen and (min-width: 1700px){
          font-size: 30px;
        }
`;


const ButtonLong = styled(Radius)`
  
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  width:18vw;
  height: 7vh; 
  color:white;

  /* mobile 규격 */
  @media screen and (max-width: 540px){
    width:41vw;
    height: 7vh; 

  }

  /* s 데스크 */
  @media screen and (min-width: 1024px){
      
  }
  @media screen and (min-width: 1700px) {
    width:18vw;
    height: 7.5vh; 
  };
 `;

const EditButton =styled(ButtonLong)``;
const CancelButton=styled(ButtonLong)`
`;