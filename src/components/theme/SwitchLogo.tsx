import React, { FC } from "react";
import Image from "next/image";
// import logoDark from "@/assets/logo-dark.png";
// import logoLight from "@/assets/logo.png";
import logoOrtodont from "@/assets/ortodont-logo.webp";
import { useTheme } from "next-themes";

interface SwitchLogoProps {
	logo: string;
	className?: any;
}

const SwitchLogo: FC<SwitchLogoProps> = ({ className , logo}) => {
	
	// const logo: any = resolvedTheme === "light" ? logoDark : logoLight;
	

	return (
		<>
			  <div className="logo-grid">
 
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
 <div className="grid-item"></div>
</div>       
		</>
	);
};

export default SwitchLogo;
