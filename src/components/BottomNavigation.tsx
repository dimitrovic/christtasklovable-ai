import { Button } from "@/components/ui/button";
import { Home, MessageSquare, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: 'home' | 'chatbot' | 'profile';
  onTabChange: (tab: 'home' | 'chatbot' | 'profile') => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {/* Home Tab */}
        <Button
          variant="ghost"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center space-y-1 px-4 py-2 h-auto ${
            activeTab === 'home'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'}`} />
          <span className="text-xs font-medium">Home</span>
        </Button>

        {/* AI Chatbot Tab */}
        <Button
          variant="ghost"
          onClick={() => onTabChange('chatbot')}
          className={`flex flex-col items-center space-y-1 px-4 py-2 h-auto ${
            activeTab === 'chatbot'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <MessageSquare className={`w-5 h-5 ${activeTab === 'chatbot' ? 'text-blue-600' : 'text-gray-600'}`} />
          <span className="text-xs font-medium">AI Chatbot</span>
        </Button>

        {/* Profile Tab */}
        <Button
          variant="ghost"
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center space-y-1 px-4 py-2 h-auto ${
            activeTab === 'profile'
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'}`} />
          <span className="text-xs font-medium">Me</span>
        </Button>
      </div>
    </div>
  );
};
