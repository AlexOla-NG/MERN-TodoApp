import React, { FormEvent, useEffect, useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import { getStoredUser } from "../../storage";
import { useGetStatusOptions } from "../../hooks/new-todo";

// TODO: stopped here
// test form submission

const NewTodo = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "",
		user: getStoredUser(),
	});
	const [statusOptions, setStatusOptions] = useState(['']);
	const {data, isSuccess} = useGetStatusOptions();

	// STUB: get & set status options
	useEffect(() => {
		if (isSuccess) {
			setStatusOptions(data);
		}
	}, [data, isSuccess]);
	

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
					<Select options={statusOptions} />
				</label>
				<Button title="submit" type="submit" />
			</form>
		</AnimatedWrapper>
	);
};

export default NewTodo;
