import React, { useEffect, useState } from "react";

import PasswordInput from "./PasswordInput";
import Button from "../../../components/button/Button";
import TextButton from "../../../components/button/TextButton";

import { ILogin, ILoginFormData } from "../interface";
import { useLogin } from "../../../hooks/auth";
import { setStoredUser } from "../../../storage";

// TODO: stopped here
// replace TextButton with native button element

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
					<TextButton
						title="Don't have an account? Register"
						handleClick={toggleView}
					/>
					<button onClick={toggleView}>
						Don't have an account? <span>Register</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
