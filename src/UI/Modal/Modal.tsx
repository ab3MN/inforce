import React, { useRef, useEffect, FC } from 'react';
import style from './Modal.module.css';

interface IModalProps {
  children: React.ReactNode;
  width: string;
  onClose: () => void;
}

const Modal: FC<IModalProps> = props => {
  const { children, width, onClose } = props;
  const backdropRef: React.RefObject<HTMLInputElement> = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent): void => {
      if (e.code !== 'Escape') return;

      onClose();
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const { current } = backdropRef;

    if (current && e.target !== current) {
      return;
    }

    onClose();
  };

  return (
    <div
      className={style.backdrop}
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className={style.modal} style={{ width }}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
