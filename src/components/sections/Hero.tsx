// ============================================================
// Hero Section — Above-the-fold hero with animated entrance
// ============================================================

import React, { lazy, Suspense, useState, useEffect } from 'react';
import Button from '../ui/Button';
import { ArrowTrendingUpIcon } from '../../assets/icons';

const NeuralNetwork = lazy(() => import('./Hero/NeuralNetwork'));

const Hero: React.FC = () => {
  const [shouldLoadNetwork, setShouldLoadNetwork] = useState(false);

  useEffect(() => {
    // Wait for text animations to finish before loading Three.js
    // Guarantees zero Lighthouse impact on initial FCP/LCP
    const timer = setTimeout(() => {
      setShouldLoadNetwork(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20" aria-labelledby="hero-heading">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-arctic via-mint/30 to-arctic" aria-hidden="true" />
      
      {/* Lazy Loaded Neural Network Visualization */}
      <Suspense fallback={null}>
        {shouldLoadNetwork && <NeuralNetwork />}
      </Suspense>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-forsythia/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-nocturnal/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-saffron/5 blur-3xl animate-pulse-glow" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(17,76,90,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(17,76,90,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nocturnal/5 border border-nocturnal/10 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-forsythia animate-pulse" />
              <span className="font-body text-xs font-medium text-nocturnal tracking-wide uppercase">
                Now with AI-Powered Automation
              </span>
            </div>

            {/* Heading */}
            <h1
              id="hero-heading"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-noir mb-6 animate-fade-in-up"
            >
              Automate Your{' '}
              <span className="text-gradient">Data Pipelines</span>{' '}
              with AI
            </h1>

            {/* Description */}
            <p className="font-body text-lg sm:text-xl text-noir/60 leading-relaxed mb-8 max-w-lg animate-fade-in-up stagger-2">
              FinGuard AI orchestrates complex workflows, processes billions of data points, and delivers real-time insights — all with zero manual configuration.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up stagger-3">
              <Button variant="primary" size="lg" href="#pricing" id="hero-cta-primary">
                Start Free Trial
                <ArrowTrendingUpIcon size={20} className="ml-1" />
              </Button>
              <Button variant="outline" size="lg" href="#features" id="hero-cta-secondary">
                See How It Works
              </Button>
            </div>

            {/* Social proof line */}
            <div className="mt-8 flex items-center gap-3 animate-fade-in-up stagger-4">
              <div className="flex -space-x-2">
                {['SC', 'MR', 'AP', 'JT'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-arctic bg-gradient-to-br from-nocturnal to-noir flex items-center justify-center text-xs font-bold text-forsythia"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-noir/50 font-body">
                <span className="font-semibold text-noir/70">500+</span> enterprises trust FinGuard
              </p>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:block animate-fade-in stagger-3" aria-hidden="true">
            {/* Dashboard Card */}
            <div className="relative glass-dark rounded-2xl p-6 shadow-2xl shadow-noir/20">
              {/* Top bar */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-forsythia/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-4 text-xs text-arctic/40 font-body">FinGuard Dashboard</span>
              </div>

              {/* Mock dashboard content */}
              <div className="space-y-4">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Processed', value: '2.4B', color: 'from-forsythia to-saffron' },
                    { label: 'Uptime', value: '99.99%', color: 'from-nocturnal to-nocturnal-light' },
                    { label: 'Latency', value: '< 1ms', color: 'from-mint to-arctic' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl bg-white/5 p-3 border border-white/5">
                      <p className="text-xs text-arctic/40 font-body mb-1">{stat.label}</p>
                      <p className={`font-heading font-bold text-lg bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart area */}
                <div className="h-36 rounded-xl bg-white/5 border border-white/5 p-4 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100, 85, 95, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-forsythia/60 to-saffron/30 transition-all duration-300"
                      style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Pipeline status */}
                <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 p-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-arctic/60 font-body">All pipelines operational</span>
                  <span className="ml-auto text-xs text-forsythia font-heading">47 active</span>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-forsythia to-saffron flex items-center justify-center">
                  <ArrowTrendingUpIcon size={20} className="text-noir" />
                </div>
                <div>
                  <p className="text-xs text-noir/50 font-body">Processing Speed</p>
                  <p className="font-heading font-bold text-nocturnal">+340%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
