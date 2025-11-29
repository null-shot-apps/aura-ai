'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Bot, User, Eye, Coins } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  reasoning?: string;
  tokensEarned?: number;
  mcpData?: any;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m Aura-AI, your transparent AI companion. I provide actionable insights with clear reasoning. Ask me about finance, learning opportunities, business trends, or any decision you\'re considering.',
      timestamp: new Date(),
      reasoning: 'Initial greeting to establish transparency and capabilities',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReasoning, setShowReasoning] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response with reasoning
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        reasoning: generateReasoning(inputValue),
        tokensEarned: Math.floor(Math.random() * 10) + 5,
        mcpData: {
          queryId: `q_${Date.now()}`,
          category: detectCategory(),
          confidence: 0.85 + Math.random() * 0.15,
        }
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const responses = [
      `Based on current market trends and your query about "${query}", I recommend focusing on emerging opportunities in this space. Here's my analysis...`,
      `I've analyzed your question about "${query}" and identified 3 key insights that could impact your decision...`,
      `Your inquiry about "${query}" touches on several important factors. Let me break down the actionable recommendations...`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateReasoning = (query: string): string => {
    return `I analyzed your query using multiple data sources including market trends, historical patterns, and current indicators. My reasoning process involved: 1) Context analysis of "${query}", 2) Cross-referencing with similar scenarios, 3) Applying risk-benefit analysis, 4) Generating actionable recommendations based on probability weights.`;
  };

  const detectCategory = (): string => {
    const categories = ['finance', 'learning', 'business', 'trends', 'personal'];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Aura-AI Assistant</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Transparent • MCP-Powered • Real Impact</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-600 dark:text-green-400">● Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-2">
                        {message.tokensEarned && (
                          <span className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                            <Coins className="w-3 h-3" />
                            <span>+{message.tokensEarned}</span>
                          </span>
                        )}
                        {message.reasoning && (
                          <button
                            onClick={() => setShowReasoning(showReasoning === message.id ? null : message.id)}
                            className="flex items-center space-x-1 hover:text-purple-600 dark:hover:text-purple-400"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Reasoning</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {showReasoning === message.id && message.reasoning && (
                    <div className="mt-2 p-2 bg-purple-50 dark:bg-purple-900/30 rounded text-xs">
                      <strong>Transparent Reasoning:</strong>
                      <p className="mt-1">{message.reasoning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-purple-200 dark:border-purple-700">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for insights, opportunities, or guidance..."
              className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700 disabled:text-gray-400 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <button className="p-2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            <Mic className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          All interactions are stored as MCP objects for transparency and agent collaboration
        </p>
      </div>
    </div>
  );
}


