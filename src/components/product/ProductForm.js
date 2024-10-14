import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData = {}, onSubmit }) => {
  const [productName, setProductName] = useState(initialData.productName || '');
  const [productPrice, setProductPrice] = useState(initialData.productPrice || 0); // Valor numérico, inicialize como 0
  const [productDescription, setProductDescription] = useState(initialData.productDescription || '');
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(initialData.productImage ? `http://localhost:4040/images/${initialData.productImage}` : null);
  const [imageName, setImageName] = useState(initialData.productImage || 'Nenhuma imagem selecionada');

  useEffect(() => {
    if (initialData) {
      setProductName(initialData.productName || ''); // Certifique-se de que não seja undefined
      setProductPrice(initialData.productPrice || 0); // Valor numérico não deve ser undefined
      setProductDescription(initialData.productDescription || '');
      setPreviewImage(initialData.productImage ? `http://localhost:4040/images/${initialData.productImage}` : null);
      setImageName(initialData.productImage || 'Nenhuma imagem selecionada');
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);

    // Atualizar a pré-visualização com a nova imagem selecionada
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageName(file.name); // Atualiza o nome da imagem exibido ao lado do botão
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);
    if (productImage) {
      formData.append('productImage', productImage);
    }
    onSubmit(formData);
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
          {/* Exibe o nome da imagem ao lado do botão de upload */}
          <span className="text-sm text-gray-600 dark:text-gray-400">{imageName}</span>
        </label>

        {/* Pré-visualização da imagem existente */}
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
