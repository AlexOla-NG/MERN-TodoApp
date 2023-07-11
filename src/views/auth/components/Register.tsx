import React, { useEffect, useState } from "react";
import { IRegister, IRegisterFormData } from "../interface";
import PasswordInput from "./PasswordInput";
import Button from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import { useRegister } from "../../../hooks/auth";

const Register = ({ toggleView }: IRegister) => {
	const defaultFormData: IRegisterFormData = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState(defaultFormData);
	const { mutate, isSuccess, isLoading } = useRegister();

	// STUB: mount login component if registration is successful
	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				toggleView();
			}, 2000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		mutate(formData);
		setFormData(defaultFormData);
	};

	return (
		<div className="form-wrapper">
			<form className="form" onSubmit={handleSubmit}>
				<fieldset>
					<legend>register</legend>
					<label htmlFor="firstName">
						first name
						<input
							name="firstname"
							id="firstName"
							type="firstName"
							placeholder="enter your first name"
							onChange={handleChange}
							value={formData?.firstname}
						/>
					</label>
					<label htmlFor="lastName">
						last name
						<input
							name="lastname"
							id="lastName"
							type="lastName"
							placeholder="enter your last name"
							onChange={handleChange}
							value={formData?.lastname}
						/>
					</label>
					<label htmlFor="email">
						email
						<input
							name="email"
							id="email"
							type="email"
							autoComplete="off"
							placeholder="enter your email"
							onChange={handleChange}
							value={formData?.email}
						/>
					</label>
					<PasswordInput
						name="password"
						placeholder="enter your password"
						value={formData?.password}
						handleChange={handleChange}
					/>
				</fieldset>
				<div className="form-footer">
					<Button
						type="submit"
						title="register"
						disabled={isLoading}
					/>
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
