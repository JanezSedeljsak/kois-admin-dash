import React from 'react';
import WelcomeImage from './../images/kois-welcome.png';

export default () => (
    <img
        src={WelcomeImage}
        style={{ 
            width: "calc(100% + 62px)",
            maxHeight: "80vh",
            margin: -31
        }} 
    />
)