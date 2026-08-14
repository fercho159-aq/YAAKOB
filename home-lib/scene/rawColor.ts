import { Color, LinearSRGBColorSpace } from 'three'

/**
 * Builds a colour the way the engine did: the hex digits reach the shader
 * unchanged.
 *
 * three assumes a hex string is sRGB and converts it into its linear working
 * space, so `#7E98A1` would arrive at these shaders as `#35505B` and paint the
 * eye's strands about twice as dark as the real page. The rest of the port is
 * already unmanaged — raw textures in, `LinearSRGBColorSpace` out — so colours
 * have to opt out too. Setting `ColorManagement.enabled = false` does not work
 * here: react-three-fiber turns it back on when it creates the canvas.
 */
export function rawColor(hex: string): Color {
  return new Color().setStyle(hex, LinearSRGBColorSpace)
}
