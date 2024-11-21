import React, { FC } from "react";

import { InstagramIcon, TelegramIcon, WhatAppIcon } from "@/components/svgs";
import SwitchLogo from "@/components/theme/SwitchLogo";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import { IsOpenProps } from "@/components/layout/Layout";



interface FooterProps extends IsOpenProps {
	
	logo: string;
	
}
const Footer: FC<FooterProps> = (props) => {
	const { logo } = props;
	return (
		<footer className="relative z-10 pb-17.5 lg:pb-22.5 xl:pb-27.5 pt-22.5">
  <div className="absolute bottom-0 left-0 -z-1 flex w-full flex-col gap-3 opacity-50">
    <div className="footer-bg-gradient h-[1.24px] w-full"></div>
    <div className="footer-bg-gradient h-[2.47px] w-full"></div>
    <div className="footer-bg-gradient h-[3.71px] w-full"></div>
    <div className="footer-bg-gradient h-[4.99px] w-full"></div>
    <div className="footer-bg-gradient h-[6.19px] w-full"></div>
    <div className="footer-bg-gradient h-[7.42px] w-full"></div>
    <div className="footer-bg-gradient h-[8.66px] w-full"></div>
    <div className="footer-bg-gradient h-[9.90px] w-full"></div>
    <div className="footer-bg-gradient h-[13px] w-full"></div>
  </div>
  <div className="relative mx-auto max-w-[1170px] px-4 pt-17.5 sm:px-8 xl:px-0">
    <div className="footer-divider-gradient absolute left-0 top-0 h-[1px] w-full"></div>

    <div className="flex flex-wrap justify-between">
      <section className="mb-10 w-full max-w-[520px]">
        <a className="mb-3  flex justify-start" href="/">
		<SwitchLogo  logo={logo} /><h2 className="ml-3 text-2xl font-bold shad">PX</h2>
        </a>
        <p className="mb-12 xl:w-4/5">
        Creare site web de către compania PX este o oportunitate excelentă 
        pentru afacerea dumneavoastră de a crește vizibilitatea pe internet, 
        deoarece acest lucru este extrem de important în era tehnologiilor informaționale.
        </p>
        <nav className="flex items-center gap-5" aria-label="social-media-links">
          <a href="#" aria-label="facebook" className="duration-300 ease-in hover:text-white">
            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 21.9506C18.0533 21.4489 22 17.1853 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.8379 5.43552 20.8734 10 21.8V16H7V13H10V9.79586C10 7.47449 11.9695 5.64064 14.285 5.80603L17 5.99996V8.99996H15C13.8954 8.99996 13 9.89539 13 11V13H17L16 16H13V21.9506Z" fill="" />
            </svg>
          </a>
          <a href="#" aria-label="twitter" className="duration-300 ease-in hover:text-white">
            <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.6125 21.5251C16.4625 21.5251 21.2625 14.2126 21.2625 7.87509C21.2625 7.72509 21.2625 7.46259 21.225 7.23759C22.1625 6.56259 22.9875 5.70009 23.625 4.76259C22.725 5.17509 21.825 5.40009 20.8875 5.51259C21.9 4.91259 22.65 3.97509 22.9875 2.8501C22.05 3.3751 21.075 3.78759 19.9125 4.01259C19.0125 3.0751 17.8125 2.4751 16.425 2.4751C13.7625 2.4751 11.5875 4.65009 11.5875 7.31259C11.5875 7.68759 11.625 8.06259 11.7 8.43759C7.8375 8.17509 4.3125 6.26259 1.9125 3.3751C1.5 4.12509 1.275 4.91259 1.275 5.77509C1.275 7.46259 2.1375 8.88759 3.45 9.75009C2.6625 9.71259 1.9125 9.48759 1.275 9.15009C1.275 9.18759 1.275 9.18759 1.275 9.18759C1.275 11.4751 2.925 13.4626 5.1 13.9126C4.6875 14.0251 4.2375 14.0626 3.9 14.0626C3.6 14.0626 3.2625 14.0251 3 13.9501C3.6375 15.8626 5.4 17.2501 7.5 17.2876C5.85 18.5626 3.7875 19.3501 1.575 19.3501C1.125 19.4251 0.75 19.3501 0.375 19.3126C2.4 20.7376 4.9125 21.5251 7.6125 21.5251Z" fill="" />
            </svg>
          </a>
        </nav>
        <p className="mt-5.5 font-medium">© 2019-2025 / Toate drepturile rezervate.</p>
      </section>

      <section className="w-full max-w-[571px]">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <nav>
            <h3 className="mb-5 font-semibold text-white">Creare site web</h3>
            <ul className="flex flex-col gap-3.5">
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white"> Personale</a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">Corporative </a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">Comerț Electronic</a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">Media și Informaționale</a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">Promoționale și Landing Pages</a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">Sănătate și Medicină</a></li>
            </ul>
          </nav>
          <nav>
            <h3 className="mb-5 font-semibold text-white">Mai mult</h3>
            <ul className="flex flex-col gap-3.5">
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">FAQ</a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">Despre noi</a></li>
              
            </ul>
          </nav>
          <nav>
            <h3 className="mb-5 font-semibold text-white">Support</h3>
            <ul className="flex flex-col gap-3.5">
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">SEO</a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">CRM</a></li>
              <li><a href="#" className="font-medium duration-300 ease-in hover:text-white">integration</a></li>
           
            </ul>
          </nav>
        </div>
      </section>
    </div>
  </div>
</footer>


	);
};
export default Footer;
