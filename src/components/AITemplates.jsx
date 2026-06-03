import React, { useState } from 'react';
import { Sliders, Sparkles, BookOpen, Save, RefreshCw } from 'lucide-react';

export default function AITemplates({ templates, onUpdateTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0] || null);
  const [tempParams, setTempParams] = useState(selectedTemplate ? { ...selectedTemplate.parameters } : { temperature: 0.7, length: 800, tone: 'professional' });

  const handleSelect = (template) => {
    setSelectedTemplate(template);
    setTempParams({ ...template.parameters });
  };

  const handleSliderChange = (param, value) => {
    setTempParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleSave = () => {
    if (selectedTemplate) {
      onUpdateTemplate(selectedTemplate.id, { parameters: { ...tempParams } });
      alert(`Parameters saved for template: ${selectedTemplate.name}`);
    }
  };

  return (
    <div className="templates-view">
      <div className="page-header">
        <div>
          <h1 className="page-title">AI Content Blueprints</h1>
          <p className="page-desc">Optimize system prompts and adjust temperature coefficients to balance structured and creative generations.</p>
        </div>
      </div>

      <div className="bento-grid">
        {/* Templates Selection Panel */}
        <div className="col-4 glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '550px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} /> Blueprint Directory
          </h3>
          {templates.map((tpl) => (
            <div 
              key={tpl.id} 
              className={`glass-panel-hover`}
              style={{ 
                padding: '16px', 
                borderRadius: 'var(--radius-md)', 
                border: `1px solid ${selectedTemplate?.id === tpl.id ? 'var(--color-violet)' : 'var(--border-light)'}`,
                background: selectedTemplate?.id === tpl.id ? 'rgba(139, 92, 246, 0.04)' : 'rgba(255,255,255,0.01)',
                cursor: 'pointer'
              }}
              onClick={() => handleSelect(tpl)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ color: selectedTemplate?.id === tpl.id ? 'white' : 'var(--text-primary)' }}>{tpl.name}</strong>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', padding: '2px 6px', borderRadius: '4px' }}>
                  {tpl.category}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{tpl.description}</p>
            </div>
          ))}
        </div>

        {/* Templates Parameters Panel */}
        {selectedTemplate ? (
          <div className="col-8 glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={20} style={{ color: '#f59e0b' }} />
                  {selectedTemplate.name} Configuration
                </h2>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>Category: {selectedTemplate.category} blueprint</p>
              </div>
              
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} /> Save Blueprint
              </button>
            </div>

            {/* Prompt Editor Preview */}
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Underlying Prompt Blueprint</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Non-editable base template</span>
              </label>
              <div 
                style={{ 
                  background: 'rgba(0,0,0,0.2)', 
                  border: '1px solid var(--border-light)', 
                  padding: '16px', 
                  borderRadius: 'var(--radius-md)', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '12px', 
                  color: 'var(--text-secondary)', 
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {selectedTemplate.prompt}
              </div>
            </div>

            {/* Parameter Tuning Deck */}
            <div>
              <h3 style={{ fontSize: '14px', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={16} style={{ color: 'var(--color-violet)' }} /> Parameter Tuning Deck
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span className="form-label">Creativity Coeff. (Temperature)</span>
                    <strong style={{ color: 'white' }}>{tempParams.temperature}</strong>
                  </div>
                  <input 
                    type="range" 
                    className="range-slider" 
                    min="0" 
                    max="1.5" 
                    step="0.1" 
                    value={tempParams.temperature}
                    onChange={(e) => handleSliderChange('temperature', parseFloat(e.target.value))}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Low values = deterministic; High values = hyper-creative</span>
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span className="form-label">Target Article Length</span>
                    <strong style={{ color: 'white' }}>{tempParams.length} words</strong>
                  </div>
                  <input 
                    type="range" 
                    className="range-slider" 
                    min="100" 
                    max="3000" 
                    step="100" 
                    value={tempParams.length}
                    onChange={(e) => handleSliderChange('length', parseInt(e.target.value))}
                  />
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sets bounding tokens output window sizes</span>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '16px' }}>
                <label className="form-label">Default Narrative Tone</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Professional', 'Witty & Casual', 'Academic', 'Aggressive Growth'].map((toneOpt) => (
                    <button 
                      key={toneOpt} 
                      type="button"
                      className="btn-secondary"
                      style={{ 
                        flex: 1, 
                        fontSize: '12px', 
                        padding: '8px', 
                        border: `1px solid ${tempParams.tone?.toLowerCase() === toneOpt.toLowerCase() ? 'var(--color-violet)' : 'var(--border-light)'}`,
                        background: tempParams.tone?.toLowerCase() === toneOpt.toLowerCase() ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                        color: tempParams.tone?.toLowerCase() === toneOpt.toLowerCase() ? 'white' : 'var(--text-secondary)'
                      }}
                      onClick={() => handleSliderChange('tone', toneOpt.toLowerCase())}
                    >
                      {toneOpt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-8 glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Select an AI blueprint from the catalog.
          </div>
        )}
      </div>
    </div>
  );
}
