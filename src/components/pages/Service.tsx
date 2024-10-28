import React, { FC } from "react";
import scss from "./Style.module.scss";
import { FormattedMessage } from "react-intl";
import Image from "next/image";
import TeethIcon from "@/assets/icons/Teeth.webp";
import MedPlus from "@/assets/icons/med_plus.png";
import CheckMark from "@/assets/icons/check_mark.png";
import BxChild from "@/assets/icons/bx-child.png";
import ReactYoutube from "@/components/react-youtube/ReactYoutube";
import ContactForm from "@/components/contact/ContactForm";
interface ServiceProps {
	programaretitle: string;
	programaredescription:string;
}
const Service: FC<ServiceProps> = ({programaretitle, programaredescription}) => {
	return (
		<>
			<div id="service" className={scss.about__page}>
				<div className={scss.block__1}>
					<div className={scss.title_justify}>
				<h2 className={scss.title}>
								<FormattedMessage id="page.about.title1" />
							</h2>
							</div>
					<div className="container">
					
				
						<div className={scss.content}>
						
						<div className={scss.price }>
							<div className={scss.titles }>
							<h2 >Prof. Dr. Rădulescu Luminița</h2>
							<p>Consultația cu investigațiile incluse </p>
							<ul>
							     <li>Otomicroscopie </li>
								<li>Examen clinic cu otoscopie </li>
								<li>rinoscopie și bucofaringoscopie</li>
								<li>fibroscopie</li>
								
								<li>timpanograma</li>
								<li>DPOAE</li>
								
							</ul>
							
							</div>
						</div>


					<div className={scss.left}>
							<ContactForm 
							className={scss.form__block} 
							programaretitle={programaretitle} 
							programaredescription={programaredescription}
							/>
						</div>
					</div>
					</div>
				</div>

				
			</div>
		</>
	);
};
export default Service;
