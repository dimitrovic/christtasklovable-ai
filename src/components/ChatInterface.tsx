
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare, BookText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedTopic: string | null;
}

export const ChatInterface = ({ selectedTopic }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome! I'm here to help you with Christian apologetics questions. Ask me anything about defending your faith, biblical accuracy, Jesus' divinity, or any challenges you're facing in discussions about Christianity.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedTopic) {
      setInputText(`I'd like to learn more about ${selectedTopic}`);
    }
  }, [selectedTopic]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response with apologetics content
    setTimeout(() => {
      const responses = [
        {
          trigger: ["jesus", "divine", "god", "deity"],
          response: "The divinity of Jesus Christ is supported by multiple biblical passages and historical evidence. Key scriptures include John 1:1 ('In the beginning was the Word, and the Word was with God, and the Word was God'), John 8:58 where Jesus declares 'Before Abraham was, I am' (using God's divine name), and Colossians 2:9 which states 'For in Christ all the fullness of the Deity lives in bodily form.' Additionally, Jesus accepted worship (Matthew 28:9), forgave sins (Mark 2:5-7), and claimed equality with the Father (John 10:30)."
        },
        {
          trigger: ["bible", "reliable", "accurate", "contradictions"],
          response: "The Bible's reliability is supported by extensive manuscript evidence, archaeological discoveries, and internal consistency. We have over 5,800 Greek New Testament manuscripts, with some dating to within decades of the originals. Archaeological findings continue to confirm biblical accounts, and apparent contradictions often resolve when considering context, translation, and cultural background. The Bible's unity across 66 books, 40+ authors, and 1,500+ years demonstrates divine inspiration."
        },
        {
          trigger: ["resurrection", "rise", "risen"],
          response: "The resurrection of Jesus is the cornerstone of Christian faith, supported by historical evidence including: the empty tomb (acknowledged even by critics), multiple eyewitness accounts (over 500 people according to 1 Corinthians 15:6), the transformation of the disciples from fearful to bold, the conversion of skeptics like Paul and James, and the rapid growth of Christianity despite persecution. The resurrection best explains all available historical data."
        },
        {
          trigger: ["science", "evolution", "creation"],
          response: "Christianity and science are not in conflict - many foundational scientists were Christians. The fine-tuning of the universe, the complexity of DNA, and the information content in biological systems point to intelligent design. While Christians may have different views on the age of the earth, all agree that God is the ultimate Creator. Science describes HOW God works; the Bible reveals WHO and WHY."
        }
      ];

      let aiResponse = "Thank you for your question. This is an important apologetics topic that deserves a thoughtful response based on Scripture and evidence. While I'm currently a demonstration version, a full implementation would provide detailed biblical responses, historical evidence, and practical advice for these conversations. Consider studying resources from scholars like William Lane Craig, Josh McDowell, or Lee Strobel. Remember, always speak with gentleness and respect (1 Peter 3:15).";

      const lowerInput = inputText.toLowerCase();
      const matchedResponse = responses.find(r => 
        r.trigger.some(trigger => lowerInput.includes(trigger))
      );

      if (matchedResponse) {
        aiResponse = matchedResponse.response;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[700px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Ask Your Apologetics Question</h2>
        <p className="text-indigo-100">Get biblical answers to defend your faith with confidence</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50 to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start space-x-3 max-w-[85%] ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
              <div className={`p-3 rounded-full shadow-lg ${message.isUser ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-gradient-to-r from-slate-600 to-slate-700"}`}>
                {message.isUser ? (
                  <MessageSquare className="h-5 w-5 text-white" />
                ) : (
                  <BookText className="h-5 w-5 text-white" />
                )}
              </div>
              <Card className={`p-5 shadow-lg border-0 ${message.isUser ? "bg-gradient-to-r from-indigo-50 to-purple-50" : "bg-white"}`}>
                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs text-slate-500 mt-3 font-medium">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 shadow-lg">
                <BookText className="h-5 w-5 text-white" />
              </div>
              <Card className="p-5 bg-white shadow-lg border-0">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </Card>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 p-6 bg-white">
        <div className="flex space-x-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your apologetics question here..."
            className="flex-1 min-h-[80px] resize-none border-2 border-slate-200 focus:border-indigo-400 rounded-xl"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};
