import React, { FC, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import scss from "./TabPages.module.scss";
import { ArrowLeftIcon, ArrowRightIcon, StarFiveIcon } from "@/components/svgs";

import { FormattedMessage } from "react-intl";

interface SlidersProps {
	title: string;
	text: string;
	user: string;
	date: string;
}

const images: SlidersProps[] = [
	{
		title: "Vă mulțumim ❤️",
		text: "Foarte recunoscătoare acestei doamne doctor pentru nivelul înalt de profesionalism și abordarea grijulie față de pacienți. O recomand cu căldură!",
		user: "Elcho911",
		date: "14/10/2018"
	},
	{
		title: "Vă mulțumim ❤️",
		text: "Medic profesionistă cu o manieră plăcută de comunicare. Sfaturile ei sunt neprețuite pentru menținerea sănătății urechilor, nasului și gâtului.",
		user: "Sher911",
		date: "30/04/2019"
	},
	{
		title: "Vă mulțumim ❤️",
		text: "O doctoriță în care poți avea încredere! Ea explică cu pricepere diagnosticul, oferă metode eficiente de tratament. Fericită că am ales această clinică.",
		user: "Tima911",
		date: "19/06/2019"
	},
	{
		title: "Vă mulțumim ❤️",
		text: "Foarte mulțumită de rezultatele tratamentului. Doamna doctor a arătat o înțelegere mare față de problemele mele și a ascultat atent. O recomand ca pe o specialistă foarte calificată.",
		user: "Elcho911",
		date: "14/10/2019"
	},
	{
		title: "Vă mulțumim ❤️",
		text: "O doctoriță care ascultă cu adevărat pacienții săi. Sfaturile ei m-au ajutat să îmi îmbunătățesc rapid sănătatea. Recunoscătoare pentru profesionalism!",
		user: "Alex78",
		date: "05/03/2020"
	},
	
];

const TabFeedBack: FC = () => {
	const [currentSlide, setCurrentSlide] = useState<any>(0);
	const [loaded, setLoaded] = useState<any>(false);
	const [ref, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			// ! slider
			loop: true,
			// mode: "free-snap",
			slides: {
				// origin: "center",
				perView: 1,
				spacing: 10
			},

			breakpoints: {
				"(min-width: 650px)": {
					slides: { perView: 2, spacing: 15 }
				},
				"(min-width: 1000px)": {
					slides: { origin: "center", perView: 3, spacing: 25 }
				}
			},

			// ! navigation + buttons
			initial: 0,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			created() {
				setLoaded(true);
			}
		},

		// ! auto play
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;

				function clearNextTimeout() {
					clearTimeout(timeout);
				}

				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 1500);
				}

				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			}
		]
	);

	return (
		<>
			<div className={scss.FeedBack__container}>
				<div className={scss.title}>
					<FormattedMessage
						id="page.tabs.title.feedback"
						values={{ span: (chunks) => <span>{chunks}</span> }}
					/>
				</div>
				<div className={scss.navigation__wrapper}>
					<div ref={ref} className="keen-slider">
						{images.map((item, index) => (
							<div key={index + 1} className="keen-slider__slide">
								<div className={scss.card}>
									<div className={scss.icon}>
										<StarFiveIcon />
									</div>
									<h5 className={scss.card__title}>{item.title}</h5>
									<p className={scss.text}>{item.text}</p>
									<h5 className={scss.user__date}>
										{/*{item.user},*/}
										{item.date}
									</h5>
								</div>
							</div>
						))}
					</div>
				</div>

				{loaded && instanceRef.current && (
					<div className={scss.dots}>
						{/* ! arrow__left */}
						<div>
							{loaded && instanceRef.current && (
								<>
									<span
										className={`${scss.arrow} ${scss.arrow__left}`}
										onClick={(e: any) =>
											e.stopPropagation() || instanceRef.current?.prev()
										}
									>
										<ArrowLeftIcon />
									</span>
								</>
							)}
						</div>
						{/* ! dot */}
						{Array.from(
							{ length: instanceRef.current.track.details.slides.length },
							(_, idx) => (
								<button
									key={idx}
									onClick={() => {
										instanceRef.current?.moveToIdx(idx);
									}}
									className={
										currentSlide === idx
											? `${scss.dot} ${scss.active}`
											: `${scss.dot}`
									}
								></button>
							)
						)}
						{/* ! arrow__right */}
						<div>
							{loaded && instanceRef.current && (
								<>
									<span
										className={`${scss.arrow} ${scss.arrow__right}`}
										onClick={(e: any) =>
											e.stopPropagation() || instanceRef.current?.next()
										}
									>
										<ArrowRightIcon />
									</span>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};
export default TabFeedBack;
