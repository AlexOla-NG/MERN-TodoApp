import React, { useState, ChangeEvent, useEffect } from "react";

interface SelectProps {
	options: string[];
	updateFormData: (value: string) => void;
	isMutationSuccess: boolean;
}

const Select: React.FC<SelectProps> = ({
	options,
	updateFormData,
	isMutationSuccess,
}) => {
	const [selectedOption, setSelectedOption] = useState<string>("");

	useEffect(() => {
		if(isMutationSuccess) setSelectedOption("");
		
	}, [isMutationSuccess]);
	

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value);
		updateFormData(event.target.value);
	};

	return (
		<div className="styled-select-container">
			<select onChange={handleSelectChange} value={selectedOption} required>
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
