import os
from barcode import EAN13
from barcode.writer import ImageWriter
from reportlab.pdfgen import canvas
from PIL import Image

def save_uploaded_photo(file, filename):
    os.makedirs("fotos_produtos", exist_ok=True)
    dest = os.path.join("fotos_produtos", filename)
    with open(dest, "wb") as f:
        f.write(file)
    return dest

def gerar_etiqueta_ean13(codigo):
    os.makedirs("etiquetas", exist_ok=True)
    if len(codigo) == 12:
        codigo = EAN13(codigo, writer=ImageWriter())
    else:
        raise ValueError("Código deve ter 12 dígitos")
    path = os.path.join("etiquetas", f"{codigo}.png")
    codigo.save(path)
    return path

def gerar_recibo(venda_id, itens, total, cliente_nome=None):
    os.makedirs("recibos", exist_ok=True)
    path = os.path.join("recibos", f"recibo_{venda_id}.pdf")
    c = canvas.Canvas(path)
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, 800, f"Recibo Venda #{venda_id}")
    c.setFont("Helvetica", 12)
    y = 760
    for item in itens:
        c.drawString(100, y, f"{item['nome']} x {item['quantidade']} = {item['preco_unitario']*item['quantidade']:.2f}")
        y -= 20
    c.drawString(100, y-10, f"Total: {total:.2f}")
    c.save()
    return path
