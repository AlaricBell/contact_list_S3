"use client";

const AddIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{ cursor: "pointer" }}
			{...props}
		>
			<path
				d='M11.25 18.75V12.75H5.25V11.25H11.25V5.25H12.75V11.25H18.75V12.75H12.75V18.75H11.25Z'
				fill='white'
			/>
		</svg>
	);
};

export default AddIcon;