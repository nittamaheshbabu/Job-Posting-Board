import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Welcome to the Home Screen!</h1>

            {/* Create Interview Button */}
            <button className="create-interview-btn" onClick={() => {
                navigate('/create-job');
            }}>
                Create Interview
            </button>
        </div>
    );
};

export default HomeScreen;