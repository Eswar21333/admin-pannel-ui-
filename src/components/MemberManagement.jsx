import React, { useState } from 'react';
import { Search, Filter, Shield, MoreVertical, Edit3, Trash2, Power, Award, ArrowUpDown } from 'lucide-react';

export default function MemberManagement({ members, onUpdateMember }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingMember, setEditingMember] = useState(null);
  const [newPlan, setNewPlan] = useState('');

  // Filtering Logic
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'All' || member.plan === planFilter;
    const matchesStatus = statusFilter === 'All' || member.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'badge-active';
      case 'trial': return 'badge-trial';
      case 'past_due': return 'badge-past_due';
      case 'suspended': return 'badge-suspended';
      default: return '';
    }
  };

  const handlePlanChangeSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      onUpdateMember(editingMember.id, { plan: newPlan });
      setEditingMember(null);
    }
  };

  const toggleStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Suspended' ? 'Active' : 'Suspended';
    onUpdateMember(id, { status: nextStatus });
  };

  return (
    <div className="members-view">
      <div className="page-header">
        <div>
          <h1 className="page-title">Member Analytics & Directory</h1>
          <p className="page-desc">Audit user log sessions, manage recurring subscription tiers, and configure role policies.</p>
        </div>
      </div>

      {/* Interactive Filter Top Deck */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '300px' }}>
          <div className="header-search" style={{ width: '100%', maxWidth: '360px' }}>
            <Search size={18} style={{ color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Filter size={16} style={{ color: 'var(--text-secondary)' }} />
            <select 
              className="form-input" 
              style={{ padding: '8px 12px', fontSize: '13px', background: 'rgba(255,255,255,0.03)', cursor: 'pointer' }}
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option value="All">All Plans</option>
              <option value="Free">Free Plan</option>
              <option value="Creator Pro">Creator Pro</option>
              <option value="Enterprise Max">Enterprise Max</option>
              <option value="Custom Trial">Custom Trial</option>
            </select>

            <select 
              className="form-input" 
              style={{ padding: '8px 12px', fontSize: '13px', background: 'rgba(255,255,255,0.03)', cursor: 'pointer' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Trial">Trial</option>
              <option value="Past_due">Past Due</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Showing <strong>{filteredMembers.length}</strong> of <strong>{members.length}</strong> members
        </div>
      </div>

      {/* Directory Table */}
      <div className="table-wrapper glass-panel">
        <table className="premium-table">
          <thead>
            <tr>
              <th>Member Details</th>
              <th>Subscription Plan</th>
              <th>Status</th>
              <th>Pipelines</th>
              <th>Activity Output</th>
              <th>Last Login</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div 
                      className="profile-avatar" 
                      style={{ 
                        width: '36px', 
                        height: '36px',
                        border: `2px solid ${member.status === 'Suspended' ? 'var(--color-rose)' : 'var(--color-violet)'}`,
                        fontSize: '13px'
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: '600', color: 'white' }}>{member.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{member.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} style={{ color: member.plan === 'Enterprise Max' ? '#14b8a6' : member.plan === 'Creator Pro' ? '#8b5cf6' : '#9ca3af' }} />
                    <span style={{ fontWeight: '500' }}>{member.plan}</span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(member.status)}`}>
                    {member.status.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '600' }}>{member.activePipelines} Active</span>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: '600' }}>{member.monthlyGenerations} posts</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>this month</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{member.lastLogin}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{member.ipAddress}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button 
                      className="action-btn" 
                      style={{ width: '32px', height: '32px' }}
                      title="Adjust Subscription Plan"
                      onClick={() => {
                        setEditingMember(member);
                        setNewPlan(member.plan);
                      }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      className="action-btn" 
                      style={{ width: '32px', height: '32px', color: member.status === 'Suspended' ? 'var(--color-teal)' : 'var(--color-rose)' }}
                      title={member.status === 'Suspended' ? 'Activate Account' : 'Suspend Account'}
                      onClick={() => toggleStatus(member.id, member.status)}
                    >
                      <Power size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  No members matched the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Plan Modal */}
      {editingMember && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ width: '420px' }}>
            <h3 style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} style={{ color: 'var(--color-violet)' }} />
              Adjust Subscription
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Modify subscription tier levels for <strong>{editingMember.name}</strong> ({editingMember.email}).
            </p>
            
            <form onSubmit={handlePlanChangeSubmit}>
              <div className="form-group">
                <label className="form-label">Subscription Tier</label>
                <select 
                  className="form-input" 
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                >
                  <option value="Free">Free Plan</option>
                  <option value="Creator Pro">Creator Pro</option>
                  <option value="Enterprise Max">Enterprise Max</option>
                  <option value="Custom Trial">Custom Trial</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button type="button" className="btn-secondary" onClick={() => setEditingMember(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Apply Plan Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
