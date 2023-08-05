import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './homepage.css';
import logo from '../Images/imagelogo.png';
import family from '../Images/family.png';
import pet from '../Images/pet.png';
import profile from '../Images/profile.png';
import wedding from '../Images/wedding.png';
import body from '../Images/body.png';


const Homepage = () => {
  const [currentPage, setCurrentPage] = useState('');

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    setCurrentPage(category);
  }, [location.search]);

  const handleCategoryClick = (category) => {
    const searchParams = new URLSearchParams();
    searchParams.set('category', category);
    const search = searchParams.toString();
    window.location.href = `/?${search}`; // 수정
  };

  return (
    <div>
      
      <div className="image-container">
        <img
          className={`category-image ${currentPage === 'family' ? 'active' : ''}`}
          src={currentPage === 'family' ? family : family}
          alt="Family"
          onClick={() => handleCategoryClick('family')}
        />
        <img
          className={`category-image ${currentPage === 'pet' ? 'active' : ''}`}
          src={currentPage === 'pet' ? pet : pet}
          alt="Pet"
          onClick={() => handleCategoryClick('pet')}
        />
        <img
          className={`category-image ${currentPage === 'profile' ? 'active' : ''}`}
          src={currentPage === 'profile' ? profile : profile}
          alt="Profile"
          onClick={() => handleCategoryClick('profile')}
        />
        <img
          className={`category-image ${currentPage === 'wedding' ? 'active' : ''}`}
          src={currentPage === 'wedding' ? wedding : wedding}
          alt="Wedding"
          onClick={() => handleCategoryClick('wedding')}
        />
        <img
          className={`category-image ${currentPage === 'body' ? 'active' : ''}`}
          src={currentPage === 'body' ? body : body}
          alt="Body"
          onClick={() => handleCategoryClick('body')}
        />
      </div>

      <div className="Rectangle1" />
      <div className="Rectangle2" />
      <div className="Rectangle3" />

      <div>
        {/* 라우팅된 컴포넌트 */}
      </div>
    </div>
  );
};

export default Homepage;
