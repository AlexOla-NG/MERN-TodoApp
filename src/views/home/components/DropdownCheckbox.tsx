import React, { useState, useEffect, useRef } from "react";
// import "./DropdownCheckboxes.css";

interface DropdownCheckboxesProps {
	options: string[];
}

const DropdownCheckboxes: React.FC<DropdownCheckboxesProps> = ({ options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValues, setSelectedValues] = useState<Set<string>>(
		new Set()
	);
	const labelRef = useRef<HTMLLabelElement | null>(null);
	const inputsRef = useRef<HTMLInputElement[]>([]);

	useEffect(() => {
		const handleDocumentClick = (e: MouseEvent) => {
			if (
				!e.target ||
				!(e.target as HTMLElement).closest(
					'[data-control="checkbox-dropdown"]'
				)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleDocumentClick);
		return () => {
			document.removeEventListener("click", handleDocumentClick);
		};
	}, []);

	const toggleOpen = (forceOpen?: boolean) => {
		setIsOpen(forceOpen !== undefined ? forceOpen : !isOpen);
	};

	const updateStatus = () => {
		const checked = Array.from(selectedValues);
		const label = labelRef.current;
		if (!label) return;

		if (checked.length <= 0) {
			label.innerHTML = "Select Options";
		} else if (checked.length === 1) {
			label.innerHTML = checked[0];
		} else if (checked.length === inputsRef.current.length) {
			label.innerHTML = "All Selected";
		} else {
			label.innerHTML = `${checked.length} Selected`;
		}
	};

	const handleCheckBoxChange = () => {
		updateStatus();
	};

	const handleCheckAllClick = () => {
		const checkAll = !isOpen || !selectedValues.size;
		if (checkAll) {
			options.forEach((option) => selectedValues.add(option));
		} else {
			selectedValues.clear();
		}
		setIsOpen(checkAll);
		updateStatus();
	};

	return (
		<div
			className={`dropdown ${isOpen ? "on" : ""}`}
			data-control="checkbox-dropdown"
		>
			<label
				className="dropdown-label"
				ref={labelRef}
				onClick={() => toggleOpen()}
			>
				Select
			</label>

			<div className="dropdown-list">
				<a
					href="#"
					data-toggle="check-all"
					className="dropdown-option"
					onClick={handleCheckAllClick}
				>
					{isOpen || !selectedValues.size
						? "Check All"
						: "Uncheck All"}
				</a>

				{options.map((option, index) => (
					<label className="dropdown-option" key={index}>
						<input
							type="checkbox"
							name="dropdown-group"
							value={option}
							onChange={handleCheckBoxChange}
							ref={(input) => {
								if (input) inputsRef.current[index] = input;
							}}
						/>
						{option}
					</label>
				))}
			</div>
		</div>
	);
};

export default DropdownCheckboxes;
