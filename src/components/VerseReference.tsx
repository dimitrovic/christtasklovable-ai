
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";
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
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Scripture Reference</h3>
        <BookText className="h-5 w-5 text-blue-600" />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <blockquote className="text-slate-700 italic mb-3 leading-relaxed">
          "{verses[currentVerse].text}"
        </blockquote>
        <cite className="text-blue-600 font-semibold">
          - {verses[currentVerse].reference}
        </cite>
      </div>

      <Button
        onClick={nextVerse}
        variant="outline"
        size="sm"
        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
      >
        Next Verse
      </Button>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <h4 className="font-semibold text-slate-800 mb-2">Quick References</h4>
        <div className="space-y-1 text-sm">
          <p className="text-slate-600">• Trinity: Matthew 28:19</p>
          <p className="text-slate-600">• Salvation: Romans 10:9</p>
          <p className="text-slate-600">• Creation: Genesis 1:1</p>
          <p className="text-slate-600">• Prophecy: Isaiah 53</p>
        </div>
      </div>
    </Card>
  );
};
