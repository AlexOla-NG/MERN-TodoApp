import React, { ChangeEvent } from 'react'

// TODO: create custom select component for filter & sort
// @params onChange handler, value, optionsList(array of object, eg [{label = {[items, items, ...]}}, {label = {[items, items, ...]}},...]) props

type TodoCardListControlsProps = {
	users: string[];
	handleFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	filterOption: string;
	sortOption: string;
};

const TodoCardListControls = ({
	users,
	handleFilterChange,
	handleSortChange,
	filterOption,
	sortOption
}: TodoCardListControlsProps) => {

	/**
	 * handler for filter control
	 * @date 12/09/2023 - 21:08:03
	 *
	 * @param {ChangeEvent<HTMLSelectElement>} event
	 */
	const handleFilterOptionChange = (
		event: ChangeEvent<HTMLSelectElement>
	) => {
		console.log("selected option here:", event.target.value);
		handleFilterChange(event);
	};

	/**
	 * handler for sort control
	 * @date 12/09/2023 - 21:08:03
	 *
	 * @param {ChangeEvent<HTMLSelectElement>} event
	 */
	const handleSortOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
		console.log("selected option here:", event.target.value);
		handleSortChange(event);
	};

	return (
		<div className="todo-card-list-controls">
			<label htmlFor="filter">
				filter:
				<div className="styled-select-container">
					<select
						name="filter"
						id="filter"
						onChange={handleFilterOptionChange}
						value={filterOption}
					>
						<optgroup label="status">
							<option value="all">
								all
							</option>
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
				<div className="styled-select-container">
					<select
						name="sort"
						id="sort"
						onChange={handleSortOptionChange}
						value={sortOption}
					>
						<optgroup label="title">
							<option value="asc-title">ascending</option>
							<option value="desc-title">descending</option>
						</optgroup>
						<optgroup label="time created">
							<option value="asc-time">oldest first</option>
							<option value="desc-time">newest first</option>
						</optgroup>
					</select>
				</div>
			</label>
		</div>
	);
};

export default TodoCardListControls