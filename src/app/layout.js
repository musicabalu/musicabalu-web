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
  title: "Musicabalú | Educación Musical para la Primera Infancia (0 a 6 años)",
  description: "Educación y estimulación musical para la primera infancia (0 a 6 años) basada en la Teoría del Aprendizaje Musical (MLT) de E. Gordon. Clases presenciales en Murcia y recursos para familias y educadores.",
  metadataBase: new URL("https://musicabalu.com"),
  openGraph: {
    title: "Musicabalú | Música para la Primera Infancia (0 a 6 años)",
    description: "Educación musical temprana de 0 a 6 años. Método Gordon (MLT). Clases presenciales en Murcia y recursos online para toda la familia.",
    url: "https://musicabalu.com",
    siteName: "Musicabalú",
    images: [
      {
        url: "https://musicabalu.com/og-logo.png",
        width: 418,
        height: 418,
        alt: "Musicabalú — Música para la Primera Infancia (0 a 6 años)",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musicabalú | Música para la Primera Infancia (0 a 6 años)",
    description: "Educación musical temprana de 0 a 6 años basada en la Teoría del Aprendizaje Musical (MLT) de E. Gordon.",
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
