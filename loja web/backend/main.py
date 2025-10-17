from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import sqlite3

app = FastAPI()

DB_PATH = "loja.db"
FOTOS_DIR = "fotos_produtos"
os.makedirs(FOTOS_DIR, exist_ok=True)

# CORS configurado para React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar banco
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            preco REAL NOT NULL,
            quantidade INTEGER NOT NULL,
            foto TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# Listar produtos
@app.get("/produtos/")
def listar_produtos():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT id, nome, preco, quantidade, foto FROM produtos")
    rows = cursor.fetchall()
    conn.close()
    return [
        {"id": r[0], "nome": r[1], "preco_venda": r[2], "quantidade": r[3], "foto": r[4]}
        for r in rows
    ]

# Criar produto
@app.post("/produtos/")
async def criar_produto(
    nome: str = Form(...),
    preco: float = Form(...),
    quantidade: int = Form(...),
    foto: UploadFile = File(None)
):
    foto_nome = None
    if foto:
        foto_nome = foto.filename
        path = os.path.join(FOTOS_DIR, foto_nome)
        with open(path, "wb") as f:
            f.write(await foto.read())

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO produtos (nome, preco, quantidade, foto) VALUES (?, ?, ?, ?)",
        (nome, preco, quantidade, foto_nome)
    )
    conn.commit()
    conn.close()

    return {"nome": nome, "preco_venda": preco, "quantidade": quantidade, "foto": foto_nome}

# Deletar produto
@app.delete("/produtos/{produto_id}")
def deletar_produto(produto_id: int):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT foto FROM produtos WHERE id=?", (produto_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    if row[0]:
        foto_path = os.path.join(FOTOS_DIR, row[0])
        if os.path.exists(foto_path):
            os.remove(foto_path)

    cursor.execute("DELETE FROM produtos WHERE id=?", (produto_id,))
    conn.commit()
    conn.close()
    return {"status": "ok"}

# Resetar produtos e IDs
@app.post("/produtos/reset")
def reset_produtos():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    # Apaga todas as fotos salvas
    cursor.execute("SELECT foto FROM produtos")
    fotos = cursor.fetchall()
    for f in fotos:
        if f[0]:
            path = os.path.join(FOTOS_DIR, f[0])
            if os.path.exists(path):
                os.remove(path)
    # Apaga todos os produtos
    cursor.execute("DELETE FROM produtos")
    # Reseta autoincrement
    cursor.execute("DELETE FROM sqlite_sequence WHERE name='produtos'")
    conn.commit()
    conn.close()
    return {"status": "ok", "message": "Tabela limpa e IDs resetados"}

# Registrar venda
@app.post("/vendas/")
def registrar_venda(itens: List[dict], tipo_pagamento: str):
    total = sum(i.get("preco_unitario",0)*i.get("quantidade",1) for i in itens)
    return {"status": "ok", "total": total}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
