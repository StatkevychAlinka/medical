import React, { FC } from "react";
import { InstagramIcon, TelegramIcon, WhatAppIcon } from "@/components/svgs";
import SwitchLogo from "@/components/theme/SwitchLogo";
import Link from "next/link";

interface FooterProps {
  logo: string;
}

const Footer: FC<FooterProps> = ({ logo }) => {
  return (
    <footer className="relative z-10 bg-gray-900 text-gray-300">
      <div className="relative mx-auto max-w-[1170px] px-4 py-16 sm:px-8 xl:px-0">
        {/* Верхняя часть футера */}
        <div className="flex flex-wrap justify-between gap-10">
          {/* Логотип и описание */}
          <section className="w-full max-w-[500px]">
            <Link href="/" className="mb-3 flex items-center">
              
                <SwitchLogo logo={logo} />
                <h2 className="ml-3 text-2xl font-bold text-white">Generare Medicină</h2>
              
            </Link>
            <p className="mt-4 text-gray-400">
              Generarea unui site web medical vă permite să creșteți vizibilitatea serviciilor
              dumneavoastră, să atrageți pacienți noi și să oferiți acces ușor la informații
              importante despre clinica sau cabinetul dumneavoastră.
            </p>
            <div className="flex items-center gap-5 mt-6" aria-label="social-media-links">
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-white duration-300">
                <InstagramIcon />
                </Link>
                <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-white duration-300">
                <TelegramIcon />
                </Link>
                <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-white duration-300">
                <WhatAppIcon />
                </Link>
            </div>
            <p className="mt-5.5 text-sm font-medium text-gray-500">
              © 2023-2025 / Toate drepturile rezervate.
            </p>
          </section>

          {/* Навигационные секции */}
          <section className="w-full max-w-[571px]">
            <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
              {/* Servicii medicale */}
              <nav>
                <h3 className="mb-5 font-semibold text-white">Servicii medicale</h3>
                <ul className="flex flex-col gap-3.5">
                  <li>
                    <Link href="/cardiologie" className="font-medium duration-300 ease-in hover:text-white">
                    Cardiologie
                    </Link>
                  </li>
                  <li>
                    <Link href="/dermatologie" className="font-medium duration-300 ease-in hover:text-white">
                    Dermatologie
                    </Link>
                  </li>
                  <li>
                    <Link href="/pediatrie" className="font-medium duration-300 ease-in hover:text-white">
                    Pediatrie
                    </Link>
                  </li>
                  <li>
                    <Link href="/stomatologie" className="font-medium duration-300 ease-in hover:text-white">
                    Stomatologie
                    </Link>
                  </li>
                  <li>
                    <Link href="/ortopedie" className="font-medium duration-300 ease-in hover:text-white">
                    Ortopedie
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Despre platformă */}
              <nav>
                <h3 className="mb-5 font-semibold text-white">Despre platformă</h3>
                <ul className="flex flex-col gap-3.5">
                  <li>
                    <Link href="/faq" className="font-medium duration-300 ease-in hover:text-white">
                     Întrebări frecvente
                    </Link>
                  </li>
                  <li>
                    <Link href="/despre-noi" className="font-medium duration-300 ease-in hover:text-white">
                      Despre noi
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="font-medium duration-300 ease-in hover:text-white">
                   Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Resurse și suport */}
              <nav>
                <h3 className="mb-5 font-semibold text-white">Resurse și suport</h3>
                <ul className="flex flex-col gap-3.5">
                  <li>
                    <Link href="/seo" className="font-medium duration-300 ease-in hover:text-white">
                      SEO Medical
                    </Link>
                  </li>
                  <li>
                    <Link href="/crm" className="font-medium duration-300 ease-in hover:text-white">
                     CRM pentru clinici
                    </Link>
                  </li>
                  <li>
                    <Link href="/integrari" className="font-medium duration-300 ease-in hover:text-white">
                   Integrări software
                    </Link>
                  </li>
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
