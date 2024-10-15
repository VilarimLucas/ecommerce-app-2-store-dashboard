import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import ProductList from '../components/product/ProductList';

const SearchView = () => {
  const { nameOrId } = useParams(); // Obtém o termo de pesquisa da URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(nameOrId);
  const navigate = useNavigate();

  useEffect(() => {
    if (nameOrId) {
      fetchProducts(nameOrId);
    }
  }, [nameOrId]);

  const fetchProducts = async (term) => {
    try {
      const res = await axios.get(`/produto?productName=${term}`);
      const productsData = res.data;
      setProducts(productsData);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar produtos', err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/produto/${id}`);
      fetchProducts(searchTerm); // Recarrega a lista após exclusão
    } catch (err) {
      console.error('Erro ao excluir produto', err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`); // Navega para a tela de atualização
  };

  return (
    <div>
      <h2 className="text-left my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Resultado de Pesquisa: {nameOrId}
      </h2>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : products.length === 0 ? (
        <p>Nenhum produto encontrado com o nome "{nameOrId}".</p>
      ) : (
        <ProductList products={products} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default SearchView;
