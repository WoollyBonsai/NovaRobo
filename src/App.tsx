'use client';

import { useEffect, useState } from 'react';
import WebsiteLoader from '../components/WebsiteLoader';

export default function App() {
  const [isIframeReady, setIsIframeReady] = useState(false);
  const navItems = [
    'About Novarobo',
    'Projects',
    'Achievements',
    'Services',
    'Testimonials',
    'Contact us',
  ];

  return (
    <main className="app-shell" aria-label="Spline robot arm landing page">
      <WebsiteLoader applicationReady={isIframeReady} />
      <nav className="site-nav" aria-label="Primary">
        <div className="site-brand">NOVAROBO</div>
        <div className="site-nav-links">
          {navItems.map((item) => (
            <a key={item} className="site-nav-link" href="#">
              {item}
            </a>
          ))}
        </div>
      </nav>
      <iframe
        className="spline-frame"
        src="https://my.spline.design/robotarm-dGeMfZX19JuyBr3QIR55NJ6g/"
        title="Spline robot arm"
        frameBorder="0"
        onLoad={() => setIsIframeReady(true)}
        allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
      />
      <div className="spline-badge-mask" aria-hidden="true" />
    </main>
  );
}