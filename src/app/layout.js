import "./globals.css";

export const metadata = {
  title: "VOID",
  description: "",
  icons: {
    icon: "/logos/logoPRETO.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
