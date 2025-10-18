import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProdutosPage from "./pages/Produtos";
import ResetPage from "./pages/ResetProdutos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/produtos" element={<ProdutosPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="*" element={<LoginPage />} /> {/* Redireciona para login por padrão */}
      </Routes>
    </Router>
  );
}

export default App;
