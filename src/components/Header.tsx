
import { BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-slate-200/50 transition-all duration-300 ${
      isScrolled ? 'py-3' : 'py-8'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 rounded-2xl shadow-lg transition-all duration-300 ${
              isScrolled ? 'p-2' : 'p-4'
            }`}>
              <BookOpen className={`text-white transition-all duration-300 ${
                isScrolled ? 'h-6 w-6' : 'h-10 w-10'
              }`} />
            </div>
            <div>
              <h1 className={`font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent transition-all duration-300 ${
                isScrolled ? 'text-2xl' : 'text-4xl'
              }`}>
                Christian Apologetics
              </h1>
              <p className={`text-slate-600 transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-lg'
              }`}>
                Defending Faith with Biblical Truth
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
