import { Dispatch, useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

const Modal = ({ children,onClose }: { children: React.ReactNode , onClose:any}) => {
    const ref:any= useRef();
    useEffect(()=> {
        const heandleClickOutside = (e: MouseEvent) => {
            if(ref.current && !ref.current.contains(e.target)){
                onClose();
            }
        };
        document.addEventListener('mousedown',heandleClickOutside);
        return () => document.removeEventListener('mousedown',heandleClickOutside);
    },[onClose])
  return (
    <div className={styles.modal}>
      <div className={styles.modal__main} ref={ref}>{children}</div>
    </div>
  );
};

export default Modal;
