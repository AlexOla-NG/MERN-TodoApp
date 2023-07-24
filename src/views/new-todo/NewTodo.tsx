import React, { FormEvent, useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Button from "../../components/button/Button";
import { getStoredUser } from "../../storage";
import Select from "../../components/select/Select";

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

	const dummyOptions = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
		{ value: "option4", label: "Option 4" },
	];

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
					<Select options={dummyOptions} />
				</label>
				<Button title="submit" type="submit" />
			</form>
		</AnimatedWrapper>
	);
};

export default NewTodo;
