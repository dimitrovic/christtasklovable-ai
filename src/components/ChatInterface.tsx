import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "./Navigation";

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
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState("chat");
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
      debate: "Challenge Mode Active! I'll present tough questions from Muslim and atheist perspectives. Your job is to respond with biblical truth and love. Ready for the challenge?"
    };

    setMessages([{
      id: "1",
      text: welcomeMessages[activeMode as keyof typeof welcomeMessages],
      isUser: false,
      timestamp: new Date()
    }]);
  }, [activeMode]);

  const analyzeQuestionType = (lowerInput: string) => {
    if (lowerInput.includes("why") || lowerInput.includes("purpose")) {
      return "God's purposes are revealed in Scripture, and His ways are higher than our ways (Isaiah 55:8-9). The 'why' questions often lead us to trust God's character when we can't see the full picture.";
    }
    if (lowerInput.includes("how") || lowerInput.includes("explain")) {
      return "Scripture provides clear explanation for this, often using multiple passages to give us the complete picture. God's revelation is progressive and comprehensive.";
    }
    if (lowerInput.includes("what") || lowerInput.includes("definition")) {
      return "Biblical definitions come from Scripture's own usage of terms, Hebrew and Greek word studies, and the consistent teaching across all of God's Word.";
    }
    return "This question requires careful biblical analysis to provide an accurate, Scripture-based response.";
  };

  const getDirectDebateResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    // Jesus claiming to be God
    if ((lowerInput.includes("where") || lowerInput.includes("when") || lowerInput.includes("did")) && 
        lowerInput.includes("jesus") && 
        (lowerInput.includes("say") || lowerInput.includes("claim") || lowerInput.includes("call")) && 
        (lowerInput.includes("god") || lowerInput.includes("divine"))) {
      return `Jesus claimed to be God multiple times, though not always using those exact words.

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
    if (lowerInput.includes("trinity") || 
        (lowerInput.includes("three") && lowerInput.includes("god")) ||
        lowerInput.includes("godhead") ||
        (lowerInput.includes("father") && lowerInput.includes("son") && lowerInput.includes("spirit"))) {
      return `The Trinity is one God existing as three distinct persons - not three gods.

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

    // Bible corruption/preservation
    if (lowerInput.includes("bible") && 
        (lowerInput.includes("corrupt") || lowerInput.includes("changed") || 
         lowerInput.includes("tampered") || lowerInput.includes("altered") ||
         lowerInput.includes("lost") || lowerInput.includes("modified"))) {
      return `The Bible has NOT been corrupted. We have manuscript evidence proving its preservation.

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

    // Problem of evil/suffering
    if (lowerInput.includes("evil") || lowerInput.includes("suffering") || 
        (lowerInput.includes("good") && lowerInput.includes("bad")) ||
        lowerInput.includes("pain") || lowerInput.includes("disaster") ||
        (lowerInput.includes("why") && (lowerInput.includes("allow") || lowerInput.includes("permit")))) {
      return `Evil exists because love requires free choice, and God entered our suffering on the cross.

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

    // Resurrection questions
    if (lowerInput.includes("resurrection") || lowerInput.includes("rose") || 
        (lowerInput.includes("dead") && lowerInput.includes("alive")) ||
        lowerInput.includes("easter") || lowerInput.includes("tomb") ||
        (lowerInput.includes("body") && lowerInput.includes("jesus"))) {
      return `The resurrection has stronger historical evidence than most accepted ancient events.

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

    // Salvation/works questions
    if ((lowerInput.includes("salvation") || lowerInput.includes("saved")) &&
        (lowerInput.includes("works") || lowerInput.includes("earn") || lowerInput.includes("deserve"))) {
      return `Salvation is by grace through faith alone, not by works - but true faith produces works.

**Clear Biblical Teaching:**
- **Ephesians 2:8-9**: "For by grace you have been saved through faith... not by works"
- **Romans 3:28**: "justified by faith apart from works of the law"
- **Titus 3:5**: "not by works of righteousness which we have done"

**But faith without works is dead:**
- **James 2:17**: "faith by itself, if it does not have works, is dead"
- **Ephesians 2:10**: "created in Christ Jesus for good works"

**The relationship:** Works don't save us, but they show we're saved. It's like fruit on a tree - the fruit doesn't make it an apple tree, but proves it is one.

**Practical example:** If someone truly believes a building is on fire, they'll act to escape. If they don't act, they don't really believe it. Same with salvation - true faith in Christ naturally produces obedience.`;
    }

    // Hell/eternal punishment questions
    if (lowerInput.includes("hell") || lowerInput.includes("eternal") ||
        (lowerInput.includes("punishment") && lowerInput.includes("forever")) ||
        lowerInput.includes("damnation") || lowerInput.includes("torment")) {
      return `Hell is real, but it's chosen, not imposed - and demonstrates God's perfect justice.

**Biblical Reality:**
- **Matthew 25:46**: "eternal punishment... eternal life"
- **Revelation 20:10**: "tormented day and night forever and ever"
- **Mark 9:43**: "unquenchable fire"

**Why Hell Exists:**
1. **Justice demands it** - Sin against infinite God requires infinite punishment
2. **Free will requires it** - Love cannot be forced, rejection must be possible
3. **God's holiness demands it** - Sin cannot coexist with perfect holiness

**God's Heart About Hell:**
- **2 Peter 3:9**: "not willing that any should perish"
- **Ezekiel 33:11**: "no pleasure in the death of the wicked"
- **1 Timothy 2:4**: "desires all men to be saved"

**The Cross Shows Both:**
- God's love: He died to save us from hell
- God's justice: Someone had to pay for sin

Hell isn't God being mean - it's the natural consequence of rejecting infinite love.`;
    }

    // Science and faith questions
    if ((lowerInput.includes("science") || lowerInput.includes("evolution") || lowerInput.includes("creation")) &&
        (lowerInput.includes("bible") || lowerInput.includes("faith") || lowerInput.includes("religion"))) {
      return `True science and Scripture complement each other - both reveal God's truth.

**The Big Picture:**
- **Psalm 19:1**: "The heavens declare the glory of God"
- **Romans 1:20**: "His invisible attributes are clearly seen... through what has been made"
- Science studies God's creation; Scripture reveals God's character

**On Origins:**
- **Genesis 1:1**: "In the beginning God created"
- The Bible gives us the "Who" and "Why" - science explores the "How"
- Many top scientists throughout history were Christians (Newton, Galileo, Kepler, Pasteur)

**Evolution vs. Creation:**
- Microevolution (adaptation) is observable
- Macroevolution (molecules to man) requires faith in unobserved processes
- Information always comes from intelligence - DNA is information
- The fine-tuning of the universe points to design

**Biblical Framework:**
- Science works because God created an orderly universe with consistent laws
- We can trust our minds to understand science because we're made in God's image
- True science will never contradict God's Word, though it may challenge our interpretations

**Bottom Line:** Good science leads to God, not away from Him.`;
    }

    // Other religions/exclusivity questions
    if (lowerInput.includes("other religion") || lowerInput.includes("muslim") || 
        lowerInput.includes("hindu") || lowerInput.includes("buddhist") ||
        (lowerInput.includes("only") && lowerInput.includes("way")) ||
        lowerInput.includes("exclusive") || lowerInput.includes("narrow")) {
      return `Jesus is the only way to God - not because Christians are narrow, but because truth is narrow.

**Jesus' Own Words:**
- **John 14:6**: "I am the way, the truth, and the life. No one comes to the Father except through Me"
- **Acts 4:12**: "no other name under heaven... by which we must be saved"
- **John 10:9**: "I am the door. If anyone enters by Me, he will be saved"

**Why Only Jesus?**
1. **Only Jesus is God** - Other religious leaders were teachers; Jesus is God incarnate
2. **Only Jesus lived sinlessly** - Others had moral failures; Jesus was perfect
3. **Only Jesus conquered death** - Others died and stayed dead; Jesus rose again
4. **Only Jesus paid for sin** - Others pointed to ways; Jesus IS the way

**What About Good People in Other Religions?**
- **Romans 3:23**: "all have sinned and fall short"
- **Isaiah 64:6**: "our righteousnesses are like filthy rags"
- Goodness doesn't save us - only Jesus' perfection applied to us does

**God's Heart for All People:**
- **2 Peter 3:9**: God is "not willing that any should perish"
- **1 Timothy 2:4**: God "desires all men to be saved"
- **Revelation 7:9**: People "from every nation, tribe, people and language"

Truth isn't narrow because we're mean - it's narrow because that's how truth works. There's only one way to fly a plane safely, one way to perform surgery correctly, and one way to heaven.`;
    }

    // Harder theological questions - predestination, free will
    if (lowerInput.includes("predestination") || lowerInput.includes("elect") ||
        (lowerInput.includes("free") && lowerInput.includes("will")) ||
        lowerInput.includes("calvinist") || lowerInput.includes("arminian") ||
        (lowerInput.includes("choose") && lowerInput.includes("god"))) {
      return `God's sovereignty and human responsibility are both true - Scripture teaches both clearly.

**God's Sovereignty:**
- **Ephesians 1:4**: "He chose us in Him before the foundation of the world"
- **Romans 8:29-30**: "predestined... called... justified... glorified"
- **Acts 13:48**: "as many as had been appointed to eternal life believed"

**Human Responsibility:**
- **John 3:16**: "whoever believes in Him should not perish"
- **Acts 17:30**: "commands all men everywhere to repent"
- **Revelation 22:17**: "whoever desires, let him take the water of life freely"

**How They Work Together:**
- From God's perspective: He chose us before time began
- From our perspective: We choose Him when we hear the gospel
- Both are true simultaneously - like looking at a coin from different sides

**Practical Application:**
- Pray like it depends on God (because it does)
- Witness like it depends on you (because it does)
- Trust God's sovereignty when facing uncertainty
- Take responsibility for your response to the gospel

**The Mystery:** We can't fully understand how infinite God's mind works, but we can trust His character. The same Bible that teaches God's sovereignty also commands us to choose - so both must be true.`;
    }

    // Apologetics methodology questions
    if (lowerInput.includes("evidence") || lowerInput.includes("proof") ||
        lowerInput.includes("reason") || lowerInput.includes("logic") ||
        (lowerInput.includes("how") && lowerInput.includes("know")) ||
        lowerInput.includes("defend") || lowerInput.includes("argue")) {
      return `Christian faith is reasonable and backed by evidence - we can know, not just believe.

**Types of Evidence for Christianity:**

**1. Historical Evidence:**
- Jesus' existence is accepted by virtually all historians
- Early manuscripts and archaeological discoveries
- Eyewitness testimony preserved in Scripture

**2. Philosophical Evidence:**
- Cosmological argument: Everything that begins to exist has a cause
- Teleological argument: Design requires a designer
- Moral argument: Objective morals require a moral lawgiver

**3. Experiential Evidence:**
- Changed lives throughout history
- Answered prayers and miracles
- Inner witness of the Holy Spirit

**Biblical Approach:**
- **1 Peter 3:15**: "always be prepared to give an answer"
- **Isaiah 1:18**: "Come now, and let us reason together"
- **Acts 17:2**: Paul "reasoned with them from the Scriptures"

**Balanced Perspective:**
- Faith isn't blind - it's trust based on evidence
- We can't prove God like a math equation, but we have good reasons to believe
- The evidence points to Christianity, but faith is still required

**Practical Method:**
1. Listen to understand, not just to respond
2. Ask good questions to find the real issue
3. Share truth with gentleness and respect
4. Trust the Holy Spirit to work through your words

Remember: We defend the faith not to win arguments, but to win people.`;
    }

    // Analyze the question to determine response approach
    const questionWords = lowerInput.match(/\b(who|what|where|when|why|how|did|does|is|are|can|will|should|would|could)\b/g);
    
    if (questionWords) {
      // Try to categorize the question type
      if (lowerInput.includes("contradiction") || lowerInput.includes("inconsist")) {
        return `**Biblical "Contradictions" Resolution:**

Most apparent contradictions resolve when we understand:

1. **Context matters** - Same event, different details emphasized
2. **Translation issues** - Hebrew/Greek concepts don't always translate perfectly
3. **Literary genres** - Poetry, prophecy, history use different styles
4. **Progressive revelation** - Later Scripture builds on earlier

**Common Examples:**
- **Genealogies differ** - Matthew traces legal line, Luke traces blood line
- **Number discrepancies** - Often due to different counting methods or time periods
- **Gospel accounts vary** - Multiple witnesses remember different details

**The Pattern:** When you study the context, language, and culture, apparent contradictions become complementary accounts that strengthen the overall picture.

What specific "contradiction" would you like me to address?`;
      }
      
      if (lowerInput.includes("archaeology") || lowerInput.includes("history") || lowerInput.includes("evidence")) {
        return `**Archaeological Evidence for the Bible:**

The spade continues to confirm Scripture's accuracy:

**Old Testament Confirmations:**
- **Dead Sea Scrolls** - Proved accurate transmission of biblical texts
- **Hittite Empire** - Once thought mythical, now well-documented
- **King David's existence** - Tel Dan inscription mentions "House of David"
- **Exodus evidence** - Egyptian records of Semitic slaves, Ipuwer Papyrus describes plagues

**New Testament Confirmations:**
- **Pilate's existence** - Pilate Stone discovered in 1961
- **Pool of Bethesda** - Excavated exactly as John described
- **Gallio's rule** - Delphi inscription confirms Acts 18:12 timeline
- **Luke's accuracy** - Called "first-rate historian" by archaeologist Sir William Ramsay

**The Pattern:** Every generation of archaeologists has confirmed more biblical details. No archaeological discovery has ever contradicted the Bible.

**Quote from William F. Albright:** "Discovery after discovery has established the accuracy of innumerable details, and has brought increased recognition of the Bible as a source of history."`;
      }

      // Default comprehensive response for complex questions
      return `Let me address "${input}" directly with biblical truth.

**The Core Issue:** This question touches on fundamental aspects of Christian doctrine that deserve a thorough, Scripture-based response.

**Biblical Foundation:**
${analyzeQuestionType(lowerInput)}

**Practical Application:**
- This isn't just theological theory - it impacts how we live
- Scripture provides clear guidance for this exact situation
- The early church faced similar questions and gave us biblical precedent

**Supporting Verses:**
- Primary text: [Key verse that directly addresses this]
- Supporting context: [Related passages that build the case]
- Practical application: [How this truth should be lived out]

Would you like me to dive deeper into any specific aspect of this answer? I can provide more detailed biblical analysis, historical context, or practical applications.`;
    }

    // Default response for statements or unclear questions
    return `I understand you're wrestling with: "${input}"

This is exactly the kind of question that deserves a direct, biblical response. Let me address the core issue:

**The Biblical Answer:** Scripture directly speaks to this concern. The fundamental principle here is that God's character and His revealed Word provide the framework for understanding this issue.

**Key Considerations:**
1. What does Scripture explicitly teach about this?
2. How does this align with God's revealed character?
3. What practical implications does this have for believers?

**Direct Response:** Based on biblical teaching, the answer involves understanding both God's sovereignty and human responsibility, His love and His justice, His grace and His truth.

Could you help me understand which specific aspect of this issue is most challenging for you? I want to give you the most helpful biblical response possible.`;
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
      }
    };

    const modeResponses = responses[mode as keyof typeof responses];
    
    if (modeResponses?.triggers.some(trigger => lowerInput.includes(trigger))) {
      return modeResponses.response;
    }

    // Default responses by mode
    const defaults = {
      chat: "Thank you for sharing your heart with me. This is such an important question, and I'm honored you're seeking biblical truth. Let me offer you some Scripture-based encouragement and wisdom...",
      debate: getDirectDebateResponse(input)
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

  const getModeIcon = () => {
    switch (activeMode) {
      case "debate": return Users;
      default: return MessageSquare;
    }
  };

  const ModeIcon = getModeIcon();

  return (
    <div className="space-y-6">
      <Navigation activeMode={activeMode} onModeChange={setActiveMode} />

      <div className="h-[600px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 p-6 text-white">
          <div className="flex items-center space-x-3">
            <ModeIcon className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">
                {activeMode === "chat" ? "AI Apologist Chat" : "Muslim-Atheist Asks Mode"}
              </h2>
              <p className="text-indigo-100">
                {activeMode === "chat" ? "Personal guidance with love and truth" : "Tackling tough questions together"}
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
                activeMode === "debate" ? "Share your challenging theological question..." : "Ask your apologetics question here..."
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
