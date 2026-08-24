# Módulo de pagos — Openpay

Integración de cobro con tarjeta y suscripciones recurrentes para yaakob.com,
escrita contra la lista de 20 puntos de la validación técnica de Openpay.

## Antes de que corra nada

1. Copia `.env.example` a `.env.local` y llena las llaves del panel de Openpay.
2. Crea los planes en el panel (**Planes → Nuevo plan**) y pega sus
   identificadores en `NEXT_PUBLIC_OPENPAY_PLAN_*`.
3. Ajusta importes, nombres y contenido en `pagos-lib/planes.ts`. **Lo que esté
   ahí es lo que se publica en `/planes` y lo que se cobra.** Los números que
   trae hoy son marcadores.
4. Descarga los logos oficiales a `public/pagos/` — ver `public/pagos/LEEME.md`.

## Recorrido de una contratación

```
/planes                    precios públicos, IVA desglosado, periodicidad
   ↓
/suscripcion?plan=<id>     resumen del cargo + formulario
   ↓  el navegador tokeniza contra Openpay (el PAN nunca toca nuestro servidor)
POST /api/pagos/suscripcion
   ├─ cliente de Openpay (reutiliza si el correo ya existe)
   ├─ tope de 3 tarjetas guardadas
   ├─ alta de tarjeta con device_session_id
   └─ cargo del primer periodo con use_3d_secure
   ↓  el usuario va al banco
/suscripcion/resultado?id=<cargo>
   ↓
POST /api/pagos/estado     consulta el cargo A OPENPAY y, si está pagado,
                           crea la suscripción con trial_end_date al final
                           del periodo ya cobrado
```

Cancelación: `/suscripcion/cancelar` → `POST /api/pagos/cancelar`.

## Decisiones que conviene no deshacer sin pensarlo

**La suscripción se crea después del cobro, no antes.** Mientras 3D Secure no
termine no hay dinero confirmado. Una suscripción activa sin primer cobro es
una aclaración garantizada.

**El estado del pago se lee de Openpay, nunca de la URL de retorno.** El banco
devuelve al usuario con parámetros en la URL; cualquiera puede escribir esos
parámetros a mano. Sólo el cargo consultado a la API abre el acceso.

**El `order_id` lo fija el navegador una sola vez.** Openpay obliga a que sea
único por comercio, así que un segundo intento con la misma referencia lo
rechaza él. Eso —y no el botón deshabilitado— es lo que impide el cobro
duplicado.

**El navegador nunca ve el texto crudo de un error.** Todo pasa por
`declinaciones.ts`. Openpay pide expresamente que «fondos insuficientes» y
«tarjeta reportada como perdida o robada» no lleguen al tarjetahabiente; aquí
la regla se aplicó a todos los motivos de declinación del emisor, no sólo a
esos dos.

**El tope de tres tarjetas se aplica en el servidor.** La interfaz no es una
garantía.

## Lo que falta y por qué no está

**No hay cuentas de usuario.** Es el hueco real del módulo. Sin sesión no se
puede ofrecer un área donde el suscriptor vea o borre sus tarjetas guardadas, y
deliberadamente **no** se construyó un endpoint que liste tarjetas o
suscripciones a partir de un correo: sin autenticación eso es una fuga de datos
de clientes, no una funcionalidad.

La cancelación sí existe, con un modelo de capacidad —folio opaco + correo—
explicado en `app/api/pagos/cancelar/route.ts`. Léelo antes de tocarlo. En
cuanto haya sesión, esa ruta debe derivar el cliente de la sesión.

**No hay correo transaccional.** La pantalla de resultado le dice al usuario
que le enviamos el folio por correo. Hoy eso es mentira: hay que conectar un
proveedor de correo o quitar la frase. No lo dejes así para la cita.

**No hay webhook de Openpay.** Los cobros recurrentes posteriores al primero
ocurren del lado de Openpay; sin webhook el sitio no se entera de un cargo
fallido ni de una suscripción vencida. Para la validación no es obligatorio,
para operar sí.

## Lo que enseñó la primera corrida contra sandbox

**Openpay acepta `GET /customers?email=` y no filtra por él.** Devuelve la lista
completa del comercio. Quedarse con el primer renglón —que es lo que hacía
`buscarPorCorreo`— cuelga cada alta nueva del cliente equivocado: tarjeta, cargo
y suscripción en el expediente de otra persona, y la ruta de cancelación
verificando la propiedad contra una lista ajena. Ahora se pagina y se compara el
correo contra lo que trae cada registro. Si algún día Openpay implementa el
filtro, la comparación sigue siendo correcta; no la quites.

**Una variable de entorno declarada y vacía no es `undefined`.** `.env.example`
trae `OPENPAY_MERCHANT_ID=` sin valor, y `??` deja pasar la cadena vacía: el
comercio se quedaba sin id y todo cobro moría en 500. En `config.ts` esos
fallbacks van con `||`, no con `??`.

**El comercio tiene topes propios.** En la cuenta sandbox: $10,000 por plan
—por eso el plan anual de $11,600 no se puede dar de alta tal cual— y $84,295
por transacción, que un carrito grande rebasa sin esfuerzo. Los códigos `1012`
(importe sobre el tope) y `1006` (`order_id` ya cobrado) tienen mensaje propio
en `declinaciones.ts`: mandarlos al genérico manda al cliente a hablar con su
banco por algo que su banco no puede resolver.

**Una declinación no quema la referencia.** Openpay sólo rechaza un `order_id`
repetido cuando el cargo anterior se completó, así que reintentar con la misma
referencia tras un rechazo funciona —— que es justo lo que supone
`referencia.ts`.

## Antes de la cita

- `NEXT_PUBLIC_OPENPAY_SANDBOX=true` en el ambiente que vayas a mostrar.
- Pide a Openpay que suba el tope de $10,000 por plan y vuelve a crear el plan
  anual en $11,600. Mientras no lo hagan, el plan anual del sandbox está en
  $10,000 y no coincide con el precio publicado.
- Corre con tarjetas de prueba: aprobada, declinada, 3DS exitoso, 3DS fallido,
  doble clic, y un cuarto intento de tarjeta con tres ya guardadas.
- Revisa que los cuatro logos estén en `public/pagos/` — si falta alguno se ve
  un recuadro punteado en el formulario.
