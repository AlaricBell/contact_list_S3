"use client";

import { ChangeEvent, useState } from "react";
import "./textInput.scss";

type InputProps = {
	placeholder?: string;
	label?: string;
	value: string;
	onChange: (value: string) => void;
};

const TextInput = ({
	value,
	onChange,
	placeholder = "",
	label = "",
}: InputProps) => {
	return (
		<div className='input-group'>
			<label className='input-label'>{label}</label>
			<input
				className='input-text'
				type='text'
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default TextInput;
