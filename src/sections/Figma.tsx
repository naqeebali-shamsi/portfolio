import React from 'react';
import './Figma.css';

const Figma = ({ figmaData }) => {
    if (!figmaData.display) return null;

    return (
        <section className="figma" id="figma">
            <div className="section-header">
                <span className="terminal-prompt">~/naqeebali/design$</span>
                <span className="terminal-command">open design_portfolio.fig</span>
            </div>

            <div className="figma-grid">
                {figmaData.prototypes.map((design, index) => (
                    <div key={index} className="figma-card">
                        <div className="figma-icon-grid">
                            <div className="figma-dot" />
                            <div className="figma-dot" />
                            <div className="figma-dot" />
                            <div className="figma-dot" />
                        </div>
                        <div className="figma-content">
                            <h3>{design.title}</h3>
                            <p>{design.subtitle}</p>
                            <a href={design.url} target="_blank" rel="noopener noreferrer" className="figma-button">
                                View Prototype
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Figma;
