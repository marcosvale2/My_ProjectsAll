import sqlite3
from pathlib import Path

DB_FILE = "loja.db"

# Se o banco não existir, ele será criado
conn = sqlite3.connect(DB_FILE)
c = conn.cursor()

# Cria a tabela produtos se não existir
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