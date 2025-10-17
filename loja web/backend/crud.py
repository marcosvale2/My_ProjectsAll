from models import Produto, Venda, VendaItem
from sqlalchemy.orm import Session
from utils import save_uploaded_photo, gerar_recibo, gerar_etiqueta_ean13

def criar_produto(db: Session, nome:str, preco:float, quantidade:int, sku=None, codigo_barra=None, foto_bytes=None):
    p = Produto(nome=nome, preco_venda=preco, quantidade=quantidade, sku=sku, codigo_barra=codigo_barra)
    db.add(p)
    db.commit()
    db.refresh(p)
    if foto_bytes:
        path = save_uploaded_photo(foto_bytes, f"produto_{p.id}.jpg")
        p.foto_path = path
        db.commit()
    return p

def listar_produtos(db: Session):
    return db.query(Produto).all()

def deletar_produto(db: Session, produto_id:int):
    p = db.get(Produto, produto_id)
    if p:
        db.delete(p)
        db.commit()
        return True
    return False

def registrar_venda(db: Session, itens:list, tipo_pagamento:str="dinheiro"):
    venda = Venda(tipo_pagamento=tipo_pagamento)
    db.add(venda)
    db.commit()
    db.refresh(venda)
    total = 0
    itens_pdf = []
    for item in itens:
        produto = db.get(Produto, item['produto_id'])
        if produto:
            vi = VendaItem(venda_id=venda.id, produto_id=produto.id,
                           quantidade=item['quantidade'], preco_unitario=produto.preco_venda)
            db.add(vi)
            produto.quantidade -= item['quantidade']
            db.commit()
            total += vi.quantidade * vi.preco_unitario
            itens_pdf.append({'nome': produto.nome, 'quantidade': vi.quantidade, 'preco_unitario': vi.preco_unitario})
    db.commit()
    recibo_path = gerar_recibo(venda.id, itens_pdf, total)
    return {"venda_id": venda.id, "total": total, "recibo": recibo_path}
