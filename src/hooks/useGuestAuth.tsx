
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GuestAuthContextType {
  isGuest: boolean;
  guestUser: User | null;
  handleGuestSuccess: (sessionId: string) => Promise<void>;
  promoteGuestToFullAccount: (password: string) => Promise<{ error: any }>;
  skipAccountCreation: () => void;
  showAccountPrompt: boolean;
}

const GuestAuthContext = createContext<GuestAuthContextType | undefined>(undefined);

export const GuestAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isGuest, setIsGuest] = useState(false);
  const [guestUser, setGuestUser] = useState<User | null>(null);
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's a guest user in localStorage
    const guestData = localStorage.getItem('guest_user_data');
    if (guestData) {
      try {
        const parsed = JSON.parse(guestData);
        setGuestUser(parsed.user);
        setIsGuest(true);
        // Show account prompt after 24 hours or on app restart
        const lastPrompt = localStorage.getItem('last_account_prompt');
        const now = Date.now();
        if (!lastPrompt || now - parseInt(lastPrompt) > 24 * 60 * 60 * 1000) {
          setShowAccountPrompt(true);
        }
      } catch (error) {
        console.error('Error parsing guest data:', error);
        localStorage.removeItem('guest_user_data');
      }
    }
  }, []);

  const handleGuestSuccess = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('handle-guest-success', {
        body: { sessionId }
      });

      if (error) throw error;

      // Store guest user data
      localStorage.setItem('guest_user_data', JSON.stringify({
        user: data.user,
        created_at: Date.now()
      }));

      setGuestUser(data.user);
      setIsGuest(true);
      setShowAccountPrompt(true);

      toast({
        title: "Welcome to ChristTask!",
        description: "Your subscription is active. You can start using the app immediately.",
      });

    } catch (error) {
      console.error('Error handling guest success:', error);
      toast({
        title: "Error processing payment",
        description: "Please contact support if you were charged.",
        variant: "destructive"
      });
    }
  };

  const promoteGuestToFullAccount = async (password: string) => {
    if (!guestUser?.email) return { error: "No guest user found" };

    try {
      // Update the user's password and remove guest status
      const { error } = await supabase.auth.updateUser({
        password: password,
        data: { is_guest: false }
      });

      if (error) throw error;

      // Clear guest data and update state
      localStorage.removeItem('guest_user_data');
      localStorage.removeItem('last_account_prompt');
      setIsGuest(false);
      setShowAccountPrompt(false);

      toast({
        title: "Account created!",
        description: "Your account has been secured. You can now sign in with your email and password.",
      });

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const skipAccountCreation = () => {
    localStorage.setItem('last_account_prompt', Date.now().toString());
    setShowAccountPrompt(false);
  };

  return (
    <GuestAuthContext.Provider value={{
      isGuest,
      guestUser,
      handleGuestSuccess,
      promoteGuestToFullAccount,
      skipAccountCreation,
      showAccountPrompt
    }}>
      {children}
    </GuestAuthContext.Provider>
  );
};

export const useGuestAuth = () => {
  const context = useContext(GuestAuthContext);
  if (context === undefined) {
    throw new Error('useGuestAuth must be used within a GuestAuthProvider');
  }
  return context;
};
