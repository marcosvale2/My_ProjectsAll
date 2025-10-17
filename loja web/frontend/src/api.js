const API_URL = "http://localhost:8000";

export const listarProdutos = async () => {
  const res = await fetch(`${API_URL}/produtos/`);
  return res.json();
};

export const criarProduto = async (formData) => {
  const res = await fetch(`${API_URL}/produtos/`, {
    method: "POST",
    body: formData, // FormData para enviar foto
  });
  return res.json();
};

export const deletarProduto = async (id) => {
  const res = await fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" });
  return res.json();
};
