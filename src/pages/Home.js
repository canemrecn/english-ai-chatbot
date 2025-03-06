import React from 'react';
import LeftComponent from '../components/LeftComponent';
import ChatComponent from '../components/ChatComponent';
import RightComponent from '../components/RightComponent';

const Home = () => {
    return (
        <div className="home-container">
            <div className="column left">
                <LeftComponent />
            </div>
            <div className="column center">
                <ChatComponent />
            </div>
            <div className="column right">
                <RightComponent />
            </div>
        </div>
    );
};

export default Home;

