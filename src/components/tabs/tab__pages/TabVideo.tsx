import React, { FC } from "react";

interface TabProps {
	title?: any;
	text?: any;
}

const TabVideo: FC<TabProps> = ({ title, text }) => {
	return (
		<>
			<div className={title}>Video</div>
			<p className={text}>
				Video
			</p>
		</>
	);
};
export default TabVideo;
