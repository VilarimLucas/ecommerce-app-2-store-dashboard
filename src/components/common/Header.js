import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import logo from '../../assets/images/logo.png'; 
import product1 from '../../assets/images/product01.png'; 
import product2 from '../../assets/images/product02.png'; 
import ProductSearch from '../product/ProductSearch';  

function Header() {
  // Estados para armazenar status do tema, menus e perfil
  const [dark, setDark] = useState(getThemeFromLocalStorage());
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]); 

  // Atualizar o tema no localStorage quando mudar
  useEffect(() => {
    setThemeToLocalStorage(dark);
  }, [dark]);

  // Funções de controle do tema e menus
  const toggleTheme = () => setDark(!dark);
  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const closeSideMenu = () => setIsSideMenuOpen(false);
  const toggleNotificationsMenu = () => setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  const closeNotificationsMenu = () => setIsNotificationsMenuOpen(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);

  // Função de busca de produtos
  const handleSearch = async (searchTerm) => {
    try {
      const res = await axios.get(`/produto?productName=${searchTerm}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Erro ao buscar produto', err);
    }
  };

  // Funções para manipular o tema no localStorage
  function getThemeFromLocalStorage() {
    const storedTheme = window.localStorage.getItem('dark');
    if (storedTheme) return JSON.parse(storedTheme);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function setThemeToLocalStorage(value) {
    window.localStorage.setItem('dark', JSON.stringify(value));
  }

  return (
    <header className={`z-10 py-4 bg-white shadow-md ${dark ? 'dark:bg-gray-800' : ''}`}>
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        
        <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none" onClick={toggleSideMenu}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* Componente de busca de produtos */}
        <ProductSearch onSearch={handleSearch} />

        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Botão de alternância de tema */}
          <li className="flex">
            <button className="rounded-md focus:outline-none" onClick={toggleTheme} aria-label="Toggle color mode">
              {dark ? (
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 010 16 8 8 0 010-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </li>

          {/* Menu de notificações */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none"
              onClick={toggleNotificationsMenu}
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 border-2 border-white rounded-full"></span>
            </button>

            {isNotificationsMenuOpen && (
              <ul className="absolute right-0 w-56 p-2 mt-2 text-gray-600 bg-white border rounded-md shadow-md">
                <li className="flex justify-between px-2 py-1">
                  <span>Messages</span>
                  <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded-full">13</span>
                </li>
                <li className="flex justify-between px-2 py-1">
                  <span>Sales</span>
                  <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded-full">2</span>
                </li>
                <li className="flex px-2 py-1">
                  <span>Alerts</span>
                </li>
              </ul>
            )}
          </li>

          {/* Menu de perfil */}
          <li className="relative">
            <button
              className="align-middle rounded-full focus:outline-none"
              onClick={toggleProfileMenu}
              aria-label="Account"
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                alt="Profile"
              />
            </button>

            {isProfileMenuOpen && (
              <ul className="absolute right-0 w-56 p-2 mt-2 text-gray-600 bg-white border rounded-md shadow-md">
                <li className="flex px-2 py-1">
                  <span>Profile</span>
                </li>
                <li className="flex px-2 py-1">
                  <span>Settings</span>
                </li>
                <li className="flex px-2 py-1">
                  <span>Log out</span>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
