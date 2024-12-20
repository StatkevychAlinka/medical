import React, { FC } from "react";
import Image from "next/image";
import {IconCloud } from "@/components/animation/tehno";
import Accordion from "@/components/accordeon/Accoredeon";
const NewTehnologi: FC = () => {
 
        const iconSlugs = [
            "react",
            "next-dot-js",
            "typescript",
            "javascript",
            "node-dot-js",
            "html5",
            "css3",
            "sass",
            "bootstrap",
            "tailwindcss",
            "webpack",
           
            "eslint",
          
            "redux",
            "graphql",
            "apollo-graphql",
            "firebase",
            "mongodb",
           
            
            "docker",
           
            "github",
            "gitlab",
            "bitbucket",
            "figma",
            "adobe-photoshop",
            "adobe-illustrator",
            "adobe-xd",
            "sketch",
            "vue-dot-js",
            "angular",
            "python",
            "django",
            "flask",
            "php",
            "laravel",
            "ruby",
            "rails",
            "java",
            "spring",
            "swift",
            "kotlin",
            "android",
            "ios",
          ];

      const accordionItems = [
        { title: "React.js", content: "Concurenții pot folosi interfețe standard, limitate în funcționalitate și care se încarcă lent. Noi creăm interfețe interactive și scalabile, care funcționează fulgerător și atrag clienții tăi.", whu_use: "Facebook, Instagram, Airbnb, Netflix" },
        { title: "Next.js", content: "Alte dezvoltări ignoră adesea importanța SEO și viteza de încărcare, lăsând site-ul tău invizibil pentru Google. Noi folosim Next.js pentru ca site-ul tău să fie afișat instant în motoarele de căutare și să încânte clienții cu rapiditatea sa.", whu_use: "Ferrari, Nike, PlayStation" },
        { title: "Node.js", content: "Mulți continuă să folosească tehnologii server vechi, care nu rezistă la încărcări mari. Cu Node.js, site-ul tău va fi mereu rapid, chiar și în perioadele de trafic intens." , whu_use: " LinkedIn, Walmart, Netflix, Uber"},
        { title: "MongoDB", content: "Mulți concurenți oferă baze de date vechi, care nu fac față volumelor mari de informații. Noi folosim MongoDB pentru ca site-ul tău să gestioneze cu ușurință orice cantitate de date." , whu_use: " Forbes, Toyota, Bosch, Adobe"},
        { title: "Firebase", content: "Concurenții pot să nu ofere soluții rapide și fiabile pentru date în timp real. Firebase asigură autentificare instantă și procesare rapidă a datelor, esențială pentru afacerile moderne." , whu_use: " Alibaba, Lyft, Trivago, The New York Times"},
        { title: "GraphQL", content: "Dacă concurenții folosesc API-uri standard, asta înseamnă o funcționare lentă și multe date inutile. Noi utilizăm GraphQL pentru a accelera dezvoltarea și a oferi site-ului tău doar informațiile necesare." , whu_use: " Twitter, Shopify, GitHub, Airbnb"},
        { title: "Docker", content: "Nu toate companiile iau în considerare securitatea și stabilitatea site-ului tău. Noi implementăm aplicații în containere izolate, pentru a elimina erorile și scurgerile de date." , whu_use: " PayPal, Spotify, ADP, Business Insider"},
      ];
	return (
		<>
		<section id="home" className=" relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45">
       
        <div className="relative z-1 mx-auto max-w-[900px] px-4 sm:px-8 xl:px-0">
        <div className="text-center">
 

      {/* Title */}
      <h1 className="mb-6 text-3xl font-extrabold text-white sm:text-5xl xl:text-heading-1 min-h-10">
      Cele mai bune tehnologii. Creăm proiecte care ies în evidență și devin instrumente de creștere.
      </h1>

      {/* Description */}
      <p className="mx-auto mb-9 max-w-[500px] font-medium md:text-lg">
      În timp ce alții oferă soluții depășite sau șablonare, noi folosim tehnologii de vârf care garantează afacerii tale viteză, siguranță și succes pe termen lung.
     
      </p>
       

         <IconCloud iconSlugs={iconSlugs}  />
       

         <Accordion items={accordionItems} />
   
     
       </div>
    
    </div>
 

 




</section>


		</>
	);
};
export default NewTehnologi;