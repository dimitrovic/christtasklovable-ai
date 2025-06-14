
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText, Sparkles } from "lucide-react";
import { useState } from "react";

export const VerseReference = () => {
  const [currentVerse, setCurrentVerse] = useState(0);

  const verses = [
    {
      text: "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.",
      reference: "1 Peter 3:15"
    },
    {
      text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      reference: "John 1:1"
    },
    {
      text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
      reference: "John 14:6"
    },
    {
      text: "For in Christ all the fullness of the Deity lives in bodily form.",
      reference: "Colossians 2:9"
    },
    {
      text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.",
      reference: "2 Timothy 3:16"
    }
  ];

  const nextVerse = () => {
    setCurrentVerse((prev) => (prev + 1) % verses.length);
  };

  return (
    <Card className="overflow-hidden shadow-lg border-0">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Scripture Reference</h3>
          <Sparkles className="h-6 w-6" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
          <blockquote className="text-slate-700 italic mb-4 leading-relaxed text-lg relative z-10">
            "{verses[currentVerse].text}"
          </blockquote>
          <cite className="text-indigo-600 font-bold text-lg relative z-10">
            - {verses[currentVerse].reference}
          </cite>
        </div>

        <Button
          onClick={nextVerse}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <BookText className="mr-2 h-4 w-4" />
          Next Verse
        </Button>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <h4 className="font-bold text-slate-800 mb-3 text-lg">Quick References</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-slate-50 rounded-lg p-2">
              <span className="font-medium text-slate-800">Trinity:</span>
              <p className="text-slate-600">Matthew 28:19</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <span className="font-medium text-slate-800">Salvation:</span>
              <p className="text-slate-600">Romans 10:9</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <span className="font-medium text-slate-800">Creation:</span>
              <p className="text-slate-600">Genesis 1:1</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2">
              <span className="font-medium text-slate-800">Prophecy:</span>
              <p className="text-slate-600">Isaiah 53</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
