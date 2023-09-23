import React, { ChangeEvent } from "react";

type OptionGroupSelectProps = {
	name: string;
	onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	optionsList: { label: string; value: string[] }[];
	value: string;
};

const OptionGroupSelect = ({
	name,
	onChange,
	optionsList,
	value,
}: OptionGroupSelectProps) => {
	const handleSelectOptionChange = (
		event: ChangeEvent<HTMLSelectElement>
	) => {
		onChange(event);
	};
	return (
		<div className="styled-select-container">
			<select
				name={name}
				id={name}
				onChange={handleSelectOptionChange}
				value={value}
			>
				{optionsList.map((option, index) => {
					const { label, value } = option;
					return (
						<optgroup label={label} key={index}>
							{value?.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</optgroup>
					);
				})}
			</select>
		</div>
	);
};

export default OptionGroupSelect;
