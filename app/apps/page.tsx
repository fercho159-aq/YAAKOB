/**
 * /apps muestra lo mismo que /start (pasarela de la app) pero sin la intro
 * hebrea: el menú del sitio y la portada enlazan a /apps, y la campaña a /start.
 */
import StartPage from "../start/page";

export default function AppsPage() {
  return <StartPage splash={false} />;
}
