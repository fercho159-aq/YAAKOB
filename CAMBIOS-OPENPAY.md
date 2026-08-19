# Cambios para la validación técnica de Openpay

Paquete de cambios sobre el repositorio `YAAKOB`, generado el 19 de agosto de
2026.

## Cómo aplicarlo

Desde la raíz del repositorio, con el árbol limpio (`git status` sin cambios
pendientes) y en una rama aparte:

```bash
cd ~/Developer/YAAKOB
git checkout -b openpay
tar -xzf yaakob-openpay-cambios.tar.gz
git status          # qué se agregó y qué se modificó
git diff            # revisa antes de confirmar nada
```

Sobrescribe archivos existentes, así que revisa el `git diff` antes de
`git add`. Nada aquí toca `node_modules`, `.next` ni tus llaves.

Después de aplicar, dos cosas que el paquete no puede hacer solo:

```bash
# 1. Borrar los dos proxies muertos (quedaron respondiendo 404, pero sobran)
git rm -r "app/api/[...path]" "app/api/gcs"

# 2. Borrar los scratch que quedaron versionados en la raíz
git rm probe-home.tmp.cjs probe2.tmp.cjs
```

Luego `cp .env.example .env.local`, llena las llaves de Openpay y `npm run dev`.

---

## Qué se resolvió

### Documentos legales

- **Punto 15.** La frase literal «Se hace uso de Openpay como pasarela de
  pagos» quedó en la sección 9 de los términos y en la sección 24 del aviso de
  privacidad. El cambio se aplicó con `scripts/patch-legal.py`, que es
  idempotente: si mañana rehacen `legal.json`, vuelvan a correrlo.
- **Punto 9.** Nueva política de cancelación, reembolsos y plazos de entrega
  como documento propio en `/cancelaciones`, en vez de repartida entre las 41
  secciones de los términos. Incluye plazos de activación, supuestos de
  reembolso total, plazo de resolución de cinco días hábiles y el canal de
  aclaraciones.

### Visibilidad en la portada

- **Puntos 9, 10 y 16.** La portada WebGL no montaba el pie del sitio, así que
  desde la raíz no había ni un enlace legal ni un dato de contacto. Se agregó
  `home-lib/components/LegalBar.tsx`: una banda inferior con razón social,
  domicilio fiscal, teléfono, correo y enlaces a los cuatro documentos, en el
  mismo lenguaje visual que el HUD superior. En teléfono se reduce a la fila de
  enlaces para no comerse la escena.
- Nueva página `/contacto` con los datos completos en HTML estático,
  indexable, sin depender del modal.
- El pie de `/servicios` ahora incluye también Cancelaciones y Contacto.

### Seguridad

- **`next.config.ts`.** Se eliminó el `Access-Control-Allow-Origin: *` que
  aplicaba a todas las rutas incluidas las de `/api`. En su lugar: HSTS a un
  año, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy` y una Content-Security-Policy que arranca en modo
  **reporte** —— pásala a bloqueo con `CSP_ENFORCE=1` cuando hayas revisado los
  reportes unos días.
- **Dos proxies abiertos, desactivados.** `app/api/[...path]` reenviaba
  cualquier petición a las Cloud Functions de otro proyecto (`airforce-echo`)
  falsificando `Origin` y `Referer`; `app/api/gcs/[...path]` servía cualquier
  objeto de Google Cloud Storage desde el dominio yaakob.com. Ninguna página del
  sitio los usaba: eran herencia de la plantilla que se clonó. Quedaron
  respondiendo 404 con la explicación dentro; bórralos.

### Módulo de pagos

Nuevo directorio `pagos-lib/` más tres rutas de API. Cubre los puntos 1, 2, 4,
6, 7, 11, 12, 13, 14, 17 y 18. El detalle del diseño está en
`pagos-lib/LEEME.md`; lo esencial:

- tokenización en el navegador con `openpay.js` y `device_session_id`
  antifraude, para que el número de tarjeta no toque el servidor;
- formulario con límites al escribir y al enviar, logos de Openpay y de las
  marcas, botón bloqueado al primer clic;
- cobro del primer periodo con 3D Secure, y la suscripción recurrente creada
  **sólo después** de que Openpay confirme el cargo;
- mensajes de declinación saneados: el navegador nunca ve el texto del emisor,
  y ni «fondos insuficientes» ni «tarjeta perdida o robada» llegan al usuario;
- tope de tres tarjetas por cliente aplicado en el servidor;
- idempotencia real vía `order_id` único, que es lo que impide el cobro
  duplicado cuando el usuario recarga.

---

## Qué falta y no lo puede resolver un paquete de código

1. **Las llaves y los planes de Openpay.** Los importes en `pagos-lib/planes.ts`
   son marcadores. Nada cobra hasta que existan los planes en el panel.
2. **Los logos oficiales** en `public/pagos/` — ver `public/pagos/LEEME.md`.
   Son propiedad de Openpay y de las marcas; hay que descargarlos.
3. **El certificado SSL.** No se puede verificar desde fuera de tu red. Openpay
   pide vigencia de al menos un año y Vercel emite Let's Encrypt a 90 días:
   lleva preparada la explicación de la renovación automática, o instala un
   certificado propio.
4. **Correo transaccional.** La pantalla de resultado promete enviar el folio
   por correo y hoy no se envía nada. Conecta un proveedor o quita la frase
   antes de la cita.
5. **Cuentas de usuario.** Sin sesión no hay área donde el suscriptor gestione
   sus tarjetas. Deliberadamente no se construyó un endpoint que liste tarjetas
   por correo: sin autenticación eso es una fuga de datos.
6. **Webhook de Openpay** para enterarse de los cobros recurrentes fallidos.
   No lo exige la validación; lo exige operar.
7. **Ortografía y copia de la portada.** Revisión humana, con ojos frescos.

## Verificación hecha sobre este paquete

- Chequeo de tipos de todo el código nuevo: sin errores propios.
- Pruebas de la lógica pura (23 casos, todos en verde): filtros de captura,
  Luhn, vencimiento en el mes en curso, y la comprobación de que ningún mensaje
  de declinación filtra el motivo real al usuario.
- Lo que **no** está verificado: los nombres exactos de campos de la API de
  Openpay contra la documentación vigente, y el comportamiento real de 3D
  Secure sobre suscripciones. Eso se confirma con tarjetas de prueba en sandbox
  —y, si hay duda, con soporte de Openpay— antes de la cita.
