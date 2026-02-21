import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onComplete }) => {
    const [percent, setPercent] = useState(0);
    const [status, setStatus] = useState('Initializing portfolio...');

    const messages = [
        'Loading design tokens...',
        'Fetching project data...',
        'Establishing secure connection...',
        'Compiling assets...',
        'Ready.'
    ];

    useEffect(() => {
        let currentPercent = 0;
        const interval = setInterval(() => {
            currentPercent += Math.floor(Math.random() * 5) + 1;
            if (currentPercent >= 100) {
                currentPercent = 100;
                clearInterval(interval);
                setTimeout(onComplete, 500);
            }
            setPercent(currentPercent);

            const msgIndex = Math.min(
                Math.floor((currentPercent / 100) * messages.length),
                messages.length - 1
            );
            setStatus(messages[msgIndex]);
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="loading-screen">
            <div className="loading-content">
                <div className="terminal-prompt">
                    <span className="prompt-symbol">{'>'}</span> {status}
                </div>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${percent}%` }} />
                </div>
                <div className="percent-text">{percent}%</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
