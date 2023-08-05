import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-circle.svg";

// TODO: stopped here
// finish setting up singleTodo
// fix ischecked status bug
// style checkbox: fix border radius of checkbox on hover

enum TodoStatus {
	active = "Active",
	completed = "Completed",
}

export type SingleTodoProps = {
	_id: string;
	title: string;
	description: string;
	status: TodoStatus;
};

const SingleTodo = ({ title, _id, description, status }: SingleTodoProps) => {
	const [isChecked, setIsChecked] = useState(
		status === TodoStatus.completed ? true : false
	);
	console.log(isChecked);

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked ? true : false);
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
				<CloseIcon />
			</div>
		</div>
	);
};

export default SingleTodo;
