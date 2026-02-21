import React from 'react';
import './Education.css';

const Education = ({ educationInfo }) => {
    if (!educationInfo.display) return null;

    return (
        <section className="education" id="education">
            <div className="section-header">
                <span className="terminal-prompt">~/naqeebali/edu$</span>
                <span className="terminal-command">ls -R</span>
            </div>

            <div className="education-list">
                {educationInfo.schools.map((school, index) => (
                    <div key={index} className="school-card">
                        <div className="school-header">
                            <div className="school-logo">
                                <img src={school.logo} alt={school.schoolName} />
                            </div>
                            <div className="school-info">
                                <h3>{school.schoolName}</h3>
                                <span className="degree">{school.subHeader}</span>
                                <span className="duration">{school.duration}</span>
                            </div>
                        </div>
                        <div className="school-desc">
                            <p>{school.desc}</p>
                            <ul className="desc-bullets">
                                {school.descBullets.map((bullet, bIndex) => (
                                    <li key={bIndex}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;
