import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Aside from './components/common/Aside';
import ProductView from './views/ProductView';
import NewProductView from './views/NewProductView';
import UpdateProductView from './views/UpdateProductView';
import SearchView from './views/SearchView';

function App() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getThemeFromLocalStorage());

  const setThemeToLocalStorage = (value) => {
    localStorage.setItem('dark', JSON.stringify(value));
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setThemeToLocalStorage(newDarkMode);
    document.documentElement.classList.toggle('theme-dark', newDarkMode);
  };

  const toggleSideMenu = () => setIsAsideOpen(!isAsideOpen);
  const closeSideMenu = () => setIsAsideOpen(false);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={`App flex h-screen bg-gray-50 ${darkMode ? 'dark:bg-gray-900' : ''}`}>
        <Aside isOpen={isAsideOpen} closeSideMenu={closeSideMenu} />
        <div className="flex flex-col flex-1 w-full">
          <Header toggleSideMenu={toggleSideMenu} toggleTheme={toggleTheme} />
          <main className="h-full overflow-y-auto">
            <Routes>
              <Route path="/" element={<ProductView />} />
              <Route path="/new-product" element={<NewProductView />} />
              <Route path="/update-product/:id" element={<UpdateProductView />} />
              <Route path="/search/:nameOrId" element={<SearchView />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

function getThemeFromLocalStorage() {
  return JSON.parse(localStorage.getItem('dark')) || false;
}

export default App;
