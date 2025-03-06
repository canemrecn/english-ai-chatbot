import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../public/talking-woman.gif';

const Character = ({ isSpeaking }) => {
    const animationRef = useRef();
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (isSpeaking) {
            animationRef.current?.play();
            setPlaying(true);
        } else {
            animationRef.current?.stop();
            setPlaying(false);
        }
    }, [isSpeaking]);

    return (
        <div className="character-container">
            <Lottie
                animationData={animationData}
                lottieRef={animationRef}
                autoplay={false}
                loop={true}
                className="character-animation"
            />
        </div>
    );
};

export default Character;
