import Head from "next/head";
import React, { FC, ReactNode, useState } from "react";
import scss from "./Layout.module.scss";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { useIntl } from "react-intl";




interface LayoutProps {
	slug?: string;
	image: string;
	metadescription: string;
	metatitle: string;
	children: ReactNode;
	dir?: any;
}

export interface IsOpenProps {
	isOpen: boolean;
	setIsOpen: (param: boolean) => void;
	isOpenDropdown: boolean;
	setIsOpenDropdown: (param: boolean) => void;
	isOpenDropdownLanguage: boolean;
	setIsOpenDropdownLanguage: (param: boolean) => void;
}

const Layout: FC<LayoutProps> = ({ children, dir, metatitle, metadescription, image,slug}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
	const [isOpenDropdownLanguage, setIsOpenDropdownLanguage] = useState(false);

	const props: any = {
		isOpen,
		setIsOpen,
		isOpenDropdown,
		setIsOpenDropdown,
		isOpenDropdownLanguage,
		setIsOpenDropdownLanguage
	};

	const intl: any = useIntl();



	return (
		<>
			<Head>
			
				<title>{metatitle}</title>
				<meta name="description" content={metadescription} />
				<meta name="google-site-verification" content="gh4GTgp_us3x0rifHKMgiqtx2TT4-FHhXCqsYeEDfqU" />
				
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

				<meta name="robots" content="index, follow"/>
				<link rel="icon" href="/icon.png" />
				<link rel="canonical" href={`https://crearesite-web.ro/${slug}`} />
<link rel="shortlink" href={`https://crearesite-web.ro/${slug}`} />
<meta property="og:type" content={metatitle} />
<meta property="og:url" content={`https://crearesite-web.ro/${slug}`} />
<meta property="og:title" content={metatitle} />
<meta property="og:image" content={image} />

<meta property="og:image:type" content="image/webp" />
<meta name="dcterms.title" content={metatitle} />
<meta name="dcterms.type" content={metatitle} />
<meta name="dcterms.format" content="text/html" />
<meta name="dcterms.identifier" content={`https://crearesite-web.ro/${slug}`} />
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content={metatitle} />


<meta name="twitter:image:alt" content={metatitle} />




				
				{/*<link rel="icon" href="/icon.png" hrefLang="x-default" />
				<link rel="icon" href="/icon.png" hrefLang="ru" />
				<link rel="icon" href="/icon.png" hrefLang="en" />
	<link rel="icon" href="/icon.png" hrefLang="kg"/>*/}
			</Head>
			<div dir={dir}>
				<div className={`${scss.layout}`}>
					<header>
						<Header {...props} />
					</header>
					{children}
					<footer>
						<Footer {...props} />
					</footer>
				</div>
			</div>
	
		</>
	);
};
export default Layout;
