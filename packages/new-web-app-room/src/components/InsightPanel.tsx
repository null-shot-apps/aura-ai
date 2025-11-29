'use client';

import { useState } from 'react';
import { TrendingUp, Lightbulb, Target, Clock, ExternalLink, Star } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  category: 'finance' | 'learning' | 'business' | 'trends';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  description: string;
  actionable: boolean;
  mcpSource: string;
}

export function InsightPanel() {
  const [activeTab, setActiveTab] = useState<'trending' | 'personalized' | 'opportunities'>('trending');
  
  const insights: Insight[] = [
    {
      id: '1',
      title: 'AI Infrastructure Stocks Surge',
      category: 'finance',
      confidence: 0.92,
      impact: 'high',
      timeframe: '1-3 months',
      description: 'Major cloud providers showing 40% growth in AI-related revenue. Consider diversified AI ETFs.',
      actionable: true,
      mcpSource: 'market-analysis-agent'
    },
    {
      id: '2',
      title: 'Python Certification Demand',
      category: 'learning',
      confidence: 0.87,
      impact: 'medium',
      timeframe: '6 months',
      description: 'Python skills in data science showing 60% salary premium. AWS/Google certifications recommended.',
      actionable: true,
      mcpSource: 'career-insights-agent'
    },
    {
      id: '3',
      title: 'Remote Work Policy Changes',
      category: 'business',
      confidence: 0.78,
      impact: 'medium',
      timeframe: '2-4 weeks',
      description: 'Companies implementing hybrid policies. Opportunity for productivity consulting services.',
      actionable: true,
      mcpSource: 'business-trends-agent'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'finance': return <TrendingUp className="w-4 h-4" />;
      case 'learning': return <Lightbulb className="w-4 h-4" />;
      case 'business': return <Target className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700">
      {/* Header with Tabs */}
      <div className="p-4 border-b border-purple-200 dark:border-purple-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">AI Insights</h3>
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { key: 'trending', label: 'Trending' },
            { key: 'personalized', label: 'For You' },
            { key: 'opportunities', label: 'Opportunities' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Insights List */}
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {insights.map((insight) => (
          <div key={insight.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-purple-600 dark:text-purple-400">
                  {getCategoryIcon(insight.category)}
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  {insight.title}
                </h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                {insight.impact}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {insight.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{insight.timeframe}</span>
                </span>
                <span>
                  {Math.round(insight.confidence * 100)}% confidence
                </span>
              </div>
              <span className="text-purple-600 dark:text-purple-400">
                via {insight.mcpSource}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {insight.actionable && (
                  <button className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                    Take Action
                  </button>
                )}
                <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Learn More
                </button>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-purple-200 dark:border-purple-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Powered by MCP Agent Network
          </span>
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
            View All Insights
          </button>
        </div>
      </div>
    </div>
  );
}
