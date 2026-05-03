import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import Wheel from './components/Wheel';
import ResultList from './components/ResultList';
import './index.css';

const translations = {
  fr: {
    metaTitle: "La Roue des Binômes | Outil de Classe Interactif",
    title: "La Roue des Groupes",
    setupTitle: "Configuration de la Classe",
    setupSubtitle: "Entrez les noms des étudiants pour commencer.",
    addStudent: "+ Ajouter",
    startPairing: "Démarrer le Tirage",
    readyToPair: "Prêt pour le tirage de {count} étudiants.",
    spinOnce: "LANCER LA ROUE",
    revealing: "TIRAGE EN COURS...",
    matched: "GROUPES FORMÉS !",
    finalPairs: "Groupes Finaux",
    team: "Équipe",
    leader: "LEADER",
    member: "MEMBRE",
    trioMember: "+ MEMBRE SUPPLÉMENTAIRE",
    newSession: "Nouvelle Session",
    noteTrio: "Note : Certains groupes auront un membre supplémentaire !",
    perfectEven: "Répartition parfaite !",
    waitingSpin: "En attente du tirage...",
    spinToAlign: "La roue va aligner tous les binômes en un seul tour.",
    matchedText: "ASSORTIS !",
    groupSize: "Taille des Groupes",
    mode2: "Binôme",
    mode3: "Trinôme",
    mode4: "Quadrinôme",
    emptyList: "La liste est vide"
  },
  en: {
    metaTitle: "Student Pairing Wheel | Interactive Classroom Tool",
    title: "The Grouping Wheel",
    setupTitle: "Classroom Setup",
    setupSubtitle: "Enter student names to begin.",
    addStudent: "+ Add",
    startPairing: "Start Grouping",
    readyToPair: "Ready to group {count} students.",
    spinOnce: "SPIN ONCE",
    revealing: "REVEALING...",
    matched: "GROUPS MATCHED!",
    finalPairs: "Final Student Groups",
    team: "Team",
    leader: "LEADER",
    member: "MEMBER",
    trioMember: "+ EXTRA MEMBER",
    newSession: "New Session",
    noteTrio: "Note: Some groups will have an extra member!",
    perfectEven: "Perfectly even grouping!",
    waitingSpin: "Waiting for Spin...",
    spinToAlign: "The wheel will align all groups in a single spin.",
    matchedText: "MATCHED!",
    groupSize: "Group Size",
    mode2: "Pair",
    mode3: "Trio",
    mode4: "Quad",
    emptyList: "List is empty"
  }
};

function App() {
  const [lang, setLang] = useState('fr');
  const [step, setStep] = useState('input');
  const [groupSize, setGroupSize] = useState(2);
  
  const [leaders, setLeaders] = useState([]);
  const [members, setMembers] = useState([]); // This will store arrays for 3/4 person groups
  const [extraStudents, setExtraStudents] = useState([]);
  const [finalGroups, setFinalGroups] = useState([]);

  const t = translations[lang];

  useEffect(() => {
    document.title = t.metaTitle;
  }, [lang, t.metaTitle]);

  const handleNamesSubmit = (names, size) => {
    setGroupSize(size);
    const shuffled = [...names].sort(() => Math.random() - 0.5);
    const count = shuffled.length;
    
    const numGroups = Math.floor(count / size);
    if (numGroups === 0) {
      alert(lang === 'fr' ? 'Pas assez d\'étudiants !' : 'Not enough students!');
      return;
    }

    // Leaders: 1 per group
    const leadersList = shuffled.slice(0, numGroups).map((name, i) => ({ id: `L-${i}`, name }));
    
    // Members: (size - 1) per group
    const membersPerGroup = size - 1;
    const membersPool = shuffled.slice(numGroups, numGroups + (numGroups * membersPerGroup));
    
    const membersList = [];
    for (let i = 0; i < numGroups; i++) {
      const groupMembers = membersPool.slice(i * membersPerGroup, (i + 1) * membersPerGroup);
      membersList.push({ id: `M-${i}`, names: groupMembers });
    }
    
    // Extras: remaining students
    const extras = shuffled.slice(numGroups + (numGroups * membersPerGroup));
    setExtraStudents(extras);
    
    setLeaders(leadersList);
    setMembers(membersList);
    setStep('pairing');
  };

  const handleAllPairsFormed = (formedPairs) => {
    // formedPairs is [{ leader, member: { names: [...] } }]
    let groups = formedPairs.map(p => ({
      leader: p.leader,
      members: p.member.names,
      extra: null
    }));

    // Distribute extras randomly to different groups
    if (extraStudents.length > 0) {
      const availableIndices = Array.from({ length: groups.length }, (_, i) => i);
      const shuffledIndices = [...availableIndices].sort(() => Math.random() - 0.5);
      
      extraStudents.forEach((student, i) => {
        const targetIndex = shuffledIndices[i % groups.length];
        if (!groups[targetIndex].extras) groups[targetIndex].extras = [];
        groups[targetIndex].extras.push(student);
      });
    }
    
    setFinalGroups(groups);
  };

  return (
    <div className="app-wrapper">
      <div className="lang-toggle">
        <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="lang-btn">
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
                {extraStudents.length > 0 ? t.noteTrio : t.perfectEven}
              </p>
              <Wheel 
                leaders={leaders} 
                members={members} 
                onAllPairsFormed={handleAllPairsFormed}
                t={t}
                isMulti={groupSize > 2}
              />
            </div>
          </div>
          
          <div className="stage-right">
            {finalGroups.length > 0 ? (
              <ResultList groups={finalGroups} t={t} />
            ) : (
              <div className="glass-card status-card">
                <h2>{t.waitingSpin}</h2>
                <p>{t.readyToPair.replace('{count}', leaders.length * groupSize + extraStudents.length)}</p>
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
