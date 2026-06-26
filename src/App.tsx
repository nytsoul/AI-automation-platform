// ============================================================
// App — Main application component
// Assembles all sections in correct order
// ============================================================

import React, { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import TrustedCompanies from './components/sections/TrustedCompanies';
import Footer from './components/layout/Footer';

// Lazy load below-fold sections for performance
const PlatformOverview = lazy(() => import('./components/sections/PlatformOverview'));
const BentoFeatures = lazy(() => import('./components/sections/BentoFeatures'));
const Workflow = lazy(() => import('./components/sections/Workflow'));
const Statistics = lazy(() => import('./components/sections/Statistics'));
const Pricing = lazy(() => import('./components/sections/Pricing'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const FinalCTA = lazy(() => import('./components/sections/FinalCTA'));

// Minimal loading fallback — prevents CLS
const SectionFallback: React.FC = () => (
  <div className="py-20 flex items-center justify-center" aria-hidden="true">
    <div className="w-8 h-8 rounded-full border-2 border-forsythia/30 border-t-forsythia animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-arctic">
      {/* Sticky navigation */}
      <Navbar />

      <main id="main-content" role="main">
        {/* Above the fold — loaded immediately */}
        <Hero />
        <TrustedCompanies />

        {/* Below the fold — lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <PlatformOverview />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <BentoFeatures />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Workflow />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Statistics />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Pricing />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FAQ />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FinalCTA />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default App;
