import styles from './Button.module.scss';

type Buttontypes = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
  disabled?: boolean;
};

const Button = (props: Buttontypes) => {
  const { type, onClick, children, variant = 'primary', className={} ,disabled} = props;

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${styles.button} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
