
import logo from '../Images/imagelogo.png';

import React, {useNavigate,useParams } from 'react-router-dom';
import { useEffect,useState } from 'react'


import styled from "styled-components";

const SERVER_URL= 'http://localhost:4000/api/lookup';

//const SERVER_URL= 'http://localhost:4000/api/post';

function Images_Lookup() {
    const navigate = useNavigate();
    //홈페이지 이동 
    const handleGohomeClick = () => {
        navigate('/home');
    };

    const params = useParams(); // 1
    const id = params.id; // 2
    console.log( 'params:',params);
    console.log('id:',id);

    // API로부터 받아온 데이터를 저장할 상태 변수
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    
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

    return (  
        <OutWrap>
            <InOutWrap>
            
                {/* 홈페이지 로고 같*/}        
                <LogoWrap>
                    <Logo src={logo} alt='' onClick={handleGohomeClick}/>
                </LogoWrap>
                {/* 로고 아래 */} 
                {user.map((uu)=>{
                    const imageUrl = uu.image_url; // 이미지 URL 사용
                    console.log("url:", imageUrl);

                    return(
                        <Center key={uu.id}>
                            <InLayoutOne>  
                                <Content>

                                    <One> {/*제목*/}
                                        <SmallWrap>
                                            <Font>{uu.title || 'None'}</Font>
                                        </SmallWrap>
                                    </One>

                                    <Two>{/*이름 */}
                                        <SmallWrap>
                                            <Font>{uu.name || 'None'}</Font>
                                        </SmallWrap>
                                    </Two>

                                    <Three> {/*소개 */}
                                        <ProfileWrap>
                                            <Font>{uu.profile || 'None'}</Font>
                                        </ProfileWrap>
                                    </Three>
                                                
                                    
                                    <Five>{/* 이미지 */}
                                        <BoxRadius > {/* 이미지 */}
                                            <Img src={imageUrl} alt='이미지' />
                                        </BoxRadius>
                                        
                                        <BoxRadius> {/* 설명 */}
                                            <Font>{uu.description || 'None'}</Font>
                                        </BoxRadius>
                                    </Five>

                                </Content>  
                            </InLayoutOne>  

                            
                        </Center>
                    )
                    }
                )}
            </InOutWrap>
        </OutWrap>
    );
}

export default Images_Lookup;

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
margin-bottom : 6vh;
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