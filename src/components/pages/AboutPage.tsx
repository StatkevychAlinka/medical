import React, { FC } from "react";
import scss from "./Style.module.scss";
import { FormattedMessage } from "react-intl";
import Image from "next/image";
import TeethIcon from "@/assets/icons/Teeth.webp";
import ReactYoutube from "@/components/react-youtube/ReactYoutube";

interface AboutPageProps {
	rightimg: string;
  videoId: string;
  youtubedescription: string;
}

const AboutPage: FC<AboutPageProps> = ({ videoId,youtubedescription,rightimg }) => {
  return (
    <>
      <div id="about" className={scss.about__page}>
        <div className={scss.block__1}>
          <div className="container">
            <div className={scss.about__us}>
              {/* Главное изображение */}
              <Image
                priority={true}
                quality={1}
                loading="eager"
                className={scss.balance__for__mobile}
                src={TeethIcon}
                alt={"Cabinet ORL"}
              />
              {/* Иконки */}
              <div className={scss.icon__first}>
              <Image
                  priority={true}
                  quality={25}
				  width={400}
				  height={720}
				  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  loading="eager"
                  src={rightimg}
                  alt={"Cabinet ORL Icon 2"}
                />
              </div>
              <div className={scss.icon__second}>
                <Image
                  priority={true}
                  quality={25}
				  width={400}
				  height={720}
				  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                  loading="eager"
                  src={rightimg}
                  alt={"Cabinet ORL Icon 2"}
                />
              </div>
              {/* Заголовок */}
              <h2 className={scss.title}>
                <FormattedMessage id="page.about.title" />
              </h2>
              {/* Видео и текст */}
              <div className={scss.video__text}>
                <ReactYoutube videoId={videoId} className={scss.youtube} />
                <p className={scss.text}>
                 {youtubedescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
