
import { BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
      isScrolled 
        ? 'px-6 pt-6' 
        : 'px-0 pt-0'
    }`}>
      <div className={`transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-lg shadow-2xl border border-amber-500/30 py-3 rounded-full mx-auto max-w-md' 
          : 'bg-slate-900/60 backdrop-blur-sm border-b border-amber-500/10 py-4 w-full rounded-none'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center w-full">
            {/* Logo - Centered */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className={`bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 shadow-lg relative overflow-hidden transition-all duration-500 ${
                isScrolled ? 'p-2 rounded-full' : 'p-2.5 rounded-xl'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-transparent"></div>
                <BookOpen className={`text-slate-900 relative z-10 transition-all duration-500 ${
                  isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                }`} />
              </div>
              <div>
                <h1 className={`font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent transition-all duration-500 ${
                  isScrolled ? 'text-base' : 'text-xl'
                }`}>
                  ChristTask
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
