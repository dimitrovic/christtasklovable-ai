
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
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
        : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Far Left */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-lg shadow-md transition-all duration-300 ${
              isScrolled ? 'p-1' : 'p-2'
            }`}>
              <BookOpen className={`text-white transition-all duration-300 ${
                isScrolled ? 'h-3 w-3' : 'h-4 w-4'
              }`} />
            </div>
            <div>
              <h1 className={`font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-lg'
              }`}>
                FaithDefender
              </h1>
            </div>
          </div>
          
          {/* Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <a href="#home" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              Home
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              How It Works
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              Pricing
            </a>
          </nav>

          {/* Get Started Button - Far Right */}
          <div className="flex-shrink-0">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
