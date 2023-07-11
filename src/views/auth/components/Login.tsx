import React, { useState } from "react";
import { ILogin, ILoginFormData } from "../interface";
import PasswordInput from "./PasswordInput";
import Button from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";
import { useLogin } from "../../../hooks/auth";

const Login = ({ toggleView }: ILogin) => {
	const defaultFormData: ILoginFormData = {
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState(defaultFormData);
	const { mutate, isLoading } = useLogin();

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
					<legend>login</legend>
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
					<Button type="submit" title="login" disabled={isLoading} />
					<TextButton
						title="Don't have an account? Register"
						handleClick={toggleView}
					/>
				</div>
			</form>
		</div>
	);
};

export default Login;
