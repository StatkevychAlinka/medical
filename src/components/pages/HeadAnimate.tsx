import React, { FC } from "react";
import Image from "next/image";
interface ServiceProps {
  imggradient1:string;
  imggradient2:string;
  imggradient3:string;
  wortext: { worktext: string 
    workdescription: string;  // Поле workdescription (строка)
    workimage: {                // Поле workimage, которое является объектом
      url: string;              // URL изображения
      title: string;            // Название изображени
    };        // Поле workimage (строка)
  }[]; // Типизация для пропса
	programaretitle: string;
	programaredescription:string;
}
const HeadAnimate: FC<ServiceProps> = ({programaretitle, programaredescription, wortext,imggradient1,imggradient2,imggradient3}) => {
	return (
		<>
			<section className="relative z-20 scroll-mt-17 overflow-hidden pt-22.5 lg:pt-27.5 xl:pt-32.5">
  <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
    
    <div className="relative top-18">
      <div className="pointer-events-none absolute inset-0 -z-10 -my-55 overflow-hidden">
        <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[925px] -translate-x-1/2">
        <Image
        className="max-w-none"
         priority={true}
         width={460}
         height={780}
        style={{
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    color: 'transparent',
  }}
  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
  src={imggradient1}
  alt="Profesor Doctor Radulescu Luminita - Specialist Otorinolaringolog (ORL)"
              />
          <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[778px] -translate-x-1/2">
          <Image
          className="max-w-none"
         priority={true}
         width={460}
         height={780}
        style={{
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    color: 'transparent',
  }}
  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
  src={imggradient2}
  alt="Profesor Doctor Radulescu Luminita - Specialist Otorinolaringolog (ORL)"
              />
          </div>
          <div className="absolute left-1/2 top-0 mx-auto aspect-square w-full max-w-[584px] -translate-x-1/2">
          <Image
          className="max-w-none"
         priority={true}
         width={460}
         height={780}
        style={{
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    color: 'transparent',
  }}
  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
  src={imggradient3}
  alt="Profesor Doctor Radulescu Luminita - Specialist Otorinolaringolog (ORL)"
              />
          </div>

        </div>
      </div>
   
    <div className="pricing-circle absolute left-1/2 top-0 h-[830px] w-full max-w-[830px] -translate-x-1/2 rounded-full bg-dark"></div>
    <div className="absolute -top-30 left-1/2 -z-1 h-60 w-full max-w-[482px] -translate-x-1/2 overflow-hidden">
      <div className="stars"></div>
      <div className="stars2"></div>
    </div>
    </div>
    <div className="relative -z-1 flex justify-center gap-7.5">
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
        <div className="pricing-grid pricing-grid-border relative h-[250px] w-full max-w-[50px]"></div>
      </div>
      <div>
        <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0"></div>
          <div className="wow fadeInUp relative z-10 mb-16 text-center">
            <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
            <Image
          className="max-w-none"
         priority={true}
         width={16}
         height={16}
        style={{
         
   
    color: 'transparent',
  }}
  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
  src="https://ai-tool.nextjstemplates.com/images/hero/icon-title.svg"
  alt=""
              />
              <span className="hero-subtitle-text"> Get access </span>
            </span>
        <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">Servicii Pixelcraft Media Solutions IN ROMANIA</h2>
        <p className="mx-auto max-w-[714px] font-medium">Build SaaS AI applications using OpenAI and Next.js, this kit comes with pre-configured and pre-built examples, making it easier to quickly kickstart your AI startup.</p>
          </div>








          <section className="relative z-0">
      <div className="features-row-border absolute left-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:left-1/4 lg:block lg:-translate-x-1/3"></div>
      <div className="features-row-border absolute right-1/2 top-1/2 hidden h-[1px] w-1/2 -translate-y-1/2 rotate-90 lg:right-[8.3%] lg:block"></div>

      <div className="flex flex-wrap justify-center">
      {wortext.map((item, index) => (
          
     
        <article key={index} className="w-full sm:w-1/2 lg:w-1/3">
          <div className="group relative overflow-hidden px-4 py-8 text-center sm:py-10 lg:px-8 xl:px-13 xl:py-15">
            <span className="features-bg absolute left-0 top-0 -z-1 h-full w-full opacity-0 group-hover:opacity-100"></span>
            <span className="icon-border relative mx-auto mb-8 inline-flex h-20 w-full max-w-[80px] items-center justify-center rounded-full">
              <Image
                className="max-w-none"
                priority={true}
                width={32}
                height={32}
                style={{ color: "transparent" }}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                src={ item.workimage.url}
                alt="Dezvoltare Software"
              />
            </span>
            <h3 className="mb-4 text-lg font-semibold text-white">
            {item.worktext}
            </h3>
            <p className="font-medium">
            {item.workdescription}
            </p>
          </div>
        </article>
))}
        

      

       
      

       
      </div>

      <div className="features-row-border h-[1px] w-full"></div>
    </section>












      </div>
  </div>
</section>

		</>
	);
};
export default HeadAnimate;