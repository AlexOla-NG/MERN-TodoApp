import React, { useState } from "react";
import { ILogin, ILoginFormData } from "../interface";
import PasswordInput from "./PasswordInput";

const Login = ({ toggleView }: ILogin) => {
	const defaultFormData: ILoginFormData = {
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState(defaultFormData);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};
	return (
		<div>
			<form>
				<fieldset>
					<legend>login</legend>
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

export default Login;
