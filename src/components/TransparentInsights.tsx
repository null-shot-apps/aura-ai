'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Brain, Eye, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface InsightStep {
  step: number;
  title: string;
  description: string;
  reasoning: string;
  confidence: number;
}

interface Insight {
  id: string;
  query: string;
  recommendation: string;
  reasoning: InsightStep[];
  confidence: number;
  category: 'finance' | 'learning' | 'business' | 'personal';
  timestamp: Date;
  status: 'pending' | 'applied' | 'dismissed';
}

export default function TransparentInsights() {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      query: 'Should I invest in renewable energy stocks?',
      recommendation: 'Consider a diversified renewable energy ETF with 5-10% of your portfolio',
      reasoning: [
        {
          step: 1,
          title: 'Market Analysis',
          description: 'Analyzed current renewable energy market trends',
          reasoning: 'Global renewable energy investments increased 8% in 2023, with strong government support',
          confidence: 85
        },
        {
          step: 2,
          title: 'Risk Assessment',
          description: 'Evaluated portfolio risk and diversification',
          reasoning: 'ETFs provide better diversification than individual stocks, reducing sector-specific risks',
          confidence: 90
        },
        {
          step: 3,
          title: 'Personal Fit',
          description: 'Matched recommendation to your risk profile',
          reasoning: 'Based on your moderate risk tolerance and long-term investment horizon',
          confidence: 80
        }
      ],
      confidence: 85,
      category: 'finance',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'pending'
    }
  ]);

  const generateInsight = async () => {
    if (!query.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newInsight: Insight = {
        id: Date.now().toString(),
        query,
        recommendation: 'AI-generated recommendation based on your query',
        reasoning: [
          {
            step: 1,
            title: 'Data Collection',
            description: 'Gathered relevant information from multiple sources',
            reasoning: 'Analyzed market data, trends, and expert opinions',
            confidence: 88
          },
          {
            step: 2,
            title: 'Pattern Recognition',
            description: 'Identified key patterns and correlations',
            reasoning: 'Found strong correlations between historical data and current conditions',
            confidence: 82
          },
          {
            step: 3,
            title: 'Recommendation Synthesis',
            description: 'Synthesized findings into actionable recommendation',
            reasoning: 'Combined analysis with your personal context and goals',
            confidence: 85
          }
        ],
        confidence: 85,
        category: 'business',
        timestamp: new Date(),
        status: 'pending'
      };
      
      setInsights(prev => [newInsight, ...prev]);
      setQuery('');
      setIsGenerating(false);
    }, 2000);
  };

  const updateInsightStatus = (id: string, status: 'applied' | 'dismissed') => {
    setInsights(prev => prev.map(insight => 
      insight.id === id ? { ...insight, status } : insight
    ));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'finance': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'business': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'dismissed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Query Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Ask Aura-AI
          </CardTitle>
          <CardDescription>
            Get transparent, actionable insights with full reasoning breakdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Ask about investments, learning opportunities, business decisions, or personal goals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px]"
            />
            <Button 
              onClick={generateInsight}
              disabled={!query.trim() || isGenerating}
              className="w-full"
            >
              {isGenerating ? 'Generating Insight...' : 'Get AI Insight'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(insight.category)}>
                      {insight.category}
                    </Badge>
                    {getStatusIcon(insight.status)}
                    <span className="text-sm text-muted-foreground">
                      {insight.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{insight.query}</CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Confidence</div>
                  <div className="text-2xl font-bold text-blue-500">
                    {insight.confidence}%
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Recommendation */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-2">Recommendation</h4>
                <p className="text-blue-800">{insight.recommendation}</p>
              </div>

              {/* Transparent Reasoning */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-5 w-5 text-gray-500" />
                  <h4 className="font-semibold">Transparent Reasoning Process</h4>
                </div>
                
                {insight.reasoning.map((step, index) => (
                  <div key={index} className="relative">
                    {index < insight.reasoning.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{step.title}</h5>
                          <Badge variant="outline">{step.confidence}% confident</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {step.description}
                        </p>
                        <p className="text-sm bg-gray-50 p-3 rounded border-l-2 border-gray-300">
                          <strong>Reasoning:</strong> {step.reasoning}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {insight.status === 'pending' && (
                <div className="flex gap-2 mt-6 pt-4 border-t">
                  <Button 
                    onClick={() => updateInsightStatus(insight.id, 'applied')}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Applied This Insight
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => updateInsightStatus(insight.id, 'dismissed')}
                    className="flex-1"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Not Relevant
                  </Button>
                </div>
              )}

              {insight.status === 'applied' && (
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Great! You've earned 25 AURA tokens for applying this insight.
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
