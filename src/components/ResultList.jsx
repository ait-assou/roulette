import React from 'react';

const ResultList = ({ groups, t }) => {
  return (
    <div className="glass-card" style={{ height: '100%', animation: 'fadeInRight 0.8s ease' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 800, fontSize: '1.5rem' }}>
        {t.finalPairs}
      </h2>
      <div className="results-list" style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '1rem',
        overflowY: 'auto',
        flex: 1,
        paddingRight: '5px'
      }}>
        {groups.map((group, index) => (
          <div 
            key={index} 
            className="pair-card" 
            style={{ 
              animationDelay: `${index * 0.1}s`,
              background: group.extras ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              border: group.extras ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderRadius: '20px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
               <div style={{ fontSize: '0.6rem', color: 'var(--accent-secondary)', letterSpacing: '2px', fontWeight: 800 }}>{t.leader}</div>
               <div className="leader-name" style={{ fontSize: '1.2rem', fontWeight: 800 }}>{group.leader.name}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.6rem' }}>
               <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '2px', fontWeight: 800 }}>{t.member}S</div>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                 {group.members.map((name, i) => (
                   <div key={i} style={{ 
                     background: 'rgba(255,255,255,0.05)', 
                     padding: '0.4rem 0.8rem', 
                     borderRadius: '8px',
                     fontSize: '0.95rem',
                     border: '1px solid rgba(255,255,255,0.1)'
                   }}>
                     {name}
                   </div>
                 ))}
               </div>
            </div>
            
            {group.extras && group.extras.length > 0 && (
              <div style={{ 
                borderTop: '1px dashed var(--accent-primary)', 
                paddingTop: '0.6rem',
                marginTop: '0.2rem'
              }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', letterSpacing: '2px', fontWeight: 800 }}>{t.trioMember}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
                  {group.extras.map((extra, i) => (
                    <div key={i} style={{ fontSize: '1rem', fontWeight: 800, color: 'white' }}>{extra}</div>
                  ))}
                </div>
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
