import React, { useState, ChangeEvent } from "react";

interface SelectProps {
	options: string[];
	updateFormData: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, updateFormData }) => {
	const [selectedOption, setSelectedOption] = useState<string>("");

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value);
		updateFormData(event.target.value);
	};

	return (
		<div className="styled-select-container">
			<select onChange={handleSelectChange} value={selectedOption}>
				<option value="" disabled hidden>
					Select an option
				</option>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
