"use client";

import classNames from "classnames";
import { SidebarVariants } from "../../enums/SidebarEnum";
import BackArrowIcon from "../icons/BackArrow";
import LightModeIcon from "../icons/LightMode";
import "./sidebar.scss";

type SidebarProps = {
	variant: SidebarVariants;
};

const Sidebar = ({ variant }: SidebarProps) => {
	return (
		<section className='sidebar'>
			<div className={classNames(`sidebar-${variant}`, "sidebar-actions")}>
				{variant === SidebarVariants.Left ? (
					<BackArrowIcon />
				) : (
					<LightModeIcon />
				)}
			</div>
		</section>
	);
};

export default Sidebar;
