import styles from './Input.module.scss';

type Propstypes = {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e : any) => void;
};

const Input = (props: Propstypes) => {
  const { label, type, name, placeholder, defaultValue, disabled, onChange } = props;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} id={name} name={name} placeholder={placeholder} defaultValue={defaultValue} disabled={disabled} className={styles.container__input} onChange={onChange} />
    </div>
  );
};

export default Input;
