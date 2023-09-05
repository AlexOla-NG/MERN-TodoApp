import React from 'react'

// TODO: stopped here
// setup custom select for filter and sort
// setup logic for filter, sort

type TodoCardListControlsProps = {
  users: string[]
}

const TodoCardListControls = ({ users }: TodoCardListControlsProps) => {
	return (
		<div className="todo-card-list-controls">
			<label htmlFor="filter">
				filter:
				<select name="filter" id="filter">
					<optgroup label="status">
						<option value="all">all</option>
						<option value="active">active</option>
						<option value="completed">completed</option>
					</optgroup>
					<optgroup label="user">
						{users?.map((user, index) => (
							<option key={index} value={user}>
								{user}
							</option>
						))}
					</optgroup>
				</select>
			</label>

			<label htmlFor="sort">
				sort:
				<select name="sort" id="sort">
					<optgroup label="title">
						<option value="asc-title">ascending</option>
						<option value="desc-title">descending</option>
					</optgroup>
					<optgroup label="time created">
						<option value="asc-time">oldest first</option>
						<option value="desc-time">newest first</option>
					</optgroup>
				</select>
			</label>
		</div>
	);
};

export default TodoCardListControls