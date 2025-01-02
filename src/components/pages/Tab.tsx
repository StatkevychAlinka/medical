import React, { useState, FC } from "react";

const Tabs: FC = () => {
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2" | "tab3">("tab1");

  return (
    <section id="home" className=" relative z-10 overflow-hidden pt-35 md:pt-40 xl:pt-45">

  <div className="mx-auto max-w-7xl">
    <div className="mt-8 mx-3">
      {/* Навигация табов */}
      <ul className="flex space-x-4 border-b border-gray-200">
        <li
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "tab1"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab1")}
        >
         creare site
        </li>
        <li
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "tab2"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab2")}
        >
          Secretele
        </li>
        <li
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "tab3"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("tab3")}
        >
        Calitate
        </li>
      </ul>

      {/* Контент табов */}
      <div className="mt-4">
        {activeTab === "tab1" && (
          <>
          <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2"> Creare site iasi</h2>
          <p className="mx-auto  font-medium">Afacerea online din Iași se remarcă printr-un nivel 
            ridicat de concurență, ceea ce necesită o abordare specială în procesul
             de creare site web. Serviciile oferite de studioul nostru de creare site web Iași includ:</p>
             <ul className=" font-medium">

              <li>- adaptarea la un mediu concurențial dinamic;</li>
              <li>- o strategie bine gândită pentru dezvoltarea afacerii;</li>
              <li>- analiza competitorilor și identificarea punctelor lor slabe;</li>
              <li>- transformarea dezavantajelor concurenților în avantaje pentru afacerea ta.</li>
             </ul>
             <p className="mx-auto  font-medium">Un aspect important al procesului de creare site Iași este 
              gama variată de prețuri – de la opțiuni economice până la soluții premium. Cum alegi un partener
               care nu doar creează un site, dar și te ajută să generezi profit și să îți amortizezi investiția? 
               Răspunsul nostru: alege specialiștii noștri!

</p>
<h3 className="text-white mt-3"> De ce să lucrezi cu noi?</h3>
<p className="mx-auto  font-medium">Oferim cel mai bun raport calitate-preț, furnizând servicii care în alte studiouri pot costa mult mai mult. Avantajele noastre includ:

</p>
<ul className=" font-medium">

<li>- implementarea unei strategii de creștere a afacerii încă din etapa de dezvoltare;</li>
<li>- analiza detaliată a pieței și a competitorilor;
</li>
<li>- crearea și implementarea unei strategii SEO eficiente;</li>
<li>- optimizarea site-ului pentru dispozitivele mobile;</li>
<li>- analiza publicului țintă și a potențialilor clienți;</li>
<li>- un echilibru perfect între funcționalitate și design atractiv.</li>
</ul>


<p className="mx-auto  font-medium">Pe lângă toate acestea, asigurăm un procent minim de 
  respingere a paginilor și o rată maximă de conversie.</p>
  <p className="mx-auto  font-medium">Opțiunile ieftine pot părea tentante, dar nu întotdeauna oferă rezultate satisfăcătoare. Dezvoltatorii care nu înțeleg specificul pieței locale rareori pot crea un produs cu adevărat eficient.
     Crearea unui site necesită o înțelegere profundă a afacerii tale și
      o abordare personalizată pentru fiecare proiect.</p>
      <h3 className="text-white mt-3"> Ce înseamnă să creezi un site web în Iași?</h3>
      <p className="mx-auto  font-medium">Înseamnă să livrezi un produs care îndeplinește standardele ridicate ale utilizatorilor 
        moderni, obișnuiți cu designuri atractive, navigare intuitivă și funcționalități impecabile.</p>
        <p className="mx-auto  font-medium"><strong className="text-white">Concluzie: </strong>Dacă ești în căutarea unui partener de încredere pentru creare site Iași, alege o echipă cu experiență,
           portofoliu relevant și o abordare localizată. Vom fi bucuroși să te ajutăm să îți transformi ideile în succes! 😊</p>
          </>
        )}
        {activeTab === "tab2" && (
         <>
         <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2"> Secretele creării unui site web de succes</h2>
          <p className="mx-auto  font-medium">Pe internet există o mulțime de site-uri care nu aduc niciun beneficiu real. Cu siguranță, nu vrei să investești în încă un proiect inutil. Multe dintre aceste site-uri 
            nu sunt optimizate pentru dispozitive mobile, au pierdut din 
            relevanță sau oferă conținut care nu atrage vizitatorii.</p>
            <p className="mx-auto  font-medium">Care este secretul unui site de succes? Orientarea către utilizator! Imaginează-ți un loc în care ești întâmpinat cu un zâmbet, într-o atmosferă plăcută și confortabilă. La fel trebuie să fie și un site web: prietenos, simplu de utilizat și construit astfel încât să răspundă nevoilor vizitatorilor fără a-i deranja cu ferestre pop-up sau acțiuni forțate.

Noi, având experiență în marketing online și înțelegerea comportamentului utilizatorilor, 
știm cum să configurăm site-ul astfel încât vizitatorii să realizeze acțiunile dorite fără să-și dea seama.</p>
<h3 className="text-white mt-3"> Ce facem pentru a crea un site web eficient?</h3>
<h4>1. Analizăm piața și competitorii</h4>
<p className="mx-auto  font-medium">Cercetăm în detaliu nișa ta de afaceri, identificăm punctele forte și slabe ale concurenței.</p>
<h4>2. Creăm un design unic</h4>
<p className="mx-auto  font-medium">Realizăm un design personalizat, bazat pe datele de marketing și comportamentul utilizatorilor.</p>
<h4>3. Creștem loialitatea clienților</h4>
<p className="mx-auto  font-medium">Contribuim la consolidarea imaginii pozitive a companiei tale printr-un site prietenos și ușor de utilizat.</p>
<h4>4. Planificăm strategia de dezvoltare a afacerii</h4>
<p className="mx-auto  font-medium">Stabilim un plan clar pentru extinderea afacerii tale înainte chiar de lansarea site-ului.</p>
<h4>5. Lărgim audiențai</h4>
<p className="mx-auto  font-medium">Atragem noi clienți și creștem acoperirea publicului țintă prin metode moderne și eficiente.</p>
<h4>6. Realizăm SEO complet</h4>
<p className="mx-auto  font-medium">Optimizăm site-ul pentru motoarele de căutare, astfel încât să fie vizibil și să genereze trafic constant.</p>

<p className="mx-auto  font-medium">Un site eficient nu este doar o colecție de pagini. Este un instrument care dezvoltă afacerea ta, crește vânzările și atrage clienți mulțumiți. Noi suntem aici să te ajutăm să creezi un astfel de site!</p>

         </>
        )}
        {activeTab === "tab3" && (
      <>
        <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2"> Creare site iasi</h2>
          <p className="mx-auto  font-medium">Dacă site-ul tău nu aduce clienți, este ca și cum nu l-ai avea. Problema nu se rezolvă doar printr-un „retuș cosmetic”. Gândește-te la asta: dacă vopsești o mașină veche, aceasta nu se va transforma într-un model modern de lux. La fel, un site creat superficial sau fără o 
            strategie clară nu va fi apreciat nici de utilizatori, 
            nici de motoarele de căutare. În final, investițiile tale se vor transforma în pierderi.</p>
            <p className="mx-auto  font-medium">Noi garantăm crearea unui site corect, de la analiza afacerii tale până la obținerea rezultatelor financiare dorite.</p>
            <h3 className="text-white mt-3">Abordarea noastră în crearea site-urilor web</h3>
            <p className="mx-auto  font-medium">Când alegi să colaborezi cu noi, primul pas este să 
              cunoaștem afacerea ta. Analizăm cerințele, stabilim obiectivele și elaborăm o strategie 
              pentru atingerea acestora. Abordarea noastră este unică: analizăm și planificăm înainte de a începe 
              implementarea. Întregul proces se desfășoară într-un limbaj accesibil, fără termeni tehnici complicați.</p>
              <p className="mx-auto  font-medium">Pentru discuțiile cu specialiști în marketing sau directori comerciali, utilizăm un limbaj profesional adaptat contextului. 
                Dacă reprezinți o echipă de marketing și cauți un partener de 
                încredere pentru dezvoltarea unui site, suntem gata să colaborăm.</p>
                <h3 className="text-white mt-3">De ce să ne alegi pe noi?</h3>
                <p className="mx-auto  font-medium">Atunci când creăm un site web, ținem cont de tendințele moderne de design, specificul nișei tale, cerințele tehnice ale motoarelor de căutare și structura semantică. Studioul nostru Creare Site Web își dorește ca 
                  site-ul tău să devină nu doar o simplă prezență online, ci un instrument
                   eficient pentru dezvoltarea afacerii tale.</p>
                   <p className="mx-auto  font-medium">Prin colaborarea cu noi, vei obține un produs unic, personalizat pentru nevoile tale. 
                    Fiecare site creat de noi este un instrument de marketing original, 
                    cu un design exclusivist, care reflectă identitatea brandului tău.</p>
      </>
        )}
      </div>
    </div>
    </div></section>
  );
};

export default Tabs;
