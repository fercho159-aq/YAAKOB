"""Arma el PDF de evidencia del proceso de compra para la validación de Openpay.

Uso:
    <venv>/bin/python tmp/pdfs/generar_evidencia.py

Las capturas viven en `tmp/pdfs/` y el PDF sale en `output/pdf/`.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import landscape
from reportlab.lib.utils import ImageReader
from PIL import Image
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen.canvas import Canvas


ROOT = Path('/Users/fernandotrejo/Developer/YAAKOB')
OUT = ROOT / 'output/pdf/evidencia-proceso-de-contratacion-yaakob.pdf'
CAPTURAS = ROOT / 'tmp/pdfs'
W, H = landscape((792, 612))
MARGIN = 36
NAVY = HexColor('#111316')
GOLD = HexColor('#F5B041')
MUTED = HexColor('#667085')
PALE = HexColor('#F4F5F7')
TEXTO = HexColor('#344054')
TOTAL_PAGINAS = 6

OUT.parent.mkdir(parents=True, exist_ok=True)


def header(c, kicker, title, page):
    c.setFillColor(NAVY)
    c.rect(0, H - 86, W, 86, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.setFont('Helvetica-Bold', 8)
    c.drawString(MARGIN, H - 30, kicker.upper())
    c.setFillColor(white)
    c.setFont('Helvetica-Bold', 20)
    c.drawString(MARGIN, H - 57, title)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 8)
    c.drawRightString(W - MARGIN, 18, f'Yaakob Consultores SC  |  Evidencia {page}/{TOTAL_PAGINAS}')
    c.drawString(MARGIN, 18, 'www.yaakob.com  ·  contacto@yaakob.com  ·  +52 55 9008 6360')


def envolver(texto, fuente, tamano, ancho):
    """Parte un párrafo en líneas que caben en `ancho`."""
    lineas, actual = [], ''
    for palabra in texto.split():
        prueba = f'{actual} {palabra}'.strip()
        if stringWidth(prueba, fuente, tamano) <= ancho:
            actual = prueba
        else:
            if actual:
                lineas.append(actual)
            actual = palabra
    if actual:
        lineas.append(actual)
    return lineas


def parrafo(c, texto, x, y, ancho, fuente='Helvetica', tamano=9, interlinea=12.5, color=TEXTO):
    c.setFillColor(color)
    c.setFont(fuente, tamano)
    for linea in envolver(texto, fuente, tamano, ancho):
        c.drawString(x, y, linea)
        y -= interlinea
    return y


def captura(c, image_path, x, y, max_w, max_h, crop=None):
    source = Image.open(image_path)
    if crop:
        source = source.crop(crop)
    img = ImageReader(source)
    iw, ih = img.getSize()
    scale = min(max_w / iw, max_h / ih)
    dw, dh = iw * scale, ih * scale
    dx, dy = x + (max_w - dw) / 2, y + (max_h - dh) / 2
    c.setFillColor(HexColor('#D0D5DD'))
    c.roundRect(dx - 2, dy - 2, dw + 4, dh + 4, 3, fill=1, stroke=0)
    c.drawImage(img, dx, dy, width=dw, height=dh, preserveAspectRatio=True, mask='auto')


def pagina_evidencia(c, kicker, titulo, pagina, pantalla, intro, puntos, imagen, crop):
    """Captura a la izquierda, lectura de lo que se ve a la derecha."""
    header(c, kicker, titulo, pagina)

    ancho_img = 430
    x_texto = MARGIN + ancho_img + 26
    ancho_texto = W - MARGIN - x_texto

    captura(c, CAPTURAS / imagen, MARGIN, 34, ancho_img, H - 86 - 34 - 22, crop=crop)

    y = H - 112
    c.setFillColor(GOLD)
    c.setFont('Helvetica-Bold', 8)
    c.drawString(x_texto, y, pantalla.upper())
    y -= 18
    y = parrafo(c, intro, x_texto, y, ancho_texto, fuente='Helvetica-Bold', tamano=9.5)
    y -= 8

    for punto in puntos:
        c.setFillColor(GOLD)
        c.circle(x_texto + 3, y + 3, 2.5, fill=1, stroke=0)
        y = parrafo(c, punto, x_texto + 14, y, ancho_texto - 14, tamano=8.5, interlinea=11.5)
        y -= 7

    c.showPage()


c = Canvas(str(OUT), pagesize=(W, H), pageCompression=1)
c.setTitle('Evidencia - Proceso de compra Yaakob Consultores SC')
c.setAuthor('Yaakob Consultores SC')

# --------------------------------------------------------------- portada
header(c, 'Proceso de compra / contratación', 'Evidencia visual del flujo de compra', 1)
c.setFillColor(NAVY)
c.setFont('Helvetica-Bold', 18)
c.drawString(MARGIN, H - 130, 'Suscripción de vigilancia fiscal')
c.setFont('Helvetica', 10)
c.setFillColor(TEXTO)
c.drawString(MARGIN, H - 151, 'Respuesta a los cuatro puntos solicitados por correo para la validación del comercio.')

items = [
    (
        '1',
        'Visualización de los productos y precios',
        'Planes publicados con importe en MXN, IVA desglosado y periodicidad.',
        'Página 2',
    ),
    (
        '2',
        'Funcionalidad del carrito',
        'Agregar, cambiar cantidad, quitar y vaciar; totales con IVA recalculados en vivo.',
        'Páginas 3 y 4',
    ),
    (
        '3',
        'Flujo completo de compra',
        'Planes → carrito → checkout → pago con 3D Secure → alta de la suscripción.',
        'Páginas 2 a 6',
    ),
    (
        '4',
        'Checkout y selección de método de pago',
        'Resumen de la orden, datos del titular, tarjeta, marcas aceptadas y Openpay.',
        'Páginas 5 y 6',
    ),
]
base_y = H - 205
for i, (n, title, desc, donde) in enumerate(items):
    y = base_y - i * 62
    c.setFillColor(PALE)
    c.roundRect(MARGIN, y - 38, W - 2 * MARGIN, 52, 4, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.circle(MARGIN + 20, y - 12, 13, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont('Helvetica-Bold', 10)
    c.drawCentredString(MARGIN + 20, y - 15.5, n)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(MARGIN + 46, y - 8, title)
    c.setFillColor(HexColor('#475467'))
    c.setFont('Helvetica', 9)
    c.drawString(MARGIN + 46, y - 23, desc)
    c.setFillColor(NAVY)
    c.setFont('Helvetica-Bold', 8)
    c.drawRightString(W - MARGIN - 14, y - 15.5, donde.upper())

c.setFillColor(HexColor('#FFF7E8'))
c.roundRect(MARGIN, 46, W - 2 * MARGIN, 66, 4, fill=1, stroke=0)
c.setFillColor(NAVY)
c.setFont('Helvetica-Bold', 9)
c.drawString(MARGIN + 14, 94, 'Nota de alcance')
parrafo(
    c,
    'El producto es una suscripción digital: no requiere envío ni costos de envío. El carrito admite varias suscripciones '
    '—una por cada RFC bajo vigilancia— y el primer periodo de todas se cobra en un solo cargo con 3D Secure; después '
    'cada suscripción renueva en su propia periodicidad hasta que el cliente la cancele.',
    MARGIN + 14,
    79,
    W - 2 * MARGIN - 28,
    tamano=8.5,
    interlinea=11.5,
)
c.showPage()

# ------------------------------------------------------------- evidencias
pagina_evidencia(
    c,
    'Evidencia 1',
    'Productos y precios públicos',
    2,
    'Pantalla /planes',
    'El catálogo es público y consultable antes de contratar, sin registro previo.',
    [
        'Cada plan muestra el importe total en pesos mexicanos, el IVA incluido desglosado, la moneda y la periodicidad '
        'del cargo («cada mes», «cada año»).',
        'El texto de encabezado informa la renovación automática, la confirmación previa del importe y la fecha del '
        'siguiente cargo, y que no hay envíos ni costos de envío.',
        'Cada tarjeta detalla lo que incluye el plan y las condiciones de cancelación.',
        '«Agregar al carrito» suma el plan a la orden; «Contratar sólo este» va directo al checkout con ese único plan.',
    ],
    '10-planes.jpg',
    crop=(350, 55, 1110, 730),
)

pagina_evidencia(
    c,
    'Evidencia 2',
    'Agregar productos al carrito',
    3,
    'Pantalla /planes · carrito con productos',
    'El carrito se alimenta desde el catálogo y confirma en pantalla lo acumulado.',
    [
        'Arriba a la derecha, el indicador del carrito muestra el número de suscripciones acumuladas y el total en vivo: '
        '2 · $12,760.00.',
        'Cada plan agregado confirma su estado en la tarjeta: «En el carrito (1) · Ver carrito», y su botón cambia a '
        '«Agregar otra suscripción» para sumar más suscripciones del mismo plan.',
        'El carrito admite conceptos distintos en la misma orden: plan mensual y plan anual conviven sin sustituirse.',
        '«Ver carrito» abre la orden completa, donde se modifican cantidades y se quitan conceptos (evidencia 3).',
    ],
    '11-planes.jpg',
    crop=(350, 40, 1110, 760),
)

pagina_evidencia(
    c,
    'Evidencia 3',
    'Funcionalidad del carrito',
    4,
    'Pantalla /carrito',
    'La orden se revisa y se modifica por completo antes de entrar al pago.',
    [
        'Cada renglón permite subir o bajar la cantidad con los controles «−» y «+», o quitarse con «Quitar»; también '
        'se puede vaciar el carrito completo.',
        'Los totales se recalculan al instante: conceptos, número de suscripciones, subtotal, IVA (16 %), envío —que no '
        'aplica por ser servicio digital— y total a pagar hoy.',
        'En el ejemplo: dos suscripciones mensuales y una anual, tres suscripciones en total, $13,920.00 MXN.',
        'El carrito se conserva en el navegador entre visitas, y «Continuar al pago» lleva al checkout con esa misma orden.',
    ],
    '12-carrito.jpg',
    crop=(380, 10, 1100, 660),
)

pagina_evidencia(
    c,
    'Evidencia 4',
    'Checkout: resumen previo al pago',
    5,
    'Pantalla /suscripcion',
    'Antes de capturar cualquier dato de pago se muestra la orden completa.',
    [
        'Por cada renglón: nombre del plan y cantidad, importe, IVA incluido, periodicidad de renovación y fecha del '
        'siguiente cargo.',
        'Al pie: subtotal, IVA (16 %), envío (no aplica), condiciones de cancelación y total a pagar hoy, '
        '$13,920.00 MXN.',
        '«Modificar el carrito» permite regresar y corregir la orden sin perder nada de lo capturado.',
        'La pantalla de cobro está marcada como no indexable y sólo se llega a ella desde el carrito o desde un plan.',
    ],
    '13-checkout.jpg',
    crop=(430, 0, 1090, 740),
)

pagina_evidencia(
    c,
    'Evidencia 5',
    'Formulario y método de pago',
    6,
    'Pantalla /suscripcion · parte inferior',
    'El pago se realiza con tarjeta de crédito o débito, procesado por Openpay.',
    [
        'Datos del titular (nombre, apellidos, correo y teléfono) y datos de la tarjeta (titular, número, mes, año y CVV), '
        'validados al escribir y al enviar.',
        'El botón confirma el importe exacto de la operación: «Contratar por $13,920.00».',
        'El texto bajo el botón advierte la renovación de cada suscripción, la cancelación sin penalización y la '
        'confirmación mediante 3D Secure del banco emisor.',
        'Al pie del formulario: marcas aceptadas —Visa, Mastercard y American Express— y la leyenda «Procesado por Openpay».',
        'El número de tarjeta se tokeniza en el navegador contra Openpay: no viaja ni se almacena en los servidores de Yaakob.',
    ],
    '14-formulario.jpg',
    crop=(430, 0, 1090, 700),
)

c.save()
print(OUT)
