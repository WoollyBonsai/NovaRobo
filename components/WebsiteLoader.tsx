'use client';

import { useEffect, useRef, useState } from 'react';

type WebsiteLoaderProps = {
  applicationReady: boolean;
};

const MINIMUM_DURATION = 8200;
const EXIT_DURATION = 850;

export default function WebsiteLoader({ applicationReady }: WebsiteLoaderProps) {
  const startedAt = useRef(Date.now());
  const [assetsReady, setAssetsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const logo = new Image();
    logo.src = '/nova-robo-logo.png';

    Promise.all([
      logo.decode().catch(() => undefined),
      document.fonts?.ready ?? Promise.resolve(),
    ]).then(() => {
      if (isMounted) {
        setAssetsReady(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!assetsReady || !applicationReady) {
      return;
    }

    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(MINIMUM_DURATION - elapsed, 0);
    const completeTimer = window.setTimeout(() => {
      setIsExiting(true);
      window.setTimeout(() => setIsVisible(false), EXIT_DURATION);
    }, remaining);

    return () => window.clearTimeout(completeTimer);
  }, [applicationReady, assetsReady]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`website-loader${isExiting ? ' website-loader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Initializing Novarobo"
    >
      <div className="loader-ambient loader-ambient--top" />
      <div className="loader-ambient loader-ambient--bottom" />
      <div className="loader-grid" aria-hidden="true" />

      <div className="loader-stage">
        <div className="loader-brandmark">
          <div className="loader-logo-halo" />
          <img className="loader-logo" src="/nova-robo-logo.png" alt="" />
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
        <span>INITIALIZING SYSTEM</span>
      </div>
      <div className="loader-index" aria-hidden="true">NVB / 01</div>
    </div>
  );
}