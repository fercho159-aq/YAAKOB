"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import type { ReactNode } from "react";
import { ContactModalProvider } from "@servicios/components/contact";
import { dinOT, gridnik, wordmark } from "@servicios/fonts";
import theme from "@servicios/theme";
import "@home/home.css";

/**
 * Lo mismo que envuelve a las páginas del Pages Router en `pages/_app.tsx`:
 * el App Router necesita su propia copia para que el header compartido —
 * Chakra, el modal de contacto y las fuentes— funcione en /start, /apps y
 * /planes.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <Global
        styles={`:root{--font-din-ot:${dinOT.style.fontFamily};--font-gridnik:${gridnik.style.fontFamily};--font-wordmark:${wordmark.style.fontFamily};}`}
      />
      <ContactModalProvider>{children}</ContactModalProvider>
    </ChakraProvider>
  );
}
