import React from 'react';
import { Settings, Shield, Terminal, HardDrive, Cpu, Database } from 'lucide-react';

export default function SettingsView({ logs }) {
  return (
    <div className="settings-view">
      <div className="page-header">
        <div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-desc">Manage API consumption thresholds, cron-job scheduling cycles, and audit log files.</p>
        </div>
      </div>

      <div className="bento-grid">
        {/* Hardware Status */}
        <div className="col-4 glass-panel bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '15px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} style={{ color: 'var(--color-violet)' }} /> Engine Health Index
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Central Processor (CPU)</span>
              <strong style={{ color: 'var(--color-teal)' }}>14% load</strong>
            </div>
            <div className="progress-track" style={{ height: '6px' }}>
              <div className="progress-fill" style={{ width: '14%', background: 'var(--color-teal)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>System Memory (RAM)</span>
              <strong style={{ color: 'var(--color-violet)' }}>3.4GB / 8GB</strong>
            </div>
            <div className="progress-track" style={{ height: '6px' }}>
              <div className="progress-fill" style={{ width: '42%', background: 'var(--color-violet)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Automation Queue Delay</span>
              <strong style={{ color: 'white' }}>1.2 ms</strong>
            </div>
          </div>
        </div>

        {/* Configurations Parameters */}
        <div className="col-8 glass-panel bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '15px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={16} style={{ color: 'var(--color-teal)' }} /> Global Preferences
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Global Generation Interval</label>
              <select className="form-input">
                <option>Every 1 hour (Default)</option>
                <option>Every 6 hours</option>
                <option>Daily at midnight</option>
                <option>Weekly on Monday</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Generative Token Budget Limit</label>
              <input type="number" className="form-input" defaultValue={10000000} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-violet)' }} />
              Auto-approve high SEO draft content (score &gt; 90)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-violet)' }} />
              Push notification logs on Stripe payouts
            </label>
          </div>
        </div>

        {/* Audit Log Panel */}
        <div className="col-12 glass-panel bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} style={{ color: 'var(--color-amber)' }} /> Raw Audit Engine Logs
          </h3>

          <div 
            style={{ 
              background: '#07070a', 
              border: '1px solid var(--border-light)', 
              borderRadius: 'var(--radius-md)', 
              padding: '16px', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '11.5px', 
              color: '#d1d5db', 
              maxHeight: '260px', 
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {logs.map((log, index) => (
              <div key={index} style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--text-muted)' }}>[{log.timestamp}]</span>
                <span 
                  style={{ 
                    color: log.type === 'error' ? 'var(--color-rose)' : log.type === 'success' ? 'var(--color-teal)' : '#8b5cf6',
                    fontWeight: '600'
                  }}
                >
                  [{log.type.toUpperCase()}]
                </span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
