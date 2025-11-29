'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, TrendingUp, Gift, Star, Award, Target } from 'lucide-react';

interface TokenTransaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  timestamp: Date;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export default function TokenEconomy() {
  const [balance, setBalance] = useState(1250);
  const [totalEarned, setTotalEarned] = useState(2500);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([
    {
      id: '1',
      type: 'earned',
      amount: 50,
      description: 'Asked insightful question about market trends',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '2',
      type: 'spent',
      amount: 100,
      description: 'Unlocked detailed investment analysis',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '3',
      type: 'earned',
      amount: 75,
      description: 'Provided feedback on recommendation accuracy',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first interaction',
      reward: 25,
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: '2',
      title: 'Curious Mind',
      description: 'Ask 10 questions',
      reward: 100,
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: '3',
      title: 'Insight Seeker',
      description: 'Unlock 5 premium insights',
      reward: 200,
      unlocked: false,
      progress: 3,
      maxProgress: 5
    }
  ]);

  const earnTokens = (amount: number, description: string) => {
    const newTransaction: TokenTransaction = {
      id: Date.now().toString(),
      type: 'earned',
      amount,
      description,
      timestamp: new Date()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    setBalance(prev => prev + amount);
    setTotalEarned(prev => prev + amount);
  };

  const spendTokens = (amount: number, description: string) => {
    if (balance >= amount) {
      const newTransaction: TokenTransaction = {
        id: Date.now().toString(),
        type: 'spent',
        amount,
        description,
        timestamp: new Date()
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setBalance(prev => prev - amount);
    }
  };

  return (
    <div className="space-y-6">
      {/* Token Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <Coins className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Aura Tokens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {achievements.filter(a => a.unlocked).length}/{achievements.length}
            </div>
            <p className="text-xs text-muted-foreground">Unlocked</p>
          </CardContent>
        </Card>
      </div>

      {/* Earning Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Earn More Tokens
          </CardTitle>
          <CardDescription>
            Complete these actions to earn Aura Tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => earnTokens(25, 'Asked a question about market trends')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">+25 Tokens</span>
              </div>
              <span className="text-sm text-left">Ask an insightful question</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => earnTokens(50, 'Provided feedback on recommendation')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">+50 Tokens</span>
              </div>
              <span className="text-sm text-left">Rate a recommendation</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => earnTokens(100, 'Shared success story')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">+100 Tokens</span>
              </div>
              <span className="text-sm text-left">Share a success story</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => earnTokens(75, 'Completed daily challenge')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Coins className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">+75 Tokens</span>
              </div>
              <span className="text-sm text-left">Complete daily challenge</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Premium Insights
          </CardTitle>
          <CardDescription>
            Unlock deeper analysis and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Detailed Market Analysis</h4>
                <Badge variant="secondary">100 tokens</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Get comprehensive market insights with trend predictions
              </p>
              <Button 
                size="sm" 
                onClick={() => spendTokens(100, 'Unlocked detailed market analysis')}
                disabled={balance < 100}
              >
                Unlock
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Personal Investment Plan</h4>
                <Badge variant="secondary">200 tokens</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Customized investment strategy based on your goals
              </p>
              <Button 
                size="sm" 
                onClick={() => spendTokens(200, 'Unlocked personal investment plan')}
                disabled={balance < 200}
              >
                Unlock
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Risk Assessment Report</h4>
                <Badge variant="secondary">150 tokens</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Detailed analysis of potential risks and mitigation strategies
              </p>
              <Button 
                size="sm" 
                onClick={() => spendTokens(150, 'Unlocked risk assessment report')}
                disabled={balance < 150}
              >
                Unlock
              </Button>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">Priority Support</h4>
                <Badge variant="secondary">300 tokens</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Get faster responses and dedicated assistance
              </p>
              <Button 
                size="sm" 
                onClick={() => spendTokens(300, 'Unlocked priority support')}
                disabled={balance < 300}
              >
                Unlock
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Track your progress and unlock rewards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    {achievement.title}
                    {achievement.unlocked && <Badge variant="default">Unlocked</Badge>}
                  </h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <Badge variant="outline">+{achievement.reward} tokens</Badge>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <Progress 
                  value={(achievement.progress / achievement.maxProgress) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest token activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'earned' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    <Coins className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
