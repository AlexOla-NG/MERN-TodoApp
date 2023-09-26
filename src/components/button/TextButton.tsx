import React from "react";
import { IButton } from "./Button";

type TextButtonProps = IButton &{
	selected?: boolean;
}

const TextButton = (props: TextButtonProps) => {
	const { title, type, disabled, handleClick, selected } = props;

	const handleClickButton = () => {
		if (handleClick) {
			handleClick();
		}
	};

	return (
		<button
			className={`text-btn ${selected ? "text-btn-selected" : ""}`}
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
