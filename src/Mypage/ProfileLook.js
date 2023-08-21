import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import Logo from "../Component/Header"
import styled from "styled-components";
import Loading from '../Component/Loading'
const SERVER_URL= 'http://localhost:4000/api/lookup';

function ProfileLook() {

    
    //const navigate = useNavigate();
    

    /* 데이터 value 넣어줄 값 
    const [board, setBoard] = useState({
        idx: 0,
        title: '',
        createdBy: '',
        contents: '',
    });
    */

    
    
    /* 처리해야 할 코드  idx => id
    const getBoard = async () => {
        const resp = await (await axios.get(`//localhost:8080/board/${idx}`)).data;
        setBoard(resp.data);
      };

      //확인 버튼 누를시 
      const updateBoard = async () => {
        await axios.patch(`//localhost:8080/board`, board).then((res) => {
          alert('수정되었습니다.');
          navigate('/board/' + idx);
        });
      };
      // 수정 완료 확인 버튼 누르고 수정한 lookup 페이지로
      const backToDetail = () => {
        navigate('/board/' + idx);
      };
    
      useEffect(() => {
        getBoard();
      }, []);

      */ 
    return (
        <OutWrap>
            <InOutWrap>
            
                {/* 홈페이지 로고 같*/}        
                <Logo />

                <Center>
                    <One>
                        <SmallWrap>
                            <Font>이름</Font>

                        </SmallWrap>
                        
                        <SmallWrap>
                            <Font>이메일</Font>

                        </SmallWrap>

                        <Left >
                            <Text> 커리어</Text>
                        </Left>
                        <SmallWrap>
                            <Font>커리어</Font>
                        </SmallWrap>

                    </One>
                    
                    <Two>

                    </Two>
                </Center>
            </InOutWrap>
        </OutWrap>

    );
}
export default ProfileLook;

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
align-items: center; 

width:100%;
//height:100%;
justify-content: space-between; //고려
`;

const ContentRadius = styled.div`
border: 3px #3A76EF solid;
padding: 20px;
word-wrap: break-word;
border-radius: 31px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

`;


const One = styled(ContentRadius)`
display: flex;
align-items: center;
width:40%;
height:auto;

flex-direction: column;

`;
const Two = styled(ContentRadius)`
display: flex;
align-items: center;
margin-left:35px;
width:60%;

height:auto;
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

const Left = styled.div`
text-align: left;
display: flex;
align-items: center;
margin-right: auto; 
`;

const Text = styled.text`
color:gray;
font-size:22px;
`;
