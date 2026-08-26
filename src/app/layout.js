import { Montserrat, Quicksand } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Musicabalú | Educación Musical para la Primera Infancia",
  description: "Plataforma líder en educación musical temprana (0 a 3 años) basada en la Teoría del Aprendizaje Musical de E. Gordon.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${quicksand.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
