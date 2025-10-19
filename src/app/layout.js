import "./globals.css";
import AuthGuard from "../Components/AuthGuard";

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
      <body>
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  );
}
