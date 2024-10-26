import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Aside({ isOpen, closeSideMenu }) {
  const navigate = useNavigate();
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);

  // Alternar o estado do menu lateral
  const togglePagesMenu = () => {
    setIsPagesMenuOpen(!isPagesMenuOpen);
  };

  // Função para navegar e fechar o menu lateral
  const handleNavigation = (path) => {
    navigate(path);
    closeSideMenu(); // Fechar o menu após a navegação
  };

  return (
    <>
      <aside
        className={`z-20 w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 ${isOpen ? '' : 'hidden'}`}
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <button
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            onClick={() => handleNavigation('/')}
          >
            Painel do E-Commerce
          </button>

          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <button
                className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                onClick={() => handleNavigation('/')}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span className="ml-4">Painel de Controle</span>
              </button>
            </li>
          </ul>

          <div className="px-6 my-6">
            <button
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              onClick={() => handleNavigation('/new-product')}
            >
              Cadastrar Produto
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </button>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50" onClick={closeSideMenu}></div>
      )}
    </>
  );
}

export default Aside;
