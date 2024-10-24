import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://<API_IP>:<PORT>/api/items'); // Remplace <API_IP>:<PORT> par l'IP et le port de ton API
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const addItem = async () => {
    if (input.trim() === '') return; // Évite d'ajouter un élément vide

    try {
      await axios.post('http://<API_IP>:<PORT>/api/items', { name: input }); // Remplace <API_IP>:<PORT> par l'IP et le port de ton API
      setInput(''); // Réinitialise l'input
      fetchData(); // Récupère les données à jour
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'élément:', error);
    }
  };

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {data.map(item => <li key={item._id}>{item.name}</li>)}
      </ul>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Ajouter un nouvel élément" 
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default App;
