import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FazendaForm = ({ selectedFazenda, onFormSubmit }) => {
  const [form, setForm] = useState({
    nome: '',
    matricula: '',
    localizacao: '',
    dono: '',
    area: '',
    tipo_plantacao: ''
  });

  useEffect(() => {
    if (selectedFazenda) {
      setForm(selectedFazenda);
    }
  }, [selectedFazenda]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFazenda) {
      axios.put(`http://localhost:8080/fazendas/${selectedFazenda.id}`, form)
        .then(() => onFormSubmit())
        .catch(error => console.error("Erro ao atualizar!", error));
    } else {
      axios.post('http://localhost:8080/fazendas', form)
        .then(() => onFormSubmit())
        .catch(error => console.error("Erro ao criar!", error));
    }

    setForm({
      nome: '',
      matricula: '',
      localizacao: '',
      dono: '',
      area: '',
      tipo_plantacao: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedFazenda ? 'Editar Fazenda' : 'Registrar Fazenda'}</h2>
      <input
        name="nome"
        value={form.nome}
        onChange={handleChange}
        placeholder="Nome da Fazenda"
        required
      />
      <input
        name="matricula"
        value={form.matricula}
        onChange={handleChange}
        placeholder="Matrícula"
        required
      />
      <input
        name="localizacao"
        value={form.localizacao}
        onChange={handleChange}
        placeholder="Localização"
      />
      <input
        name="dono"
        value={form.dono}
        onChange={handleChange}
        placeholder="Dono"
      />
      <input
        name="area"
        value={form.area}
        onChange={handleChange}
        placeholder="Área (ha)"
        type="number"
      />
      <input
        name="tipo_plantacao"
        value={form.tipo_plantacao}
        onChange={handleChange}
        placeholder="Tipo de Plantação"
      />
      <button type="submit">{selectedFazenda ? 'Atualizar' : 'Criar'}</button>
    </form>
  );
};

export default FazendaForm;
