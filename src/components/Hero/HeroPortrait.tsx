import { useRef, useCallback } from 'react';
import './HeroPortrait.css';

export function HeroPortrait() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return (
    <div
      className="hero-portrait"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-portrait__frame">
        <div className="hero-portrait__viewport">
          <video
            ref={videoRef}
            className="hero-portrait__video"
            src="/portrait-video.mp4"
            muted
            playsInline
            loop
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}
