import React from 'react';
import TerminalText from '../components/TerminalText';
import './Contact.css';

const Contact = ({ contactInfo, socialLinks }) => {
    return (
        <section className="contact" id="contact">
            <div className="section-header">
                <span className="terminal-prompt">~/naqeebali/contact$</span>
                <span className="terminal-command">./send_message.sh</span>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <h2 className="contact-title">
                        <TerminalText text={contactInfo.title} speed={50} showCursor={false} />
                    </h2>
                    <p className="contact-subtitle">{contactInfo.subtitle}</p>

                    <a href={`mailto:${contactInfo.email_address}`} className="email-link">
                        {contactInfo.email_address}
                    </a>

                    <div className="social-links">
                        {Object.entries(socialLinks).map(([platform, url], index) => {
                            if (platform === 'display' || typeof url !== 'string' || !url.startsWith('http')) return null;
                            return (
                                <a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                    aria-label={platform}
                                >
                                    <span className="platform-name">{platform}</span>
                                    <span className="link-arrow">↗</span>
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="contact-terminal">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <span className="dot red" />
                                <span className="dot yellow" />
                                <span className="dot green" />
                            </div>
                            <div className="terminal-title">bash</div>
                        </div>
                        <div className="terminal-body">
                            <p><span className="prompt">$</span> echo "Looking for opportunities? {socialLinks.display ? 'Yes' : 'No'}"</p>
                            <p className="primary-text">Looking for opportunities? Yes</p>
                            <p><span className="prompt">$</span> finger naqeebali</p>
                            <p>Login: naqeebali</p>
                            <p>Name: Naqeebali Shamsi</p>
                            <p>Directory: /home/naqeebali</p>
                            <p>Shell: /bin/bash</p>
                            <p><span className="prompt">$</span> <span className="terminal-cursor">_</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
