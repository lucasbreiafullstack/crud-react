import React, { useState } from 'react';
import FazendaList from './components/FazendaList';
import FazendaForm from './components/FazendaForm';
import axios from 'axios';
import './App.css';

const App = () => {
  const [selectedFazenda, setSelectedFazenda] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (fazenda) => {
    setSelectedFazenda(fazenda);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/fazendas/${id}`)
      .then(() => setRefresh(!refresh))
      .catch(error => console.error("Erro ao deletar!", error));
  };

  const handleFormSubmit = () => {
    setRefresh(!refresh);
    setSelectedFazenda(null);
  };

  return (
    <div className="container">
      <h1>TerraMagna - AgroApp</h1>
      <FazendaForm selectedFazenda={selectedFazenda} onFormSubmit={handleFormSubmit} />
      <FazendaList onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;