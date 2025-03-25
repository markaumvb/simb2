// src/app/layout.tsx
import "./globals.css"; // Certifique-se que este caminho está correto
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SIMB - Sistema Integrado de Mesas e Bilhar",
  description: "Sistema de gestão de mesas de bilhar e snooker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
