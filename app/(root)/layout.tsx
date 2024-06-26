import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import ToastProvider from "../../context/ToastProvider";
import ThemeProvider from "@/context/ThemeProvider";
const barlow = localFont({ src: "../../public/fonts/Barlow-Regular.ttf" });

export const metadata: Metadata = {
  title: "Nomeo Blog 1.0",
  description: "Generated by create next app",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={barlow.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
