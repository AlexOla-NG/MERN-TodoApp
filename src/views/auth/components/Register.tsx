import React, { useState } from "react";
import { IRegister, IRegisterFormData } from "../interface";
import PasswordInput from "./PasswordInput";

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
						firstName
						<input
							type="firstName"
							placeholder="firstName"
							onChange={handleChange}
							value={formData?.firstName}
						/>
					</label>
					<label htmlFor="lastName">
						lastName
						<input
							type="lastName"
							placeholder="lastName"
							onChange={handleChange}
							value={formData?.lastName}
						/>
					</label>
					<label htmlFor="email">
						email
						<input
							type="email"
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
			</form>
		</div>
	);
};

export default Register;
