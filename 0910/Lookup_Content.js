
import styled from "styled-components";
import  {useNavigate,useParams } from 'react-router-dom';
import profilelogo from '../Images/profileimg.png'
import React, { useState } from 'react';

const Lookup_Content =({ title, nickname, imageurl, description, created_at}) => {

    //page 이동 
    const navigate = useNavigate();
    //const { id } = useParams();
    const [otherUser, setOtherUser] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams(); // 1
    const id = params.id; // 2
    const [Nickname, setNickname] = useState('');

    const handleGoProfile = async () => {
        try {
          setLoading(true);
      
          // POST 요청으로 서버에 데이터를 보냅니다.
          const requestBody = { id: id }; // 수정해야 할 게시글 ID
          const response = await fetch(`http://localhost:4003/api/profiles/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const data = await response.json();
          const userEmailFromServer = data.userEmail; // 서버에서 받은 이메일
          const userNinameServer=data.nickname;
          setOtherUser(data);
          setLoading(false);
          console.log(userEmailFromServer);
          console.log(userNinameServer);

          // 이메일 아이디 추출 (이메일에서 "@" 이후의 부분을 제외)
          const emailId = userEmailFromServer.split('@')[0];
          setNickname(userNinameServer); // 작성자의 닉네임을 설정
            
          // 여기서 navigate 함수 호출
          navigate(`/profile/${emailId}`);
          

        } catch (error) {
          console.error('Error fetching user profile:', error);
          console.log('error');
          setLoading(false);
        }
      };
      

    //const handleGoProfile = () => {
    //    navigate(`/profile/${userId}`); // 가져온 id(해당 게시글 작성자의 식별번호)
    //};

    return (
        <InLayoutOne>  
            <Content>
                <ContentTitle key={id}> {/*제목*/}
                    <WrapBasic>
                        <Font> {title || 'none'} </Font>
                    </WrapBasic>

                    <WrapBasic> {/* 날짜 */}
                        <At>{created_at || 'none'}</At>
                    </WrapBasic>
                </ContentTitle>

                <ContentProfile> {/* 이름 */}
                    <ProfileImgWrap > 
                        <ProfileImg src={profilelogo} onClick={handleGoProfile} />
                    </ProfileImgWrap>
                    <ContentBasic  style={{flex:1}}>{/*이름 */}
                        <WrapBasic>
                            <Font>{nickname || 'none'}</Font>
                        </WrapBasic>
                    </ContentBasic>
                </ContentProfile>

                <ContentImgDes>{/* 이미지/설명 */}
                    <BoxRadius > {/* 이미지 */}
                        <Img src={imageurl} alt='이미지' />
                    </BoxRadius>
                    
                    <BoxRadius> {/* 설명 */}
                        <Font>{description || 'none'}</Font>
                    </BoxRadius>
                </ContentImgDes>
                
            </Content>  
        </InLayoutOne> 

    );
}; 
export default Lookup_Content;


const At =styled.div`
    color:gray;
    font-size:20px;`
    const BoxRadius = styled.div`
        border-radius: 31px;
        
            `;

    const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-bottom: 30px;
    `;

    const InLayoutOne = styled.div`
    text-align:center;
    width:65vw;
    margin-bottom:30px;
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
        width: 75vw;
    }
    `;

    const Content = styled.div`
    display: flex;
    flex-direction: column;
    `;

    const ContentRadius = styled.div`
    border: 3px #3A76EF solid;
    padding: 20px;
    word-wrap: break-word;
    //opacity: 0.90;
    border-radius: 31px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    margin-top: 20px;

    @media screen and (min-height: 900px) {
        margin-top: 30px;
        border: 4px #3A76EF solid;
    };
    `;

    const ContentBasic = styled(ContentRadius)`
    display: flex;
    align-items: center;
    `;
    
    const ContentTitle =styled(ContentBasic)`
    flex-direction: column;
    `;
    const ContentProfile =styled.div`display: flex;`;


    const ContentImgDes = styled(ContentRadius)`
    position: relative;
    overflow: hidden;
    text-align: center;
    height:auto;
    `;


    const Area = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    //border-radius: 31px;
    overflow: hidden; 
    `;

    const WrapBasic = styled(Area)`
    height: auto;
    `;

    const ProfileImgWrap = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;
    margin-top: 20px;
    cursor: pointer;
    `;

    const ProfileImg = styled.img`
    width: 95px;
    height: 95px;
    `;

    const FontStyle= {
        fontSize: 33,

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
    //width: 100%;
    `;