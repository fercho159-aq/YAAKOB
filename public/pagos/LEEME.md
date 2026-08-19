# Assets de pago

Los puntos 13 y 17 de la validación técnica de Openpay piden que el logo de
Openpay y las marcas de tarjeta aceptadas estén visibles **dentro** del
formulario de cobro.

Esos archivos son propiedad de Openpay y de las marcas: no se pueden generar ni
redibujar, hay que descargar los oficiales y dejarlos aquí con estos nombres
exactos:

| Archivo                     | De dónde                                   |
|-----------------------------|--------------------------------------------|
| `openpay.svg`               | https://openpay.mx/recursos/               |
| `visa.svg`                  | https://documents.openpay.mx/recursos      |
| `mastercard.svg`            | https://documents.openpay.mx/recursos      |
| `amex.svg`                  | https://documents.openpay.mx/recursos      |

Si Openpay te habilita otras marcas, agrégalas a la lista `MARCAS` en
`pagos-lib/components/LogosPago.tsx`.

Mientras un archivo falte, el formulario dibuja en su lugar un recuadro
punteado con el nombre de la marca. Es intencional: así se ve de un vistazo lo
que todavía falta, en vez de quedar un hueco que nadie note el día de la cita.
