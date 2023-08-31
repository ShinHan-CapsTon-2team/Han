
import { useNavigate  } from 'react-router-dom';
import styled from 'styled-components';

const ContentRadius = styled.div`
border: 3px #3A76EF solid;
padding: 40px;
word-wrap: break-word;
border-radius: 31px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

`;


const One = styled(ContentRadius)`
display: flex;
align-items: center;
//width:25%;
height:15vh;
//min-height:50vh;
flex-direction: column;
margin-bottom:20px;

`;

const Onetwo = styled(ContentRadius)`
display: flex;
align-items: center;
//width:25%;
height:auto;
min-height:50vh;
flex-direction: column;

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
    fontSize: 27.5,

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

const Radius = styled.button`
//border: 3px #3A76EF solid;

padding: 20px;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

//margin-top: 20px;
border:none;
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
/*


 불러오는 부분은 Lookuo_Content 참고하기 

예시,참고 ) 
ProfileLook 에서 자기 프로필일 경우 true,false 값 상태 저장하고 -> 저장한 변수  isVisible

<ProfileInfo visible={isVisible}> 

const  ProfileInfo = ({visible}) => { ,,, }

가져온 visible를 통해 ButtonShort 요소 보이게/안보이게 

 */
const ProfileInfo = () => {
    const navigate = useNavigate();

    const gotoProfileEdit = () => {
        navigate('/profileEdit');
      };
    

    return(
        <div style={{width:'25%'}}>
            <div >
                <One> {/* 이름 이메일  */}
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'end',height:'20vh',marginBottom:20}}>
                        <SmallWrap style={{marginBottom:10}}>
                            <div style={{fontSize:30,color:'black',width:'100%'}}>김또잉</div>

                        </SmallWrap>
                        
                        <Wrap>
                            <text style={{fontSize:25,  }}>ddoing@gmail.com</text> {/* 링크 복사하게끔  */}

                        </Wrap>
                    </div>

                </One>
                
                <Onetwo>  {/* 소개 커리어  */}

                    <div style={{display:'flex',flexDirection:'column',width:'100%',marginBottom:23}}>
                        <div
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    //borderBottom: "2px solid #aaa",
                                    //lineHeight: "0.1em",
                                    //margin: "10px 0 10px",
                                }}
                                />
                        <Left >
                            <div style={{fontSize:25,color:'gray'}}> 소개</div>
                        </Left>
                        <Left style={{marginTop:10}}>
                            <Font  style={{textAlign:'left'}}>안녕 나는 000. 햄버거가 먹고싶다. </Font>
                        </Left>
                    </div>
                
                    <div style={{display:'flex',flexDirection:'column',width:'100%',marginBottom:23}}>
                        <div
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    //borderBottom: "2px solid #aaa",
                                    //lineHeight: "0.1em",
                                    //margin: "10px 0 10px",
                                }}
                                />
                        <Left >
                            <div style={{fontSize:25,color:'gray'}}> 커리어</div>
                        </Left>
                        <Left style={{marginTop:10}}>
                            <Font  style={{textAlign:'left'}}> 4학년이고 하라는 거 다 잘못해요 그니깐 아무것도 시키지마 </Font>
                        </Left>
                    </div>
                </Onetwo>

            </div>
            <ButtonShort >프로필 수정</ButtonShort>
        </div>

    );
};
export default ProfileInfo;