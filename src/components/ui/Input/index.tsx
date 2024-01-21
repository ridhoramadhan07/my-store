import styles from './Input.module.scss';

type Propstypes = {
  label?: string;
  type: string;
  name: string;
  placeholder?: string;
};

const Input = (props: Propstypes) => {
  const { label, type, name, placeholder, } = props;

  return (
    <div className={styles.container}>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} id={name} name={name} placeholder={placeholder}  className={styles.container__input} />
    </div>
  );
};

export default Input;