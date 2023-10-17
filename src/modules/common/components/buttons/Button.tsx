"use client";

import classNames from "classnames";
import AddIcon from "../icons/Add";
import { ButtonVariants, ButtonTypes } from "../../enums/buttonEnum";
import "./button.scss";

type ButtonProps = {
	onClick: () => void;
	className?: string;
	text?: string;
	variant?: ButtonVariants;
	type?: ButtonTypes;
	icon?: React.ReactNode;
};

const Button = ({
	onClick,
	text = "",
	type = ButtonTypes.Text,
	variant = ButtonVariants.Primary,
	icon = <AddIcon className='btn-icon' />,
	className = "",
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={classNames(`btn-${variant} btn-${type}`, "btn", className)}
		>
			{type !== ButtonTypes.Text ? icon : null}
			{type !== ButtonTypes.Icon ? text : null}
		</button>
	);
};

export default Button;
