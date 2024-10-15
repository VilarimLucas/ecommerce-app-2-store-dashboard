import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Importar a configuração da API

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [productName, setProductName] = useState(initialData.productName || '');
  const [productPrice, setProductPrice] = useState(initialData.productPrice || 0);
  const [productDescription, setProductDescription] = useState(initialData.productDescription || '');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    initialData.productImage ? `${api.defaults.baseURL}/images/${initialData.productImage}` : null
  );
  const [imageName, setImageName] = useState(initialData.productImage || 'Nenhuma imagem selecionada');

  useEffect(() => {
    // Este efeito só será executado se `initialData` mudar
    if (initialData.productName !== undefined) {
      setProductName(initialData.productName || '');
    }
    if (initialData.productPrice !== undefined) {
      setProductPrice(initialData.productPrice || 0);
    }
    if (initialData.productDescription !== undefined) {
      setProductDescription(initialData.productDescription || '');
    }
    if (initialData.productImage) {
      setPreviewImage(`${api.defaults.baseURL}/images/${initialData.productImage}`);
      setImageName(initialData.productImage || 'Nenhuma imagem selecionada');
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Confirmação de Cadastro/Atualização
    const confirmationMessage = initialData._id 
      ? 'Tem certeza que deseja atualizar este produto?' 
      : 'Tem certeza que deseja cadastrar este produto?';
    
    if (window.confirm(confirmationMessage)) {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productPrice', productPrice);
      formData.append('productDescription', productDescription);
      if (productImage) {
        formData.append('productImage', productImage);
      }
      onSubmit(formData);
    }
  };

  return (
    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 text-left">
      <form onSubmit={handleSubmit}>
        <label className="block text-sm">
          <span className="text-gray-700 dark:text-gray-400">Nome do Produto</span>
          <input
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nome do Produto"
            required
          />
        </label>

        <label className="block mt-4 text-sm">
          <span className="text-gray-700 dark:text-gray-400">Preço</span>
          <input
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            id="productPrice"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Preço do Produto"
            required
          />
        </label>

        <label className="block mt-4 text-sm">
          <span className="text-gray-700 dark:text-gray-400">Descrição</span>
          <textarea
            className="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-textarea"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Descrição do Produto"
            rows="3"
            required
          />
        </label>

        <label className="block mt-4 text-sm">
          <span className="text-gray-700 dark:text-gray-400">Imagem do Produto</span>
          <input
            className="block w-full text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
            id="productImage"
            type="file"
            onChange={handleImageChange}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">{imageName}</span>
        </label>

        {previewImage && (
          <div className="mt-4">
            <span className="text-gray-700 dark:text-gray-400">Pré-visualização da Imagem</span>
            <img
              src={previewImage}
              alt="Imagem do Produto"
              className="w-32 h-32 mt-2 object-cover"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-6 px-4 py-2 text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          {initialData._id ? 'Atualizar Produto' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
