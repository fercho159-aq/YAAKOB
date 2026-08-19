import NextLink from 'next/link'
import legal from '@servicios/data/legal.json'

/**
 * Banda inferior de la portada.
 *
 * La portada es la experiencia WebGL a pantalla completa: no monta el `Footer`
 * de `/servicios`, así que hasta ahora la raíz del sitio no ofrecía ni un
 * enlace a los documentos legales ni un dato de contacto. La validación
 * técnica de Openpay entra por aquí y revisa exactamente eso (puntos 9, 10 y
 * 16), de modo que esta barra es obligatoria, no decorativa.
 *
 * Sigue el mismo lenguaje que el HUD superior: banda blanca, tipografía
 * pequeña, `pointer-events` desactivados en el contenedor para no robarle el
 * ratón a la escena.
 */

const { responsable } = legal

const LINKS = [
  { href: '/terminos', label: 'Términos y condiciones' },
  { href: '/privacidad', label: 'Aviso de privacidad' },
  { href: '/cancelaciones', label: 'Cancelaciones y reembolsos' },
  { href: '/contacto', label: 'Contacto' },
]

const telHref = `tel:${responsable.telefonos[0].replace(/[^+\d]/g, '')}`

export function LegalBar() {
  return (
    <footer id="yk-legal" aria-label="Información legal y de contacto">
      <div className="yk-legal-datos">
        <span className="yk-legal-razon">{responsable.denominacion}</span>
        <span className="yk-legal-sep" aria-hidden="true">
          ·
        </span>
        <span>{responsable.domicilioFiscal}</span>
        <span className="yk-legal-sep" aria-hidden="true">
          ·
        </span>
        <a href={telHref}>{responsable.telefonos[0]}</a>
        <span className="yk-legal-sep" aria-hidden="true">
          ·
        </span>
        <a href={`mailto:${responsable.correo}`}>{responsable.correo}</a>
      </div>

      <nav className="yk-legal-links" aria-label="Documentos legales">
        {LINKS.map((link) => (
          <NextLink key={link.href} href={link.href} className="yk-legal-link">
            {link.label}
          </NextLink>
        ))}
      </nav>

      <p className="yk-legal-pasarela">Se hace uso de Openpay como pasarela de pagos.</p>
    </footer>
  )
}

export default LegalBar
