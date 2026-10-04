import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { FavoriteProvider } from "@/components/context/Favorite-Context"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FavoriteProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </FavoriteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}