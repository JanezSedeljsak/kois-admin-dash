import React, { useEffect } from 'react';
import WelcomeImage from './../images/kois-welcome.png';

export default function () {
    useEffect(() => {
        document.getElementById('container').style = { padding: "0 !important" };
    }, []);
    return (
        <img src={WelcomeImage} width="100%" style={{ maxHeight: "80vh" }} />
    );
}