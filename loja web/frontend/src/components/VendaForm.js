import React, { useState } from 'react';
import { registrarVenda } from '../api';

export default function VendaForm({ onVenda }) {
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [tipoPg, setTipoPg] = useState('dinheiro');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registrarVenda([{ produto_id: parseInt(produtoId), quantidade, preco_unitario:0 }], tipoPg);
        alert("Venda registrada! Total: "+result.total);
        setProdutoId(''); setQuantidade(1); setTipoPg('dinheiro');
        onVenda();
    }

    return (
        <form className="flex flex-col gap-2 p-4 bg-gray-800 rounded" onSubmit={handleSubmit}>
            <input className="p-2 rounded bg-gray-700" placeholder="ID Produto" value={produtoId} onChange={e=>setProdutoId(e.target.value)} />
            <input className="p-2 rounded bg-gray-700" type="number" placeholder="Quantidade" value={quantidade} onChange={e=>setQuantidade(parseInt(e.target.value))} />
            <select className="p-2 rounded bg-gray-700" value={tipoPg} onChange={e=>setTipoPg(e.target.value)}>
                <option>dinheiro</option>
                <option>pix</option>
                <option>cartao</option>
                <option>crediario</option>
            </select>
            <button type="submit" className="btn-hover px-4 py-2 bg-blue-600 rounded">Registrar Venda</button>
        </form>
    )
}
