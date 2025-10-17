import React, { useState, useEffect } from "react";
import { listarProdutos, criarProduto, deletarProduto } from "./api";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => { loadProdutos(); }, []);

  const loadProdutos = async () => {
    const data = await listarProdutos();
    setProdutos(data);
  };

  const handleAddProduto = async () => {
    if (!nome || !preco || !quantidade) return;
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", preco);
    formData.append("quantidade", quantidade);
    if (foto) formData.append("foto", foto);
    await criarProduto(formData);
    setNome(""); setPreco(""); setQuantidade(""); setFoto(null);
    loadProdutos();
  };

  const handleDelete = async (id) => {
    await deletarProduto(id);
    loadProdutos();
  };

  const handleReset = async () => {
    if (!window.confirm("Deseja realmente resetar todos os produtos?")) return;
    await fetch("http://localhost:8000/produtos/reset", { method: "POST" });
    loadProdutos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Gestão de Loja</h1>

      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input 
            placeholder="Nome" 
            value={nome} 
            onChange={e=>setNome(e.target.value)} 
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="number" 
            placeholder="Preço" 
            value={preco} 
            onChange={e=>setPreco(e.target.value)} 
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="number" 
            placeholder="Quantidade" 
            value={quantidade} 
            onChange={e=>setQuantidade(e.target.value)} 
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer hover:bg-gray-300 transition">
            <input 
              type="file" 
              onChange={e=>setFoto(e.target.files[0])} 
              className="hidden"
            />
          </label>
          <button 
            onClick={handleAddProduto} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
          <button 
            onClick={handleReset} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Resetar Produtos
          </button>
        </div>
      </div>

      <table className="w-full max-w-5xl border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200 font-semibold">
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Nome</th>
            <th className="border border-gray-200 px-4 py-2">Preço</th>
            <th className="border border-gray-200 px-4 py-2">Qtd</th>
            <th className="border border-gray-200 px-4 py-2">Foto</th>
            <th className="border border-gray-200 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{p.id}</td>
              <td className="border border-gray-200 px-4 py-2">{p.nome}</td>
              <td className="border border-gray-200 px-4 py-2">{p.preco_venda}</td>
              <td className="border border-gray-200 px-4 py-2">{p.quantidade}</td>
              <td className="border border-gray-200 px-4 py-2">
                {p.foto && <img src={`http://localhost:8000/fotos_produtos/${p.foto}`} width="50" />}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <button 
                  onClick={()=>handleDelete(p.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
