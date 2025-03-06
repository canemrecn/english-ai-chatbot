import React from 'react';

const LeftComponent = () => {
    return (
        <div className="side-container">
            <img src={process.env.PUBLIC_URL + "/4.gif"} alt="Left" className="side-image" />
        </div>
    );
};

export default LeftComponent;
