import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './recommend.css';
//import logo from '../Images/imagelogo.png';

import logo from '../Images/imagelogo.png';
import upload from '../Images/upload.png';
import file from '../Images/image_6.png';
import result from '../Images/image_5.png';
import styled from "styled-components";

const Logo = styled.img`
      width: 55%;
      height: 174px;
      margin-top: 20px;
      margin-bottom: 20px;
      object-fit: contain;
  `;

function Recommend() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

   //홈페이지 이동 
   const handleGohomeClick = () => {
    navigate('/home');
};

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 800;
        const maxHeight = 800;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const resizedImageSrc = canvas.toDataURL('image/jpeg');

        setSelectedFile(file);
        setImageSrc(resizedImageSrc);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileButtonClick = () => {
    const fileInput = document.getElementById('file-upload');
    fileInput.click();
  };

  const handleImageUploadAndNavigate = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://example.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // 이미지 업로드 성공
        console.log('Image upload success!');
        
        // 업로드가 완료된 후 다른 페이지로 이동
        navigate('/other-page');
      } else {
        // 이미지 업로드 실패
        console.error('Image upload failed:', response.status);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  return (
    <div>
     <Logo src={logo} alt='' onClick={handleGohomeClick}/>
     
      <div className="Rectangle17" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {selectedFile && <img className="selected-image" src={imageSrc} alt="Selected File" />}
      </div>
      {!selectedFile && (
        <label className="upload-label" htmlFor="file-upload">
          <img className="upload" src={upload} alt="up" />
        </label>
      )}
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {!selectedFile && (
        <img className="files" src={file} alt="file" onClick={handleFileButtonClick} />
      )}
      

      <Link to="/quizresult">
        <img className="results" src={result} alt="result" onClick={handleImageUploadAndNavigate} />
      </Link>
    </div>
  );
}

export default Recommend;
