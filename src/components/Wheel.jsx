import React, { useState, useEffect, useRef } from 'react';

const Wheel = ({ leaders, members, onAllPairsFormed, t }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [phase, setPhase] = useState('intro-inner'); 
  const audioCtx = useRef(null);

  const numSegments = leaders.length;
  const angleStep = 360 / numSegments;

  useEffect(() => {
    const initAudio = () => {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const playTick = () => {
    if (!audioCtx.current) return;
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.current.currentTime);
    gain.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.05);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('intro-outer'), 800);
    const t2 = setTimeout(() => setPhase('ready'), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const spin = () => {
    if (isSpinning || phase === 'reveal') return;

    setIsSpinning(true);
    const alignmentIndex = Math.floor(Math.random() * numSegments);
    const alignmentAngle = alignmentIndex * angleStep;
    const fullRots = 6 + Math.floor(Math.random() * 3);
    const totalRotation = rotation + (360 * fullRots) + alignmentAngle;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setPhase('reveal');
      const offset = alignmentIndex;
      const pairs = leaders.map((leader, i) => {
        const memberIndex = (i - offset + numSegments) % numSegments;
        return { leader, member: members[memberIndex] };
      });
      setTimeout(() => onAllPairsFormed(pairs), 1500);
    }, 3000);
  };

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(playTick, 120);
      return () => clearInterval(interval);
    }
  }, [isSpinning]);

  const colors = [
    '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', 
    '#f59e0b', '#10b981', '#06b6d4', '#3b82f6',
    '#ef4444', '#f97316', '#84cc16', '#06b6d4', '#a855f7'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className={`wheel-container ${phase}`} style={{ transform: numSegments > 10 ? 'scale(0.8)' : 'scale(1)' }}>
        <div className="outer-wheel" 
          style={{ 
            transform: `rotate(${rotation}deg) scale(${phase !== 'intro-inner' ? 1 : 0})`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.15, 0, 0.15, 1)' : 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            opacity: phase !== 'intro-inner' ? 1 : 0,
            border: phase === 'reveal' ? '4px solid white' : '6px solid var(--glass-border)'
          }}
        >
          {members.map((member, i) => {
            const rotate = i * angleStep;
            const skewY = 90 - angleStep;
            const memberCount = member.names.length;
            
            return (
              <div key={member.id} className="segment" style={{ transform: `rotate(${rotate}deg) skewY(-${skewY}deg)`, backgroundColor: colors[i % colors.length] }}>
                <div className="segment-content" style={{ 
                  transform: `skewY(${skewY}deg) rotate(${angleStep / 2}deg)`, 
                  paddingBottom: numSegments > 8 ? '40px' : '70px', 
                  fontSize: numSegments > 10 || memberCount > 1 ? '0.7rem' : '0.9rem', 
                  fontWeight: '800',
                  lineHeight: '1.2'
                }}>
                  {member.names.map((name, idx) => {
                    const totalRotation = rotation + rotate + (angleStep / 2);
                    return (
                      <div key={idx} style={{ 
                        marginBottom: memberCount > 1 ? '4px' : '0',
                        transform: phase === 'reveal' ? `rotate(${-totalRotation}deg)` : 'rotate(0deg)',
                        transition: 'transform 0.5s ease'
                      }}>
                        {name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="inner-wheel"
          style={{
            transform: `translate(-50%, -50%) scale(${phase !== 'intro-inner' ? 1 : 0})`,
            width: numSegments > 8 ? '180px' : '220px',
            height: numSegments > 8 ? '180px' : '220px',
            background: phase === 'reveal' ? 'rgba(255,255,255,0.1)' : 'var(--inner-wheel-bg)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255,255,255,0.2)',
            zIndex: 10
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {leaders.map((leader, i) => (
              <div key={leader.id} style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: `translate(-50%, -50%) rotate(${i * angleStep}deg) translateY(-${numSegments > 8 ? 60 : 80}px) ${phase === 'reveal' ? `rotate(-${i * angleStep}deg)` : 'rotate(0deg)'}`, 
                color: 'white', 
                fontWeight: '900', 
                fontSize: numSegments > 10 ? '0.7rem' : '1rem', 
                textAlign: 'center',
                transition: 'transform 0.5s ease'
              }}>
                {leader.name}
              </div>
            ))}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
              <div style={{ fontWeight: '900', color: 'white', fontSize: phase === 'reveal' ? '1.2rem' : '0.8rem', opacity: numSegments > 12 ? 0 : 1 }}>
                {phase === 'reveal' ? null : t.leader}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button onClick={spin} className="btn" disabled={isSpinning || phase === 'reveal'} style={{ width: '220px', height: '56px', borderRadius: '28px' }}>
          {isSpinning ? t.revealing : phase === 'reveal' ? t.matched : t.spinOnce}
        </button>
      </div>
    </div>
  );
};

export default Wheel;
