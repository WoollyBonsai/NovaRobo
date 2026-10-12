'use client';

import { useState, useEffect } from 'react';
import WebsiteLoader from '../components/WebsiteLoader';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import HeroStage from './components/HeroStage';
import BrandShowcase from './components/BrandShowcase';
import CatalogueModule from './components/CatalogueModule';
import ComponentsStoreModule from './components/ComponentsStoreModule';
import NovaLabModule from './components/NovaLabModule';
import Footer from './components/Footer';

// Modals
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import CustomerAccountModal from './components/CustomerAccountModal';
import CustomProjectModal from './components/CustomProjectModal';
import SupportModal from './components/SupportModal';
import AdminDashboardModal from './components/AdminDashboardModal';

export default function App() {
  const [isIframeReady, setIsIframeReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIframeReady(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StoreProvider>
      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background font-sans relative">
        {/* Preserved Fullscreen System Loader */}
        <WebsiteLoader applicationReady={isIframeReady} />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* Hero & 3D Spline Robotic Arm Stage */}
          <HeroStage onIframeReady={() => setIsIframeReady(true)} />

          {/* Brand Showcase & Engineering Transparency */}
          <BrandShowcase />

          {/* Robotics & Automation Catalogue */}
          <CatalogueModule />

          {/* Electronic Components Store */}
          <ComponentsStoreModule />

          {/* Nova Robo Lab: Documentation & Tutorials */}
          <NovaLabModule />
        </main>

        {/* Global Hardware Footer */}
        <Footer />

        {/* Interactive Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <CustomerAccountModal />
        <CustomProjectModal />
        <SupportModal />
        <AdminDashboardModal />
      </div>
    </StoreProvider>
  );
}