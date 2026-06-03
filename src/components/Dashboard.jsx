import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Users, UserCheck, CreditCard, DollarSign, Activity, Sparkles, TrendingUp, Zap } from 'lucide-react';

Chart.register(...registerables);

export default function Dashboard({ stats, activities, onNavigate }) {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineInstance = useRef(null);
  const barInstance = useRef(null);

  useEffect(() => {
    // 1. Subscription Growth Chart (Line)
    if (lineChartRef.current) {
      if (lineInstance.current) lineInstance.current.destroy();

      const ctx = lineChartRef.current.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 250);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.35)');
      gradient.addColorStop(1, 'rgba(139, 92, 246, 0.01)');

      lineInstance.current = new Chart(lineChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Paid Subscribers',
            data: [420, 580, 890, 1100, 1420, 1845],
            borderColor: '#8b5cf6',
            borderWidth: 3,
            backgroundColor: gradient,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#8b5cf6',
            pointBorderColor: 'rgba(255, 255, 255, 0.8)',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#11111a',
              titleFont: { family: 'Inter', size: 12 },
              bodyFont: { family: 'Inter', size: 12 },
              borderColor: 'rgba(255,255,255,0.08)',
              borderWidth: 1,
              padding: 10,
              displayColors: false
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.03)' },
              ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
            }
          }
        }
      });
    }

    // 2. Active User Logins 24h Chart (Bar)
    if (barChartRef.current) {
      if (barInstance.current) barInstance.current.destroy();

      const ctx = barChartRef.current.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 250);
      gradient.addColorStop(0, 'rgba(20, 184, 166, 0.6)');
      gradient.addColorStop(1, 'rgba(20, 184, 166, 0.05)');

      barInstance.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          datasets: [{
            label: 'Active Logins',
            data: [320, 180, 750, 1280, 1450, 980],
            backgroundColor: gradient,
            borderColor: '#14b8a6',
            borderWidth: 1,
            borderRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#11111a',
              titleFont: { family: 'Inter', size: 12 },
              bodyFont: { family: 'Inter', size: 12 },
              borderColor: 'rgba(255,255,255,0.08)',
              borderWidth: 1,
              padding: 10,
              displayColors: false
            }
          },
          scales: {
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.03)' },
              ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
            },
            x: {
              grid: { display: false },
              ticks: { color: '#9ca3af', font: { family: 'Inter', size: 11 } }
            }
          }
        }
      });
    }

    return () => {
      if (lineInstance.current) lineInstance.current.destroy();
      if (barInstance.current) barInstance.current.destroy();
    };
  }, []);

  return (
    <div className="dashboard-view">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics Deck</h1>
          <p className="page-desc">Real-time statistics on member subscriptions, active sessions, and content automations.</p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate('workflows')}>
          <Zap size={16} /> Manage Pipelines
        </button>
      </div>

      {/* Bento Grid Metrics */}
      <div className="bento-grid">
        <div className="bento-card glass-panel glass-panel-hover col-3 stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Members</span>
            <span className="stat-value">{stats.totalMembers.toLocaleString()}</span>
            <span className="stat-trend trend-up">
              <TrendingUp size={12} /> +12.3%
            </span>
          </div>
          <div className="stat-icon-wrapper icon-purple">
            <Users size={22} />
          </div>
        </div>

        <div className="bento-card glass-panel glass-panel-hover col-3 stat-card">
          <div className="stat-info">
            <span className="stat-label">Active Logins</span>
            <span className="stat-value">{stats.activeLogins.toLocaleString()}</span>
            <span className="stat-trend trend-up" style={{ color: '#14b8a6', background: 'rgba(20, 184, 166, 0.1)' }}>
              Live Sessions
            </span>
          </div>
          <div className="stat-icon-wrapper icon-teal">
            <UserCheck size={22} />
          </div>
        </div>

        <div className="bento-card glass-panel glass-panel-hover col-3 stat-card">
          <div className="stat-info">
            <span className="stat-label">Paid Subscribers</span>
            <span className="stat-value">{stats.paidSubscribers.toLocaleString()}</span>
            <span className="stat-trend trend-up">
              <TrendingUp size={12} /> +8.7%
            </span>
          </div>
          <div className="stat-icon-wrapper icon-amber">
            <CreditCard size={22} />
          </div>
        </div>

        <div className="bento-card glass-panel glass-panel-hover col-3 stat-card">
          <div className="stat-info">
            <span className="stat-label">MRR (Revenue)</span>
            <span className="stat-value">${stats.mrr.toLocaleString()}</span>
            <span className="stat-trend trend-up">
              <TrendingUp size={12} /> +15.2%
            </span>
          </div>
          <div className="stat-icon-wrapper icon-rose">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="bento-card glass-panel col-8">
          <div className="card-title-row">
            <h3 className="card-title">
              <Activity size={18} className="text-purple" style={{ color: '#8b5cf6' }} />
              Subscriber Growth Index
            </h3>
            <span className="trend-up stat-trend" style={{ fontSize: '11px' }}>Monthly Active Paid Accounts</span>
          </div>
          <div className="chart-container">
            <canvas ref={lineChartRef}></canvas>
          </div>
        </div>

        <div className="bento-card glass-panel col-4">
          <div className="card-title-row">
            <h3 className="card-title">
              <UserCheck size={18} className="text-teal" style={{ color: '#14b8a6' }} />
              Login Densities (24h)
            </h3>
          </div>
          <div className="chart-container">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        {/* Subscription breakdown & activity feed */}
        <div className="bento-card glass-panel col-6">
          <div className="card-title-row">
            <h3 className="card-title">
              <Sparkles size={18} style={{ color: '#f59e0b' }} />
              Membership Distribution
            </h3>
          </div>
          <div className="progress-bar-container">
            <div className="progress-row">
              <div className="progress-label-row">
                <span>Free Plan</span>
                <span>45% ({(stats.totalMembers * 0.45).toFixed(0)} users)</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '45%', background: '#6b7280' }}></div>
              </div>
            </div>

            <div className="progress-row">
              <div className="progress-label-row">
                <span>Creator Pro</span>
                <span>35% ({(stats.totalMembers * 0.35).toFixed(0)} users)</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '35%', background: '#8b5cf6' }}></div>
              </div>
            </div>

            <div className="progress-row">
              <div className="progress-label-row">
                <span>Enterprise Max</span>
                <span>15% ({(stats.totalMembers * 0.15).toFixed(0)} users)</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '15%', background: '#14b8a6' }}></div>
              </div>
            </div>

            <div className="progress-row">
              <div className="progress-label-row">
                <span>Custom Trial</span>
                <span>5% ({(stats.totalMembers * 0.05).toFixed(0)} users)</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '5%', background: '#f59e0b' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bento-card glass-panel col-6" style={{ maxHeight: '380px', overflowY: 'auto' }}>
          <div className="card-title-row">
            <h3 className="card-title">
              <Activity size={18} style={{ color: '#14b8a6' }} />
              Live Activity Stream
            </h3>
          </div>
          <div className="activity-feed">
            {activities.map((act) => (
              <div className="activity-item" key={act.id}>
                <div 
                  className="activity-indicator" 
                  style={{ 
                    background: act.type === 'login' ? '#14b8a6' : act.type === 'purchase' ? '#f59e0b' : '#8b5cf6',
                    boxShadow: `0 0 6px ${act.type === 'login' ? '#14b8a6' : act.type === 'purchase' ? '#f59e0b' : '#8b5cf6'}`
                  }}
                />
                <div className="activity-body">
                  <span style={{ color: '#f3f4f6' }}>{act.message}</span>
                  <span className="activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
