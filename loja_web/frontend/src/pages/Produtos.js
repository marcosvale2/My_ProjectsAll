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
    setProdutos(Array.isArray(data) ? data : []); // garante que seja array
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
    <div className="container mt-5">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <div className="d-flex gap-2 mb-4">
        <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} className="form-control" />
        <input type="number" placeholder="Preço" value={preco} onChange={e=>setPreco(e.target.value)} className="form-control" />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={e=>setQuantidade(e.target.value)} className="form-control" />
        <label className="btn btn-secondary">
          Foto
          <input type="file" onChange={e=>setFoto(e.target.files[0])} className="d-none"/>
        </label>
        <button onClick={handleAddProduto} className="btn btn-primary">Adicionar</button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light text-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Qtd</th>
            <th>Foto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.preco_venda}</td>
              <td>{p.quantidade}</td>
              <td>{p.foto && <img src={`${API_URL}/fotos_produtos/${p.foto}`} width="50"/>}</td>
              <td>
                <button onClick={()=>handleDelete(p.id)} className="btn btn-danger btn-sm">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
