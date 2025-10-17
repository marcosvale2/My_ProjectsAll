import React, { useState } from 'react';
import { criarProduto } from '../api';

export default function ProdutoForm({ onSaved }) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [foto, setFoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await criarProduto({ nome, preco, quantidade }, foto);
        setNome(''); setPreco(0); setQuantidade(0); setFoto(null);
        onSaved();
    }

    return (
        <form className="flex flex-col gap-2 p-4 bg-gray-800 rounded" onSubmit={handleSubmit}>
            <input className="p-2 rounded bg-gray-700" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
            <input className="p-2 rounded bg-gray-700" type="number" placeholder="Preço" value={preco} onChange={e=>setPreco(parseFloat(e.target.value))} />
            <input className="p-2 rounded bg-gray-700" type="number" placeholder="Quantidade" value={quantidade} onChange={e=>setQuantidade(parseInt(e.target.value))} />
            <input className="p-2 rounded bg-gray-700" type="file" onChange={e=>setFoto(e.target.files[0])} />
            <button type="submit" className="btn-hover px-4 py-2 bg-green-600 rounded">Salvar Produto</button>
        </form>
    )
}
