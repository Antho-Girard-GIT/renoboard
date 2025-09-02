import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/Components/theme-provider";
import Nav from "./Components/nav";
import Footer from "./Components/footer";
export const metadata: Metadata = {
  title: "RenoBoard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
