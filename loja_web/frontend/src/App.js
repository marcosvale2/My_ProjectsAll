import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProdutosPage from "./Produtos";
import ResetPage from "./ResetProdutos";

function App() {
  return (
    <Router>
      <div className="p-6">
        <nav className="mb-6">
          <Link to="/produtos" className="mr-4 text-blue-600 hover:underline">Produtos</Link>
          <Link to="/reset" className="text-red-600 hover:underline">Resetar</Link>
        </nav>
        <Routes>
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="*" element={<ProdutosPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
