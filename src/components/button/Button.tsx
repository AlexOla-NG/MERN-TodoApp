import { z } from "zod";

// const buttonSchema = z.object({
// 	title: z.string(),
// 	type: z.enum(["submit", "button"]),
// 	isSelected: z.boolean().optional(),
// 	disabled: z.boolean().optional(),
// 	handleClick: z.function().args().optional(),
// });
// export type IButton = z.infer<typeof buttonSchema>;

export type IButton = {
	id?: number
	title: string;
	type: "submit" | "button";
	disabled?: boolean;
	selected?: boolean;
	handleClick?: (buttonID?: number) => void;
}

// TODO: stopped here
// finish styling btn
// add disabled styles

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
