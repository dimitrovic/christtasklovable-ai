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

  const getDirectDebateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    // Where did Jesus say he is God?
    if (lowerInput.includes("where") && lowerInput.includes("jesus") && (lowerInput.includes("say") || lowerInput.includes("claim")) && lowerInput.includes("god")) {
      return `**Direct Answer:** Jesus claimed to be God multiple times, though not always using those exact words.

**Here's where Jesus said it:**

1. **John 8:58** - "Before Abraham was, I AM" 
   - Jesus used God's sacred name from Exodus 3:14
   - The Jews immediately picked up stones because they understood this as claiming deity

2. **John 10:30** - "I and the Father are one"
   - The Jews responded: "You, a mere man, claim to be God" (v.33)
   - They understood exactly what He meant

3. **John 14:9** - "Whoever has seen me has seen the Father"
   - Direct claim to divine identity

4. **John 5:18** - The text says Jesus was "making himself equal with God"
   - Even His enemies recognized His claim

**He also accepted worship:**
- Matthew 28:9 - Women worshipped Him after resurrection
- John 20:28 - Thomas called Him "My Lord and my God!" and Jesus accepted it

Jesus didn't need to say "I am God" in modern English - His Jewish audience understood perfectly what He was claiming.`;
    }

    // Trinity questions
    if (lowerInput.includes("trinity") || (lowerInput.includes("three") && lowerInput.includes("god"))) {
      return `**Direct Answer:** The Trinity is one God existing as three distinct persons - not three gods.

**Biblical Evidence:**
- **Deuteronomy 6:4**: "The Lord our God, the Lord is one" (Hebrew: echad = compound unity)
- **Matthew 28:19**: "baptizing them in the name [singular] of the Father and of the Son and of the Holy Spirit"
- **1 John 5:7**: "there are three that bear record in heaven: the Father, the Word, and the Holy Ghost: and these three are one"

**Each Person is Called God:**
- Father: Ephesians 4:6
- Son: John 1:1, John 20:28
- Holy Spirit: Acts 5:3-4

It's like water being H2O - one substance, multiple expressions. The Trinity isn't mathematical (1+1+1=3) but relational (1x1x1=1).`;
    }

    // Bible corruption
    if (lowerInput.includes("bible") && (lowerInput.includes("corrupt") || lowerInput.includes("changed") || lowerInput.includes("tampered"))) {
      return `**Direct Answer:** The Bible has NOT been corrupted. We have manuscript evidence proving its preservation.

**The Evidence:**
- **5,800+** Greek New Testament manuscripts
- **Dead Sea Scrolls** (1947) proved Old Testament accuracy over 1,000+ years
- **99.5%** textual accuracy across all manuscripts
- Earliest fragments within **25-50 years** of originals

**Even the Quran confirms this:**
- Surah 3:3: "confirming what came before it" (Torah/Gospel)
- Surah 5:47: Christians should "judge by what Allah revealed therein"

**Jesus promised preservation:**
- Matthew 5:18: "not the smallest letter will disappear from the Law"
- 1 Peter 1:25: "the word of the Lord endures forever"

If God couldn't preserve His Word, how could we trust Him with anything else?`;
    }

    // Problem of evil
    if (lowerInput.includes("evil") || lowerInput.includes("suffering") || (lowerInput.includes("good") && lowerInput.includes("bad"))) {
      return `**Direct Answer:** Evil exists because love requires free choice, and God entered our suffering on the cross.

**Why God allows evil:**
1. **Free will is necessary** - Love cannot be forced (Joshua 24:15)
2. **Evil is corruption of good** - Like rust corrupts metal, sin corrupts God's creation
3. **God has a purpose** - Romans 8:28: "all things work together for good"

**God didn't stay distant:**
- Isaiah 53:3: Jesus was "a man of sorrows, acquainted with grief"
- He experienced betrayal, torture, abandonment
- The cross proves God bears our pain with us

**Ultimate resolution coming:**
- Revelation 21:4: "no more death, mourning, crying or pain"
- Justice will be served, wrongs will be made right

The question isn't "Why does God allow evil?" but "Why did God enter evil to defeat it?"`;
    }

    // Resurrection
    if (lowerInput.includes("resurrection") || lowerInput.includes("rose") || (lowerInput.includes("dead") && lowerInput.includes("alive"))) {
      return `**Direct Answer:** The resurrection has stronger historical evidence than most accepted ancient events.

**Historical facts even skeptics accept:**
1. **Jesus died by crucifixion** - universally accepted by historians
2. **Empty tomb** - even enemies didn't dispute it (Matthew 28:13)
3. **Multiple eyewitnesses** - 1 Corinthians 15:6 mentions 500+ witnesses
4. **Disciples' transformation** - cowards became martyrs

**Why it wasn't fabricated:**
- Women were first witnesses (their testimony wasn't valued then)
- Disciples fled during crucifixion, then suddenly proclaimed resurrection
- They gained nothing but persecution and death
- The tomb was in Jerusalem where anyone could check

**Biblical foundation:**
- 1 Corinthians 15:14: "If Christ has not been raised, our preaching is useless"
- Acts 17:31: God "has given proof of this to everyone by raising him from the dead"

The resurrection isn't just belief - it's the best explanation for the historical evidence.`;
    }

    // Default response - analyze the question directly
    const questionWords = lowerInput.match(/\b(who|what|where|when|why|how|did|does|is|are|can|will|should)\b/g);
    
    if (questionWords) {
      return `**Let me address your question directly:** "${input}"

**Biblical Response:**
This question goes to the heart of Christian doctrine. Here's what Scripture teaches:

- The Bible addresses this through God's revealed character in Christ (Hebrews 1:3)
- We see God's heart in Jesus: "Whoever has seen me has seen the Father" (John 14:9)
- Scripture provides the framework: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness" (2 Timothy 3:16)

**Key Verse:** "But in your hearts revere Christ as Lord. Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect." - 1 Peter 3:15

**The Answer:** ${this.analyzeAndRespond(input)}

What specific aspect would you like me to elaborate on with more Scripture?`;
    }

    return `I understand you're asking: "${input}"

Let me give you a direct biblical response to this challenge. The Christian answer is rooted in Scripture and can be defended logically. What specific part of this question challenges you most? I'll address it head-on with biblical truth.`;
  };

  const analyzeAndRespond = (question: string) => {
    // Simple analysis based on key concepts
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes("contradict")) return "Apparent contradictions resolve when we understand context, translation, and genre.";
    if (lowerQ.includes("science")) return "True science and Scripture complement each other - both reveal God's truth.";
    if (lowerQ.includes("other religion")) return "Jesus declared 'I am the way, the truth, and the life' (John 14:6) - exclusive but loving.";
    if (lowerQ.includes("love") && lowerQ.includes("hell")) return "God's love and justice are both perfect - the cross demonstrates both.";
    
    return "This question reveals deep thinking about faith - let's explore what Scripture teaches.";
  };

  const getAIResponse = (input: string, mode: string) => {
    if (mode === "debate") {
      return getDirectDebateResponse(input);
    }

    const lowerInput = input.toLowerCase();

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
      debate: getDirectDebateResponse(input),
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
