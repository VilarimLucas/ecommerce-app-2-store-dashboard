import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/product/ProductForm';
import axios from '../services/api';

const NewProductView = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      await axios.post('/produto', data);
      navigate('/'); // Redireciona para a lista de produtos após cadastro
    } catch (err) {
      console.error('Erro ao cadastrar produto', err);
    }
  };

  return (
    <div>
      <h2 className="text-left my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Cadastro de Produto
      </h2>
      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default NewProductView;
