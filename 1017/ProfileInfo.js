

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as S from './ProfileInfoStyle'

const ProfileInfo = ({introduction, career, email, nickname, emailId}) => {
    const [userinfo, setUserinfo] = useState([]);
    //const [introduction, setIntroduction] = useState('');
    //const [career, setCareer] = useState('');
    //const [otherUserNickname, setOtherUserNickname] = useState('');
    //const [otherUserEmail, setOtherUserEmail] = useState('');
    //const [otherIntrodution, setOtherIntrodution] = useState('');
    //const [otherCareer, setOtherCareer] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    //const params = useParams(); // 1
    //const emailId = params.emailId; // 사용자의 email

    //const isCurrentUsersProfile = userinfo.nickname === otherUserNickname;
    
    const gotoProfileEdit = () => {
        setIsEditing(true);
      };
   
    

      function DisplayText(text) { // 설명에서 \n 처리
        if (!text) {
          return null; // text가 없는 경우에 대한 처리
        }

        const lines = text.split('\n');
        return lines.map((line, index) => (
            <S.Font style={{textAlign:'left'}} key={index}>
                {line}
                {index !== lines.length - 1 && <br />}
            </S.Font>
            ));
        } 

    

    return(
        <>
                <S.One> {/* 이름 이메일  */}
                   
                        <S.Wrap style={{marginBottom:10}}>
                            <S.NickName>{nickname || ''}</S.NickName>
                        </S.Wrap>
                        
                        <S.Wrap>
                            <S.Email>{email ||' '}</S.Email> {/* 링크 복사하게끔  */}
                        </S.Wrap>
                   
                </S.One>
                
                <S.Two>   {/* 소개 커리어  */}

                    <S.InfoWrap >
                        <S.Left >
                            <S.Whatgray> 소개</S.Whatgray>
                        </S.Left>
                        <S.Left style={{marginTop:10,flexDirection:'column'}}>
                        { DisplayText(introduction) }
                        </S.Left>
                    </S.InfoWrap>
                
                    <S.InfoWrap>
                    
                        <S.Left >
                                <S.Whatgray> 커리어</S.Whatgray>
                        </S.Left>
                        <S.Left style={{marginTop:10,flexDirection:'column'}}>
                            { DisplayText(career)} 
                        </S.Left>
                    </S.InfoWrap>
                </S.Two>
        
        </>   
    );
};
export default ProfileInfo;