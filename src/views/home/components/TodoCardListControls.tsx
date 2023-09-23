import React, { ChangeEvent } from "react";
import OptionGroupSelect from "./OptionGroupSelect";

type TodoCardListControlsProps = {
	handleFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	handleSortChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	filterOption: string;
	sortOption: string;
	status: string[];
	users: string[];
};

const TodoCardListControls = ({
	handleFilterChange,
	handleSortChange,
	filterOption,
	sortOption,
	status,
	users,
}: TodoCardListControlsProps) => {
	
	// STUB: filter & sort options
	const filterOptions = [
		{ label: "status", value: status },
		{ label: "user", value: users },
	];

	const sortOptions = [
		{ label: "title", value: ["ascending", "descending"] },
		{ label: "time created", value: ["oldest first", "newest first"] },
	];

	return (
		<div className="todo-card-list-controls">
			<label htmlFor="filter">
				filter:
				<OptionGroupSelect
					name="filter"
					onChange={handleFilterChange}
					optionsList={filterOptions}
					value={filterOption}
				/>
			</label>

			<label htmlFor="sort">
				sort:
				<OptionGroupSelect
					name="sort"
					onChange={handleSortChange}
					optionsList={sortOptions}
					value={sortOption}
				/>
			</label>
		</div>
	);
};

export default TodoCardListControls;
