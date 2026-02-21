import React, { useEffect, useState } from 'react';
import './Background.css';

const Background = () => {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="background-wrapper">
            <div className="noise-overlay" />
            <div
                className="binary-pattern"
                style={{ transform: `translateY(${scrollPos * 0.2}px)` }}
            />
            <div className="viewport-glow" />
        </div>
    );
};

export default Background;
