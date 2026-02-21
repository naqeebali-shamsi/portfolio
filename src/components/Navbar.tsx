import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SocialIcons } from './ui/social-icons';
import './Navbar.css';

const themes = [
    { id: 'matrix', name: 'Matrix', color: '#a3e635' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#f472b6' },
    { id: 'ocean', name: 'Ocean', color: '#38bdf8' },
    { id: 'sunset', name: 'Sunset', color: '#fb923c' },
    { id: 'lavender', name: 'Lavender', color: '#c084fc' },
];

const fonts = [
    'Outfit',
    'Sora',
    'Manrope',
    'Plus Jakarta Sans',
    'Bricolage Grotesque'
];

const Navbar = () => {
    const { theme, setTheme, font, setFont } = useTheme();
    const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('colors');

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <a href="#home" className="logo-link">
                        <span className="logo-prompt">{'>'}</span> naqeebali<span className="logo-dot">.</span>dev <span className="logo-cursor">_</span>
                    </a>
                </div>

                <div className={`nav-links-wrapper ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <div className="nav-links">
                        <a href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</a>
                        <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                        <a href="#blogs" onClick={() => setIsMenuOpen(false)}>Blogs</a>
                        <a href="#figma" onClick={() => setIsMenuOpen(false)}>Design</a>
                        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                    </div>
                </div>

                <div className="nav-actions">
                    <div className="social-icons-wrapper">
                        <SocialIcons />
                    </div>

                    <button
                        className="customize-trigger-link"
                        onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
                        aria-label="Toggle style customizer"
                    >
                        <span>Don't like the styles?</span>
                        <svg className={`trigger-icon ${isCustomizerOpen ? 'open' : ''}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                    </button>

                    <button
                        className={`hamburger-btn ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    {isCustomizerOpen && (
                        <div className="command-center">
                            <div className="cc-header">
                                <div className="cc-title">COMMAND CENTER</div>
                                <div className="cc-tabs">
                                    <button
                                        className={`cc-tab ${activeTab === 'colors' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('colors')}
                                    >
                                        Colors
                                    </button>
                                    <button
                                        className={`cc-tab ${activeTab === 'fonts' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('fonts')}
                                    >
                                        Fonts
                                    </button>
                                </div>
                            </div>

                            <div className="cc-body">
                                {activeTab === 'colors' ? (
                                    <div className="cc-section">
                                        <div className="cc-label">Customize. Don't like the color?</div>
                                        <div className="cc-grid themes">
                                            {themes.map((t) => (
                                                <button
                                                    key={t.id}
                                                    className={`cc-option ${theme === t.id ? 'active' : ''}`}
                                                    onClick={() => setTheme(t.id)}
                                                >
                                                    <div className="cc-dot" style={{ backgroundColor: t.color }} />
                                                    <span>{t.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="cc-section">
                                        <div className="cc-label">Don't like the font? {font}</div>
                                        <div className="cc-grid fonts">
                                            {fonts.map((f) => (
                                                <button
                                                    key={f}
                                                    className={`cc-option ${font === f ? 'active' : ''}`}
                                                    onClick={() => setFont(f)}
                                                >
                                                    <span>{f}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="cc-footer">
                                <span className="cc-hint">SELECT OPTION TO APPLY</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
