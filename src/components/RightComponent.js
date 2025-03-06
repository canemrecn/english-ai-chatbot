import React from 'react';

const RightComponent = () => {
    return (
        <div className="side-container">
            <img src={process.env.PUBLIC_URL + "/6.png"} alt="Right" className="side-image" />
        </div>
    );
};

export default RightComponent;
