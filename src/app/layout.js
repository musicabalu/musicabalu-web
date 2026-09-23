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
  description: "Clases de música para bebés de 0 a 3 años en Murcia basadas en la Teoría del Aprendizaje Musical (MLT) de E. Gordon. Más de 9 años desarrollando el potencial musical y cognitivo de los más pequeños.",
  metadataBase: new URL("https://musicabalu.com"),
  openGraph: {
    title: "Musicabalú | Música para Bebés en Murcia",
    description: "Clases de música para bebés de 0 a 3 años en Murcia. Método Gordon (MLT). Desde 2017 conectando familias a través de la música.",
    url: "https://musicabalu.com",
    siteName: "Musicabalú",
    images: [
      {
        url: "https://musicabalu.com/og-logo.png",
        width: 418,
        height: 418,
        alt: "Musicabalú — Clases de música para bebés en Murcia",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musicabalú | Música para Bebés en Murcia",
    description: "Clases de música para bebés de 0 a 3 años en Murcia. Método Gordon (MLT).",
    images: ["/og-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "5Qx9UWSt_4_C2bmgHPS7Cjvv4aQXiNbtQ1AVclPiRMI",
  },
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
