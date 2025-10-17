from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, unique=True, nullable=True)
    nome = Column(String, nullable=False)
    preco_venda = Column(Float, default=0.0)
    quantidade = Column(Integer, default=0)
    codigo_barra = Column(String, nullable=True)
    foto_path = Column(String, nullable=True)

class Venda(Base):
    __tablename__ = "vendas"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(DateTime, default=datetime.datetime.utcnow)
    tipo_pagamento = Column(String, default="dinheiro")
    itens = relationship("VendaItem", back_populates="venda")

class VendaItem(Base):
    __tablename__ = "venda_itens"

    id = Column(Integer, primary_key=True, index=True)
    venda_id = Column(Integer, ForeignKey("vendas.id"))
    produto_id = Column(Integer, ForeignKey("produtos.id"))
    quantidade = Column(Integer, default=1)
    preco_unitario = Column(Float, default=0.0)

    venda = relationship("Venda", back_populates="itens")
