export type IButton = {
	id?: number
	title: string;
	type: "submit" | "button";
	disabled?: boolean;
	handleClick?: (buttonID?: number) => void;
}

const Button = (props: IButton) => {
	const { title, type, disabled, handleClick } = props;

	const handleClickButton = () => {
		if (handleClick) {
			handleClick();
		}
	};

	return (
		<button
			className="btn"
			type={type}
			disabled={disabled}
			onClick={handleClickButton}
		>
			<span></span>
			{title}
			<span></span>
		</button>
	);
};

Button.defaultProps = {
	title: "login",
	type: "button",
};

export default Button;
