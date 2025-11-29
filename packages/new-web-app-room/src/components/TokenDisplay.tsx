'use client';

import { useState, useEffect } from 'react';
import { Coins, TrendingUp, Gift, Info } from 'lucide-react';

interface TokenStats {
  balance: number;
  earned: number;
  spent: number;
  streak: number;
}

export function TokenDisplay() {
  const [tokenStats, setTokenStats] = useState<TokenStats>({
    balance: 1250,
    earned: 2340,
    spent: 1090,
    streak: 7
  });

  const [recentEarnings, setRecentEarnings] = useState([
    { action: 'Asked about market trends', tokens: 15, time: '2 min ago' },
    { action: 'Applied investment insight', tokens: 25, time: '1 hour ago' },
    { action: 'Shared feedback on recommendation', tokens: 10, time: '3 hours ago' },
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Aura Tokens</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your engagement rewards</p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Balance Display */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {tokenStats.balance.toLocaleString()}
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span>+{tokenStats.earned - tokenStats.spent} this week</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-green-700 dark:text-green-400">
            {tokenStats.earned.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 dark:text-green-500">Total Earned</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            {tokenStats.spent.toLocaleString()}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-500">Total Spent</div>
        </div>
      </div>

      {/* Streak */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-purple-700 dark:text-purple-400">
              {tokenStats.streak} Day Streak
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-500">
              Keep engaging to maintain your streak!
            </div>
          </div>
          <div className="text-2xl">🔥</div>
        </div>
      </div>

      {/* Recent Earnings */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recent Earnings</h4>
        <div className="space-y-3">
          {recentEarnings.map((earning, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {earning.action}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {earning.time}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                <Coins className="w-4 h-4" />
                <span className="font-medium">+{earning.tokens}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-2">
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
          Unlock Premium Insights
        </button>
        <button className="w-full border border-purple-300 dark:border-purple-600 text-purple-600 dark:text-purple-400 py-2 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
          View Token History
        </button>
      </div>
    </div>
  );
}
