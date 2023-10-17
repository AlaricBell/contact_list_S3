"use client";

import { useModalStore } from "@/store/modalStore";
import "./modal.scss";

const Modal = () => {
	const isOpen = useModalStore((state) => state.isOpen);
	const content = useModalStore((state) => state.content);

	return isOpen ? (
		<div className='modal-overlay'>
			<div className='modal-container'>
				<div className='modal-content'>{content}</div>
			</div>
		</div>
	) : null;
};

export default Modal;
