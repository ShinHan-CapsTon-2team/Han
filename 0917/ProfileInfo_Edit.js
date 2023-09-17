import React, { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import styled from 'styled-components';

const ProfileWrap = styled.div`
display:flex;
flex-direction:column;
align-items:center;
//overflow: hidden;
width:25%;


@media screen and (max-width: 1024px){
    width:25%;
}

@media screen and (max-width: 850px){
    width:30%;
}
/* mobile 규격 */
@media screen and (max-width: 540px){
    width:90%;
}

/* s 데스크 */
@media screen and (min-width: 1025px){
    width:30%;
}
/* l 데스크 */
@media screen and (min-width: 1700px){
  width:27%;
}

`;

const ContentRadius = styled.div`

padding: 40px;

word-wrap: break-word;
border-radius: 31px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
margin-bottom:20px;

@media screen and (max-width: 1600px) {
    border: 3px #3A76EF solid;
    }

    @media screen and (max-width: 1024px){
        padding: 20px;
    }
    @media screen and (max-width: 540px) {
    
    border: 2px #3A76EF solid;
    }
    
    @media screen and (min-width: 1601px) {
    border: 4px #3A76EF solid;
    };



@media screen and (max-width: 850px){
    padding: 20px;
}
`;


const One = styled(ContentRadius)`
display: flex;
align-items: center;
height:15vh;
//height:15vh;
//min-height:10vh;
flex-direction: column;
margin-bottom:20px;

justify-content: center;

width:65%;
@media screen and (max-width: 850px){
    width:75%;
}
@media screen and (max-width: 540px){
    width:90%;
}


`;

const Onetwo = styled(ContentRadius)`
display: flex;
align-items: center;
//width:25%;
height:auto;
min-height:30vh;
flex-direction: column;

width:65%;
@media screen and (max-width: 850px){
    width:75%;
}
@media screen and (max-width: 540px){
    width:90%;
}
`;
const FontStyle = {
    '@media screen and (max-width: 1024px)':{
    
    fontSize: 22
    },
    
    '@media screen and (max-width: 850px)':{
    fontSize: 21
    
    },
    
    /* mobile 규격 */
    '@media screen and (max-width: 540px)':{
    
    fontSize: 19
    },
    /* tablet 규격 */
    '@media screen and (min-width: 1025px)':{
    
    fontSize: 24
    },
    '@media screen and (min-width: 1700px)': {
    
    fontSize: 35
    }
    };
const Area = styled.div`
display: flex;
align-items: center;
width: 100%;
border-radius: 31px;
//overflow: hidden; 
`;

const SmallWrap = styled(Area)`
//height: auto;
//margin-top:20px;

text-align: center;
  display: flex;
  align-items: center;
`;
const Wrap = styled(Area)`
text-align: center;
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const AreaInput = styled.div`
display: flex;
align-items: center;
width: 100%;
overflow: hidden; 
`;


const WrapPer = styled(AreaInput)`
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
${inputStyle};
${FontStyle};
height: 6vh;
`;

const TextareaBasic = styled.textarea`
${inputStyle};
${FontStyle};
min-height: 25vh;
height:auto;
`;
const Radius = styled.button`
padding: 20px;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
border:none;
background: #798BE6;
position: relative;
cursor: pointer;
color: white;
`;
const ButtonShort =  styled(Radius)`
height: 8.5vh; 
width:80%;
${FontStyle};
margin-bottom:20px;
&:hover {
  background:#5D6BB4;
}

      
/* tablet 규격 */
@media screen and (max-width: 1024px){
 // width:16vw;
  height: 7vh;
}
@media screen and (max-width: 850px){
    width:80%;
}
/* mobile 규격 */
@media screen and (max-width: 540px){
    width:70%;
  //width:30vw;
  height: 7vh;
}
/* s 데스크 */
@media screen and (min-width: 1025px){
    
}
/* l 데스크 */
@media screen and (min-width: 1700px){
   // width:10vw;
    height: 7vh;
}
`;

const Email  = styled.div`
${FontStyle};
width: 100%;


//overflow-wrap: break-word;
`;

const GrayFontStyle = {
    '@media screen and (max-width: 1024px)':{
    
    fontSize: 20
    },
    
    '@media screen and (max-width: 850px)':{
    fontSize: 19
    
    },
    
    /* mobile 규격 */
    '@media screen and (max-width: 540px)':{
    
    fontSize: 17
    },
    /* tablet 규격 */
    '@media screen and (min-width: 1025px)':{
    
    fontSize: 22
    },
    '@media screen and (min-width: 1700px)': {
    
    fontSize: 31
    }
    };
const Whatgray = styled.div`
${GrayFontStyle};

color:gray;
//font-weight:bold;
margin-bottom:5px;
`;

const NickNameFontStyle = {
    '@media screen and (max-width: 1024px)':{
    
    fontSize: 27
    },
    
    '@media screen and (max-width: 850px)':{
    fontSize: 26
    
    },
    
    /* mobile 규격 */
    '@media screen and (max-width: 540px)':{
    
    fontSize: 24
    },
    /* tablet 규격 */
    '@media screen and (min-width: 1025px)':{
    
    fontSize: 29
    },
    '@media screen and (min-width: 1700px)': {
    
    fontSize: 40
    }
    };

const NickName = styled.div`
${NickNameFontStyle};
color:black;
width:100%;
overflow-wrap: break-word;
`;



//1. 프로필 정보 가져오기
// 2/ 프로필 수정 완료 처리하기  
const ProfileInfo_Edit = ({ onEditComplete  }) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [career, setCareer] = useState('');
  const [user, setUser] = useState({
    nickname: '',
    introduction: '',
    career: '',
  });
  const params = useParams(); // 1
  const emailId = params.emailId; // 2
  //const [editing, setEditing] = useState(false);

  //const gotoProfileEdit = () => {
  //  setEditing(true); // 수정 모드로 전환
  //};

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      fetch('http://localhost:4001/api/user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          console.log("현재 접속중인 사용자 이메일:", data.email);
          console.log("현재 접속중인 사용자 닉네임:", data.nickname);
          // 서버로 이메일 정보를 보내어 프로필 정보를 가져옵니다.
          fetch(`http://localhost:4002/api/profile?email=${data.email}`)
            .then((response) => response.json())
            .then((profileData) => {
              setIntroduction(profileData.introduction);
              setCareer(profileData.career);
            })
            .catch((error) => {
              console.error('Error fetching profile:', error);
            });
        })
        .catch((error) => {
          console.error('Error fetching user email:', error);
        });
    }
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // 프로필 정보를 서버에 보내는 로직 
    try {
      const response = await fetch(
        'http://localhost:4002/api/profileEdit',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            introduction,
            career,
            email: user.email,
          }),
        },
      );
      if (response.ok) {
        // 서버 응답이 정상인 경우 처리
        console.log('프로필 정보 업데이트 성공');
        
         // 수정 완료 시 부모 컴포넌트에 알림!!!!!
        onEditComplete();
      } else {
        // 서버 응답이 실패한 경우 처리
        console.error('프로필 정보 업데이트 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

    return(
     <>

                <One> {/* 이름 이메일  */}
                            <SmallWrap style={{ marginBottom: 10 }}>
                            <NickName>{user.nickname}</NickName>
                            </SmallWrap>

                        <Wrap>
                            <Email>{user.email}</Email>
                        </Wrap>
                  

                </One>
                
                <Onetwo>  {/* 소개 커리어  */}

                    <div style={{display:'flex',flexDirection:'column',width:'100%',marginBottom:23}}>
                        
                        <Left >
                             <Whatgray> 소개 </Whatgray>
                        </Left>

                        <Left style={{marginTop:10 ,width:'100%'}}>
                                <WrapPer>
                                        <TextareaBasic
                                            value={introduction}
                                            onChange={(e) => setIntroduction(e.target.value)}
                                            placeholder="소개" 
                                        />
                                </WrapPer>
                        </Left>
                    </div>
                
                    <div style={{display:'flex',flexDirection:'column',width:'100%',marginBottom:23}}>
                        
                        <Left >
                             <Whatgray> 커리어 </Whatgray>
                        </Left>

                        <Left style={{marginTop:10,width:'100%'}}>
                            <WrapPer>
                                        <TextareaBasic
                                            value={career}
                                            onChange={(e) => setCareer(e.target.value)}
                                            placeholder="커리어" 
                                        />
                            </WrapPer>
                        </Left>
                    </div>
                </Onetwo>

            
            
            <ButtonShort onClick={handleSubmit}>프로필 수정 완료 </ButtonShort>
      </>
    );
};
export default ProfileInfo_Edit;