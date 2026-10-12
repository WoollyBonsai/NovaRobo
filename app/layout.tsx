import type { Metadata } from 'next';
import '../src/styles.css';
import { StoreProvider } from '../src/context/StoreContext';

export const metadata: Metadata = {
  title: 'Nova Robo — Hardware Innovation, Robotics and Automation',
  description:
    'Official brand website and e-commerce platform for Nova Robo. Discover 6-DOF precision robotic manipulators, autonomous mobile robots, electronic components store, and custom hardware engineering.',
  icons: {
    icon: '/nova-robo-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-accent selection:text-background">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}