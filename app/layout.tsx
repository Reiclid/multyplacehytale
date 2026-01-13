import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Hytale.ru - New Era",
  description: "Official server website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className={`${nunitoSans.variable} antialiased bg-[#0B0F19] text-white w-full overflow-x-hidden`}>
        {/* Додаємо відступ зліва ТІЛЬКИ для екранів ширше 960px */}
        <main className="w-full">
          {children}
        </main>
      </body>
    </html>
  );
}