import "@/pages/globals.scss";
import "@/pages/theme.scss";
import type { AppProps } from "next/app";
import '../styles/globals.css'
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "next-themes";

function getDirection(locale: any): "ltr" {
	return "ltr";
}

export default function App({ Component, pageProps }: AppProps) {
	const { locale }: any = useRouter();

	return (
		// @ts-ignore
		<IntlProvider locale={locale}>
			
			<ThemeProvider>
				<Component {...pageProps} dir={getDirection(locale)} />
			</ThemeProvider>
		</IntlProvider>
	);
}
