import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Settings2, ShieldCheck, Check, Link, AlertTriangle } from 'lucide-react';

export default function Integrations({ integrations, onToggleConnection, onUpdateCredentials }) {
  const [activeConfig, setActiveConfig] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');

  const handleConfigClick = (integration) => {
    setActiveConfig(integration);
    setApiKey(integration.apiKey || '');
    setApiEndpoint(integration.endpoint || '');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (activeConfig) {
      onUpdateCredentials(activeConfig.id, { apiKey, endpoint: apiEndpoint });
      setActiveConfig(null);
    }
  };

  return (
    <div className="integrations-view">
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform Integration Directory</h1>
          <p className="page-desc">Synchronize publishing portals and payment gateways. Securely manage API environment keys.</p>
        </div>
      </div>

      <div className="bento-grid">
        {integrations.map((int) => (
          <div 
            className="bento-card glass-panel col-4" 
            key={int.id}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              gap: '24px',
              border: `1px solid ${int.connected ? 'rgba(20, 184, 166, 0.2)' : 'var(--border-light)'}`,
              background: int.connected ? 'rgba(20, 184, 166, 0.02)' : 'rgba(22, 22, 34, 0.45)'
            }}
          >
            {/* Header info */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: int.connected ? 'rgba(20, 184, 166, 0.1)' : 'rgba(255,255,255,0.03)',
                    color: int.connected ? 'var(--color-teal)' : 'var(--text-secondary)',
                    borderRadius: 'var(--radius-md)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  <Link size={18} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${int.connected ? 'badge-active' : 'badge-suspended'}`} style={{ fontSize: '9px', padding: '2px 8px' }}>
                    {int.connected ? 'Connected' : 'Offline'}
                  </span>
                </div>
              </div>

              <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '6px' }}>{int.name}</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{int.description}</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                className="btn-secondary" 
                style={{ padding: '8px 12px', fontSize: '12.5px', gap: '4px' }}
                onClick={() => handleConfigClick(int)}
              >
                <Settings2 size={13} /> Config Keys
              </button>
              
              <button 
                onClick={() => onToggleConnection(int.id)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: int.connected ? 'var(--color-teal)' : 'var(--text-muted)' 
                }}
              >
                {int.connected ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Integration config modal */}
      {activeConfig && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ width: '480px' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-teal)' }} />
              Configure {activeConfig.name} Secret Credentials
            </h3>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Environment variable parameters are encrypted and stored inside local session keychain variables.
            </p>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">API End-point Domain</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={apiEndpoint} 
                  onChange={(e) => setApiEndpoint(e.target.value)} 
                  placeholder={activeConfig.name.includes('WordPress') ? 'https://yourwebsite.com/wp-json' : 'https://api.openai.com/v1'} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Private Secret Bearer Key</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="••••••••••••••••••••••••••••••••" 
                />
              </div>

              {activeConfig.name.includes('Stripe') && (
                <div style={{ display: 'flex', gap: '8px', background: 'rgba(245, 158, 11, 0.05)', padding: '12px', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: 'var(--radius-md)', fontSize: '11.5px', color: 'var(--color-amber)', marginBottom: '16px' }}>
                  <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                  <span>Configuring Stripe will sync subscription plans directly into dashboard member details.</span>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setActiveConfig(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, var(--color-teal), var(--color-indigo))', boxShadow: 'none' }}>
                  <Check size={14} /> Validate & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
