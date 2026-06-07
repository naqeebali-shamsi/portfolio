import React from 'react';
import { createPortal } from 'react-dom';
import './VideoLightbox.css';

interface VideoLightboxProps {
  /** External video URL (hosted off-site, not bundled). */
  src: string;
  /** Optional poster image URL. */
  poster?: string;
  open: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * Fullscreen video lightbox rendered via a portal to document.body so it escapes
 * the Tier 2 flip card's 3D transform context (a transformed ancestor would
 * otherwise scope `position: fixed` to the card instead of the viewport).
 */
export default function VideoLightbox({ src, poster, open, onClose, title }: VideoLightboxProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Demo video'}
      onClick={onClose}
    >
      <button type="button" className="video-lightbox__close" aria-label="Close" onClick={onClose}>
        ×
      </button>
      <div className="video-lightbox__inner" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="video-lightbox__video"
          src={src}
          poster={poster}
          controls
          autoPlay
          muted
          playsInline
          preload="metadata"
        />
      </div>
    </div>,
    document.body,
  );
}
