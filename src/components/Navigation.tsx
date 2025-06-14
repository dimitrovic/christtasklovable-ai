
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Gamepad2, Users, BookOpen } from "lucide-react";

interface NavigationProps {
  activeMode: string;
  onModeChange: (mode: string) => void;
}

export const Navigation = ({ activeMode, onModeChange }: NavigationProps) => {
  const modes = [
    {
      id: "chat",
      title: "AI Apologist",
      description: "Personal theological guidance",
      icon: MessageSquare,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: "debate",
      title: "Muslim-Atheist Asks",
      description: "Challenging questions mode",
      icon: Users,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: "challenge",
      title: "Challenge the AI",
      description: "Gamified apologetics",
      icon: Gamepad2,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: "study",
      title: "Scripture Study",
      description: "Deep biblical analysis",
      icon: BookOpen,
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {modes.map((mode) => (
          <Card 
            key={mode.id}
            className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${
              activeMode === mode.id 
                ? 'border-indigo-400 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50' 
                : 'border-transparent hover:border-slate-200'
            }`}
            onClick={() => onModeChange(mode.id)}
          >
            <div className="p-4 text-center">
              <div className={`mx-auto mb-3 p-3 rounded-xl bg-gradient-to-r ${mode.gradient} w-fit`}>
                <mode.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-sm text-slate-800 mb-1">{mode.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{mode.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
