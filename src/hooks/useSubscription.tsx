import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionContextType {
  subscribed: boolean;
  subscriptionTier: string | null;
  subscriptionEnd: string | null;
  loading: boolean;
  checkSubscription: () => Promise<void>;
  createCheckout: (plan?: 'weekly' | 'monthly') => Promise<void>;
  openCustomerPortal: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  // Temporarily set subscribed to true for testing
  const [subscribed, setSubscribed] = useState(true);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>('Premium');
  const [subscriptionEnd, setSubscriptionEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, session } = useAuth();
  const { toast } = useToast();

  const checkSubscription = async () => {
    // Temporarily return early with subscription active for testing
    setLoading(false);
    return;

    if (!user || !session) {
      setSubscribed(false);
      setSubscriptionTier(null);
      setSubscriptionEnd(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscribed(data?.subscribed || false);
      setSubscriptionTier(data?.subscription_tier || null);
      setSubscriptionEnd(data?.subscription_end || null);
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error checking subscription",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (plan: 'weekly' | 'monthly' = 'monthly') => {
    try {
      const headers: any = {};
      
      // Include auth header if user is logged in
      if (user && session) {
        headers.Authorization = `Bearer ${session.access_token}`;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers,
        body: { plan }
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error creating checkout",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const openCustomerPortal = async () => {
    if (!user || !session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to manage your subscription.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error opening customer portal",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Skip subscription check for testing
    setLoading(false);
  }, [user, session]);

  // Skip auto-refresh for testing
  useEffect(() => {
    if (!user) return;
    // Auto-refresh disabled for testing
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{
      subscribed,
      subscriptionTier,
      subscriptionEnd,
      loading,
      checkSubscription,
      createCheckout,
      openCustomerPortal
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
