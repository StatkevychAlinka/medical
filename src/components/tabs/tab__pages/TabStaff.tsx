import React, { FC } from "react";

interface TabProps {
	title?: any;
	text?: any;
}

const TabStaff: FC<TabProps> = ({ title, text }) => {
	return (
		<>
			<div className={title}>Luminița Rădulescu</div>
			<p className={text}>
			
Ocupația Medic
Experiența în muncă
Data Din 2008 până în prezent
Ocupația și poziția deținută Șef clinică ORL – Spitalul Clinic de Recuperare Iași
Activități și responsabilități Organizarea activității în clinică, realizarea întregii game de intervenții chirurgicale din ORL și
coordonarea activității de cercetare clinică.
Tipul de activitate
desfășurată Îngrijiri medicale, învățământ, cercetare clinică
Data 2007 – 2008
Ocupația și poziția deținută Șef Compartiment de Implant Cochlear - Spitalul Clinic de Recuperare Iași
Activități și responsabilități Organizarea activității în Compartimentul de Implant Cochlear, evaluarea candidaților la
implantarea cochleară Baha și Vibrant sound bridge și, de asemenea, participarea la activitatea
de cercetare clinică din Clinica ORL.
Data 2020 Doctor abilitat
Data 2020 - Professor - disciplina ORL
Ocupația și poziția deținută
Activități și responsabilități Susținerea de cursuri și seminarii pentru studenți și medici rezidenți, coordonarea lucrărilor de
licență.
Numele și adresa
angajatorului Universitatea de Medicină și Farmacie ”Gr.T.Popa” Iași / str. Universității 16, Iași
Tipul de activitate
desfășurată Învățământ și cercetare
2014 – 2020 conferențiar
2000 – 2014 șef lucrări – Disciplina ORL – UMF Iași
1995 – 2000 asistent universitar – Disciplina ORL – UMF Iași
Educație
Data 2009 – 2013 – Studii psihopedagogice Nivelul I si II / Univversitatea ”Al. I. Cuza” Iași
Data 1998 - 2003
Titlul obținut Doctor în medicină / OMEC nr.5663 din 15 dec.2003
Competențe obținute Cercetare clinică
Numele și tipul organizației
care a asigurat pregătirea Departamentul de Otorinolaringologie și chirurgia capului și gâtului, Universitatea de Medicină și
Farmacie ”Gr.T.Popa” Iași/Romania
Data 21 iunie 1999
Titlul și calificarea obținută Medic primar ORL /OMS nr.637 din 1999
Competențe obținute Otorinolaringologie
			</p>
		</>
	);
};
export default TabStaff;
