import React, { useState } from 'react';

const InputForm = ({ onNamesSubmit, t }) => {
  const [names, setNames] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const addStudent = () => {
    setNames([...names, '']);
  };

  const removeStudent = (index) => {
    if (names.length <= 2) return;
    const newNames = names.filter((_, i) => i !== index);
    setNames(newNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredNames = names.filter(n => n.trim() !== '');
    if (filteredNames.length >= 2) {
      onNamesSubmit(filteredNames.map(name => name.trim()));
    } else {
      alert('Please enter at least 2 students!');
    }
  };

  return (
    <div className="glass-card" style={{ width: '100%', maxWidth: '450px', height: 'auto', maxHeight: '90vh', padding: '2rem' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{t.setupTitle}</h1>
      <p className="subtitle" style={{ marginBottom: '1.5rem' }}>{t.setupSubtitle}</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr', 
          gap: '0.8rem',
          background: 'rgba(0,0,0,0.15)',
          padding: '1rem',
          borderRadius: '12px',
          overflowY: 'auto',
          flex: 1
        }}>
          {names.map((name, index) => (
            <div key={index} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder={t.member.toLowerCase() + ` ${index + 1}`}
                className="input-field"
                style={{ 
                  width: '100%', 
                  margin: 0, 
                  padding: '0.7rem 2.5rem 0.7rem 1rem', 
                  fontSize: '1rem',
                  borderRadius: '10px'
                }}
                value={name}
                onChange={(e) => handleChange(index, e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => removeStudent(index)}
                style={{ 
                  position: 'absolute',
                  right: '8px',
                  background: 'none', 
                  border: 'none', 
                  color: 'rgba(244, 63, 94, 0.6)', 
                  cursor: 'pointer', 
                  fontSize: '1rem' 
                }}
              >
                ×
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addStudent}
            className="btn"
            style={{ 
              background: 'transparent', 
              border: '1px dashed var(--accent-primary)',
              color: 'var(--accent-primary)',
              boxShadow: 'none',
              fontSize: '0.8rem',
              padding: '0.4rem',
              height: '36px',
              marginTop: '0.5rem'
            }}
          >
            {t.addStudent}
          </button>
        </div>
        
        <button type="submit" className="btn" style={{ padding: '0.8rem', fontSize: '1rem' }}>
          {t.startPairing} ({names.filter(n => n.trim() !== '').length})
        </button>
      </form>
    </div>
  );
};

export default InputForm;
