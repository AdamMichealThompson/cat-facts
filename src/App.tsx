import React, { useState } from 'react';



import './App.css';


import Button from './Button';


function App() {

  const [catFact, setCatFact] = useState<string | null>(null);

  const handleRefresh = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {

      // set loading

      setCatFact("loading cat fact...");


      // Fetch a cat fact from the API
      const response = await fetch('https://catfact.ninja/fact');
      
      if (!response.ok) {
        setCatFact("Failed to fetch cat fact!");
        throw new Error('Failed to fetch cat fact');
      }

      const data = await response.json();
      setCatFact(data.fact);

    } catch (e) {
      if (e instanceof Error) {
        setCatFact("Failed to fetch cat fact!\n" + e.message);
        console.error('Error fetching cat fact:', e.message);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">

      <Button text="Refresh" onClick={handleRefresh} className="refresh-button" />
      
      {catFact && <p>{catFact}</p>}

      </header>
    </div>
  );
}

export default App;
