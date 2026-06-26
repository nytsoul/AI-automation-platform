// ============================================================
// Navbar — Sticky navigation with mobile menu
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';
import { NAV_LINKS } from '../../data/content';
import { XMarkIcon } from '../../assets/icons';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const closeMobile = useCallback(() => setIsMobileOpen(false), []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 var(--ease-apple)
        ${isScrolled
          ? 'glass shadow-sm border-b border-white/20 py-3'
          : 'bg-transparent py-5'
        }
      `}
      role="banner"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="AetherFlow AI Home">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forsythia to-saffron flex items-center justify-center transition-transform duration-200 ease-out group-hover:scale-105">
            <span className="font-heading font-bold text-noir text-lg">A</span>
          </div>
          <span className="font-heading font-bold text-xl text-noir">
            Aether<span className="text-nocturnal">Flow</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8" role="menubar">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-body text-sm font-medium text-noir/70 hover:text-nocturnal transition-colors duration-300 var(--ease-apple) relative after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-forsythia after:opacity-0 hover:after:w-full hover:after:opacity-100 after:transition-all after:duration-300 after:var(--ease-apple)"
              role="menuitem"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" href="#pricing">
            Log In
          </Button>
          <Button variant="primary" size="sm" href="#pricing">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-noir/5 transition-colors duration-150"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-noir transition-all duration-300 origin-center ${isMobileOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`w-full h-0.5 bg-noir transition-all duration-200 ${isMobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`w-full h-0.5 bg-noir transition-all duration-300 origin-center ${isMobileOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          md:hidden fixed inset-0 top-0 bg-arctic z-40
          transition-all duration-400 ease-in-out
          ${isMobileOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Close button */}
          <button
            onClick={closeMobile}
            className="absolute top-5 right-5 p-2 rounded-lg hover:bg-noir/5 transition-colors duration-150"
            aria-label="Close menu"
          >
            <XMarkIcon size={24} className="text-noir" />
          </button>

          {/* Mobile Links */}
          <div className="flex flex-col gap-2 mt-4">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="font-heading text-2xl font-semibold text-noir py-3 border-b border-noir/10 hover:text-nocturnal transition-colors duration-150"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div className="mt-auto pb-8 flex flex-col gap-3">
            <Button variant="primary" size="lg" href="#pricing" onClick={closeMobile} className="w-full">
              Get Started
            </Button>
            <Button variant="outline" size="lg" href="#pricing" onClick={closeMobile} className="w-full">
              Log In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Navbar);
