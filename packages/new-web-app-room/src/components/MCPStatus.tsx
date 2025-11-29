'use client';

import { useState } from 'react';
import { Database, Network, Shield, Activity, CheckCircle, AlertCircle } from 'lucide-react';

interface MCPResource {
  id: string;
  type: 'query' | 'response' | 'token' | 'insight';
  timestamp: Date;
  status: 'stored' | 'processing' | 'error';
  agentSource?: string;
}

interface MCPStats {
  totalResources: number;
  queriesStored: number;
  responsesStored: number;
  tokensTracked: number;
  agentCollaborations: number;
  uptime: number;
}

export function MCPStatus() {
  const [mcpStats] = useState<MCPStats>({
    totalResources: 15847,
    queriesStored: 6234,
    responsesStored: 6234,
    tokensTracked: 3379,
    agentCollaborations: 127,
    uptime: 99.8
  });

  const [recentResources] = useState<MCPResource[]>([
    {
      id: 'mcp_001',
      type: 'query',
      timestamp: new Date(Date.now() - 30000),
      status: 'stored',
      agentSource: 'user-interface'
    },
    {
      id: 'mcp_002',
      type: 'response',
      timestamp: new Date(Date.now() - 45000),
      status: 'stored',
      agentSource: 'aura-ai-core'
    },
    {
      id: 'mcp_003',
      type: 'token',
      timestamp: new Date(Date.now() - 60000),
      status: 'stored',
      agentSource: 'token-economy'
    },
    {
      id: 'mcp_004',
      type: 'insight',
      timestamp: new Date(Date.now() - 120000),
      status: 'processing',
      agentSource: 'market-analysis-agent'
    }
  ]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'query': return <Database className="w-4 h-4" />;
      case 'response': return <Network className="w-4 h-4" />;
      case 'token': return <Shield className="w-4 h-4" />;
      case 'insight': return <Activity className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stored': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing': return <Activity className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-purple-200 dark:border-purple-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">MCP Protocol Status</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Model Context Protocol Integration</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            {mcpStats.uptime}% Uptime
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                {mcpStats.totalResources.toLocaleString()}
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">Total Resources</div>
            </div>
            <Database className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-green-700 dark:text-green-400">
                {mcpStats.agentCollaborations}
              </div>
              <div className="text-xs text-green-600 dark:text-green-500">Agent Collaborations</div>
            </div>
            <Network className="w-5 h-5 text-green-500" />
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                {mcpStats.queriesStored.toLocaleString()}
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-500">Queries Stored</div>
            </div>
            <Activity className="w-5 h-5 text-purple-500" />
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-yellow-700 dark:text-yellow-400">
                {mcpStats.tokensTracked.toLocaleString()}
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-500">Tokens Tracked</div>
            </div>
            <Shield className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Recent MCP Activity</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentResources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-purple-600 dark:text-purple-400">
                  {getResourceIcon(resource.type)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {resource.type} Resource
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    from {resource.agentSource} • {formatTimeAgo(resource.timestamp)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(resource.status)}
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {resource.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Benefits */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">MCP Benefits</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Full transparency in AI reasoning and decisions</li>
          <li>• Agent-to-agent collaboration and verification</li>
          <li>• Composable AI services and data sharing</li>
          <li>• Audit trail for all interactions and tokens</li>
        </ul>
      </div>
    </div>
  );
}



