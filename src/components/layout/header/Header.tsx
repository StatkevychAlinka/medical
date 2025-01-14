import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import Switcher from "./Swicher";
import { LangIcon, ArrowIcon, PhoneIcon, TimeIcon } from "@/components/svgs";
import SwitchLogo from "@/components/theme/SwitchLogo";
import { IsOpenProps } from "@/components/layout/Layout";

interface HeaderProps extends IsOpenProps {
  logo: string;
}

const Header: FC<HeaderProps> = ({ logo }) => {
  const [headerScroll, setHeaderScroll] = useState<boolean>(false);
 
  const { locales, locale: activeLocale, pathname } = useRouter();



  useEffect(() => {
    const changeBackground = () => {
      setHeaderScroll(window.scrollY >= 10);
    };

    changeBackground();
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const links = [
    { label: "Servicii", href: "/" },
    { label: "Blog", href: "/service" },
    { label: "Despre noi", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  

  return (
    <header className={`fixed top-0 w-full z-50 ${headerScroll ? "bg-white shadow-md" : "bg-transparent"}`}>
      <div className="flex justify-between items-center px-6 py-4">
        {/* Логотип */}
        <Link href="/">
          <Image src={logo} alt="Logo" width={100} height={40} priority />
        </Link>

       

        {/* Переключатель темы */}
        <Switcher/>
      </div>
    </header>
  );
};



export default Header;
