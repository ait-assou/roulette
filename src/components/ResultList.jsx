import React from 'react';

const ResultList = ({ pairs, t }) => {
  return (
    <div className="glass-card" style={{ height: '100%', animation: 'fadeInRight 0.8s ease' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 800, fontSize: '1.5rem' }}>
        {t.finalPairs}
      </h2>
      <div className="results-list" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '0.8rem',
        overflowY: 'auto',
        flex: 1,
        paddingRight: '5px'
      }}>
        {pairs.map((pair, index) => (
          <div 
            key={index} 
            className="pair-card" 
            style={{ 
              animationDelay: `${index * 0.1}s`,
              background: pair.extra ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              border: pair.extra ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              borderRadius: '16px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>{t.leader}</div>
                <div className="leader-name" style={{ fontSize: '1rem' }}>{pair.leader.name}</div>
              </div>
              <div style={{ color: 'var(--accent-secondary)', fontWeight: 'bold', fontSize: '0.8rem' }}>&</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '1px' }}>{t.member}</div>
                <div className="member-name" style={{ fontSize: '1rem' }}>{pair.member.name}</div>
              </div>
            </div>
            
            {pair.extra && (
              <div style={{ 
                borderTop: '1px solid rgba(255,255,255,0.1)', 
                paddingTop: '0.5rem',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '0.5rem', color: 'var(--accent-primary)', letterSpacing: '1px', fontWeight: 700 }}>{t.trioMember}</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>{pair.extra}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button 
          className="btn" 
          style={{ width: '100%', background: 'rgba(51, 65, 85, 0.5)' }}
          onClick={() => window.location.reload()}
        >
          {t.newSession}
        </button>
      </div>

      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .results-list::-webkit-scrollbar { width: 4px; }
        .results-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ResultList;
