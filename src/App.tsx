import React, { useState } from 'react';
import './App.css';

import Button from './Button';


export const handleRefresh = async (updateFunction: React.Dispatch<React.SetStateAction<string | null>> ) => {
  try {

    // set loading

    updateFunction("loading cat fact...");


    // Fetch a cat fact from the API
    const response = await fetch('https://catfact.ninja/fact');
    
    if (!response.ok) {
      updateFunction("Failed to fetch cat fact!");
      throw new Error('Failed to fetch cat fact');
    }

    const data = await response.json();
    updateFunction(data.fact);

  } catch (e) {
    if (e instanceof Error) {
      updateFunction("Failed to fetch cat fact!\n" + e.message);
      console.error('Error fetching cat fact:', e.message);
    }
  }
};


function App() {

  const [catFact, setCatFact] = useState<string | null>(null);
  
  return (
    <div className="App">
      <header className="App-header">

      <Button text="Refresh" onClick={() => handleRefresh(setCatFact)} className="refresh-button" />
      
      {catFact && <p>{catFact}</p>}

      </header>
    </div>
  );
}

export default App;


