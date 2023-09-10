import React, { ChangeEvent, useState } from 'react'

// TODO: stopped here
// setup custom select for filter and sort
// setup logic for filter, sort

type TodoCardListControlsProps = {
	users: string[];
	filterData: (option: string) => void;
};

const TodoCardListControls = ({
	users,
	filterData,
}: TodoCardListControlsProps) => {
	const [selectedOption, setSelectedOption] = useState("");

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		console.log("selected option here:", event.target.value);
		setSelectedOption(event.target.value);
		filterData(event.target.value);
	};

	return (
		<div className="todo-card-list-controls">
			<label htmlFor="filter">
				filter:
				<div className="styled-select-container">
					<select
						name="filter"
						id="filter"
						onChange={handleSelectChange}
						value={selectedOption}
					>
						<option value="" disabled hidden>
							Select an option
						</option>
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
				</div>
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