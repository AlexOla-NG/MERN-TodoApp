import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-circle.svg";
import { updateTodoType } from "../../../hooks/user-todos";

// TODO: stopped here
// finish setting up singleTodo
// b: style checkbox: fix border radius of checkbox on hover
// c: add loading state for updating and deleting todos.

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
};

const SingleTodo = ({
	title,
	_id,
	description,
	status,
	deleteTodo,
	updateTodo
}: SingleTodoProps) => {
	const [isChecked, setIsChecked] = useState(
		status === TodoStatus.completed ? true : false
	);

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked ? true : false);
		updateTodo({
			_id,
			status: e.target.checked
				? TodoStatus.completed
				: TodoStatus.active,
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
					/>
					<span className="checkmark"></span>
				</label>
				<p>{title}</p>
			</div>

			<div className="edit-todo">
				<CloseIcon onClick={handleDelete} />
			</div>
		</div>
	);
};

export default SingleTodo;
