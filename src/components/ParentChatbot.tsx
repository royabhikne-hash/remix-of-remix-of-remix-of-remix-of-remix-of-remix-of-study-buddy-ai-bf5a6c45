import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Volume2, VolumeX, Loader2, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ParentChatbotProps {
  token: string;
  studentName: string;
}

const ParentChatbot = ({ token, studentName }: ParentChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Namaste! Main Study Buddy AI ka Parent Assistant hoon. Aap ${studentName} ki padhai, performance, ya kisi bhi topic ke baare mein poochh sakte hain. Hindi ya English mein poochhein!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-speak the first welcome message
  useEffect(() => {
    if (autoSpeak && messages.length === 1 && messages[0].role === "assistant") {
      speakText(messages[0].content);
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (!autoSpeak || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    
    // Break into chunks for stability
    const chunks = text.match(/.{1,150}[.!?,\s]|.+$/g) || [text];
    
    setIsSpeaking(true);
    let chunkIndex = 0;

    const speakNext = () => {
      if (chunkIndex >= chunks.length) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex].trim());
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      // Try to find an Indian English voice
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(
        (v) => v.lang === "en-IN" || (v.lang.startsWith("en") && v.name.toLowerCase().includes("india"))
      );
      const englishVoice = voices.find((v) => v.lang.startsWith("en"));
      if (indianVoice) utterance.voice = indianVoice;
      else if (englishVoice) utterance.voice = englishVoice;

      utterance.onend = () => {
        chunkIndex++;
        speakNext();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  }, [autoSpeak]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("parent-chat", {
        body: {
          token,
          message: userMsg.content,
          chatHistory: messages.slice(-6),
        },
      });

      if (error) throw error;

      const aiText = data?.response || "Sorry, I could not get a response. Please try again.";
      const assistantMsg: Message = { role: "assistant", content: aiText };
      setMessages((prev) => [...prev, assistantMsg]);

      // Auto-speak the response
      if (autoSpeak) {
        speakText(aiText);
      }
    } catch (err) {
      console.error("Parent chat error:", err);
      toast.error("Could not get a response. Please try again.");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "Mere bachche ki performance kaisi hai?",
    "Weak subjects kaunse hain?",
    "Is hafte kitna padha?",
    "Improve karne ke tips do",
    "How is my child performing?",
    "Any tips to improve?",
  ];

  if (!isOpen) {
    return (
      <div 
        style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 99999 }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-primary-foreground rounded-full p-4 shadow-2xl hover:shadow-xl transition-all hover:scale-105 animate-bounce"
          style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Open Parent Chatbot"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: 99999, width: '360px', maxWidth: 'calc(100vw - 2rem)' }} className="animate-in slide-in-from-bottom-4 fade-in duration-300">
      <Card className="flex flex-col h-[500px] max-h-[70vh] shadow-2xl border-primary/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            <div>
              <p className="font-semibold text-sm">Parent Assistant</p>
              <p className="text-xs opacity-80">{studentName} ke baare mein poochhein</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => {
                setAutoSpeak(!autoSpeak);
                if (isSpeaking) stopSpeaking();
              }}
              title={autoSpeak ? "Turn off auto-speak" : "Turn on auto-speak"}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => {
                setIsOpen(false);
                stopSpeaking();
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-background">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-md">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions (show only at start) */}
        {messages.length <= 1 && (
          <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-border">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  const userMsg: Message = { role: "user", content: q };
                  setMessages((prev) => [...prev, userMsg]);
                  setIsLoading(true);
                  supabase.functions.invoke("parent-chat", {
                    body: { token, message: q, chatHistory: messages.slice(-6) },
                  }).then(({ data, error }) => {
                    const aiText = data?.response || "Sorry, please try again.";
                    setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
                    if (autoSpeak) speakText(aiText);
                  }).catch(() => {
                    setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong." }]);
                  }).finally(() => setIsLoading(false));
                }}
                className="text-xs px-2.5 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-3 border-t border-border flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Hindi ya English mein poochhein..."
            className="text-sm"
            disabled={isLoading}
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ParentChatbot;
