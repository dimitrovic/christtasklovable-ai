
import { BookOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Christian Apologetics Assistant</h1>
              <p className="text-slate-600">Defending the Faith with Biblical Truth</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
