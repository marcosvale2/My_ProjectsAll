import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8000";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    const res = await fetch(`${API_URL}/produtos/`);
    const data = await res.json();
    setProdutos(data);
  };

  const handleAddProduto = async () => {
    if (!nome || !preco || !quantidade) return;
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("preco", preco);
    formData.append("quantidade", quantidade);
    if (foto) formData.append("foto", foto);
    await fetch(`${API_URL}/produtos/`, { method: "POST", body: formData });
    setNome(""); setPreco(""); setQuantidade(""); setFoto(null);
    loadProdutos();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" });
    loadProdutos();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <div className="flex gap-2 mb-4">
        <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="number" placeholder="Preço" value={preco} onChange={e=>setPreco(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={e=>setQuantidade(e.target.value)} className="border px-2 py-1 rounded" />
        <label className="bg-gray-200 px-3 py-1 rounded cursor-pointer">
          <input type="file" onChange={e=>setFoto(e.target.files[0])} className="hidden"/>
        </label>
        <button onClick={handleAddProduto} className="bg-blue-600 text-white px-3 py-1 rounded">Adicionar</button>
      </div>

      <table className="border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Nome</th>
            <th className="border px-2 py-1">Preço</th>
            <th className="border px-2 py-1">Qtd</th>
            <th className="border px-2 py-1">Foto</th>
            <th className="border px-2 py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.id}</td>
              <td className="border px-2 py-1">{p.nome}</td>
              <td className="border px-2 py-1">{p.preco_venda}</td>
              <td className="border px-2 py-1">{p.quantidade}</td>
              <td className="border px-2 py-1">{p.foto && <img src={`${API_URL}/fotos_produtos/${p.foto}`} width="50"/>}</td>
              <td className="border px-2 py-1">
                <button onClick={()=>handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
