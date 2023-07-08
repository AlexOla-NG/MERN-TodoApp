import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
	name: string;
	placeholder: string;
	value?: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// TODO: stopped here
// finish styling passwordinput

const PasswordInput = ({
	name,
	placeholder,
	value,
	handleChange,
}: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(event);
	};

	const handleToggleVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div>
			<label className="password-input" htmlFor="password">
				password
				<div>
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						name={name}
						placeholder={placeholder}
						value={value}
						onChange={handleInputChange}
					/>
					{showPassword ? (
						<FaEye onClick={handleToggleVisibility} />
					) : (
						<FaEyeSlash onClick={handleToggleVisibility} />
					)}
				</div>
			</label>
		</div>
	);
};

export default PasswordInput;
