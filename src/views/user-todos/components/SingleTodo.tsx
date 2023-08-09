import React, { useState } from "react";
import { updateTodoType } from "../../../hooks/user-todos";
import TextButton from "../../../components/button/TextButton";

// TODO: stopped here
// finish setting up singleTodo
// b: style checkbox: fix border radius of checkbox on hover
// c: refactor SingleTodoProps

enum TodoStatus {
	active = "active",
	completed = "completed",
}

export type SingleTodoProps = {
	_id: string;
	title: string;
	description: string;
	status: TodoStatus;
	deleteTodo: (id: string) => void;
	updateTodo: (todoData: updateTodoType) => void;
	deleteLoading: boolean;
	updateLoading: boolean;
};

const SingleTodo = ({
	title,
	_id,
	description,
	status,
	deleteTodo,
	updateTodo,
	deleteLoading,
	updateLoading,
}: SingleTodoProps) => {
	const [isChecked, setIsChecked] = useState(
		status === TodoStatus.completed ? true : false
	);

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked ? true : false);
		updateTodo({
			_id,
			status: e.target.checked ? TodoStatus.completed : TodoStatus.active,
		});
	};

	const handleDelete = () => {
		deleteTodo(_id);
	};

	return (
		<div className="single-todo">
			<div className="todo-wrapper">
				<label className="circular-checkbox">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={handleCheckboxChange}
						disabled={updateLoading || deleteLoading}
					/>
					<span className="checkmark"></span>
				</label>
				<p>{title}</p>
			</div>

			<div className="edit-todo">
				<TextButton
					title="X"
					handleClick={handleDelete}
					disabled={updateLoading || deleteLoading}
				/>
			</div>
		</div>
	);
};

export default SingleTodo;
