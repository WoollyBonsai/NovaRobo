'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type WebsiteLoaderProps = {
  applicationReady: boolean;
};

const MIN_INTRO_DURATION = 1600; // 1.6s minimum tech intro
const MAX_FALLBACK_DURATION = 2400; // 2.4s absolute maximum timeout guarantee
const EXIT_DURATION = 650;

export default function WebsiteLoader({ applicationReady }: WebsiteLoaderProps) {
  const startedAt = useRef(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const dismissLoader = useCallback(() => {
    setIsExiting((prev) => {
      if (prev) return true;
      window.setTimeout(() => setIsVisible(false), EXIT_DURATION);
      return true;
    });
  }, []);

  useEffect(() => {
    startedAt.current = Date.now();

    // Absolute fallback: NEVER stay infinite under any condition
    const safetyTimer = window.setTimeout(() => {
      dismissLoader();
    }, MAX_FALLBACK_DURATION);

    // Keyboard listener: Escape, Enter, or Space skips loader immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        dismissLoader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dismissLoader]);

  // If applicationReady becomes true, finish after min intro duration
  useEffect(() => {
    if (!applicationReady) return;

    const elapsed = Date.now() - (startedAt.current || Date.now());
    const remaining = Math.max(MIN_INTRO_DURATION - elapsed, 0);

    const timer = window.setTimeout(() => {
      dismissLoader();
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [applicationReady, dismissLoader]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={dismissLoader}
      className={`website-loader cursor-pointer select-none${isExiting ? ' website-loader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Initializing Novarobo - Click anywhere to skip"
      title="Click anywhere to enter Nova Robo"
    >
      <div className="loader-ambient loader-ambient--top" />
      <div className="loader-ambient loader-ambient--bottom" />
      <div className="loader-grid" aria-hidden="true" />

      <div className="loader-stage">
        <div className="loader-brandmark">
          <div className="loader-logo-halo" />
          <img className="loader-logo" src="/nova-robo-logo.png" alt="Nova Robo" />
        </div>

        <div className="loader-network" aria-hidden="true">
          <svg viewBox="0 0 700 420" role="presentation">
            <g className="loader-network-lines">
              <path d="M350 210 L350 78" />
              <path d="M350 210 L196 150" />
              <path d="M350 210 L504 150" />
              <path d="M350 210 L196 270" />
              <path d="M350 210 L504 270" />
              <path className="loader-network-line--secondary" d="M196 150 L108 92" />
              <path className="loader-network-line--secondary" d="M504 150 L592 92" />
              <path className="loader-network-line--secondary" d="M196 270 L108 328" />
              <path className="loader-network-line--secondary" d="M504 270 L592 328" />
            </g>
            <g className="loader-network-pulses">
              <circle r="3"><animateMotion dur="2.8s" repeatCount="indefinite" path="M350 210 L350 78" /></circle>
              <circle r="2.5"><animateMotion dur="3.2s" begin=".8s" repeatCount="indefinite" path="M350 210 L196 150" /></circle>
              <circle r="2.5"><animateMotion dur="3.6s" begin="1.2s" repeatCount="indefinite" path="M350 210 L504 270" /></circle>
            </g>
            <g className="loader-network-nodes">
              <circle className="loader-network-node loader-network-node--core" cx="350" cy="210" r="13" />
              <circle cx="350" cy="78" r="5" />
              <circle cx="196" cy="150" r="5" />
              <circle cx="504" cy="150" r="5" />
              <circle cx="196" cy="270" r="5" />
              <circle cx="504" cy="270" r="5" />
              <circle className="loader-network-node--mobile-hidden" cx="108" cy="92" r="3.5" />
              <circle className="loader-network-node--mobile-hidden" cx="592" cy="92" r="3.5" />
              <circle className="loader-network-node--mobile-hidden" cx="108" cy="328" r="3.5" />
              <circle className="loader-network-node--mobile-hidden" cx="592" cy="328" r="3.5" />
            </g>
          </svg>
        </div>
      </div>

      <div className="loader-status" aria-hidden="true">
        <span className="loader-status-dot" />
        <span>INITIALIZING SYSTEM · CLICK TO ENTER</span>
      </div>
      <div className="loader-index" aria-hidden="true">NVB / 01</div>
    </div>
  );
}