import React, { useState } from 'react';

const InputForm = ({ onNamesSubmit, t }) => {
  const [names, setNames] = useState([
    'Amaide', 'Sabine', 'Eddy', 'Vincent', 'Daniel', 'Benhale', 'Abdelkader', 'Andry', 'Marcio'
  ]); 
  const [newName, setNewName] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [customSize, setCustomSize] = useState(4); // Keep track of the highest custom size

  const handleAddStudent = (e) => {
    if (e) e.preventDefault();
    if (newName.trim() === '') return;
    setNames([newName.trim(), ...names]); 
    setNewName('');
  };

  const removeStudent = (index) => {
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const incrementSize = () => {
    const nextSize = customSize < 10 ? customSize + 1 : customSize;
    setCustomSize(nextSize);
    setGroupSize(nextSize);
  };

  const decrementSize = () => {
    if (customSize > 4) {
      const nextSize = customSize - 1;
      setCustomSize(nextSize);
      if (groupSize === customSize) {
        setGroupSize(nextSize);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredNames = names.filter(n => n.trim() !== '');
    if (filteredNames.length >= groupSize) {
      onNamesSubmit(filteredNames, groupSize);
    } else {
      alert(t.mode2 === 'Binôme' 
        ? `Veuillez ajouter au moins ${groupSize} étudiants !` 
        : `Please add at least ${groupSize} students!`);
    }
  };

  // Predefined sizes + the active custom size if any
  const displaySizes = [2, 3, 4];
  if (customSize > 4) {
    displaySizes.push(customSize);
  }

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
          gap: '4px',
          alignItems: 'center',
          overflowX: 'auto'
        }}>
          {displaySizes.map(size => (
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
                fontSize: '0.7rem',
                fontWeight: 700,
                transition: 'all 0.3s',
                background: groupSize === size ? 'var(--accent-primary)' : 'transparent',
                color: groupSize === size ? 'white' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
                minWidth: '60px'
              }}
            >
              {size <= 4 ? t[`mode${size}`] : t.customGroup.replace('{n}', size)}
            </button>
          ))}
          {customSize > 4 && (
            <button
              type="button"
              onClick={decrementSize}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: 700,
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                marginLeft: '4px',
                flexShrink: 0
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              -
            </button>
          )}
          <button
            type="button"
            onClick={incrementSize}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              fontWeight: 700,
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              marginLeft: customSize > 4 ? '4px' : 'auto',
              flexShrink: 0
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          >
            +
          </button>
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
