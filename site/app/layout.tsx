import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Kaspi Analytics Lab — аналитика электронной торговли",
  description: "Исследование 411 млн событий в ClickHouse: качество данных, продуктовая аналитика, ML-прогноз покупки на 7 дней и интерактивный отчёт DataLens.",
  applicationName: "Kaspi Analytics Lab",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
