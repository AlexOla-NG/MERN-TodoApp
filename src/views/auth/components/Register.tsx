import React, { useState } from "react";
import { IRegister, IRegisterFormData } from "../interface";
import PasswordInput from "./PasswordInput";
import Button from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";

const Register = ({ toggleView }: IRegister) => {
	const defaultFormData: IRegisterFormData = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState(defaultFormData);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};
	return (
		<div className="form-wrapper">
			<form className="form">
				<fieldset>
					<legend>register</legend>
					<label htmlFor="firstName">
						first name
						<input
							name="firstName"
							id="firstName"
							type="firstName"
							placeholder="firstName"
							onChange={handleChange}
							value={formData?.firstName}
						/>
					</label>
					<label htmlFor="lastName">
						last name
						<input
							name="lastName"
							id="lastName"
							type="lastName"
							placeholder="lastName"
							onChange={handleChange}
							value={formData?.lastName}
						/>
					</label>
					<label htmlFor="email">
						email
						<input
							name="email"
							id="email"
							type="email"
							autoComplete="off"
							placeholder="email"
							onChange={handleChange}
							value={formData?.email}
						/>
					</label>
					<PasswordInput
						name="password"
						placeholder="password"
						value={formData?.password}
						handleChange={handleChange}
					/>
				</fieldset>
				<div className="form-footer">
					<Button type="submit" title="register" />
					<TextButton
						title="Already have an account? Login"
						handleClick={toggleView}
					/>
				</div>
			</form>
		</div>
	);
};

export default Register;
