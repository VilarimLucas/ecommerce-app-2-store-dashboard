import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/product/ProductForm';
import axios from '../services/api';

const UpdateProductView = () => {
  const { id } = useParams(); // Pega o ID do produto da URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/produto/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Erro ao buscar produto', err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleFormSubmit = async (data) => {
    try {
      await axios.put(`/produto/${id}`, data);
      navigate('/'); // Redireciona para a lista de produtos após atualização
    } catch (err) {
      console.error('Erro ao atualizar produto', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-left my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Atualizar Produto</h2>
      {product ? <ProductForm initialData={product} onSubmit={handleFormSubmit} /> : <p>Carregando...</p>}
    </div>
  );
};

export default UpdateProductView;
