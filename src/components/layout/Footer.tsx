// ============================================================
// Footer — Site footer with links and branding
// ============================================================

import React from 'react';
import { NAV_LINKS } from '../../data/content';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-noir text-arctic/80 pt-16 pb-8 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forsythia to-saffron flex items-center justify-center">
                <span className="font-heading font-bold text-noir text-lg">F</span>
              </div>
              <span className="font-heading font-bold text-xl text-arctic">
                Fin<span className="text-forsythia">Guard</span>
              </span>
            </div>
            <p className="text-sm text-arctic/60 leading-relaxed max-w-xs">
              AI-powered data automation platform. Process billions of data points with intelligent workflow orchestration.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-arctic mb-4 uppercase tracking-wider">Product</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-arctic/60 hover:text-forsythia transition-colors duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-arctic mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {['About', 'Careers', 'Blog', 'Press', 'Partners'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-arctic/60 hover:text-forsythia transition-colors duration-150">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-sm text-arctic mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-arctic/60 hover:text-forsythia transition-colors duration-150">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-sm text-arctic/40">
            © {currentYear} FinGuard AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-arctic/30 font-body">
              Built with React + TypeScript + Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
