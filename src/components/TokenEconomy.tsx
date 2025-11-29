'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, TrendingUp, Gift, Star } from 'lucide-react';

interface TokenTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  timestamp: Date;
}

export default function TokenEconomy() {
  const [balance, setBalance] = useState(150);
  const [transactions] = useState<TokenTransaction[]>([
    {
      id: '1',
      type: 'earned',
      amount: 25,
      description: 'Applied investment insight',
      timestamp: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      type: 'spent',
      amount: 50,
      description: 'Unlocked premium market analysis',
      timestamp: new Date('2024-01-14T15:45:00')
    },
    {
      id: '3',
      type: 'earned',
      amount: 15,
      description: 'Completed learning module',
      timestamp: new Date('2024-01-13T09:20:00')
    }
  ]);

  const earnTokens = (amount: number, description: string) => {
    setBalance(prev => prev + amount);
    // In real implementation, this would update the MCP database
  };

  return (
    <div className="space-y-6">
      {/* Token Balance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-500" />
            Aura Token Balance
          </CardTitle>
          <CardDescription>
            Earn tokens by engaging with insights and applying recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-500 mb-4">
            {balance} AURA
          </div>
          <Progress value={65} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            65% towards next tier (Premium Insights)
          </p>
        </CardContent>
      </Card>

      {/* Ways to Earn */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Ways to Earn Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Apply Insights</h4>
                <Badge variant="secondary">+25 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Implement AI recommendations and report results
              </p>
              <Button 
                size="sm" 
                className="mt-2"
                onClick={() => earnTokens(25, 'Applied insight')}
              >
                Report Success
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Complete Learning</h4>
                <Badge variant="secondary">+15 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Finish educational modules and quizzes
              </p>
              <Button 
                size="sm" 
                className="mt-2"
                onClick={() => earnTokens(15, 'Completed learning')}
              >
                Complete Module
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Share Feedback</h4>
                <Badge variant="secondary">+10 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Provide quality feedback on recommendations
              </p>
              <Button 
                size="sm" 
                className="mt-2"
                onClick={() => earnTokens(10, 'Shared feedback')}
              >
                Give Feedback
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Daily Check-in</h4>
                <Badge variant="secondary">+5 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Engage with the platform daily
              </p>
              <Button 
                size="sm" 
                className="mt-2"
                onClick={() => earnTokens(5, 'Daily check-in')}
              >
                Check In
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-purple-500" />
            Unlock Premium Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Deep Market Analysis</h4>
                <Badge variant="outline">50 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Detailed market trends and investment opportunities
              </p>
              <Button size="sm" className="mt-2" disabled={balance < 50}>
                Unlock
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Personal AI Tutor</h4>
                <Badge variant="outline">75 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                One-on-one learning sessions with specialized AI
              </p>
              <Button size="sm" className="mt-2" disabled={balance < 75}>
                Unlock
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Business Opportunity Scanner</h4>
                <Badge variant="outline">100 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered business opportunity identification
              </p>
              <Button size="sm" className="mt-2" disabled={balance < 100}>
                Unlock
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Priority Support</h4>
                <Badge variant="outline">30 AURA</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Get faster responses and premium support
              </p>
              <Button size="sm" className="mt-2" disabled={balance < 30}>
                Unlock
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'earned' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <Star className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={`font-bold ${
                  transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'earned' ? '+' : '-'}{transaction.amount} AURA
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
