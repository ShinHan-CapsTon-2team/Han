import React, {useNavigate,useParams } from 'react-router-dom';
import { useEffect,useState } from 'react'

import logo from '../Images/imagelogo.png'
const SERVER_URL= 'http://localhost:4000/api/lookup';

const Images_Lookup = () => {
    
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

    /*
    //정보가져오기
    function getUserList () {
    
        let reqOption = {
        method : "get",
        headers : {
            "content-type" : "application/json"
        }
        }

        fetch(`${SERVER_URL}/${id}`, reqOption).then((res) => res.json())
        .then(data => {
            //setUserData(data);
            console.log(data)});

    }
    getUserList();
   */

    /*
    // 서버로부터 데이터 가져오기
    
    useEffect(() => {
        fetch(`${SERVER_URL}/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            return res.json();
          })
          .then((data) => {
            // 데이터가 비어있는지 확인한 후 사용자 상태 변수를 설정합니다.
            if (Object.keys(data).length === 0) {
              console.log('응답이 비어있습니다.');
              // 필요한 경우 응답이 비어있을 때 처리할 내용을 추가하세요.
            } else {
              console.log(data);
              setUser(data);
            }
          })
          .catch((error) => {
            console.error('오류:', error);
          });
      }, [id]); */

   
    /*
    useEffect(() => {
        fetch(`/api/postup/${postnum}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {
                setUser(result.data);
            })
            .catch((error) => {
                console.error('Error occurred during fetch:', error);
            });
    }, [postnum]);
    
    
    const { title,description,imageurl,name,profile } = user;
    */
    /*
    const [detail,setdetail]=useState();
    
    useEffect(async ()=> { 
        fetch('api/detail') // 알아보기
        .then((response)=>response.json())
        .then((result)=> setdetail(result));
    },[]); */

    /*
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageurl, setimageurl] = useState('')
    const [name, setName] = useState('')
    const [profile, setProfile] = useState('')

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/lookup?postnum=${postnum}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // 받아온 데이터를 useState 를 이용하여 선언한다.
                setTitle(data[0].title);
                setDescription(data[0].description);
                setimageurl(data[0].imageurl);
                setName(data[0].name);
                setProfile(data[0].profile);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, [idx]);
    
    */
    //if (!user) {
      //  return <div>Loading...</div>;
      //}
    //console.log('설명',user.description)
    
    if (loading) {
        return <div>Loading...</div>;
    }

    
    return (
        
        //설명 있는 버전 
        <div style={{width: '100%', height: '100%', position: 'relative', background: 'white',marginLeft:40,}}>
        
            <div style={{ width: 496, height: 239,textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' ,marginBottom:30}}>
                <img style={{width: 354, height: 239, left: 0, top: 0, position: 'absolute'}} src={logo} alt=''  onClick={handleGohomeClick}/>
            </div>


            {user.map((uu)=>{
                // 이미지 경로 전처리 및 인코딩
                //let imageUrl = `../../../post-server/${uu.image_url.replace(/\\/g, '/')}`; //수정 필요 
                //let encodedImageUrl = encodeURI(imageUrl);
                //const imageUrl = uu.image_url
                //const encodedImageUrl = encodeURIComponent(imageUrl);
                
                //const imageUrl = decodeURIComponent(uu.image_url); // 이미지 URL 디코딩
                //console.log("url:",imageUrl);
                const imageUrl = uu.image_url; // 이미지 URL 사용
                console.log("url:", imageUrl);
                
                return(
                        <div  key={uu.id} style={{ display: 'flex',marginRight:40 }}>
                            <div style={{ width:1102 }}>

                                <div style={{  height: 'auto', opacity: 0.90, background: 'white', borderRadius: 31, border: '3px #3A76EF solid', padding: '20px', wordWrap: 'break-word'}}>
                                    <div style={{  borderRadius: 31 }}>
                                        <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', paddingLeft: '20px', paddingRight: '20px' }}>{uu.title || 'None'}</div>
                                    </div>
                                </div>


            
                                <div style={{ height: 'auto', opacity: 0.90, background: 'white', borderRadius: 31, border: '3px #3A76EF solid', marginTop: 20, marginBottom: 10, padding: '20px', wordWrap: 'break-word' }}>
                                    {/* 추가된 부분 시작 */}
                                    <div style={{  borderRadius: 31 }}>
                                        <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', paddingLeft: '20px', paddingRight: '20px' }}>{uu.description || 'None'}</div>
                                    </div>
                                    {/* 추가된 부분 끝 */}
                                </div>
        
        
                                <div style={{  height: 'auto', opacity: 0.90, background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 31, border: '3px #3A76EF solid',padding: '20px' }}>
                                    <div >
                                        <img style={{ width: '100%', height: '100%', objectFit: 'cover',marginBottom:30 }} src={imageUrl} alt='이미지' />
                                    </div>
                                    <div style={{  borderRadius: 31 }}>
                                        <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', paddingLeft: '20px', paddingRight: '20px' }}>{uu.description || 'None'}</div>
                                    </div>
                                </div>
                            </div> 
        
                            <div style={{ marginLeft: 20 }}>
                                <div style={{ width: 491, height: 'auto', opacity: 0.90, background: 'white', borderRadius: 31, border: '3px #3A76EF solid', padding: '20px', wordWrap: 'break-word' }}>
                                    <div style={{  borderRadius: 31 }}>
                                        <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', paddingLeft: '20px', paddingRight: '20px' }}>{uu.name || 'None'}</div>
                                    </div>
                                </div>
            
                                <div style={{ width: 491, height: 'auto', opacity: 0.90, background: 'white', padding: '20px', wordWrap: 'break-word', borderRadius: 31, border: '3px #3A76EF solid', marginTop: 20 }}>
                                    <div style={{  borderRadius: 31 }}>
                                        <div style={{ color: 'black', fontSize: 40, fontFamily: 'Inter', fontWeight: '400', paddingLeft: '20px', paddingRight: '20px' }}>{uu.profile || 'None'}</div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                    )
                    }

            )}
           
        </div>
    );
};

export default Images_Lookup;