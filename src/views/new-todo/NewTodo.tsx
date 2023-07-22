import React, { FormEvent, useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Button from "../../components/button/Button";
import { getStoredUser } from "../../storage";

// TODO: stopped here
// change status input to select

const NewTodo = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "",
		user: getStoredUser(),
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		// mutate(formData);
	};
	return (
		<AnimatedWrapper className="create-todo">
			<h2>create todo </h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">
					title
					<input
						type="text"
						id="title"
						name="title"
						onChange={handleChange}
						required
					/>
				</label>
				<label htmlFor="description">
					description
					<textarea
						name="description"
						id="description"
						onChange={handleChange}
						required
						rows={5}
						cols={50}
					/>
				</label>
				<label htmlFor="status">
					status
					<input
						type="text"
						id="status"
						name="status"
						onChange={handleChange}
						required
					/>
				</label>
				<Button title="submit" type="submit" />
			</form>
		</AnimatedWrapper>
	);
};

export default NewTodo;
