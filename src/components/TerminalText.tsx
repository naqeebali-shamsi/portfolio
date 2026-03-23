import React from 'react';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import './TerminalText.css';

const TerminalText = ({ text, speed = 50, delay, prefix = '', showCursor = true }) => {
    const { displayText, isDone } = useTypingEffect(text, speed, delay);

    return (
        <div className="terminal-text">
            {prefix && <span className="terminal-prefix">{prefix}</span>}
            <span className="terminal-content">{displayText}</span>
            {showCursor && !isDone && <span className="terminal-cursor">_</span>}
        </div>
    );
};

export default TerminalText;
