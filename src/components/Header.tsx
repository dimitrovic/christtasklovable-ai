
import { BookOpen, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  onAuthAction?: (action: 'signin' | 'signup') => void;
}

export const Header = ({ onAuthAction }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You've been signed out successfully."
      });
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
      isScrolled 
        ? 'px-6 pt-6' 
        : 'px-0 pt-0'
    }`}>
      <div className={`transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-lg shadow-2xl border border-amber-500/30 py-3 rounded-full mx-auto max-w-5xl' 
          : 'bg-slate-900/60 backdrop-blur-sm border-b border-amber-500/10 py-4 w-full rounded-none'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between w-full">
            {/* Logo - Left side */}
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

            {/* Auth Section - Right side */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex items-center space-x-2 text-white/80">
                    <User className="h-4 w-4" />
                    <span className={`${isScrolled ? 'text-sm' : 'text-base'} transition-all duration-500`}>
                      {user.email}
                    </span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size={isScrolled ? "sm" : "default"}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => onAuthAction?.('signin')}
                    variant="ghost"
                    size={isScrolled ? "sm" : "default"}
                    className="text-white hover:bg-white/10 hover:text-amber-300 transition-all duration-300"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => onAuthAction?.('signup')}
                    size={isScrolled ? "sm" : "default"}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
