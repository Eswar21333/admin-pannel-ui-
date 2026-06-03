import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Zap, Sparkles, Link, Settings as SettingsIcon, Bell, Search, Terminal, Menu, X } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import MemberManagement from '../components/MemberManagement';
import Workflows from '../components/Workflows';
import AITemplates from '../components/AITemplates';
import Integrations from '../components/Integrations';
import SettingsView from '../components/Settings';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Stats Dashboard Metrics
  const [stats, setStats] = useState({
    totalMembers: 12845,
    activeLogins: 1450,
    paidSubscribers: 3268,
    mrr: 48920,
  });

  // Mock Members Directory
  const [members, setMembers] = useState([
    { id: '1', name: 'Sophia Chen', email: 'sophia.chen@example.com', plan: 'Enterprise Max', status: 'Active', activePipelines: 4, monthlyGenerations: 120, lastLogin: 'Just Now', ipAddress: '192.168.1.104' },
    { id: '2', name: 'Marcus Sterling', email: 'marcus.s@example.com', plan: 'Creator Pro', status: 'Active', activePipelines: 2, monthlyGenerations: 45, lastLogin: '3 mins ago', ipAddress: '104.22.45.81' },
    { id: '3', name: 'Liam O\'Connor', email: 'liam.oc@example.com', plan: 'Free', status: 'Trial', activePipelines: 1, monthlyGenerations: 5, lastLogin: '12 mins ago', ipAddress: '72.181.9.23' },
    { id: '4', name: 'Elena Rostova', email: 'elena.r@example.com', plan: 'Creator Pro', status: 'Past_Due', activePipelines: 0, monthlyGenerations: 18, lastLogin: '1 hour ago', ipAddress: '201.88.94.12' },
    { id: '5', name: 'David Kojo', email: 'david.kojo@example.com', plan: 'Enterprise Max', status: 'Active', activePipelines: 6, monthlyGenerations: 250, lastLogin: '2 hours ago', ipAddress: '98.12.33.109' },
    { id: '6', name: 'Amélie Dupont', email: 'amelie@example.com', plan: 'Creator Pro', status: 'Active', activePipelines: 2, monthlyGenerations: 30, lastLogin: 'Yesterday', ipAddress: '46.12.98.243' },
    { id: '7', name: 'Kenji Sato', email: 'kenji.s@example.com', plan: 'Custom Trial', status: 'Suspended', activePipelines: 0, monthlyGenerations: 0, lastLogin: '5 days ago', ipAddress: '122.9.24.111' },
    { id: '8', name: 'Zara Hadid', email: 'zara.h@example.com', plan: 'Free', status: 'Active', activePipelines: 1, monthlyGenerations: 2, lastLogin: '6 days ago', ipAddress: '155.88.1.20' }
  ]);

  // Mock Workflows
  const [workflows, setWorkflows] = useState([
    { id: 'wf1', name: 'Auto Tech Blogger', source: 'RSS Feed', model: 'Claude 3.5 Sonnet', template: 'SEO Blog Builder', target: 'WordPress Blog', active: true, lastRun: '15 mins ago', runsThisMonth: 124 },
    { id: 'wf2', name: 'LinkedIn Syndicate', source: 'Manual Trigger', model: 'Claude 3.5 Sonnet', template: 'LinkedIn Hook', target: 'LinkedIn Profile', active: true, lastRun: '2 hours ago', runsThisMonth: 48 },
    { id: 'wf3', name: 'Twitter Feed Blast', source: 'API Hook', model: 'GPT-4o Omniverse', template: 'Twitter Summarizer', target: 'Twitter Account', active: false, lastRun: '3 days ago', runsThisMonth: 12 }
  ]);

  // Mock Templates
  const [templates, setTemplates] = useState([
    { id: 't1', name: 'SEO Blog Builder', category: 'Blog', description: 'Generates detailed SEO-optimized structural articles.', prompt: 'You are an elite copywriter. Write a 1500-word highly optimized SEO blog post based on the following topics:\n[TOPICS]\nUse appropriate formatting, subheadings, and bold highlights. Tone of voice should be [TONE].', parameters: { temperature: 0.7, length: 1500, tone: 'professional' } },
    { id: 't2', name: 'LinkedIn Hook', category: 'Social', description: 'Synthesizes textual summaries into viral professional hooks.', prompt: 'Create 3 alternative viral LinkedIn post frameworks about this subject:\n[SUBJECT]\nInclude bulleted structures, professional emojis, and a concluding call to action. Keep readability high.', parameters: { temperature: 0.9, length: 300, tone: 'casual' } },
    { id: 't3', name: 'Twitter Summarizer', category: 'Social', description: 'Compresses long documents into elegant bite-sized tweets.', prompt: 'Draft a short 280-character thread of 3 tweets summarizing the main ideas from this content:\n[CONTENT]\nMaintain high punchiness.', parameters: { temperature: 0.5, length: 140, tone: 'witty' } }
  ]);

  // Mock Integrations
  const [integrations, setIntegrations] = useState([
    { id: 'i1', name: 'WordPress Blog', type: 'publishing', description: 'Publish articles straight to WordPress as live posts or draft pages.', connected: true, endpoint: 'https://wp.contentauto.ui/wp-json', apiKey: '••••••••••••••••' },
    { id: 'i2', name: 'LinkedIn Profile', type: 'publishing', description: 'Syndicate text posts, PDF document carousels directly to feeds.', connected: true, endpoint: 'https://api.linkedin.com/v2', apiKey: '••••••••••••••••' },
    { id: 'i3', name: 'Twitter Account', type: 'publishing', description: 'Automate tweet updates and threads straight to Twitter feeds.', connected: false, endpoint: '', apiKey: '' },
    { id: 'i4', name: 'OpenAI API Core', type: 'llm', description: 'Access GPT models for high-quality conversational output.', connected: true, endpoint: 'https://api.openai.com/v1', apiKey: '••••••••••••••••' },
    { id: 'i5', name: 'Anthropic Claude', type: 'llm', description: 'Hook Sonnet and Opus models into pipeline automation generators.', connected: true, endpoint: 'https://api.anthropic.com/v1', apiKey: '••••••••••••••••' },
    { id: 'i6', name: 'Stripe Billing System', type: 'payment', description: 'Synchronize sub accounts, customer invoicing, and MRR growth indexes.', connected: true, endpoint: 'https://api.stripe.com/v1', apiKey: '••••••••••••••••' }
  ]);

  // Mock Activities stream
  const [activities, setActivities] = useState([
    { id: 'a1', type: 'login', message: 'Sophia Chen logged in successfully from 192.168.1.104', time: 'Just Now' },
    { id: 'a2', type: 'workflow', message: 'Pipeline "Auto Tech Blogger" executed: 1 post published to WordPress Blog', time: '15 mins ago' },
    { id: 'a3', type: 'purchase', message: 'Marcus Sterling upgraded account to Creator Pro tier ($49/mo)', time: '30 mins ago' },
    { id: 'a4', type: 'login', message: 'Liam O\'Connor signed in using Google SSO Auth', time: '1 hour ago' }
  ]);

  // System Logs
  const [logs, setLogs] = useState([
    { timestamp: '01:22:14', type: 'info', message: 'Automations cron controller started on port 3000' },
    { timestamp: '01:23:45', type: 'success', message: 'WordPress integration hook synced successfully' },
    { timestamp: '01:25:01', type: 'info', message: 'Running batch content schedule checker... 0 drafts pending' },
    { timestamp: '01:30:12', type: 'info', message: 'Stripe webhook received: subscription.updated for customer_id: cus_N82b' }
  ]);

  // Trigger brief Toast alerts
  const showToast = (message) => {
    const newToast = { id: Date.now(), message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  // Background Simulated Real-time Updates
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Simulate new user login randomly
      const randomNames = ['Oliver Vance', 'Mila Novak', 'Jackson Reed', 'Chloe Dubois'];
      const randomPlans = ['Free', 'Creator Pro', 'Enterprise Max'];
      const isNewMember = Math.random() > 0.8;
      
      const timestamp = new Date().toLocaleTimeString();

      if (isNewMember) {
        // Upgrade / signup
        const newName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const newPlan = randomPlans[Math.floor(Math.random() * randomPlans.length)];
        
        showToast(`🎉 New Member Signup: ${newName} joined on ${newPlan}`);
        
        setMembers((prev) => [
          {
            id: String(prev.length + 1),
            name: newName,
            email: `${newName.toLowerCase().replace(' ', '.')}@example.com`,
            plan: newPlan,
            status: newPlan === 'Free' ? 'Trial' : 'Active',
            activePipelines: newPlan === 'Free' ? 1 : 3,
            monthlyGenerations: newPlan === 'Free' ? 3 : 15,
            lastLogin: 'Just Now',
            ipAddress: '109.112.55.' + Math.floor(Math.random() * 254)
          },
          ...prev
        ]);

        setStats((prev) => ({
          ...prev,
          totalMembers: prev.totalMembers + 1,
          paidSubscribers: prev.paidSubscribers + (newPlan !== 'Free' ? 1 : 0),
          mrr: prev.mrr + (newPlan === 'Creator Pro' ? 49 : newPlan === 'Enterprise Max' ? 299 : 0)
        }));

        setActivities((prev) => [
          { id: String(Date.now()), type: 'purchase', message: `${newName} signed up on ${newPlan} subscription tier`, time: 'Just Now' },
          ...prev
        ]);

        setLogs((prev) => [
          { timestamp, type: 'success', message: `Database record created for new user: ${newName}` },
          ...prev
        ]);
      } else {
        // Simple login active session spike
        const loginUser = members[Math.floor(Math.random() * members.length)];
        showToast(`🔑 User Login: ${loginUser.name} signed in`);
        
        setStats((prev) => ({
          ...prev,
          activeLogins: prev.activeLogins + Math.floor(Math.random() * 5) - 2
        }));

        setActivities((prev) => [
          { id: String(Date.now()), type: 'login', message: `${loginUser.name} signed in from IP ${loginUser.ipAddress}`, time: 'Just Now' },
          ...prev
        ]);

        setLogs((prev) => [
          { timestamp, type: 'info', message: `Security token generated for session: user_id=${loginUser.id}` },
          ...prev
        ]);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [members]);

  // Member Management Updates
  const handleUpdateMember = (id, fields) => {
    setMembers((prev) => 
      prev.map((m) => (m.id === id ? { ...m, ...fields } : m))
    );
    showToast('💾 Member settings updated.');
    
    // Recalculate billing if plan tier changed
    if (fields.plan) {
      setStats((prev) => {
        const oldPlan = members.find(m => m.id === id).plan;
        const newPlan = fields.plan;
        
        let mrrDiff = 0;
        // Subtract old plan mrr
        if (oldPlan === 'Creator Pro') mrrDiff -= 49;
        else if (oldPlan === 'Enterprise Max') mrrDiff -= 299;

        // Add new plan mrr
        if (newPlan === 'Creator Pro') mrrDiff += 49;
        else if (newPlan === 'Enterprise Max') mrrDiff += 299;

        const paidDiff = (oldPlan === 'Free' && newPlan !== 'Free') ? 1 : (oldPlan !== 'Free' && newPlan === 'Free') ? -1 : 0;

        return {
          ...prev,
          paidSubscribers: prev.paidSubscribers + paidDiff,
          mrr: prev.mrr + mrrDiff
        };
      });

      const memberName = members.find(m => m.id === id).name;
      setLogs((prev) => [
        { timestamp: new Date().toLocaleTimeString(), type: 'success', message: `Subscription plan modified: ${memberName} tier updated to ${fields.plan}` },
        ...prev
      ]);
    }
  };

  // Workflows Updates
  const handleUpdateWorkflow = (id, fields) => {
    setWorkflows((prev) => 
      prev.map((w) => (w.id === id ? { ...w, ...fields } : w))
    );
    showToast('⚙️ Pipeline configuration adjusted.');
  };

  const handleCreateWorkflow = (workflow) => {
    const id = 'wf' + (workflows.length + 1);
    setWorkflows((prev) => [...prev, { ...workflow, id }]);
    showToast('⚡ New automation pipeline successfully deployed.');
    
    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), type: 'success', message: `Content pipeline "${workflow.name}" registered successfully` },
      ...prev
    ]);
  };

  const handleDeleteWorkflow = (id) => {
    const wfName = workflows.find(w => w.id === id).name;
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    showToast(`🗑️ Automation pipeline deleted: ${wfName}`);

    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), type: 'warning', message: `Pipeline "${wfName}" was unregistered and removed` },
      ...prev
    ]);
  };

  // Templates Updates
  const handleUpdateTemplate = (id, fields) => {
    setTemplates((prev) => 
      prev.map((t) => (t.id === id ? { ...t, ...fields } : t))
    );
    showToast('✏️ AI prompt template configurations locked.');
  };

  // Integrations Updates
  const handleToggleConnection = (id) => {
    setIntegrations((prev) => 
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    );
    const targetInt = integrations.find(i => i.id === id);
    const stateStr = !targetInt.connected ? 'Enabled' : 'Disabled';
    showToast(`🔌 ${targetInt.name} integration portal ${stateStr.toLowerCase()}.`);

    setLogs((prev) => [
      { 
        timestamp: new Date().toLocaleTimeString(), 
        type: !targetInt.connected ? 'success' : 'warning', 
        message: `${targetInt.name} adapter status toggled to: ${stateStr.toUpperCase()}` 
      },
      ...prev
    ]);
  };

  const handleUpdateCredentials = (id, fields) => {
    setIntegrations((prev) => 
      prev.map((i) => (i.id === id ? { ...i, ...fields, connected: true } : i))
    );
    showToast('🔑 API environment credentials updated.');
    
    const targetInt = integrations.find(i => i.id === id);
    setLogs((prev) => [
      { timestamp: new Date().toLocaleTimeString(), type: 'success', message: `Encrypted client secrets loaded for platform: ${targetInt.name}` },
      ...prev
    ]);
  };

  return (
    <div className="app-container">
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar Nav */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Zap size={20} color="white" />
          </div>
          <span className="logo-text">AutoContent</span>
          <button 
            className="action-btn menu-close-btn" 
            onClick={() => setIsSidebarOpen(false)}
            style={{ display: 'none', marginLeft: 'auto', width: '32px', height: '32px' }}
            title="Close Menu"
          >
            <X size={16} />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li>
            <button 
              className={`menu-item-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          </li>
          <li>
            <button 
              className={`menu-item-btn ${activeTab === 'members' ? 'active' : ''}`}
              onClick={() => { setActiveTab('members'); setIsSidebarOpen(false); }}
            >
              <Users size={18} />
              Members List
            </button>
          </li>
          <li>
            <button 
              className={`menu-item-btn ${activeTab === 'workflows' ? 'active' : ''}`}
              onClick={() => { setActiveTab('workflows'); setIsSidebarOpen(false); }}
            >
              <Zap size={18} />
              Pipelines
            </button>
          </li>
          <li>
            <button 
              className={`menu-item-btn ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => { setActiveTab('templates'); setIsSidebarOpen(false); }}
            >
              <Sparkles size={18} />
              AI Blueprints
            </button>
          </li>
          <li>
            <button 
              className={`menu-item-btn ${activeTab === 'integrations' ? 'active' : ''}`}
              onClick={() => { setActiveTab('integrations'); setIsSidebarOpen(false); }}
            >
              <Link size={18} />
              Integrations
            </button>
          </li>
          <li>
            <button 
              className={`menu-item-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
            >
              <SettingsIcon size={18} />
              System Settings
            </button>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="profile-card">
            <div className="profile-avatar">AD</div>
            <div className="profile-info">
              <span className="profile-name">Admin Console</span>
              <span className="profile-role">Owner Account</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Wrapper Panel */}
      <main className="main-wrapper">
        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
            <button 
              className="action-btn menu-toggle-btn" 
              onClick={() => setIsSidebarOpen(true)}
              style={{ display: 'none' }}
              title="Open Menu"
            >
              <Menu size={18} />
            </button>
            <div className="header-search">
              <Search size={16} style={{ color: 'var(--text-secondary)' }} />
              <input type="text" placeholder="Global system index lookup..." disabled />
            </div>
          </div>

          <div className="header-actions" style={{ flexShrink: 0 }}>
            <button className="action-btn" title="View Logs" onClick={() => setActiveTab('settings')}>
              <Terminal size={18} />
            </button>
            <button className="action-btn" title="Notifications" onClick={() => showToast('🔔 Real-time sync connection active.')}>
              <Bell size={18} />
              <span className="badge-dot"></span>
            </button>
          </div>
        </header>

        <section className="content-body">
          {activeTab === 'dashboard' && (
            <Dashboard 
              stats={stats} 
              activities={activities} 
              onNavigate={setActiveTab} 
            />
          )}

          {activeTab === 'members' && (
            <MemberManagement 
              members={members} 
              onUpdateMember={handleUpdateMember} 
            />
          )}

          {activeTab === 'workflows' && (
            <Workflows 
              workflows={workflows} 
              templates={templates}
              integrations={integrations}
              onUpdateWorkflow={handleUpdateWorkflow}
              onCreateWorkflow={handleCreateWorkflow}
              onDeleteWorkflow={handleDeleteWorkflow}
            />
          )}

          {activeTab === 'templates' && (
            <AITemplates 
              templates={templates} 
              onUpdateTemplate={handleUpdateTemplate} 
            />
          )}

          {activeTab === 'integrations' && (
            <Integrations 
              integrations={integrations} 
              onToggleConnection={handleToggleConnection}
              onUpdateCredentials={handleUpdateCredentials}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView logs={logs} />
          )}
        </section>
      </main>

      {/* Dynamic Floating Toast Alerts */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div className="toast" key={toast.id}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
