/*

If I'd had more time:
- A loading spinner to refresh cat facts
- Better layout for the refresh button (it changes position with the text size)

*/



import React, { useState } from 'react';
import './App.css';

import Button from './Button';


export const getCatFact = async (): Promise<string> => {

  try {

    // Fetch a cat fact from the API
    const response = await fetch('https://catfact.ninja/fact');
    
    if (!response.ok) {
      return "Failed to fetch cat fact!";
    }

    const data = await response.json();
    return data.fact;

  } catch (e) {
    if (e instanceof Error) {
      return "Failed to fetch cat fact! error:\n" + e.message;
    }
    return "Failed to fetch cat fact! error is not of type Error";
  }

};

const handleRefresh = async (updateFunction: React.Dispatch<React.SetStateAction<string | null>> ) => {

  updateFunction("Loading new cat fact...");

  const fact = await getCatFact();

  updateFunction(fact);

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


