import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, AlertCircle, Download, ThumbsUp, ThumbsDown, Share2, Mic, MicOff, Settings, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMessageUsage } from "@/hooks/useMessageUsage";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'positive' | 'negative' | null;
  topic?: string;
}

interface ChatInterfaceProps {
  selectedTopic?: string | null;
}

export const EnhancedChatInterface = ({ selectedTopic }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();
  const { remainingMessages, loading: usageLoading, refreshUsage } = useMessageUsage();
  const { toast } = useToast();

  // Generate conversation ID for this session
  useEffect(() => {
    if (!conversationId) {
      setConversationId(`conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [conversationId]);

  const scrollToBottom = () => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, autoScroll]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  useEffect(() => {
    // Add welcome message when topic is selected or when starting direct chat
    if (selectedTopic) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: `Hello! I'm ready to help you with questions about ${selectedTopic}. Ask any question an atheist, Muslim, or skeptic might throw at you — and get a Scripture-backed, logical response in seconds.`,
        sender: 'bot',
        timestamp: new Date(),
        topic: selectedTopic
      };
      setMessages([welcomeMessage]);
    } else {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: `Ask any question an atheist, Muslim, or skeptic might throw at you — and get a Scripture-backed, logical response in seconds.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedTopic]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;
    
    if (remainingMessages <= 0) {
      toast({
        title: "Daily Limit Reached",
        description: "You've used all 15 messages for today. Try again tomorrow!",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      topic: selectedTopic || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-gpt', {
        body: {
          message: inputMessage,
          topic: selectedTopic,
          conversationId: conversationId
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        if (error.message && error.message.includes('Daily message limit reached')) {
          toast({
            title: "Daily Limit Reached",
            description: "You've reached your daily message limit.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
        topic: selectedTopic || undefined
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Refresh usage count
      refreshUsage();

      toast({
        title: "Message sent",
        description: `${data.remaining} messages remaining today`,
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback } : msg
    ));
    
    toast({
      title: "Feedback recorded",
      description: "Thank you for your feedback!",
    });
  };

  const exportConversation = () => {
    const conversationText = messages
      .map(msg => `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `christtask-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversation exported",
      description: "Your conversation has been downloaded.",
    });
  };

  const shareConversation = async () => {
    const conversationText = messages
      .map(msg => `${msg.sender === 'user' ? 'You' : 'AI'}: ${msg.content}`)
      .join('\n\n');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ChristTask Conversation',
          text: conversationText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(conversationText);
      toast({
        title: "Conversation copied",
        description: "Conversation copied to clipboard!",
      });
    }
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak your message now.",
        });
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        setIsListening(false);
        toast({
          title: "Voice input error",
          description: "Please try again or type your message.",
          variant: "destructive",
        });
      };
      
      recognition.start();
    } else {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive",
      });
    }
  };

  const getConversationStats = () => {
    const userMessages = messages.filter(m => m.sender === 'user').length;
    const botMessages = messages.filter(m => m.sender === 'bot').length;
    const positiveFeedback = messages.filter(m => m.feedback === 'positive').length;
    const negativeFeedback = messages.filter(m => m.feedback === 'negative').length;
    const totalWords = messages.reduce((acc, msg) => acc + msg.content.split(' ').length, 0);
    
    return { userMessages, botMessages, positiveFeedback, negativeFeedback, totalWords };
  };

  if (usageLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  const stats = getConversationStats();

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      {/* Header with usage info and controls */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold">
              {selectedTopic ? `${selectedTopic} Debate Buddy` : 'Debate Buddy'}
            </h3>
            {conversationId && (
              <Badge variant="secondary" className="text-xs">
                Session: {conversationId.slice(-8)}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{remainingMessages} messages left</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStats(!showStats)}
                    className="text-white hover:bg-white/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Conversation stats</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Chat settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Stats panel */}
        {showStats && (
          <div className="mt-3 p-3 bg-white/10 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-semibold">Messages</div>
                <div>You: {stats.userMessages} | AI: {stats.botMessages}</div>
              </div>
              <div>
                <div className="font-semibold">Feedback</div>
                <div>👍 {stats.positiveFeedback} | 👎 {stats.negativeFeedback}</div>
              </div>
              <div>
                <div className="font-semibold">Words</div>
                <div>{stats.totalWords} total</div>
              </div>
              <div>
                <div className="font-semibold">Session</div>
                <div>{conversationId?.slice(-8)}</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings panel */}
        {showSettings && (
          <div className="mt-3 p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-scroll"
                checked={autoScroll}
                onCheckedChange={setAutoScroll}
              />
              <Label htmlFor="auto-scroll" className="text-sm text-white">
                Auto-scroll to new messages
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex flex-col space-y-1">
              <Card
                className={`max-w-[80%] p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>
              
              {/* Feedback buttons for bot messages */}
              {message.sender === 'bot' && (
                <div className="flex items-center space-x-1 ml-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, 'positive')}
                          className={`h-6 w-6 p-0 ${
                            message.feedback === 'positive' 
                              ? 'text-green-600' 
                              : 'text-slate-400 hover:text-green-600'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Good response</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFeedback(message.id, 'negative')}
                          className={`h-6 w-6 p-0 ${
                            message.feedback === 'negative' 
                              ? 'text-red-600' 
                              : 'text-slate-400 hover:text-red-600'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Could be better</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <Card className="bg-slate-100 p-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-xs text-slate-500">AI is typing...</span>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input and controls */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={remainingMessages > 0 ? "Type your message..." : "Daily limit reached. Try again tomorrow."}
            className="flex-1 min-h-[40px] max-h-[120px] resize-none"
            disabled={isLoading || remainingMessages <= 0}
          />
          <div className="flex flex-col space-y-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={startVoiceInput}
                    disabled={isListening || isLoading || remainingMessages <= 0}
                    className="h-10 w-10 p-0"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isListening ? 'Stop listening' : 'Voice input'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading || remainingMessages <= 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-10"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Action buttons */}
        {messages.length > 1 && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportConversation}
                      className="text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download conversation as text file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={shareConversation}
                      className="text-xs"
                    >
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share conversation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="text-xs text-slate-500">
              {stats.userMessages} messages sent
            </div>
          </div>
        )}
        
        {remainingMessages <= 0 && (
          <p className="text-sm text-red-600 mt-2">
            You've reached your daily limit of 15 messages. Your limit will reset tomorrow.
          </p>
        )}
      </div>
    </div>
  );
};
