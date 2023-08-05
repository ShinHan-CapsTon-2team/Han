import fit_image from '../Images/fit_image.png';
import go_homepage from '../Images/go_homepage.png';
import want_image from '../Images/want_image.png';

import { useNavigate } from 'react-router-dom';

import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  const handleWantImageClick = () => {
    navigate('/reco');
  };
  const handleFitImageClick = () => {
    navigate('/quizindex');
  };

    const handleGoHomeClick = () => {
      navigate('/home');
    };

  return (
    <div className="App">
      <div className="container">
       {/*  <img className="logo" src={imagelogo} alt="" /> */}
        <div className="line"></div>
          <img className="image" src={want_image} alt="" onClick={handleWantImageClick}  />
          <img className="image" src={fit_image} alt="" onClick={handleFitImageClick} />
          <img className="image" src={go_homepage} alt="" onClick={handleGoHomeClick} />
      </div>
    </div>
  );
}

export default Landing;
