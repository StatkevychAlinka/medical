import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link as ScrollLink } from "react-scroll";


import SwitchLogo from "@/components/theme/SwitchLogo";
import { LangIcon, ArrowIcon, PhoneIcon, TimeIcon } from "@/components/svgs";

// impot {
// 	SwitchThemeButton,
// 	SwitchThemeIcon
// } from "@/components/theme/SwitchTheme";

import { IsOpenProps } from "@/components/layout/Layout";

interface HeaderProps extends IsOpenProps {}

interface linksProps {
	
	to: string;
	label: any;
	spy: boolean;
	smooth: boolean;
	offset: number;
	duration: number;
}
interface HeaderProps {
	
	logo: string;
	
}

const Header: FC<HeaderProps> = ({ logo, ...props }) => {
	const [headerScroll, setHeaderScroll] = useState<boolean>(false);
	const { locales, locale: activeLocale, pathname }: any = useRouter();

	// ! Scrolling Scroll
	useEffect(() => {
		const changeBackground = () => {
			if (window.scrollY >= 10) {
				setHeaderScroll(true);
			} else {
				setHeaderScroll(false);
			}
		};

		changeBackground();
		window.addEventListener("scroll", changeBackground);

		return () => {
			window.removeEventListener("scroll", changeBackground);
		};
	}, []);

	// ! Link Scroll
	const offsetScroll = -30;
	const durationScroll = 500;

	const links: linksProps[] = [
		{
			label: "Servicii",
			to: "/",
			spy: true,
			smooth: true,
			offset: offsetScroll,
			duration: durationScroll
		},
	
	
		{
			label: "Blog",
			to: "service",
			spy: true,
			smooth: true,
			offset: offsetScroll,
			duration: durationScroll
		},
		{
			label: "Despre noi",
			to: "about",
			spy: true,
			smooth: true,
			offset: offsetScroll,
			duration: durationScroll
		},
		{
			label: "Contact",
			to: "contact",
			spy: true,
			smooth: true,
			offset: offsetScroll,
			duration: durationScroll
		}
	];
	
	const handleScroll = () => {
		setTimeout(() => {
			window.scrollBy(0, 1);
		}, 570);
	};

	return (
		<div>
			<header >
			
				HEADER
			</header>
		</div>
	);
};
export default Header;
