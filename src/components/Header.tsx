
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-xl shadow-md transition-all duration-300 ${
              isScrolled ? 'p-2' : 'p-3'
            }`}>
              <BookOpen className={`text-white transition-all duration-300 ${
                isScrolled ? 'h-5 w-5' : 'h-7 w-7'
              }`} />
            </div>
            <div>
              <h1 className={`font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-xl' : 'text-2xl'
              }`}>
                Christian Apologetics
              </h1>
              <p className={`text-slate-600 transition-all duration-300 ${
                isScrolled ? 'text-xs' : 'text-sm'
              }`}>
                Defending Faith with Biblical Truth
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              Features
            </a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
              Pricing
            </a>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm font-medium shadow-md">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
