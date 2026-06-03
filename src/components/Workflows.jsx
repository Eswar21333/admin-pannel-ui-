import React, { useState } from 'react';
import { Play, Pause, Trash2, ArrowRight, Rss, FileText, Globe, Plus, Sparkles, AlertCircle } from 'lucide-react';

export default function Workflows({ workflows, templates, integrations, onUpdateWorkflow, onCreateWorkflow, onDeleteWorkflow }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [wfName, setWfName] = useState('');
  const [wfSource, setWfSource] = useState('RSS Feed');
  const [wfModel, setWfModel] = useState('Claude 3.5 Sonnet');
  const [wfTemplate, setWfTemplate] = useState('');
  const [wfTarget, setWfTarget] = useState('WordPress Site');

  const getSourceIcon = (source) => {
    switch (source.toLowerCase()) {
      case 'rss feed': return <Rss size={18} style={{ color: '#14b8a6' }} />;
      default: return <FileText size={18} style={{ color: '#8b5cf6' }} />;
    }
  };

  const getTargetIcon = (target) => {
    return <Globe size={18} style={{ color: '#6366f1' }} />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wfName) return;
    
    const newWorkflow = {
      name: wfName,
      source: wfSource,
      model: wfModel,
      template: wfTemplate || (templates[0]?.name || 'SEO Blog Builder'),
      target: wfTarget,
      active: true,
      lastRun: 'Never',
      runsThisMonth: 0,
    };

    onCreateWorkflow(newWorkflow);
    setIsCreateOpen(false);
    setWfName('');
  };

  const toggleWorkflow = (id, activeState) => {
    onUpdateWorkflow(id, { active: !activeState });
  };

  return (
    <div className="workflows-view">
      <div className="page-header">
        <div>
          <h1 className="page-title">Content Automation Pipelines</h1>
          <p className="page-desc">Construct active content syndications. Link data sources directly into generative AI LLMs and post automatically.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} /> New Pipeline
        </button>
      </div>

      <div className="bento-grid">
        {workflows.map((wf) => (
          <div className="bento-card glass-panel glass-panel-hover col-6" key={wf.id} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '17px', color: 'white', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {wf.name}
                  {!wf.active && <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px' }}>Paused</span>}
                </h3>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>ID: #{wf.id.substring(0,8)}</span>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={wf.active} 
                  onChange={() => toggleWorkflow(wf.id, wf.active)}
                />
                <span className="slider"></span>
              </label>
            </div>

            {/* Interactive Pipeline Pathway */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                {getSourceIcon(wf.source)}
                <span style={{ fontWeight: '500' }}>{wf.source}</span>
              </div>
              
              <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <Sparkles size={16} style={{ color: '#f59e0b' }} />
                <span style={{ fontWeight: '600', color: '#d8b4fe' }}>{wf.template}</span>
              </div>

              <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                {getTargetIcon(wf.target)}
                <span style={{ fontWeight: '500' }}>{wf.target}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', paddingTop: '10px', borderTop: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
              <div>
                Last Run: <strong style={{ color: 'white' }}>{wf.lastRun}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span>Run Count: <strong style={{ color: 'white' }}>{wf.runsThisMonth}</strong></span>
                <button 
                  className="action-btn" 
                  style={{ width: '28px', height: '28px', color: 'var(--color-rose)' }}
                  onClick={() => onDeleteWorkflow(wf.id)}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {workflows.length === 0 && (
          <div className="bento-card glass-panel col-12" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>
            <AlertCircle size={32} style={{ color: 'var(--color-violet)', marginBottom: '12px' }} />
            <h3>No Active Pipelines Available</h3>
            <p style={{ fontSize: '13.5px', margin: '8px 0 20px' }}>Create content automation flows to hook websites into AI templates.</p>
            <button className="btn-primary" style={{ margin: '0 auto' }} onClick={() => setIsCreateOpen(true)}>
              Setup First Pipeline
            </button>
          </div>
        )}
      </div>

      {/* Creation Modal */}
      {isCreateOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Plus size={18} style={{ color: 'var(--color-violet)' }} />
              Create Content Pipeline
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Pipeline Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Daily Tech Summarizer" 
                  value={wfName}
                  onChange={(e) => setWfName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Source Input Trigger</label>
                  <select className="form-input" value={wfSource} onChange={(e) => setWfSource(e.target.value)}>
                    <option value="RSS Feed">RSS Feed Sync</option>
                    <option value="Manual Upload">Manual Trigger</option>
                    <option value="API Hook">Incoming Webhook</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Generative AI Engine</label>
                  <select className="form-input" value={wfModel} onChange={(e) => setWfModel(e.target.value)}>
                    <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                    <option value="GPT-4o Omniverse">GPT-4o Omniverse</option>
                    <option value="DeepSeek Coder R1">DeepSeek Coder R1</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Select Prompt Template</label>
                <select className="form-input" value={wfTemplate} onChange={(e) => setWfTemplate(e.target.value)}>
                  {templates.map(t => (
                    <option key={t.id} value={t.name}>{t.name} ({t.category})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Destination Site</label>
                <select className="form-input" value={wfTarget} onChange={(e) => setWfTarget(e.target.value)}>
                  {integrations.filter(i => i.connected).map(i => (
                    <option key={i.id} value={i.name}>{i.name}</option>
                  ))}
                  {integrations.filter(i => !i.connected).length > 0 && (
                    <option disabled>-- Connect platforms in Integrations tab --</option>
                  )}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Assemble Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
