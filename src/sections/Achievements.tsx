import React from 'react';
import './Achievements.css';

const Achievements = ({ achievementData }) => {
    if (!achievementData.display) return null;

    return (
        <section className="achievements" id="achievements">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-neutral-100 font-sans tracking-tight">
                Achievements & Certifications
            </h2>

            <div className="achievements-grid">
                {achievementData.achievementsCards.map((cert, index) => (
                    <div key={index} className="cert-card">
                        <div className="cert-image">
                            <img src={cert.image} alt={cert.title} />
                        </div>
                        <div className="cert-content">
                            <h3>{cert.title}</h3>
                            <p>{cert.subtitle}</p>
                            <div className="cert-links">
                                {cert.footerLink.map((link, lIndex) => (
                                    <a key={lIndex} href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.name} ↗
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
