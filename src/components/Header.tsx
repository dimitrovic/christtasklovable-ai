
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
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-amber-500/20 py-2' 
        : 'bg-slate-900/90 backdrop-blur-sm border-b border-amber-500/10 py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center w-full">
          {/* Logo - Centered */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className={`bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl shadow-xl relative overflow-hidden transition-all duration-300 ${
              isScrolled ? 'p-2' : 'p-3'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/20 to-transparent"></div>
              <BookOpen className={`text-slate-900 relative z-10 transition-all duration-300 ${
                isScrolled ? 'h-4 w-4' : 'h-6 w-6'
              }`} />
            </div>
            <div>
              <h1 className={`font-bold bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-2xl'
              }`}>
                ChristTask
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
