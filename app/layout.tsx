import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Метро 2033 — Официальный Сайт Сообщества",
  description: "Официальный сайт сообщества Метро 2033. История, карта метро, снаряжение сталкера, форум выживших.",
  keywords: "метро 2033, сталкер, постапокалипсис, выживание, подземка",
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
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Russo+One&family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
