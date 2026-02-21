import React from 'react';
import './About.css';

const About = ({ education, work, stats, skills }) => {
    return (
        <section className="about" id="about">
            <div className="section-header">
                <span className="terminal-prompt">~/naqeebali/about$</span>
                <span className="terminal-command">cat info.md</span>
            </div>

            <div className="about-grid">
                <div className="about-main">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <span className="dot red" />
                                <span className="dot yellow" />
                                <span className="dot green" />
                            </div>
                            <div className="terminal-title">interests.exe</div>
                        </div>
                        <div className="terminal-body">
                            <p className="typed-line"><span className="line-num">1</span> # Interests</p>
                            <p className="typed-line"><span className="line-num">2</span> I'm a versatile Full Stack Developer committed to Mastering Diverse Tech Stacks.</p>
                            <p className="typed-line"><span className="line-num">3</span> Architecting highly scalable, robust full-stack applications optimized for performance.</p>
                            <p className="typed-line"><span className="line-num">4</span> Actively applying theoretical knowledge to practical, real-world problems.</p>
                        </div>
                    </div>

                    <div className="character-stats">
                        <h3 className="section-title">Character Stats</h3>
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-row">
                                <div className="stat-label">
                                    <span>{stat.Stack}</span>
                                    <span>{stat.progressPercentage}</span>
                                </div>
                                <div className="stat-bar-bg">
                                    <div
                                        className="stat-bar-fill"
                                        style={{ width: stat.progressPercentage }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="about-gaming">
                    <div className="gaming-stats">
                        <h3 className="section-title">Board Games</h3>
                        <div className="terminal-window" style={{ marginBottom: '2rem' }}>
                            <div className="terminal-header">
                                <div className="terminal-title">boardgames.db</div>
                            </div>
                            <div className="terminal-body" style={{ padding: '0' }}>
                                <table className="stats-table">
                                    <thead>
                                        <tr>
                                            <th>Game</th>
                                            <th>Rating</th>
                                            <th>Plays</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Terraforming Mars</td>
                                            <td style={{ color: 'var(--primary)' }}>9.5</td>
                                            <td>42</td>
                                        </tr>
                                        <tr>
                                            <td>Spirit Island</td>
                                            <td style={{ color: 'var(--primary)' }}>9.0</td>
                                            <td>28</td>
                                        </tr>
                                        <tr>
                                            <td>Gloomhaven</td>
                                            <td style={{ color: 'var(--primary)' }}>8.8</td>
                                            <td>115</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <h3 className="section-title">Mountain Biking</h3>
                        <div className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-title">trails.gpx</div>
                            </div>
                            <div className="terminal-body" style={{ padding: '0' }}>
                                <table className="stats-table">
                                    <thead>
                                        <tr>
                                            <th>Trail</th>
                                            <th>Location</th>
                                            <th>Diff</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Rideau Trail</td>
                                            <td>Ontario</td>
                                            <td style={{ color: '#ff5f56' }}>Hard</td>
                                        </tr>
                                        <tr>
                                            <td>McIntosh Run</td>
                                            <td>Halifax</td>
                                            <td style={{ color: '#ffbd2e' }}>Medium</td>
                                        </tr>
                                        <tr>
                                            <td>Whopper Drop</td>
                                            <td>Halifax</td>
                                            <td style={{ color: '#ff5f56' }}>Hard</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
