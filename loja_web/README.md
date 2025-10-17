# 🛍️ Projeto Loja Web

Este projeto é uma aplicação **Full Stack** simples para gerenciamento de produtos de uma loja.  
Ele utiliza **Flask (Python)** no back-end e **React (JavaScript)** no front-end, com um banco de dados **SQLite**.

---

## 🚀 Tecnologias Utilizadas

### Back-End (API)
- **Python 3.10+**
- **Flask**
- **Flask-CORS**
- **SQLite3**

### Front-End
- **React**
- **React Router DOM**
- **Fetch API** para comunicação com o back-end

---

## 🧠 Estrutura do Projeto

```
loja_web/
│
├── backend/
│   ├── main.py              # API principal em Flask
│   ├── loja.db              # Banco de dados SQLite
│   ├── requirements.txt     # Dependências do back-end
│
├── frontend/
│   ├── package.json         # Dependências do front-end
│   ├── src/
│   │   ├── App.js           # Componente principal
│   │   ├── pages/
│   │   │   ├── Produtos.js  # Página de listagem de produtos
│   │   │   ├── Reset.js     # Página para resetar o banco de dados
│   │   └── components/      # Componentes reutilizáveis
│   └── public/
│       └── index.html
│
└── README.md
```

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/loja_web.git
cd loja_web
```

### 2️⃣ Instalar as dependências do **back-end**
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (Windows)
pip install -r requirements.txt
```

### 3️⃣ Executar o servidor Flask
```bash
python main.py
```
O servidor estará rodando em:
```
http://localhost:5000
```

### 4️⃣ Instalar as dependências do **front-end**
```bash
cd ../frontend
npm install
```

### 5️⃣ Executar o React
```bash
npm start
```
O front-end estará disponível em:
```
http://localhost:3000
```

---

## 🧩 Rotas da Aplicação

### 🔹 Back-End (Flask)
| Método | Rota | Descrição |
|--------|-------|-----------|
| `GET` | `/produtos` | Lista todos os produtos |
| `POST` | `/produtos` | Adiciona um novo produto |
| `DELETE` | `/produtos/reset` | Reseta todos os produtos (reinicia IDs) |

### 🔹 Front-End (React)
| Página | Caminho | Descrição |
|--------|----------|-----------|
| `Home` | `/` | Página inicial |
| `Produtos` | `/produtos` | Exibe e cadastra produtos |
| `Reset` | `/produtos/reset` | Página exclusiva para resetar o banco de dados |

---

## 🧱 Banco de Dados

O banco de dados `loja.db` é criado automaticamente pelo Flask (caso não exista).  
Ele contém uma tabela chamada **produtos**, com os seguintes campos:

| Campo | Tipo | Descrição |
|--------|------|-----------|
| `id` | INTEGER | Identificador único |
| `nome` | TEXT | Nome do produto |
| `preco` | REAL | Preço do produto |

---

## 🔁 Reset do Banco de Dados

A aplicação possui uma rota especial (`/produtos/reset`) para:
- Deletar todos os produtos
- Reiniciar o contador de IDs

Essa função é acessível **apenas pela página `/produtos/reset`** no front-end.

---

## 📦 .gitignore recomendado

Adicione um arquivo `.gitignore` com o seguinte conteúdo:
```
# Python
venv/
__pycache__/
*.pyc
loja.db

# Node
node_modules/
build/
dist/

# Ambiente
.env
```

---

## 👨‍💻 Autor

**Marcos Vinícius Soares do Vale**  
Desenvolvedor Full Stack  
[LinkedIn](https://www.linkedin.com/in/marcosviniciussoares)

---

## 🧾 Licença
Este projeto é livre para uso acadêmico e pessoal.
