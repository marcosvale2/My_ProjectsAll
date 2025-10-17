import React, { useEffect, useState } from 'react';
import { listarProdutos, deletarProduto } from '../api';

export default function ProdutoTable() {
    const [produtos, setProdutos] = useState([]);

    const loadProdutos = async () => {
        const data = await listarProdutos();
        setProdutos(data);
    }

    useEffect(() => { loadProdutos() }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Deseja deletar o produto?")) {
            await deletarProduto(id);
            loadProdutos();
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-white border border-gray-700">
                <thead className="bg-blue-600">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Preço</th>
                        <th className="px-4 py-2">Qtd</th>
                        <th className="px-4 py-2">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(p => (
                        <tr key={p.id} className="hover:bg-gray-700 transition-all duration-200">
                            <td className="border px-4 py-2">{p.id}</td>
                            <td className="border px-4 py-2">{p.nome}</td>
                            <td className="border px-4 py-2">{p.preco_venda.toFixed(2)}</td>
                            <td className="border px-4 py-2">{p.quantidade}</td>
                            <td className="border px-4 py-2">
                                <button className="btn-hover px-3 py-1 rounded bg-red-600" onClick={()=>handleDelete(p.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
