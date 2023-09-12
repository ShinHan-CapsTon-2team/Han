import styled from "styled-components";


export const DayFontStyle = {
    '@media screen and (max-width: 1024px)':{
    
    fontSize: 18
    },
    
    '@media screen and (max-width: 850px)':{
    fontSize: 17
    
    },
    
    /* mobile 규격 */
    '@media screen and (max-width: 540px)':{
    
    fontSize: 15
    },
    /* tablet 규격 */
    '@media screen and (min-width: 1025px)':{
    
    fontSize: 20
    },
    '@media screen and (min-width: 1700px)': {
    
    fontSize: 33
    }
    };
export const  At =styled.text`
color:gray;
${DayFontStyle};
`;

export const BoxRadius = styled.div`
border-radius: 31px;
        `;

export const Img = styled.img`
width: 100%;
height: 100%;
object-fit: contain;
margin-bottom: 30px;
`;

export const InLayoutOne = styled.div`
text-align:center;
width:100%;
margin-bottom:30px;

`;

export const Content = styled.div`
display: flex;
flex-direction: column;
`;

export const ContentRadius = styled.div`
padding: 20px;
word-wrap: break-word;
border-radius: 31px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

margin-top: 20px;

@media screen and (max-width: 1600px) {
    border: 3px #3A76EF solid;
    };
    
    @media screen and (max-width: 540px) {
    margin-top: 15px;
    border: 2px #3A76EF solid;
    };
    
    @media screen and (min-width: 1601px) {
    border: 4px #3A76EF solid;
    };
`;

export const ContentBasic = styled(ContentRadius)`
display: flex;
align-items: center;
`;

export const ContentTitle =styled(ContentBasic)`
flex-direction: column;
`;
export const ContentProfile =styled.div`
display: flex;`;


export const ContentImgDes = styled(ContentRadius)`
position: relative;
overflow: hidden;
text-align: center;
height:auto;
`;


export const Area = styled.div`
display: flex;
align-items: center;
width: 100%;
overflow: hidden; 
`;

export const WrapBasic = styled(Area)`
height: auto;
`;

export const ProfileImgWrap = styled.div`
display: flex;
align-items: center;
margin-right: 10px;
margin-top: 20px;
cursor: pointer;
`;

export const ProfileImg = styled.img`
width:57px;
height:57px; //+2
/* tablet 규격 */
@media screen and (max-width: 1024px){
    
}

/* mobile 규격 */
@media screen and (max-width: 540px){
    width:43px;
    height:43px;
    
}
/* s 데스크 */
@media screen and (min-width: 1025px){
    
}
/* l 데스크 */
@media screen and (min-width: 1700px){
    width:70px;
    height:70px;
}
`;

export const FontStyle = {
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
    
    fontSize: 37
    }
    };
    

export const Font = styled.div`
${FontStyle};
color: black;
`;


export const OutWrap = styled.div`
width: 100%;
height: 97.6vh;
position: relative;
background: white;
display: flex;
flex-direction: column;
align-items: center;
`;

export const InOutWrap = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

width:80%;
/* tablet 규격 */
@media screen and (max-width: 1024px){
  width:87%;
}

/* mobile 규격 */
@media screen and (max-width: 540px){
  width:95%;
  
}
/* s 데스크 */
@media screen and (min-width: 1025px){
    
}
/* l 데스크 */
@media screen and (min-width: 1700px){
  width:75%;
} 
`;

export const Center = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;

width: 87%;

`;


export const InLayoutTwo = styled.div`
display: flex;
align-items: center;

text-align:center;
width:100%;
margin-bottom:30px;
@media screen and (min-width: 1700px) {
    
    height:21vh;
};
`;

export const Buttons = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  width: 100%;
`;


export const Right = styled.div`
display: flex;
flex-direction: row;
margin-left: auto;
margin-right:10px;
`;


export const Radius = styled.button`
padding: 20px;

margin-top: 20px;

border:none;
background: #798BE6;
display: flex;
align-items: center;
justify-content: center;
position: relative;
cursor: pointer;
color: white;
word-wrap: break-word;
border-radius: 40px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;






export const ButtonLong = styled(Radius)`
    
    width:18vw;
    height: 7vh; 
    ${FontStyle};

    
    /* s 데스크 */
    @media screen and (max-width: 1024px){
        
    }
    @media screen and (max-width: 850px){
        width:21vw;
    }
    /* mobile 규격 */
    @media screen and (max-width: 680px){
        width:41vw;
        height: 7vh; 
    }

    
    /* s 데스크 */
    @media screen and (min-width: 1025px){
        
    }
    @media screen and (min-width: 1700px) {
        width:18vw;
        height: 7.5vh; 
    };
    `;

export const EditButton =styled(ButtonLong)``;
export const DelectButton=styled(ButtonLong)`
margin-left:20px;`;

