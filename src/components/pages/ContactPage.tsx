import React, { FC, useEffect, useRef, useState } from "react";
import scss from "./Style.module.scss";
import ContactForm from "@/components/contact/ContactForm";
import Image from "next/image";
import { EmailIcon, MarkerIcon, PhoneIcon } from "@/components/svgs";
import logo from "@/assets/ortodont.webp";
import AnimatedNumbers from "@/components/framer-motion/AnimatedNumbers";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
const ContactPage: FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false); // Состояние для карты
  const mapRef = useRef<HTMLDivElement | null>(null); // Реф для карты

  useEffect(() => {
    // Настраиваем Intersection Observer для отслеживания видимости карты
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMapLoaded(true); // Загружаем карту, когда она попадает в зону видимости
            observer.unobserve(entry.target); // Останавливаем наблюдение после загрузки карты
          }
        });
      },
      { threshold: 0.1 } // Порог видимости: 10% элемента должно быть видно
    );

    if (mapRef.current) {
      observer.observe(mapRef.current); // Начинаем наблюдать за блоком карты
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current); // Очищаем наблюдателя при демонтировании компонента
      }
    };
  }, []);

  return (
    <>
      <div id="contact" className={scss.contact__page}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.right}>
              <div className={scss.block}>
                <div className={scss.texts}>
                  <h3 className={scss.title}>
                    <FormattedMessage id="page.contact.right.title" />
                  </h3>
                  <p className={scss.text}>
                    <a className={scss.tel} href="tel:+40724955956">
                      <PhoneIcon />
                      +40724955956
                    </a>
                  </p>
                  <p className={scss.text}>
                    <MarkerIcon />
                    Cabinet specializat ORL Iași – Prof. Dr. Luminița Rădulescu, Adresă: <Link href="https://www.google.com/maps/place/Șoseaua+Moara+de+Foc+Nr.+30,+Iași">
          Șoseaua Moara de Foc Nr. 30.
        </Link>
                  </p>
                </div>
                <div className={scss.logo}>
                  <div className={scss.logo__bg}></div>
                </div>
              </div>
      {/*       <div className={scss.map} ref={mapRef}>
                {isMapLoaded ? (
                  <iframe
                    src="/map.html"
                    frameBorder="0"
                    title="Map on 2GIS"
                    width="100%"
                    height="400px"
					
                  ></iframe>
                ) : (
                  <p>Карта загружается...</p>
                )}
              </div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
