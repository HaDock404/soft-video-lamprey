import React, { useState, useEffect } from 'react';

function App() {
  const [input, setInput] = useState(''); // Gère l'entrée utilisateur
  const [result, setResult] = useState(''); // Gère le résultat ou les erreurs

  useEffect(() => {
    // Écoute des réponses du backend
    window.electron.receive('python-output', (data) => {
      setResult(`Résultat : ${data}`);
    });

    window.electron.receive('python-error', (error) => {
      setResult(`Erreur : ${error}`);
    });

    // Nettoyage des listeners lorsque le composant est démonté
    return () => {
      window.electron.receive('python-output', () => {});
      window.electron.receive('python-error', () => {});
    };
  }, []);

  const handleCalculate = () => {
    window.electron.send('run-python', input);
  };

  return (
    <div>
      <h1>Calculateur avec Python</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Entrez une valeur"
      />
      <button onClick={handleCalculate}>Calculer</button>
      <p id="result">{result}</p>
    </div>
  );
}

export default App;
