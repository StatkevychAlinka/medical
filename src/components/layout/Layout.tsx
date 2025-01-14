import React, { FC, ReactNode, useState } from "react";
import { NextSeo } from "next-seo";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import {NextUIProvider} from "@nextui-org/react";

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

const Layout: FC<LayoutProps> = ({
  children,
  dir,
  metatitle,
  metadescription,
  image,
  slug,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [isOpenDropdownLanguage, setIsOpenDropdownLanguage] = useState(false);

  const props: any = {
    isOpen,
    setIsOpen,
    isOpenDropdown,
    setIsOpenDropdown,
    isOpenDropdownLanguage,
    setIsOpenDropdownLanguage,
  };

  return (
    <>
     <NextUIProvider>
      {/* Используем next-seo */}
      <NextSeo
  title={metatitle} // Заголовок страницы задается здесь
  description={metadescription}
  canonical={`https://crearesite-web.ro/${slug}`}
  openGraph={{
    locale: 'ro-RO',
    title: metatitle,
    description: metadescription,
    url: `https://crearesite-web.ro/${slug}`,
    images: [
      {
        url: image,
        alt: metatitle,
      },
    ],
  }}
  twitter={{
    cardType: "summary_large_image", // Оставляем только поддерживаемые свойства
    site: "@your_twitter_handle",
  }}
/>

      <div dir={dir} className="dark:bg-[#0c1634]">
        <div >
          <header>
            <Header {...props} />
          </header>
          {children}
          <footer>
            <Footer {...props} />
          </footer>
        </div>
      </div>
      </NextUIProvider>
    </>
  );
};

export default Layout;
