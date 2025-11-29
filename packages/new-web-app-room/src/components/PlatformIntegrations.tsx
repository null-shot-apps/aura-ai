'use client';

import { useState } from 'react';
import { MessageCircle, Send, Bot, Smartphone, Globe, Zap } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'connected' | 'disconnected' | 'pending';
  users: number;
  description: string;
}

export function PlatformIntegrations() {
  const [platforms] = useState<Platform[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      status: 'connected',
      users: 1247,
      description: 'Direct messaging with Aura-AI via WhatsApp Business API'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <Send className="w-6 h-6" />,
      status: 'connected',
      users: 892,
      description: 'Telegram bot integration for instant AI insights'
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: <Bot className="w-6 h-6" />,
      status: 'pending',
      users: 0,
      description: 'Discord server bot for community-based AI assistance'
    },
    {
      id: 'web',
      name: 'Web Dashboard',
      icon: <Globe className="w-6 h-6" />,
      status: 'connected',
      users: 2156,
      description: 'Full-featured web interface with advanced analytics'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'disconnected': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Platform Integrations</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Multi-platform AI accessibility</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {platforms.map((platform) => (
          <div key={platform.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-purple-600 dark:text-purple-400">
                  {platform.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {platform.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {platform.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(platform.status)}`}>
                  {platform.status}
                </span>
                {platform.status === 'connected' && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {platform.users.toLocaleString()} users
                  </div>
                )}
              </div>
            </div>

            {platform.status === 'connected' && (
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                  Manage
                </button>
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Analytics
                </button>
              </div>
            )}

            {platform.status === 'pending' && (
              <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                Complete Setup
              </button>
            )}

            {platform.status === 'disconnected' && (
              <button className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-purple-700 dark:text-purple-400">
              Total Active Users
            </h4>
            <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">
              {platforms.reduce((sum, p) => sum + p.users, 0).toLocaleString()}
            </p>
          </div>
          <div className="text-purple-600 dark:text-purple-400">
            <Smartphone className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
