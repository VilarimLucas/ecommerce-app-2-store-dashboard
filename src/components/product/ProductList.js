import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onDelete, onEdit }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs text-left">
      <div className="w-full overflow-x-auto">
        {products.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {products.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductList;
