//import React, { useState } from 'react';
import text from '../Images/image 21.png'
import selBody from '../Images/image 22.png'
import selPet from '../Images/image 23.png'
import selWedding from '../Images/image 24.png'
import selProfile from '../Images/image 25.png'

import selFamily from '../Images/image 26.png'

import { useNavigate } from 'react-router-dom';

const Quizstart = () => {
    //const [answers, setAnswers] = useState([]);
    //const [currentQuestion, setCurrentQuestion] = useState(0);

    const navigate = useNavigate();
    
    /*
    const startquestion = [
        {
        question: '질문 1',
        options: ['body', 'pet', 'wedding', 'family', 'profile'],
        },
    ];*/

    const handleCategorySelect = (category) => {
        const queryString = new URLSearchParams({ name: category }).toString();
        navigate(`/quiztest?${queryString}`);
    };
    
    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', background: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 140 }}>
                <img style={{ width: '70%', height: 80, marginBottom: 16 }} src={text} alt='' />
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 56, marginBottom: 56 }}>
                    <img style={{ width: '70%', height: 60, marginBottom: 16 }} src={selBody} alt='' onClick={() => handleCategorySelect('body')} />
                    <img style={{ width: '70%', height: 60, marginBottom: 16 }} src={selPet} alt='' onClick={() => handleCategorySelect('pet')} />
                    <img style={{ width: '70%', height: 60, marginBottom: 16 }} src={selWedding} alt='' onClick={() => handleCategorySelect('wedding')} />
                    <img style={{ width: '70%', height: 60, marginBottom: 16 }} src={selProfile} alt='' onClick={() => handleCategorySelect('profile')} />
                    <img style={{ width: '70%', height: 60, marginBottom: 16 }} src={selFamily} alt='' onClick={() => handleCategorySelect('family')} />
                </div>
            </div>
        </div>
    );
};

export default Quizstart;