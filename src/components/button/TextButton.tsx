import React from "react";
import { IButton } from "./Button";

const TextButton = (props: IButton) => {
	const { title, type, disabled, handleClick } = props;

	const handleClickButton = () => {
		if (handleClick) {
			handleClick();
		}
	};

	return (
		<button
			className="text-btn"
			type={type}
			disabled={disabled}
			onClick={handleClickButton}
		>
			{title}
		</button>
	);
};

TextButton.defaultProps = {
	title: "login",
	type: "button",
};

export default TextButton;
