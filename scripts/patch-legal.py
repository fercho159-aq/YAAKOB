#!/usr/bin/env python3
"""
Aplica a servicios-lib/data/legal.json los cambios que exige la validación
técnica de Openpay:

  * punto 15 — mención literal «Se hace uso de Openpay como pasarela de pagos»
    en términos y condiciones (y su equivalente en el aviso de privacidad);
  * punto  9 — política de cancelación, reembolsos y plazos de entrega en un
    documento propio y con encabezado explícito, en vez de repartida entre las
    41 secciones de los términos.

Idempotente: correrlo dos veces no duplica nada.
"""

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
LEGAL = ROOT / "servicios-lib" / "data" / "legal.json"

# La frase que Openpay pide textualmente. No la reformulen: el validador
# busca esta cadena.
MENCION_OPENPAY = (
    "Se hace uso de Openpay como pasarela de pagos. El procesamiento de los "
    "cobros con tarjeta realizados a través del sitio se efectúa mediante "
    "Openpay; los datos de la tarjeta se capturan y tokenizan directamente en "
    "el navegador del usuario y no se almacenan en los servidores de Yaakob. "
    "El usuario deberá consultar también los términos, condiciones y políticas "
    "de privacidad de Openpay."
)

MENCION_OPENPAY_PRIVACIDAD = (
    "Se hace uso de Openpay como pasarela de pagos. Los datos de la tarjeta se "
    "capturan y tokenizan en el navegador del usuario y son tratados por "
    "Openpay conforme a sus propias políticas de privacidad y a sus "
    "obligaciones legales. YAAKOB no almacena en sus servidores el número "
    "completo de la tarjeta ni el código de seguridad."
)

CANCELACIONES = {
    "slug": "cancelaciones",
    "label": "Cancelaciones y reembolsos",
    "heading": "Política de cancelación, reembolsos y plazos de entrega",
    "subheading": "Suscripciones contratadas a través de yaakob.com",
    "description": (
        "Condiciones de cancelación, devolución y plazos de acceso de las "
        "suscripciones de Yaakob Consultores, S.C., y datos para presentar una "
        "aclaración."
    ),
    "updatedLabel": "Última actualización",
    "updated": "19 de agosto de 2026",
    "intro": (
        "Esta política complementa los términos y condiciones del sitio y "
        "aplica a toda suscripción o servicio contratado y pagado a través de "
        "yaakob.com. En lo no previsto aquí rigen los términos y condiciones."
    ),
    "sections": [
        {
            "id": "pasarela",
            "heading": "1. Procesamiento de los pagos",
            "paragraphs": [
                "Se hace uso de Openpay como pasarela de pagos. Todos los "
                "cobros con tarjeta de crédito o débito realizados a través "
                "del sitio se procesan mediante Openpay, con autenticación 3D "
                "Secure del banco emisor.",
                "Yaakob Consultores, S.C. no captura, no transmite y no "
                "almacena en sus servidores el número completo de la tarjeta "
                "ni el código de seguridad: esos datos se tokenizan en el "
                "navegador del usuario y viajan directamente a Openpay.",
            ],
        },
        {
            "id": "precios-vigentes",
            "heading": "2. Precios, impuestos y moneda",
            "paragraphs": [
                "Los precios de las suscripciones se publican en el sitio "
                "antes de contratar, están expresados en pesos mexicanos "
                "(MXN) e indican de forma expresa si incluyen el Impuesto al "
                "Valor Agregado.",
                "El monto, la periodicidad del cobro y la fecha aproximada "
                "del cargo se muestran en la pantalla de contratación antes "
                "de que el usuario autorice el pago.",
            ],
        },
        {
            "id": "plazos",
            "heading": "3. Plazos de activación y entrega",
            "paragraphs": [
                "Las suscripciones dan acceso a contenidos digitales: no "
                "existe envío físico ni, por tanto, costos de envío. El acceso "
                "se activa de forma inmediata una vez que Openpay confirma el "
                "cargo y la autenticación 3D Secure resulta exitosa.",
                "Cuando el banco emisor deje el cargo en revisión, el acceso "
                "se activará dentro de las 24 horas siguientes a la "
                "confirmación del pago. Si el cargo no se confirma, no se "
                "genera cobro alguno y la contratación se tiene por no "
                "realizada.",
            ],
        },
        {
            "id": "cancelacion-suscripcion",
            "heading": "4. Cancelación de la suscripción",
            "paragraphs": [
                "El suscriptor puede cancelar en cualquier momento desde la "
                "sección de su suscripción en el sitio, o escribiendo a "
                "contacto@yaakob.com desde el correo con el que contrató. La "
                "cancelación no requiere justificación ni llamada telefónica.",
                "La cancelación surte efecto de inmediato para los cobros "
                "futuros: no se generan cargos posteriores a la solicitud. El "
                "acceso se conserva hasta el final del periodo ya pagado.",
            ],
        },
        {
            "id": "reembolsos",
            "heading": "5. Reembolsos",
            "paragraphs": [
                "Procede el reembolso total cuando se haya generado un cargo "
                "después de una solicitud de cancelación, cuando exista un "
                "cargo duplicado por un mismo periodo, o cuando el contenido "
                "contratado no se haya puesto a disposición del suscriptor por "
                "causa atribuible a Yaakob.",
                "Los reembolsos se solicitan en contacto@yaakob.com o en los "
                "teléfonos +52 55 9008 6360 y +52 55 9008 7881. Se resuelven "
                "dentro de los cinco días hábiles siguientes a la solicitud y "
                "se aplican al mismo método de pago utilizado. El tiempo en "
                "que el importe se refleja en el estado de cuenta depende del "
                "banco emisor.",
                "Salvo los supuestos anteriores o disposición legal "
                "aplicable, la cancelación no genera devolución de los "
                "periodos ya iniciados o consumidos.",
            ],
        },
        {
            "id": "aclaraciones-cargos",
            "heading": "6. Cargos no reconocidos y aclaraciones",
            "paragraphs": [
                "Ante un cargo no reconocido, el usuario puede escribir a "
                "contacto@yaakob.com o llamar a los teléfonos de atención, de "
                "lunes a viernes de 9:00 a 18:00 horas, tiempo del centro de "
                "México. Yaakob acusará recibo de la aclaración y responderá "
                "dentro de un plazo razonable.",
                "Lo anterior es independiente del derecho del usuario a "
                "presentar la aclaración ante su banco emisor o ante la "
                "autoridad de protección al consumidor que corresponda.",
            ],
        },
        {
            "id": "contacto-cancelaciones",
            "heading": "7. Contacto",
            "paragraphs": [
                "Yaakob Consultores, S.C. Correo electrónico: "
                "contacto@yaakob.com. Teléfonos: +52 55 9008 6360 y "
                "+52 55 9008 7881. Horario de atención: lunes a viernes de "
                "9:00 a 18:00 horas, tiempo del centro de México.",
                "Domicilio fiscal y de atención: Calle Alica 40, interior 202, "
                "Colonia Molino del Rey, Miguel Hidalgo, Ciudad de México, "
                "C.P. 11040.",
            ],
            "link": {"label": "Consultar términos y condiciones", "href": "/terminos"},
        },
    ],
}


def find_section(doc, section_id):
    for section in doc["sections"]:
        if section.get("id") == section_id:
            return section
    raise SystemExit(f"No se encontró la sección '{section_id}'. Revisa legal.json.")


def add_paragraph(section, text, marker="Se hace uso de Openpay"):
    if any(marker in p for p in section["paragraphs"]):
        return False
    section["paragraphs"].append(text)
    return True


def main():
    data = json.loads(LEGAL.read_text(encoding="utf-8"))
    changed = []

    if add_paragraph(find_section(data["terminos"], "precios"), MENCION_OPENPAY):
        changed.append("terminos → 9. Precios, impuestos y pagos")

    if add_paragraph(find_section(data["privacidad"], "pagos"), MENCION_OPENPAY_PRIVACIDAD):
        changed.append("privacidad → 24. Pagos y proveedores de servicios de pago")

    if data.get("cancelaciones") != CANCELACIONES:
        data["cancelaciones"] = CANCELACIONES
        changed.append("nuevo documento: cancelaciones")

    if not changed:
        print("legal.json ya estaba al día; sin cambios.")
        return

    LEGAL.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    for entry in changed:
        print(f"actualizado: {entry}")


if __name__ == "__main__":
    sys.exit(main())
