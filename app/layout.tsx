import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin", "cyrillic"],
});

const baseUrl = 'https://multiplacehytale.fun';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "MultiPlace Hytale | Новая Эра",
  description: "Официальный сервер Hytale. Выживание, мини-игры и уникальная атмосфера. Присоединяйся к новой эре гейминга!",
  
  // Налаштування для Facebook, Discord, Telegram
  openGraph: {
    title: "MultiPlace Hytale — Новая Эра Начинается",
    description: "Простые ванильные механики. Только ты и мир. Заходи на лучший сервер Hytale.",
    url: baseUrl,
    siteName: "MultiPlace Hytale",
    images: [
      {
        url: '/og-image.jpg', // Шлях до картинки в папці public
        width: 1200,
        height: 630,
        alt: 'MultiPlace Hytale Server Preview',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },

  // Налаштування спеціально для Twitter (X)
  twitter: {
    card: 'summary_large_image', // Робить картинку великою
    title: "MultiPlace Hytale — Играй Сейчас",
    description: "Присоединяйся к сообществу. Выживание и мини-игры ждут тебя.",
    images: ['/og-image.jpg'],
  },
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