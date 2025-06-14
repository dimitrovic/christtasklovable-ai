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

    // Trinity questions
    if (lowerInput.includes("trinity") || lowerInput.includes("three gods") || lowerInput.includes("one god three persons")) {
      return `**Direct Answer:** The Trinity is NOT three gods - it's one God existing eternally in three distinct persons.

**Biblical Response:**
- Deuteronomy 6:4: "Hear, O Israel: The Lord our God, the Lord is one" - This establishes monotheism
- Matthew 28:19: "baptizing them in the name of the Father and of the Son and of the Holy Spirit" - Three persons, ONE name (singular)
- John 1:1: "the Word was God" - Jesus is fully divine
- John 14:26: The Holy Spirit is called God and performs divine acts

**The Key:** The Hebrew word "echad" (one) means compound unity, like "one flesh" in marriage (Genesis 2:24) - distinct persons unified as one essence.

This isn't contradiction - it's the beautiful mystery of God's nature that our finite minds can grasp but never fully comprehend.`;
    }

    // Jesus as God questions
    if (lowerInput.includes("jesus") && (lowerInput.includes("never said") || lowerInput.includes("i am god"))) {
      return `**Direct Answer:** Jesus absolutely claimed to be God, just not in those exact words.

**Biblical Proof:**
- John 8:58: "Before Abraham was, I AM" - Jesus used God's sacred name (Exodus 3:14)
- John 10:30: "I and the Father are one" - The Jews understood this as claiming deity (v.33)
- John 20:28: Thomas called Jesus "My Lord and my God!" - Jesus accepted this worship
- John 5:18: "making himself equal with God" - Even enemies recognized His claim

**Actions Prove Divinity:**
- He forgave sins (only God can do this - Mark 2:7)
- He accepted worship (Matthew 28:9) - forbidden for anyone but God
- He claimed authority over Sabbath (Mark 2:28) - "Lord of the Sabbath"

Jesus didn't need to say "I am God" - His words and actions made it crystal clear to everyone who heard Him.`;
    }

    // Bible corruption claims
    if (lowerInput.includes("bible") && (lowerInput.includes("corrupt") || lowerInput.includes("changed") || lowerInput.includes("tampered"))) {
      return `**Direct Answer:** The Bible has NOT been corrupted. We have overwhelming manuscript evidence proving its reliability.

**The Facts:**
- 5,800+ Greek New Testament manuscripts (more than any ancient text)
- Dead Sea Scrolls (1947) proved Old Testament accuracy over 1000+ years
- Earliest fragments date within 25-50 years of original writings
- 99.5% textual accuracy across all manuscripts

**Even the Quran Initially Affirmed the Bible:**
- Surah 3:3-4: "confirming what came before it" (referring to Torah and Gospel)
- Surah 5:46-47: Christians should judge by the Gospel

**Jesus' Own Words:**
- Matthew 5:17-18: "not the smallest letter will disappear from the Law"
- Luke 16:17: "easier for heaven and earth to disappear than for the least stroke of a pen to drop out of the Law"

If God couldn't preserve His Word, how could we trust Him with our salvation? The manuscript evidence is overwhelming - the Bible we have today is what was originally written.`;
    }

    // Problem of evil
    if (lowerInput.includes("evil") || lowerInput.includes("suffering") || lowerInput.includes("pain") || lowerInput.includes("bad things happen")) {
      return `**Direct Answer:** Evil exists because love requires free choice, and God didn't stay distant from suffering - He entered it.

**The Biblical Response:**
1. **Free Will is Necessary:** Love cannot be forced. For humans to genuinely love God, we must be free to choose otherwise.

2. **Evil is Absence of Good:** Like darkness is absence of light, evil is corruption of God's good creation (Genesis 1:31).

3. **God Entered Our Suffering:** 
   - Isaiah 53:3: "a man of suffering, and familiar with pain"
   - Hebrews 4:15: Jesus "has been tempted in every way, just as we are"

4. **Purpose in Pain:**
   - Romans 8:28: "God works for the good of those who love him"
   - James 1:2-4: Trials develop perseverance and maturity

5. **Ultimate Justice Coming:**
   - Revelation 21:4: "no more death or mourning or crying or pain"

The cross proves God doesn't cause evil from a distance - He bore it Himself to defeat it. Every tear will be wiped away.`;
    }

    // Resurrection challenges
    if (lowerInput.includes("resurrection") || lowerInput.includes("rose from") || lowerInput.includes("dead people don't")) {
      return `**Direct Answer:** The resurrection has stronger historical evidence than most accepted ancient events.

**Historical Facts Even Skeptics Accept:**
1. **Jesus died by crucifixion** - even Bart Ehrman (skeptic) affirms this
2. **The tomb was empty** - even enemies didn't dispute this (Matthew 28:13)
3. **Multiple eyewitness accounts** - 1 Corinthians 15:3-8 lists over 500 witnesses
4. **Disciples' transformation** - cowards became martyrs willing to die

**Why This Wasn't Made Up:**
- Women were first witnesses (their testimony wasn't valued in that culture)
- Disciples fled and denied Jesus, then suddenly proclaimed His resurrection
- They gained nothing earthly - only persecution and death
- The tomb could have been checked - it was in Jerusalem where it happened

**Biblical Foundation:**
- 1 Corinthians 15:14: "If Christ has not been raised, our preaching is useless"
- Romans 1:4: Jesus "was appointed the Son of God in power by his resurrection"

The resurrection isn't just belief - it's the best explanation for the historical evidence. That's why Christianity exploded in the very city where Jesus was crucified.`;
    }

    // Muhammad/Prophet comparisons
    if (lowerInput.includes("muhammad") || lowerInput.includes("prophet") || lowerInput.includes("final messenger")) {
      return `**Direct Answer:** Jesus is not just a prophet - He is the eternal Son of God, and Scripture warns against any "other gospel."

**Why Jesus is More Than a Prophet:**
- **Sinless Life:** 2 Corinthians 5:21, Hebrews 4:15 - prophets all sinned
- **Divine Claims:** John 8:58 "Before Abraham was, I AM" - no prophet claimed this
- **Power Over Death:** Prophets pointed to God; Jesus IS God (John 1:1)
- **Forgives Sin:** Mark 2:5-7 - only God can forgive sin

**Biblical Warning:**
- Galatians 1:8-9: "If anyone preaches another gospel... let them be under God's curse"
- 1 John 4:1: "test the spirits to see whether they are from God"

**The Test:** Does the message point to Jesus as the way, truth, and life (John 14:6)? 

**Historical Fact:** Jesus came 600 years before Muhammad. The Gospel was already complete (Jude 1:3 - "the faith that was once for all entrusted to God's holy people").

Jesus didn't just bring a message - He IS the message. He's not one of many ways; He's THE way to the Father.`;
    }

    // Default for debate mode - analyze and respond directly
    return `**Let me address your question directly:**

You're asking about "${input}" - this is exactly the kind of challenging question that tests our faith and requires a biblical response.

**Here's the Christian answer:**
The Bible addresses this concern through several key principles:
- God's sovereignty and perfect justice (Psalm 89:14)
- Human responsibility and free will (Joshua 24:15)
- Christ as the ultimate revelation of God's character (Hebrews 1:3)

**Relevant Scripture:**
"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." - Proverbs 3:5-6

**The Apologetic Response:**
This question actually strengthens rather than weakens the Christian worldview because it shows that moral standards exist - and they point to a moral lawgiver (God).

What specific aspect of this would you like me to address further with Scripture?`;
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
