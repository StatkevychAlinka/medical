import React, { FC } from "react";

interface TabProps {
	title?: any;
	text?: any;
}

const TabPhoto: FC<TabProps> = ({ title, text }) => {
	return (
		<>
			<div className={title}>foto</div>
			<p className={text}>
				foto
			</p>
		</>
	);
};
export default TabPhoto;
