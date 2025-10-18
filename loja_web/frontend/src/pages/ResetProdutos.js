import React from "react";

const API_URL = "http://localhost:8000";

export default function ResetPage() {

  const handleReset = async () => {
    if (window.confirm("Tem certeza que deseja resetar o banco de dados?")) {
      await fetch(`${API_URL}/produtos/reset`, { method: "POST" });
      alert("Banco de dados resetado!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Resetar Banco de Produtos</h2>
      <p className="text-center text-dark">
        Cuidado: esta ação apagará todos os produtos e recriará a tabela.
      </p>
      <div className="text-center">
        <button onClick={handleReset} className="btn btn-danger">
          Resetar Banco
        </button>
      </div>
    </div>
  );
}
