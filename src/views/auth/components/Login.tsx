import React, { useEffect, useState } from "react";

import PasswordInput from "./PasswordInput";
import Button from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";

import { ILogin, ILoginFormData } from "../interface";
import { useLogin } from "../../../hooks/auth";
import { setStoredUser } from "../../../storage";

const Login = ({ toggleView, handleTokenUpdate }: ILogin) => {
	const defaultFormData: ILoginFormData = {
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState(defaultFormData);
	const { mutate, isLoading, data, isSuccess } = useLogin();

	// STUB: update token in local storage on success
	useEffect(
		() => {
			if (isSuccess) {
				handleTokenUpdate(data?.token);
				setStoredUser(data?.userID);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[isSuccess, data]
	);

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
					<p>
						Don't have an account?{" "}
						<TextButton title="Register" handleClick={toggleView} />
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
