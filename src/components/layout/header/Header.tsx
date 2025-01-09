import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link as ScrollLink } from "react-scroll";


import SwitchLogo from "@/components/theme/SwitchLogo";
import { LangIcon, ArrowIcon, PhoneIcon, TimeIcon } from "@/components/svgs";
import { useTheme } from "next-themes";
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
	const { setTheme } = useTheme();

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
			 {/* Theme Toggle */}
			 <div className="flex gap-4 justify-center py-8">
        <button
          className="px-4 py-2 bg-button-primary text-white rounded hover:bg-blue-600 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          onClick={() => setTheme("light")}
        >
          Светлая
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={() => setTheme("dark")}
        >
          Тёмная
        </button>
      
      </div>
			</header>
		</div>
	);
};
export default Header;
