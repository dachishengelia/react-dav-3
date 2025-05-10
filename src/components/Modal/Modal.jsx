import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import ModalDelete from './ModalDelete';
import ModalStatus from './ModalStatus';
import { modalVariants } from '../../utilities/framerVariants';
import { useGlobalContext } from '../App/context';
import './Modal.css';

const Modal = () => {
    const { state, toggleModal } = useGlobalContext();
    const isDeleteModal = state.isModalOpen.name === 'delete';
    const isStatusModal = state.isModalOpen.name === 'status';
    const modalRef = useRef();
    const shouldReduceMotion = useReducedMotion();
    const variant = (element) => {
        return shouldReduceMotion
            ? modalVariants.reduced
            : modalVariants[element];
    };
    const containerVariant = variant('container');

    const focusTrap = (event) => {
        if (event.key === 'Escape') toggleModal();
        if (event.key !== 'Tab') return;

        const modalElements = modalRef.current.querySelectorAll('button');
        const firstElement = modalElements[0];
        const lastElement = modalElements[modalElements.length - 1];

        if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
        }

        if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
        }
    };

    const handleClickOutsideModal = (event) => {
        const target = event.target;
        if (target === modalRef.current) toggleModal();
    };

    useEffect(() => {
        document.addEventListener('keydown', focusTrap);
        document.addEventListener('click', handleClickOutsideModal);
        modalRef.current.focus();
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', focusTrap);
            document.removeEventListener('click', handleClickOutsideModal);
            document.body.style.overflow = 'unset';
        };
    }, []);

    const modal = (
        <StyledModal
            aria-modal
            aria-label="Confirmation"
            tabIndex={-1}
            role="dialog"
            ref={modalRef}
            variants={variant('modal')}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {isDeleteModal && <ModalDelete variants={containerVariant} />}
            {isStatusModal && <ModalStatus variants={containerVariant} />}
        </StyledModal>
    );

    return ReactDOM.createPortal(modal, document.body);
};

export default Modal;
