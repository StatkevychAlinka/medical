


import "../styles/globals.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "../components/theme-provider";
import { DefaultSeo } from "next-seo"; // Импортируем DefaultSeo
import SEO from "../../next-seo.config"; // Импортируем глобальную конфигурацию SEO

function getDirection(locale: any): "ltr" {
	return "ltr";
}

export default function App({ Component, pageProps }: AppProps) {
	const { locale }: any = useRouter();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(err => console.error("Service Worker registration failed:", err));
    }
  }, []);

  return (
    <IntlProvider locale={locale}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {/* Добавляем глобальные настройки SEO */}
        <DefaultSeo {...SEO} />
        {/* Передаем направление текста как пропс */}
        <Component {...pageProps} dir={getDirection(locale)} />
      </ThemeProvider>
    </IntlProvider>
  );
}
