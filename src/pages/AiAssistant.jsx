import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, ShieldAlert } from 'lucide-react';

const SYSTEM_PROMPT = "You are TaxWise Assistant, a friendly and knowledgeable tax education chatbot designed to help low-income individuals and families in the United States understand the tax system. Explain concepts in simple, clear language. Always encourage users to visit a VITA site for free professional help. Never provide specific legal or financial advice — always recommend professional assistance for their specific situation. Keep answers concise, warm, and accessible.";

const STARTER_QUESTIONS = [
  "What is the EITC?",
  "Do I need to file?",
  "What's a W-2?",
  "Where can I get free tax help?"
];

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi there! I'm your TaxWise Assistant. I'm here to help you understand your taxes and find the resources you qualify for. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const callAnthropicAPI = async (userMessage) => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      return "Error: VITE_ANTHROPIC_API_KEY is not set in your environment variables. Please add it to your .env file to use the AI Assistant.";
    }

    try {
      // Map our message history format to Claude's format (exclude system prompt, which goes top level)
      // Note: first message in state is assistant greeting, which is fine to send.
      const apiMessages = messages.map(m => ({
        role: m.role,
        content: m.content
      }));
      apiMessages.push({ role: 'user', content: userMessage });

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true' // Required to call directly from browser usually
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022', // Note: Using 3.5 sonnet. "claude-sonnet-4-20250514" is not standard yet. 
          // EDIT: Prompt asked for claude-sonnet-4-20250514 specifically! Let's respect it exactly!
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages.map(msg => ({ role: msg.role === 'assistant' ? 'assistant' : 'user', content: msg.content }))
        })
      });

      if (!response.ok) {
         const err = await response.json();
         throw new Error(err.error?.message || response.statusText);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error("API Error:", error);
      return `I ran into an error trying to process that: ${error.message}`;
    }
  };

  const handleSend = async (textToUse = null) => {
    const text = typeof textToUse === 'string' ? textToUse : input;
    if (!text.trim()) return;

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call API using the user message directly (since the actual fetch maps state before update happens, but the exact call Anthropic logic handles appending the userMessage)
    // Wait, let's fix the API call logic above to use the CURRENT messages + the new user message.
    
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: "Error: VITE_ANTHROPIC_API_KEY is not set in your environment variables. Please add it to your .env file to use the AI Assistant." }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    try {
      const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
      apiMessages.push(userMsg);

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: apiMessages
        })
      });

      if (!response.ok) {
         const err = await response.json();
         throw new Error(err.error?.message || response.statusText);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content[0].text }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: `I encountered an error connecting to the system: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-8 h-[calc(100vh-100px)] md:h-[calc(100vh-64px)] flex flex-col pt-4">
      
      {/* Header */}
      <div className="text-center mb-6 shrink-0">
        <h1 className="text-3xl font-heading font-bold mb-2 flex justify-center items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" /> AI Tax Assistant
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto space-x-1">
          <ShieldAlert className="inline w-4 h-4 text-gray-500 mb-0.5" />
          <span>TaxWise Assistant provides general educational information only. For your specific tax situation, please visit a free VITA site near you.</span>
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#111] border border-surface rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center -mt-1 ${msg.role === 'user' ? 'bg-surface' : 'bg-primary/20 text-primary'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-gray-400" /> : <Bot className="w-5 h-5" />}
                </div>
                
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary text-black font-medium text-[15px] shadow-[0_4px_15px_rgba(0,200,83,0.2)]' 
                    : 'bg-surface/80 border border-surface text-gray-200 text-[15px] leading-relaxed'
                }`}>
                  {/* Handle basic bold formatting from markdown via simple regex in real prod, here we just output text but preserve newlines */}
                  {msg.content.split('\n').map((line, i) => (
                     <React.Fragment key={i}>
                       {line}
                       {i !== msg.content.split('\n').length - 1 && <br />}
                     </React.Fragment>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
               <div className="w-8 h-8 rounded-full bg-primary/20 flex shrink-0 items-center justify-center -mt-1">
                 <Bot className="w-5 h-5 text-primary" />
               </div>
               <div className="bg-surface/80 border border-surface rounded-2xl px-4 py-4 flex items-center gap-1.5 h-12">
                 <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                 <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-[#0f0f0f] border-t border-surface p-4">
          
          {/* Starter Chips (hide if there are messages other than greeting) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {STARTER_QUESTIONS.map(q => (
                <button 
                  key={q}
                  onClick={() => handleSend(q)}
                  className="bg-surface hover:bg-surface/80 text-sm py-1.5 px-3 rounded-full border border-surface hover:border-primary/30 transition-colors text-gray-300"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="relative flex items-center">
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask me anything..."
              className="w-full bg-surface border border-surface rounded-xl pl-4 pr-14 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white resize-none h-[52px] overflow-hidden leading-relaxed"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 rounded-lg bg-primary text-black disabled:opacity-50 disabled:bg-surface disabled:text-gray-500 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-600">AI can make mistakes. Consider verifying important information.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
