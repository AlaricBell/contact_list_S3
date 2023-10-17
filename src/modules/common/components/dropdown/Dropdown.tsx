"use client";

import "./dropdown.scss";

type OptionProps = {
	icon: React.ReactNode;
	text: string;
	action: () => void;
};

type DropdownProps = {
	options: OptionProps[];
	isVisible: boolean;
};

const Dropdown = ({ options, isVisible }: DropdownProps) => {
	return isVisible ? (
		<ul className='dropdown'>
			{options.map((option, index) => (
				<li
					className='dropdown-option'
					key={index}
					onClick={() => option.action()}
				>
					<span className='dropdown-icon'>{option.icon}</span> {option.text}
				</li>
			))}
		</ul>
	) : null;
};

export default Dropdown;
