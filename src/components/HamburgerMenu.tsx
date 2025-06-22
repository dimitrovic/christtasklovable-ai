import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Home, 
  MessageSquare, 
  BookOpen, 
  DollarSign, 
  Info, 
  Mail,
  ChevronRight
} from "lucide-react";

interface HamburgerMenuProps {
  onAuthAction: (action: 'signin' | 'signup') => void;
}

export const HamburgerMenu = ({ onAuthAction }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when pressing Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleMenuItemClick = (action: string) => {
    setIsOpen(false);
    
    switch (action) {
      case 'home':
        navigate('/');
        break;
      case 'chat':
        navigate('/payment');
        break;
      case 'resources':
        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
          resourcesSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'pricing':
        navigate('/payment');
        break;
      case 'about':
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 'contact':
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { icon: Home, label: 'Home', action: 'home' },
    { icon: MessageSquare, label: 'Chat with AI', action: 'chat' },
    { icon: BookOpen, label: 'Resources', action: 'resources' },
    { icon: DollarSign, label: 'Pricing', action: 'pricing' },
    { icon: Info, label: 'About', action: 'about' },
    { icon: Mail, label: 'Contact', action: 'contact' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Hamburger Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="relative z-50 p-2 text-white hover:bg-white/10 transition-all duration-300"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute top-0 left-0 w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
            }`}
          />
          <span
            className={`absolute top-2 left-0 w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute top-4 left-0 w-6 h-0.5 bg-white transform transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2.5' : 'translate-y-0'
            }`}
          />
        </div>
      </Button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-blue-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
            <h2 className="text-xl font-bold text-white">Menu</h2>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.action}
              onClick={() => handleMenuItemClick(item.action)}
              className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-white/10 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>

        {/* Auth Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-white/5">
          <div className="space-y-3">
            <Button
              onClick={() => {
                setIsOpen(false);
                onAuthAction('signin');
              }}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                onAuthAction('signup');
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 