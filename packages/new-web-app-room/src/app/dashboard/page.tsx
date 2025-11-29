'use client';

import { AuraHeader } from '@/components/AuraHeader';
import { ChatInterface } from '@/components/ChatInterface';
import { TokenDisplay } from '@/components/TokenDisplay';
import { InsightPanel } from '@/components/InsightPanel';
import { PlatformIntegrations } from '@/components/PlatformIntegrations';
import { MCPStatus } from '@/components/MCPStatus';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      <AuraHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Chat Interface */}
          <div className="xl:col-span-2">
            <ChatInterface />
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            <TokenDisplay />
            <InsightPanel />
          </div>

          {/* Left Sidebar - Platform & MCP Status */}
          <div className="xl:order-first space-y-6">
            <PlatformIntegrations />
            <MCPStatus />
          </div>
        </div>
      </main>
    </div>
  );
}


