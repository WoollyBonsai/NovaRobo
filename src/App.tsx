import { useEffect, useState } from 'react';
import loaderImage from './nova-robo-logo (1).png';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navItems = [
    'About Novarobo',
    'Projects',
    'Achievements',
    'Services',
    'Testimonials',
    'Contact us',
  ];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress >= 100) {
          window.clearInterval(intervalId);
          return 100;
        }

        return currentProgress + 1;
      });
    }, 40);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress >= 100 && isIframeReady) {
      setIsLoading(false);
    }
  }, [isIframeReady, progress]);

  return (
    <main className="app-shell" aria-label="Spline robot arm landing page">
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
      {isLoading ? (
        <div className="loader-overlay" aria-hidden="true">
          <img className="loader-image" src={loaderImage} alt="" />
          <div className="loader-percentage">{progress}%</div>
        </div>
      ) : null}
      <div className="spline-badge-mask" aria-hidden="true" />
    </main>
  );
}