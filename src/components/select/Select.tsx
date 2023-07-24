import React, { useState, ChangeEvent } from "react";
import { ReactComponent as ChevronDown } from "../../assets/svg/chevron-down.svg";

// TODO: stopped here
// fix ReactComponent error

interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	options: Option[];
}

const Select: React.FC<SelectProps> = ({ options }) => {
	const [selectedOption, setSelectedOption] = useState<string>("");

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value);
	};

	return (
		<div className="styled-select-container">
			<select
				className="styled-select"
				onChange={handleSelectChange}
				value={selectedOption}
			>
				<option value="" disabled hidden>
					Select an option
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
				<ChevronDown className="chevron-down" />
			</select>
		</div>
	);
};

export default Select;
