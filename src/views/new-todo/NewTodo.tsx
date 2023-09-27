import React, { FormEvent, useEffect, useState } from "react";
import AnimatedWrapper from "../../routes/AnimatedWrapper";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import { UserID, getStoredUser } from "../../storage";
import { useAddTodo, useGetStatusOptions } from "../../hooks/new-todo";

type FormState = {
	title: string;
	description: string;
	status: string;
	user: UserID | undefined;
}

const NewTodo = () => {
	const defaultFormState = {
		title: "",
		description: "",
		status: "",
		user: getStoredUser(),
	};
	const [formData, setFormData] = useState<FormState>(defaultFormState);
	const [statusOptions, setStatusOptions] = useState(['']);
	const {data, isSuccess} = useGetStatusOptions();
	const {mutate, isSuccess: isMutationSuccess} = useAddTodo();

	// STUB: get & set status options
	useEffect(() => {
		if (isSuccess) {
			setStatusOptions(data);
		}
	}, [data, isSuccess]);
	
	// STUB: reset form state on success
	useEffect(() => {
		if (isMutationSuccess) {
			setFormData(defaultFormState);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMutationSuccess]);
	

	const handleChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	// STUB: get status from select component
	const updateFormData = (status: string) => {
		setFormData({ ...formData, status });
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		mutate(formData);
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
						value={formData.title}
						required
					/>
				</label>
				<label htmlFor="description">
					description
					<textarea
						name="description"
						id="description"
						onChange={handleChange}
						value={formData.description}
						rows={5}
						cols={50}
					/>
				</label>
				<label>
					status
					<Select
						options={statusOptions}
						updateFormData={updateFormData}
						isMutationSuccess={isMutationSuccess}
					/>
				</label>
				<Button title="submit" type="submit" />
			</form>
		</AnimatedWrapper>
	);
};

export default NewTodo;
