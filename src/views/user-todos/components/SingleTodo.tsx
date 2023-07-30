import React from "react";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-circle.svg";

// TODO: stopped here
// finish setting up singleTodo
// style checkbox, p, and edit-todo

const SingleTodo = () => {
	return (
		<div className="single-todo">
			<div className="todo-wrapper">
				<label className="circular-checkbox">
					<input
						type="checkbox"
						// checked={isChecked}
						// onChange={handleCheckboxChange}
					/>
					<span className="checkmark"></span>
				</label>
				<p>Single Todo</p>
			</div>

			<div className="edit-todo">
				<CloseIcon />
			</div>
		</div>
	);
};

export default SingleTodo;
