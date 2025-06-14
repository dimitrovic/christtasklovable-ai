import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare, BookText, Send, Gamepad2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "./Navigation";
import { GameStats } from "./GameStats";
import { ModeSelector } from "./ModeSelector";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  points?: number;
}

interface ChatInterfaceProps {
  selectedTopic: string | null;
}

export const ChatInterface = ({ selectedTopic }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState("chat");
  const [isDebateMode, setIsDebateMode] = useState(false);
  const [gameStats, setGameStats] = useState({ score: 0, streak: 0, level: 1 });
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

  useEffect(() => {
    // Initialize with mode-specific welcome message
    const welcomeMessages = {
      chat: "Welcome! I'm your personal AI apologist. I'm here to help you grow in faith and answer theological questions with love, truth, and Scripture. How can I support your spiritual journey today?",
      debate: "Challenge Mode Active! I'll present tough questions from Muslim and atheist perspectives. Your job is to respond with biblical truth and love. Ready for the challenge?",
      challenge: "Game Mode: Challenge the AI! Try to stump me with your hardest apologetics questions. You'll earn points for good questions and thoughtful responses. Let's see what you've got!",
      study: "Scripture Study Mode: Let's dive deep into God's Word together. Ask me about biblical passages, theological concepts, or request detailed biblical analysis."
    };

    setMessages([{
      id: "1",
      text: welcomeMessages[activeMode as keyof typeof welcomeMessages],
      isUser: false,
      timestamp: new Date()
    }]);
  }, [activeMode]);

  const getAIResponse = (input: string, mode: string) => {
    const lowerInput = input.toLowerCase();

    if (mode === "debate") {
      // More comprehensive debate mode responses based on common apologetics topics
      if (lowerInput.includes("trinity") || lowerInput.includes("three gods") || lowerInput.includes("polytheism")) {
        return "This is a classic challenge! Muslims often ask: 'How can you worship three Gods and claim monotheism?' Here's the biblical response: The Trinity doesn't teach three Gods, but one God existing in three persons - Father, Son, and Holy Spirit. Deuteronomy 6:4 declares 'Hear, O Israel: The Lord our God, the Lord is one.' The Hebrew word 'echad' means compound unity, like 'one flesh' in marriage (Genesis 2:24). Jesus claimed equality with the Father (John 10:30) yet prayed to Him, showing the relational aspect of the Trinity. How would you explain this mystery of unity and diversity within the Godhead?";
      }
      
      if (lowerInput.includes("jesus") && (lowerInput.includes("god") || lowerInput.includes("divine") || lowerInput.includes("son"))) {
        return "Here's a challenging question often posed: 'How can Jesus be God if He said the Father is greater than I?' (John 14:28). The key is understanding Jesus' two natures. In His human nature, Jesus was subordinate to the Father in role and mission. But in His divine nature, He's equal with the Father (Philippians 2:6). Jesus accepted worship (Matthew 28:9), forgave sins (Mark 2:5-7), and claimed to be the 'I AM' (John 8:58) - all attributes of God. Even Thomas declared 'My Lord and my God!' (John 20:28). How would you respond to someone who says Jesus never claimed to be God?";
      }
      
      if (lowerInput.includes("bible") && (lowerInput.includes("corrupt") || lowerInput.includes("changed") || lowerInput.includes("reliable"))) {
        return "A common Muslim objection: 'The Bible has been corrupted (tahrif), so how can you trust it?' Here's our response: We have over 5,800 Greek manuscripts of the New Testament, with fragments dating to within decades of the original writings. The Dead Sea Scrolls confirmed the Old Testament's reliability. Jesus Himself quoted the Old Testament as authoritative (Matthew 5:17-18). Even the Quran initially affirmed the Bible (Surah 3:3-4). The manuscript evidence for the Bible far exceeds any other ancient text. How would you demonstrate the Bible's textual integrity to a skeptic?";
      }
      
      if (lowerInput.includes("evil") || lowerInput.includes("suffering") || lowerInput.includes("pain")) {
        return "The classic atheist challenge: 'If God is all-good and all-powerful, why does evil exist?' This is profound! Here's the Christian response: God created beings with free will because love requires genuine choice. Evil is the absence of good, like darkness is the absence of light. Without the possibility of choosing wrongly, our choice to love God wouldn't be real. Moreover, God didn't remain distant from suffering - He entered it through Christ's crucifixion. Romans 8:28 promises He works all things for good. How would you comfort someone struggling with this question while maintaining biblical truth?";
      }
      
      if (lowerInput.includes("resurrection") || lowerInput.includes("rise") || lowerInput.includes("tomb")) {
        return "A critical challenge: 'The resurrection is just a myth - dead people don't come back to life!' Here's our defense: The resurrection has strong historical evidence. Multiple independent sources record it. The tomb was empty - even enemies didn't dispute this. The disciples transformed from cowards to martyrs. Women were the first witnesses (in a culture where women's testimony wasn't valued). If it were a lie, why would anyone die for it? 1 Corinthians 15:3-8 lists over 500 witnesses. The resurrection is the cornerstone of Christian faith. How would you present this evidence to a skeptic?";
      }
      
      // Default debate response that directly addresses their question
      return `That's an excellent and challenging question! Let me address this directly from a biblical apologetics perspective: ${input}

Here's how we can respond with truth and love:

The key biblical principles to remember are:
1. Scripture is our ultimate authority (2 Timothy 3:16)
2. We're called to give a reason for our hope (1 Peter 3:15)
3. We defend the faith with gentleness and respect

This type of question requires us to dig deep into God's Word and show how the Bible addresses these concerns. The challenge helps us grow stronger in our faith and better equipped to share truth with others.

What specific aspect of this question would you like to explore further with Scripture?`;
    }

    const responses = {
      chat: {
        triggers: ["jesus", "divine", "god", "deity"],
        response: "I understand you're seeking clarity about Jesus' divinity. This is beautiful - you're asking the right questions! Scripture is wonderfully clear about this. In John 1:1, we read 'In the beginning was the Word, and the Word was with God, and the Word was God.' Jesus Himself declared 'Before Abraham was, I am' (John 8:58), using God's sacred name. He accepted worship (Matthew 28:9) and forgave sins (Mark 2:5-7) - things only God can do. Remember, faith seeks understanding, and God honors our sincere questions. How does this resonate with your heart?"
      },
      challenge: {
        triggers: ["try", "stump", "difficult"],
        response: "Nice try! That's a classic question. Here's my response: The problem of evil actually points TO God, not away from Him. Without an absolute moral standard (God), we couldn't even identify something as 'evil.' Evil is the absence of good, like darkness is the absence of light. God gave us free will because love requires choice - and with choice comes the possibility of choosing wrongly. The cross shows God didn't remain distant from suffering but entered into it. Your turn - got something harder? 🎯 [+10 points for a thoughtful question!]"
      },
      study: {
        triggers: ["study", "analyze", "scripture"],
        response: "Excellent choice for deep study! Let's examine this passage in its original context. Looking at the Greek/Hebrew roots, historical background, and cross-references with other Scripture passages. The beauty of God's Word is that it interprets itself - Scripture with Scripture. What specific aspect would you like to explore further? The theological implications, the historical context, or perhaps how this applies to our daily walk with Christ?"
      }
    };

    const modeResponses = responses[mode as keyof typeof responses];
    
    if (modeResponses?.triggers.some(trigger => lowerInput.includes(trigger))) {
      return modeResponses.response;
    }

    // Default responses by mode
    const defaults = {
      chat: "Thank you for sharing your heart with me. This is such an important question, and I'm honored you're seeking biblical truth. Let me offer you some Scripture-based encouragement and wisdom...",
      debate: `You've raised an important challenge that many believers face. Let me address this directly: ${input}

From a biblical apologetics standpoint, this question touches on fundamental truths about God's nature and our faith. Here's how we can respond with both truth and love, grounded in Scripture...`,
      challenge: "Interesting challenge! Let me see if I can tackle this one... 🎯",
      study: "Let's dig deeper into God's Word on this topic. Here's what Scripture teaches us..."
    };

    return defaults[mode as keyof typeof defaults] || defaults.chat;
  };

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

    setTimeout(() => {
      const aiResponse = getAIResponse(inputText, activeMode);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        points: activeMode === "challenge" ? Math.floor(Math.random() * 20) + 5 : undefined
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Update game stats for challenge mode
      if (activeMode === "challenge" && botMessage.points) {
        setGameStats(prev => ({
          score: prev.score + botMessage.points!,
          streak: prev.streak + 1,
          level: Math.floor((prev.score + botMessage.points!) / 100) + 1
        }));
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getModeIcon = () => {
    switch (activeMode) {
      case "debate": return Users;
      case "challenge": return Gamepad2;
      default: return BookText;
    }
  };

  const ModeIcon = getModeIcon();

  return (
    <div className="space-y-6">
      <Navigation activeMode={activeMode} onModeChange={setActiveMode} />
      
      {activeMode === "chat" && (
        <ModeSelector isDebateMode={isDebateMode} onToggle={setIsDebateMode} />
      )}
      
      {activeMode === "challenge" && (
        <GameStats {...gameStats} />
      )}

      <div className="h-[600px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 p-6 text-white">
          <div className="flex items-center space-x-3">
            <ModeIcon className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">
                {activeMode === "chat" ? "AI Apologist Chat" : 
                 activeMode === "debate" ? "Debate Mode" :
                 activeMode === "challenge" ? "Challenge Mode" : "Scripture Study"}
              </h2>
              <p className="text-indigo-100">
                {activeMode === "chat" ? "Personal guidance with love and truth" :
                 activeMode === "debate" ? "Tackling tough questions together" :
                 activeMode === "challenge" ? "Test your apologetics skills" : "Deep biblical analysis"}
              </p>
            </div>
          </div>
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
                    <ModeIcon className="h-5 w-5 text-white" />
                  )}
                </div>
                <Card className={`p-5 shadow-lg border-0 ${message.isUser ? "bg-gradient-to-r from-indigo-50 to-purple-50" : "bg-white"}`}>
                  <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  {message.points && (
                    <div className="mt-3 text-emerald-600 font-bold text-sm">+{message.points} points!</div>
                  )}
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
                  <ModeIcon className="h-5 w-5 text-white" />
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
              placeholder={
                activeMode === "challenge" ? "Try to challenge me with a tough question..." :
                activeMode === "debate" ? "Share your challenging theological question..." :
                "Ask your apologetics question here..."
              }
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
    </div>
  );
};
