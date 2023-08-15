import logo from '../Images/imagelogo.png';

import React, {useNavigate,useParams } from 'react-router-dom';
import { useEffect,useState } from 'react'

import styled from "styled-components";

const SERVER_URL= 'http://localhost:4000/api/lookup';


function Images_Button() {
    const navigate = useNavigate();
    //홈페이지 이동 
    const handleGohomeClick = () => {
        navigate('/home');
    };

    const params = useParams(); // 1
    const id = params.id; // 2
    console.log('params:',params);
    console.log('id:',id);

    // API로부터 받아온 데이터를 저장할 상태 변수
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordInputVisible, setPasswordInputVisible] = useState(false);
    const [inputPassword, setInputPassword] = useState('');
    const [editingPassword, setEditingPassword] = useState(false);
    

    const handlePasswordInputChange = (event) => {
       setInputPassword(event.target.value);
    };

    const handlePasswordEditClick = () => {
        setEditingPassword(true);
        setPasswordInputVisible(true);
    };
    
    
    // 게시글 가져오기
    useEffect(() => {
    function getUserList() {
        let reqOption = {
        method: 'get',
        headers: {
            //'content-type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        },
        };

        fetch(`${SERVER_URL}/${id}`, reqOption)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setUser(data);
            console.log('설명',data.description)
            setLoading(false); // 데이터를 가져왔으므로 로딩 상태를 false로 설정
            
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); 
        });
    }

    getUserList();
    }, [id]);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    
    // 비밀번호 서버에 보내기
    const handlePasswordConfirmation = async () => {
        try {
                const response = await fetch(`${SERVER_URL}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: inputPassword,
                }),
            });
    
            if (response.ok) {
                window.alert('비밀번호가 확인되었습니다.'); // 비밀번호 일치
                navigate(`/update/${id}`);
            } else {
                window.alert('비밀번호가 일치하지 않습니다. 다시 시도해주세요.'); // 비밀번호 불일치
                console.error('비밀번호 확인 실패');
            }
        } catch (error) {
            console.error('비밀번호 확인 에러:', error);
        }
    };


    return (  
        
        <OutWrap>
            <InOutWrap>
            
                {/* 홈페이지 로고 같*/}        
                <LogoWrap>
                    <Logo src={logo} alt='' onClick={handleGohomeClick}/>
                </LogoWrap>

                {user.map((uu)=>{
                    let imageUrl = uu.image_url; // 이미지 URL 사용
                    //console.log("url:", imageUrl);

                    return(
                        <Center key={uu.id}>
                            <InLayoutOne>  
                                <Content>

                                    <One> {/*제목*/}
                                        <SmallWrap>
                                             <Font>{uu.title || 'None'} </Font>
                                        </SmallWrap>
                                    </One>

                                    <Two>{/*이름 */}
                                        <SmallWrap>
                                            <Font>{uu.name || 'None'}</Font>   
                                        </SmallWrap>
                                    </Two>

                                    <Three> {/*소개 */}
                                        <ProfileWrap>
                                            <Font>{uu.profile || 'None'} </Font>
                                        </ProfileWrap>
                                    </Three>
                                                
                                    
                                    <Five>{/* 이미지 */}
                                        <BoxRadius > {/* 이미지 */}
                                            <Img src={imageUrl} alt='이미지' />
                                        </BoxRadius>
                                        
                                        <BoxRadius> {/* 설명 */}
                                            <Font>{uu.description || 'None'} </Font>
                                        </BoxRadius>
                                    </Five>

                                </Content>  
                            </InLayoutOne>  
                            <InLayoutTwo>
                                <Buttons>
                                    <Left>
                                       {passwordInputVisible && (
                                          <Two style={{ width: '45vh' }}>
                                            <TwoWrap>
                                                <InputSmall
                                                    type={passwordVisible ? 'text' : 'password'}
                                                    value={inputPassword}
                                                    onChange={handlePasswordInputChange}
                                                    placeholder="비밀번호 입력"
                                                />
                                               </TwoWrap>
                                            </Two>
                                         )}
                
                                        {editingPassword && (
                                            <ButtonTwo style={{ width: '10vw', marginLeft: 20 }} onClick={handlePasswordConfirmation}>
                                                <Menu>확인</Menu>
                                            </ButtonTwo>
                                        )}
                                   
                                    </Left>

                                    <Right> 
                                    <ButtonTwo onClick={handlePasswordEditClick}>
                                         <Menu>수정</Menu>
                                    </ButtonTwo>

                                        <ButtonTwo>
                                            <Menu  >
                                            삭제  </Menu>
                                        </ButtonTwo> 
                                    </Right>
                                </Buttons>

                            </InLayoutTwo>

                                    
                        </Center>
                    )
                }
            )}
            </InOutWrap>
        </OutWrap>
    );
};

export default Images_Button;

const BoxRadius = styled.div`
    border-radius: 31px;
    
        `;

const Img = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
margin-bottom: 30px;
`;

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

const Content = styled.div`
//width:65vw;
display: flex;
flex-direction: column;
`;

const ContentRadius = styled.div`
border: 3px #3A76EF solid;
padding: 20px;
word-wrap: break-word;
opacity: 0.90;
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
`;


//height: 500px;
const Five = styled(ContentRadius)`

position: relative;

overflow: hidden;
text-align: center;
height:auto;
margin-bottom : 3vh;
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


const Font = styled.div`
color: black;
font-size: 40px;
font-family: Inter;
font-weight: 400;

width: 100%;

@media screen and (max-height: 864px) {
font-size: 35px;
}
`;


const ProfileWrap = styled(Area)`
height:100%;
`;


const InLayoutTwo = styled(InLayoutOne)`
display: flex;
width:65vw;
height:19vh;
align-items: center;
//justify-content: center;

margin-bottom:30px;
@media screen and (min-width: 1700px) {
    width: 75vw;
    height:21vh;
};
`;

const Buttons = styled.div`
  text-align: center;
  display: flex;
  
  flex-direction: row;
  width: 100%;
`;

const Left = styled.div`
width: 75%;
display: flex;
align-items:center;
//justify-content: center; //
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


const TwoWrap = styled(Area)`
height: auto;

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