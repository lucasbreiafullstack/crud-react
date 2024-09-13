import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FazendaList = ({ onEdit, onDelete }) => {
  const [fazendas, setFazendas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/fazendas')
      .then(response => setFazendas(response.data))
      .catch(error => console.error("Houve um erro!", error));
  }, []);

  return (
    <div>
      <h2>Registro de Fazendas</h2>
      <ul>
        {fazendas.map(fazenda => (
          <li key={fazenda.id}>
            {fazenda.nome} - {fazenda.matricula}
            <button onClick={() => onEdit(fazenda)}>Editar</button>
            <button onClick={() => onDelete(fazenda.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FazendaList;
