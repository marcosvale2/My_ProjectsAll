import React from "react";

const API_URL = "http://localhost:8000";

export default function ResetPage() {
  const handleReset = async () => {
    if(!window.confirm("Deseja resetar todos os produtos?")) return;
    await fetch(`${API_URL}/produtos/reset`, { method: "POST" });
    alert("Banco resetado!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resetar Produtos</h1>
      <button onClick={handleReset} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
        Resetar Banco
      </button>
    </div>
  );
}
