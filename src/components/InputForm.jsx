import React, { useState } from 'react';

const InputForm = ({ onNamesSubmit, t }) => {
  const [names, setNames] = useState([]); // Start with empty or list below
  const [newName, setNewName] = useState('');
  const [groupSize, setGroupSize] = useState(2);

  const handleAddStudent = (e) => {
    if (e) e.preventDefault();
    if (newName.trim() === '') return;
    setNames([newName.trim(), ...names]); // Prepended as requested: "placed just below the add button"
    setNewName('');
  };

  const removeStudent = (index) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredNames = names.filter(n => n.trim() !== '');
    if (filteredNames.length >= groupSize) {
      onNamesSubmit(filteredNames, groupSize);
    } else {
      alert(t.mode2 === 'Binôme (2)' 
        ? `Veuillez ajouter au moins ${groupSize} étudiants !` 
        : `Please add at least ${groupSize} students!`);
    }
  };

  return (
    <div className="glass-card" style={{ width: '100%', maxWidth: '480px', height: 'auto', maxHeight: '95vh', padding: '1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.2rem', textAlign: 'center' }}>{t.setupTitle}</h1>
      
      <div style={{ margin: '1rem 0', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 600 }}>{t.groupSize}</p>
        <div style={{ 
          display: 'flex', 
          background: 'rgba(0,0,0,0.2)', 
          padding: '4px', 
          borderRadius: '12px',
          gap: '4px'
        }}>
          {[2, 3, 4].map(size => (
            <button
              key={size}
              type="button"
              onClick={() => setGroupSize(size)}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 700,
                transition: 'all 0.3s',
                background: groupSize === size ? 'var(--accent-primary)' : 'transparent',
                color: groupSize === size ? 'white' : 'var(--text-muted)'
              }}
            >
              {t[`mode${size}`]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStudent()}
            placeholder={t.setupSubtitle}
            className="input-field"
            style={{ width: '100%', fontSize: '1rem', padding: '0.8rem' }}
          />
          <button 
            type="button" 
            onClick={handleAddStudent}
            className="btn"
            style={{ 
              width: '100%', 
              background: 'var(--accent-primary)',
              fontSize: '0.9rem',
              padding: '0.7rem'
            }}
          >
            {t.addStudent}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '0.5rem',
          background: 'rgba(0,0,0,0.15)',
          padding: '0.8rem',
          borderRadius: '12px',
          overflowY: 'auto',
          maxHeight: '40vh',
          minHeight: names.length > 0 ? 'auto' : '0'
        }}>
          {names.map((name, index) => (
            <div key={index} style={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center',
              animation: 'slideInDown 0.3s ease-out'
            }}>
              <div style={{ 
                width: '100%', 
                background: 'rgba(255,255,255,0.05)',
                padding: '0.6rem 2.5rem 0.6rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {name}
              </div>
              <button 
                type="button" 
                onClick={() => removeStudent(index)}
                style={{ 
                  position: 'absolute',
                  right: '10px',
                  background: 'none', 
                  border: 'none', 
                  color: 'rgba(244, 63, 94, 0.8)', 
                  cursor: 'pointer', 
                  fontSize: '1.2rem' 
                }}
              >
                ×
              </button>
            </div>
          ))}
          {names.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '1rem' }}>
              {t.emptyList}
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="btn" 
          disabled={names.length < groupSize}
          style={{ 
            padding: '0.8rem', 
            fontSize: '1rem', 
            marginTop: '0.5rem',
            opacity: names.length < groupSize ? 0.5 : 1
          }}
        >
          {t.startPairing} ({names.length})
        </button>
      </form>

      <style>{`
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default InputForm;
