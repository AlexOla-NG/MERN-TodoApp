import { z } from "zod";

const buttonSchema = z.object({
	title: z.string(),
	type: z.enum(["submit", "button"]),
	disabled: z.boolean().optional(),
	handleClick: z.function().args().optional(),
});
type IButton = z.infer<typeof buttonSchema>;

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
