import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileInfo_Edit from '../Component/ProfileInfo_Edit';
import ProfileInfo from '../Component/ProfileInfo';

import Logo from "../Component/Header"
import styled from "styled-components";

const ContentRadius = styled.div`
border: 3px #3A76EF solid;
padding: 40px;
word-wrap: break-word;
border-radius: 31px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

`;

function ProfileLook() {
    const [userinfo, setUserinfo] = useState([]);
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState([]);
    const [otherUserNickname, setOtherUserNickname] = useState('');
    const [PostIds, setPostIds] = useState('');
    const [isEditing, setIsEditing] = useState(false);

   
    const navigate = useNavigate();
    const params = useParams(); // 1
    const emailId = params.emailId; // 사용자의 email

    const isCurrentUsersProfile = userinfo.nickname === otherUserNickname;
    

    const handleImageClick = (id) => {
          navigate(`/lookup/${id}`);
      };

    const handleImagesClick = (postId) => {
        navigate(`/lookup/${postId}`);
    };

    const gotoProfileEdit = () => {
      setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false); // 수정 완료 시 isEditing을 false로 변경하여 ProfileInfo로 전환
  };

  //const toggleEditing = () => {
  //  setIsEditing(!isEditing);
  //};

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
          console.log("현재 접속중인 사용자 이메일:", data.email);
          console.log("현재 접속중인 사용자 닉네임:", data.nickname);
    
          if (data.email !== emailId) {
            // 다른 사용자의 정보를 가져오기
            fetch(`http://localhost:4003/api/profile/${emailId}`)
              .then((response) => response.json())
              .then((profileData) => {
                setImages(profileData.images);
                console.log("이미지 URL:", profileData.images); 
                setPostIds(profileData.id);
                console.log("게시글 ID:", profileData.id); 
    
              })
              .catch((error) => {
                console.error('Error fetching profile data for other user:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error fetching user email:', error);
        });
      }
    }, [emailId]);// emailId를 의존성 배열에 추가하여 URL 파라미터가 변경될 때만 실행
    
    useEffect(() => {
      async function fetchPosts() {
        try {
          const response = await fetch('http://localhost:4000/api/lookup');
          const data = await response.json();
  
          // 현재 사용자의 이메일과 일치하는 데이터만 필터링
          const filteredData = data.filter(item => item.email === userinfo.email);
          setPosts(filteredData);
          
          console.log("Filtered data:", filteredData);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
      fetchPosts();
    }, [userinfo]);

    return (
        <OutWrap>
            <InOutWrap>
            
                {/* 홈페이지 로고 같*/}        
                <Logo />

                <Center>
                  <ProfileWrap>
                   
                      
                        {isEditing ? (
                          <ProfileInfo_Edit onEditComplete={handleEditComplete}/>
                        ) : (
                          <><ProfileInfo /><ButtonShort onClick={gotoProfileEdit}>프로필 수정</ButtonShort></>
                        )}

                        
  
                     
                </ProfileWrap>

                    <div style={{width:'75%'}}>
                    <Two>
                        <>
                        {isCurrentUsersProfile ? (
                         // 현재 사용자의 프로필을 보고 있다면 post를 렌더링합니다.
                         <GridWrap>
                          {posts.map((post, index) => (
                            <GridDiv key={index}>
                              <GridImg src={post.image_url} onClick={() => handleImageClick(post.id)} alt="사진"/>
                            </GridDiv>
                          ))}
                       </GridWrap>
                      ) : (
                      // 다른 사용자의 프로필을 보고 있다면 images를 렌더링합니다.
                      <GridWrap>
                        {images.map((image, index) => (
                         <GridDiv key={index}>
                            <GridImg src={image} onClick={() => handleImagesClick(PostIds[index])}  alt="사진" />
                            
                         </GridDiv>
                        ))}
                      </GridWrap>
                      )}
                        </>
                    </Two>

                    </div>
                    
                </Center>
            </InOutWrap>
        </OutWrap>

    );
}
export default ProfileLook;


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


const Radius = styled.button`
//border: 3px #3A76EF solid;

padding: 20px;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//margin-top: 20px;
border:none;
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

  const ButtonShort =  styled(Radius)`
  background: #798BE6;
width:17vw;
height: 8.5vh; 
margin-left:20px;
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;

position: relative;
cursor: pointer;
color: white;

font-size:25px;
margin-top:20px;
&:hover {
  background:#5D6BB4;
}

      
/* tablet 규격 */
@media screen and (max-width: 1023px){
  width:16vw;
  height: 7vh;
}

/* mobile 규격 */
@media screen and (max-width: 540px){
  width:30vw;
  height: 7vh;
}
/* s 데스크 */
@media screen and (min-width: 1024px){
    
}
/* l 데스크 */
@media screen and (min-width: 1700px){
    width:10vw;
    height: 7vh;
}
`;



const GridWrap = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(5, 1fr);
gap: 10px;
//width: 75%;
height: auto;
//min-height:80vh;
//padding: 20px;
//margin-top:20px;


/* tablet 규격 */
@media screen and (max-width: 1023px){
  width: 90%;
}

/* mobile 규격 */
@media screen and (max-width: 540px){
  width: 93%;
  gap: 5px;
  
}
/* s 데스크 */
@media screen and (min-width: 1024px){
    
}
/* l 데스크 */
@media screen and (min-width: 1700px){
    
}
`;

const GridDiv = styled.div`
  width: 100%;
  height: 36vh;
  border-radius: 10px;
  overflow: hidden;

  /* tablet 규격 */
  @media screen and (max-width: 1023px){
    height: 26vh;
  }

  /* mobile 규격 */
  @media screen and (max-width: 540px){
    height: 26vh;
  }
  /* s 데스크 */
  @media screen and (min-width: 1024px){
      
  }
  /* l 데스크 */
  @media screen and (min-width: 1700px){
      
  }
`;

const GridImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px; 
  object-fit: cover;
`;

const PaginationWrap = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
`;


const OutWrap = styled.div`
width: 100%;
height: 100vh;

position: relative;

background: white;

display: flex;
flex-direction: column;
// justify-content: center;
align-items: center;


`;

const InOutWrap = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

width:85%
//height:90%;
`;


const Center = styled.div`
text-align: center;
display: flex;
flex-direction: row;
//align-items: center; 

width:100%;
//height:100%;
justify-content: space-between; //고려

margin-bottom:30px;
`;




const One = styled(ContentRadius)`
display: flex;
align-items: center;
//width:25%;
height:auto;
min-height:50vh;
flex-direction: column;

`;
const Two = styled(ContentRadius)`
display: flex;
align-items: center;
margin-left:25px;
//width:75%;

height:auto;
min-height:65vh;
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
margin-top:20px;

`;
const Wrap = styled(Area)`
height: auto;


`;
const FontStyle= {
    fontSize: 30,

    /* mobile 규격 */
  '@media screen and (max-width: 540px)':
    {
        fontSize: 27,
  },
  '@media screen and (min-width: 1700px)': {
    
        fontSize: 45,
    },
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

const Text = styled.text`
color:gray;
font-size:22px;
`;