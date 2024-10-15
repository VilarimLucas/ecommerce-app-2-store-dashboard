import React, { useState } from 'react';
import Header from './components/common/Header'; 
import Aside from './components/common/Aside'; 
import ProductView from './views/ProductView'; 
import NewProductView from './views/NewProductView'; 
import UpdateProductView from './views/UpdateProductView'; 
import SearchView from './views/SearchView'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  const toggleMenu = () => {
    setIsAsideOpen(!isAsideOpen);
  };

  return (
    <Router>
      <div className="App flex h-screen bg-gray-50 dark:bg-gray-900 ">
        <Aside isOpen={isAsideOpen} toggleMenu={toggleMenu} />
        <div className="flex flex-col flex-1 w-full">
          <Header toggleMenu={toggleMenu} />
          <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
              <Routes>
                <Route path="/" element={<ProductView />} />
                <Route path="/new-product" element={<NewProductView />} />
                <Route path="/update-product/:id" element={<UpdateProductView />} />
                <Route path="/search/:nameOrId" element={<SearchView />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
