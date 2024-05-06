import styles from './Select.module.scss';

type Option = {
  label: string;
  value: string;
  selected?: boolean;
};

type propTypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[] | undefined;
  className?: string;
};

const Select = (props: propTypes) => {
  const { label, name, defaultValue, disabled = false, options = [], className } = props;

  return (
    <div className={`${styles.container} ${className}`}>
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} defaultValue={defaultValue} className={styles.container__select}>
        {options && options.map((option: Option) => (
          <option key={option.label} value={option.value} selected={option.selected}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;