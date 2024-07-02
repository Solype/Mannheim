import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const fetchGreeting = async () => {
    try {
      const response = await fetch(`http://localhost:5000/greet?name=${name}`);
      const data = await response.text();
      setGreeting(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching the greeting:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Greet App</h1>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={name} 
          onChange={handleInputChange}
        />
        <button onClick={fetchGreeting}>Greet</button>
        <p>{greeting}</p>
      </header>
    </div>
  );
}

export default App;
