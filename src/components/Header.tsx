
import { BookOpen } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-4 rounded-2xl shadow-lg">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Christian Apologetics
              </h1>
              <p className="text-slate-600 text-lg">Defending Faith with Biblical Truth</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
