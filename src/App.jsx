import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import Wheel from './components/Wheel';
import ResultList from './components/ResultList';
import './index.css';

const translations = {
  fr: {
    metaTitle: "La Roue des Binômes | Outil de Classe Interactif",
    title: "La Roue des Binômes",
    setupTitle: "Configuration de la Classe",
    setupSubtitle: "Entrez les noms des élèves pour commencer.",
    addStudent: "+ Ajouter",
    startPairing: "Démarrer le Tirage",
    readyToPair: "Prêt pour le tirage de {count} élèves.",
    spinOnce: "LANCER LA ROUE",
    revealing: "TIRAGE EN COURS...",
    matched: "BINÔMES FORMÉS !",
    finalPairs: "Binômes Finaux",
    team: "Équipe",
    leader: "LEADER",
    member: "MEMBRE",
    trioMember: "+ TROISIÈME MEMBRE",
    newSession: "Nouvelle Session",
    noteTrio: "Note : Un élève sera ajouté à un trio !",
    perfectEven: "Nombre pair, binômes parfaits !",
    waitingSpin: "En attente du tirage...",
    spinToAlign: "La roue va aligner tous les binômes en un seul tour.",
    matchedText: "ASSORTIS !"
  },
  en: {
    metaTitle: "Student Pairing Wheel | Interactive Classroom Tool",
    title: "The Pairing Wheel",
    setupTitle: "Classroom Setup",
    setupSubtitle: "Enter student names to begin.",
    addStudent: "+ Add",
    startPairing: "Start Pairing",
    readyToPair: "Ready to pair {count} students.",
    spinOnce: "SPIN ONCE",
    revealing: "REVEALING...",
    matched: "PAIRS MATCHED!",
    finalPairs: "Final Student Pairs",
    team: "Team",
    leader: "LEADER",
    member: "MEMBER",
    trioMember: "+ TRIO MEMBER",
    newSession: "New Session",
    noteTrio: "Note: One student will be added to a trio!",
    perfectEven: "Perfectly even pairing!",
    waitingSpin: "Waiting for Spin...",
    spinToAlign: "The wheel will align all pairs in a single spin.",
    matchedText: "MATCHED!"
  }
};

function App() {
  const [lang, setLang] = useState('fr'); // French by default
  const [step, setStep] = useState('input');
  const [leaders, setLeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [extraStudent, setExtraStudent] = useState(null);
  const [pairs, setPairs] = useState([]);

  const t = translations[lang];

  // Update dynamic page title
  useEffect(() => {
    document.title = t.metaTitle;
  }, [lang, t.metaTitle]);

  const handleNamesSubmit = (names) => {
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const count = shuffled.length;
    const pairCount = Math.floor(count / 2);
    
    const leadersList = shuffled.slice(0, pairCount).map((name, i) => ({ id: `L-${i}`, name }));
    const membersList = shuffled.slice(pairCount, pairCount * 2).map((name, i) => ({ id: `M-${i}`, name }));
    
    if (count % 2 !== 0) {
      setExtraStudent(shuffled[count - 1]);
    } else {
      setExtraStudent(null);
    }
    
    setLeaders(leadersList);
    setMembers(membersList);
    setStep('pairing');
  };

  const handleAllPairsFormed = (formedPairs) => {
    if (extraStudent) {
      const randomIndex = Math.floor(Math.random() * formedPairs.length);
      const updatedPairs = formedPairs.map((pair, i) => {
        if (i === randomIndex) {
          return { ...pair, extra: extraStudent };
        }
        return pair;
      });
      setPairs(updatedPairs);
    } else {
      setPairs(formedPairs);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="lang-toggle">
        <button 
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          className="lang-btn"
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>

      {step === 'input' ? (
        <div className="centered-content">
          <InputForm onNamesSubmit={handleNamesSubmit} t={t} />
        </div>
      ) : (
        <div className="pairing-stage">
          <div className="stage-left">
            <div className="glass-card wheel-card">
              <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{t.title}</h1>
              <p className="subtitle">
                {extraStudent ? t.noteTrio : t.perfectEven}
              </p>
              <Wheel 
                leaders={leaders} 
                members={members} 
                onAllPairsFormed={handleAllPairsFormed}
                t={t}
              />
            </div>
          </div>
          
          <div className="stage-right">
            {pairs.length > 0 ? (
              <ResultList pairs={pairs} t={t} />
            ) : (
              <div className="glass-card status-card">
                <h2>{t.waitingSpin}</h2>
                <p>{t.readyToPair.replace('{count}', leaders.length * 2 + (extraStudent ? 1 : 0))}</p>
                <div className="placeholder-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
