from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import os

app = FastAPI()
DB_PATH = "loja.db"

# --- CORS para permitir conexão com React ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Funções auxiliares ---
def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def salvar_foto(foto: UploadFile):
    if foto:
        os.makedirs("fotos_produtos", exist_ok=True)
        path = os.path.join("fotos_produtos", foto.filename)
        with open(path, "wb") as f:
            f.write(foto.file.read())
        return foto.filename
    return None

def criar_tabela_produtos():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco_venda REAL NOT NULL,
            quantidade INTEGER NOT NULL,
            foto TEXT
        )
    """)
    conn.commit()
    conn.close()

def resetar_tabela_produtos():
    conn = get_db_connection()
    c = conn.cursor()
    c.execute("DROP TABLE IF EXISTS produtos")
    conn.commit()
    conn.close()
    criar_tabela_produtos()

# --- Endpoints ---
@app.get("/produtos/")
def listar_produtos():
    conn = get_db_connection()
    produtos = conn.execute("SELECT * FROM produtos").fetchall()
    conn.close()
    return [dict(p) for p in produtos]

@app.post("/produtos/")
async def criar_produto(
    nome: str = Form(...),
    preco: float = Form(...),
    quantidade: int = Form(...),
    foto: UploadFile = File(None)
):
    foto_filename = salvar_foto(foto)
    conn = get_db_connection()
    c = conn.cursor()
    c.execute(
        "INSERT INTO produtos (nome, preco_venda, quantidade, foto) VALUES (?, ?, ?, ?)",
        (nome, preco, quantidade, foto_filename)
    )
    conn.commit()
    produto_id = c.lastrowid
    conn.close()
    return {"id": produto_id, "nome": nome, "preco_venda": preco, "quantidade": quantidade, "foto": foto_filename}

@app.delete("/produtos/{produto_id}")
def deletar_produto(produto_id: int):
    conn = get_db_connection()
    conn.execute("DELETE FROM produtos WHERE id = ?", (produto_id,))
    conn.commit()
    conn.close()
    return {"status": "ok"}

@app.post("/produtos/reset")
def reset_produtos():
    resetar_tabela_produtos()
    return {"message": "Banco de dados resetado!"}

# --- Inicializar tabela se não existir ---
criar_tabela_produtos()

# --- Rodar servidor ---
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
