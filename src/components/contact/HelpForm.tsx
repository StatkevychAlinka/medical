import { FC, useState } from "react";
import axios from "axios";
import scss from "./Contact.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage, useIntl } from "react-intl";

import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["latin"] });
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Обработка изменений
  };
interface FormData {
	first_name: string;
	last_name: string;
	phone: string;
	subject: string;
	message: string;
}



const  HelpForm: FC = () => {
	const [formData, setFormData] = useState<FormData>({
		first_name: "",
		last_name: "",
		phone: "",
		subject: "",
		message: ""
	});

	const [sendButton, setSendButton] = useState(false);

	const TOKEN = "6842589199:AAHLtWeu3uuWw8cutRqd2T9J0KvWCYN-FWo";
	const CHAT_ID = "1414894359";
	const API_URL = `https://api.telegram.org/bot6842589199:AAHLtWeu3uuWw8cutRqd2T9J0KvWCYN-FWo/sendMessage`;
	
	const messageModel = () => {
		let messageTG = `First Name: <b>${formData.first_name}</b>\n`;
		messageTG += `Last Name: <b>${formData.last_name}</b>\n`;
		messageTG += `Phone: <b>${formData.phone}</b>\n`;
		messageTG += `Subject: <b>${formData.subject}</b>\n`;
		messageTG += `Message: <b>${formData.message}</b>\n`;

		return messageTG;
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const notify = () => {
		toast.success("Formularul dvs. a fost trimis cu succes!", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark"
		});
	};

	async function sendData(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();

		setSendButton(!sendButton);

		try {
			await axios.post(API_URL, {
				chat_id: CHAT_ID,
				parse_mode: "html",
				text: messageModel()
			});

			notify();
			setSendButton(sendButton);

			setFormData({
				first_name: "",
				last_name: "",
				phone: "",
				subject: "",
				message: ""
			});
		} catch (err) {
			console.log(err);
		}
	}

	const intl: any = useIntl();

	return (
		<>
		  <section id="support" className="scroll-mt-17 pt-22.5 z-0">
              <div className="mx-auto max-w-[1104px] px-4 sm:px-8 xl:px-0">
                <div className="relative z-999 overflow-hidden rounded-[30px] bg-dark px-4 pt-25 sm:px-20 lg:px-27.5">
                  {/* Декоративные элементы */}
                  <div className="absolute -top-[16%] left-1/2 -z-1 flex w-full max-w-[690px] -translate-x-1/2 justify-center gap-7.5 opacity-40">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className={`pricing-grid pricing-grid-border relative bottom-${i % 4 === 0 ? '12' : i % 3 === 0 ? '8' : '3'} h-[250px] w-full max-w-[50px]`}></div>
                    ))}
                  </div>

                  {/* Декоративные элементы */}
                  <div className="absolute -top-30 left-1/2 -z-1 h-60 w-full max-w-[482px] -translate-x-1/2 overflow-hidden">
                    <div className="stars"></div>
                    <div className="stars2"></div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <span className="absolute left-1/2 top-0 -z-1 h-full w-full -translate-x-1/2">
                      <span className="absolute left-1/2 top-[-50%] h-[906px] w-[906px] -translate-x-1/2 rounded-full bg-[#2e145a] opacity-25 blur-[250px]"></span>
                    </span>
                    <span className="absolute left-1/2 top-0 -z-1 aspect-[1170/592] w-full -translate-x-1/2">
                      <span className="max-w-none absolute h-full w-full left-0 top-[-39%] bg-[#5B21B6] opacity-25 blur-[137px] rounded-full"></span>
                    </span>
                    <span className="absolute left-1/2 top-0 -z-1 mx-auto aspect-[530/254] w-full max-w-[530px] -translate-x-1/2">
                      <span className="absolute h-[224px] w-[224px] top-[-39%] left-1/2 -translate-x-1/2 bg-white opacity-20 blur-[76.5px] rounded-full"></span>
                    </span>
                  </div>

                  <div className="wow fadeInUp relative z-10 mb-16 text-center">
                    <span className="hero-subtitle-gradient relative mb-4 inline-flex items-center gap-2 rounded-full px-4.5 py-2 text-sm font-medium">
                      <img alt="icon" loading="lazy" width="16" height="16" src="/images/hero/icon-title.svg" />
                      <span className="hero-subtitle-text">întrebări</span>
                    </span>
                    <h2 className="mb-4.5 text-2xl font-extrabold text-white sm:text-4xl xl:text-heading-2">Aveți întrebări?</h2>
                    <p className="mx-auto max-w-[714px] font-medium">
					Vă vom răspunde cât mai repede posibil!
                    </p>
                  </div>

                  <div className="form-box-gradient relative overflow-hidden rounded-[25px] bg-dark p-6 sm:p-8 xl:p-15">
                    <form className="relative z-10" action="https://formbold.com/s/unique_form_id" method="POST" onSubmit={sendData}>
                      <div className="-mx-4 flex flex-wrap xl:-mx-10">
                        <div className="w-full px-4 md:w-1/2 xl:px-5">
                          <div className="mb-9.5">
                            <label htmlFor="name" className="mb-2.5 block font-medium text-white">Name</label>
                            <input

                                     type="text"
									name="first_name"
									aria-labelledby="first_name"
									 id="name"
									  className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
									  value={formData.first_name}
									onChange={handleChange}
									required
									onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
										e.target.setCustomValidity('Vă rugăm, completați acest câmp.');
									  }}
									  onInput={(e: React.FormEvent<HTMLInputElement>) => {
										e.currentTarget.setCustomValidity('');
									  }}

                             
                             
                             
                           
                            
                        
                            />
                          </div>
                        </div>

                        <div className="w-full px-4 md:w-1/2 xl:px-5">
                          <div className="mb-9.5">
                            <label htmlFor="email" className="mb-2.5 block font-medium text-white">Email</label>
                            <input
                             
                            
                             



							  type="text"
									name="last_name"
									aria-labelledby="last_name"
									id="last_name"
									  className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-white outline-none focus:border-purple"
									  value={formData.last_name}
									onChange={handleChange}
									required
									onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
										e.target.setCustomValidity('Vă rugăm, completați acest câmp.');
									  }}
									  onInput={(e: React.FormEvent<HTMLInputElement>) => {
										e.currentTarget.setCustomValidity('');
									  }}
                            />
                          </div>
                        </div>

                        <div className="w-full px-4 xl:px-5">
                          <div className="mb-10">
                            <label htmlFor="message" className="mb-2.5 block font-medium text-white">Message</label>
                            <textarea
                          name="message"
						  aria-labelledby="message"
						  id="message"
						   className="w-full rounded-lg border border-white/[0.12] bg-white/[0.05] px-6 py-5 outline-none focus:border-purple"
						  placeholder="message"
						  value={formData.message}
						  onChange={handleChange}
                             
                            ></textarea>
                          </div>
                        </div>

                        <div className="w-full px-4 xl:px-5">
                          <div className="text-center">


						  <button
							disabled={sendButton}
							className="hero-button-gradient inline-flex rounded-lg px-7 py-3 font-medium text-white duration-300 ease-in hover:opacity-80"
						>
							{sendButton ? (
								'FIRST'
							) : (
								'second'
							)}
						</button>
						<ToastContainer />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
		</>
	);
};
export default HelpForm;
