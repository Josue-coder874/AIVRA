import React from 'react';

interface StackHeaderProps {
  title: string;
  onBack: () => void;
  showProfile?: boolean;
}

export const StackHeader: React.FC<StackHeaderProps> = ({ title, onBack, showProfile = true }) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_12px_rgba(0,0,0,0.35)] border-b border-surface-container-high/30">
      <div className="h-16 px-3 flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <button
            aria-label="Volver"
            type="button"
            onClick={onBack}
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface hover:text-secondary hover:bg-surface-container transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <img
              alt="AIVRA Emblem Logo"
              className="h-7 w-auto object-contain opacity-90 shrink-0"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7GpdzTCEy9Zgiir2ZvSGCknJfipQgtquwfEaGOlhzZJlyAfMZF3jZRA3IEVXegD2Ph0aFyDyEXIap3h76EhXzS7EbGEchTSSGf2PrbVoW0dSn6HWR4QtiHDKm1dxIVPoENGQYqEnwYVBqjQ5UUBOeROYBE892HOjfIWRXDDnPank1EJVZ8Zc5slNEoxHHSLPbIUYNsoi7skkQR3R_pORJpnNp3M9nzTGhQDUsXt5oow_N4IIG79G7yg"
            />
            <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">
              {title}
            </h1>
          </div>
        </div>

        {showProfile && (
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex items-center justify-center">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary/40"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-06c7OhSSLqJad34-NuBQkKwZT0QlrD0NQdRM1nocvwDf0dBkfn1Yv-qQtTDuQzAZ9KpZ6kLsy7o-Z-KRbzQgPpFa3iNz2SX_69BlYdxgIx6B4IYGi5WCTMx1J6uJbCCNtvx0-cPtoEmd_UCO6XK4s_GqtKS-rnCemx48GkIcWaw0MIWX_22jhwokERKMapF2W4LnSPe5IwdDInY9rTtK3dApL3W1Jte2idJwnWLM5t5EoL14rqaAzg"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
