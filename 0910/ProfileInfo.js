

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProfileInfo_Edit from '../Component/ProfileInfo_Edit';

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
    border: 3px #3A76EF solid;
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

width:70%;
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

width:70%;
@media screen and (max-width: 850px){
    width:75%;
}
@media screen and (max-width: 540px){
    width:90%;
}
`;
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
   
const Font = styled.div`
${FontStyle};
color: black;


width: 100%;

`;

const Left = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  margin-right: auto;

  
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

const Email  = styled.div`
${FontStyle};
width: 100%;


//overflow-wrap: break-word;
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

/*


 불러오는 부분은 Lookuo_Content 참고하기 

예시,참고 ) 
ProfileLook 에서 자기 프로필일 경우 true,false 값 상태 저장하고 -> 저장한 변수  isVisible

<ProfileInfo visible={isVisible}> 

const  ProfileInfo = ({visible}) => { ,,, }

가져온 visible를 통해 ButtonShort 요소 보이게/안보이게 

 */

const ProfileInfo = () => {
    const [userinfo, setUserinfo] = useState([]);
    const [introduction, setIntroduction] = useState('');
    const [career, setCareer] = useState('');
    const [otherUserNickname, setOtherUserNickname] = useState('');
    const [otherUserEmail, setOtherUserEmail] = useState('');
    const [otherIntrodution, setOtherIntrodution] = useState('');
    const [otherCareer, setOtherCareer] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const params = useParams(); // 1
    const emailId = params.emailId; // 사용자의 email

    const isCurrentUsersProfile = userinfo.nickname === otherUserNickname;
    
    const gotoProfileEdit = () => {
        setIsEditing(true);
      };
   
    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
      
        if (accessToken) {
          // 현재 사용자 정보 가져오기
          fetch('http://localhost:4001/api/user', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accessToken }),
          })
          .then((response) => response.json())
          .then((data) => {
            setUserinfo(data);
            console.log("현재 접속중인 사용자 이메일:", data.email);
            console.log("현재 접속중인 사용자 닉네임:", data.nickname);
      
            // 프로필 정보 가져오기
            const fetchProfileData = (email) => {
              fetch(`http://localhost:4002/api/profile?email=${email}`)
                .then((response) => response.json())
                .then((profileData) => {
                  setIntroduction(profileData.introduction);
                  setCareer(profileData.career);
                })
                .catch((error) => {
                  console.error(`Error fetching profile data for ${email}:`, error);
                });
            }
      
            if (data.email !== emailId) {
              // 다른 사용자의 정보를 가져오기
              fetch(`http://localhost:4003/api/profile/${emailId}`)
                .then((response) => response.json())
                .then((profileData) => {
                  setOtherIntrodution(profileData.introduction);
                  setOtherCareer(profileData.career);
                  
      
                  // 다른 사용자의 닉네임과 이메일을 설정합니다.
                  setOtherUserNickname(profileData.nickname);
                  setOtherUserEmail(profileData.email);
      
                  // 현재 사용자의 프로필 정보 가져오기
                  fetchProfileData(data.email);
                })
                .catch((error) => {
                  console.error('Error fetching profile data for other user:', error);
                });
            } else {
              // 현재 사용자의 프로필 정보 가져오기
              fetchProfileData(data.email);
            }
          })
          .catch((error) => {
            console.error('Error fetching user email:', error);
          });
        }
      }, [emailId]);// emailId를 의존성 배열에 추가하여 URL 파라미터가 변경될 때만 실행
    

    return(
        <>
                <One> {/* 이름 이메일  */}
                   
                        <SmallWrap style={{marginBottom:10}}>
                        <NickName>{isCurrentUsersProfile ? userinfo.nickname : otherUserNickname}</NickName>
                        </SmallWrap>
                        
                        <Wrap>
                            <Email>{isCurrentUsersProfile ? userinfo.email : otherUserEmail}</Email> {/* 링크 복사하게끔  */}
                        </Wrap>
                   
                </One>
                
                <Onetwo>  {/* 소개 커리어  */}

                    <div style={{display:'flex',flexDirection:'column',width:'100%',marginBottom:23}}>
                       
                        <Left >
                            <Whatgray> 소개</Whatgray>
                        </Left>
                        <Left style={{marginTop:10}}>
                            <Font  style={{textAlign:'left'}}>{isCurrentUsersProfile ? introduction : otherIntrodution}</Font>
                        </Left>
                    </div>
                
                    <div style={{display:'flex',flexDirection:'column',width:'100%',marginBottom:23}}>
                    
                        <Left >
                                <Whatgray> 커리어</Whatgray>
                        </Left>
                        <Left style={{marginTop:10}}>
                            <Font  style={{textAlign:'left'}}> {isCurrentUsersProfile ? career : otherCareer} </Font>
                        </Left>
                    </div>
                </Onetwo>
        
        </>   
    );
};
export default ProfileInfo;