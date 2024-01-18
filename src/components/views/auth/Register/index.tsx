import Link from 'next/link';
import styles from './Register.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState('');
  const {push} = useRouter();
  const heandleSubmit = async  (event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    const result = await fetch('/api/user/register', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(result.status === 200) {
     form.reset();
     setIsLoading(false);
     push('/auth/login')
    }else { 
      setIsLoading(false);
      setError("Email is already registered");
    }
  };



  return (
    <main>
      <div className={styles.register}>
        <h1 className={styles.register__title}>Register</h1>
        {error && <p className={styles.register__error}>{error}</p>}
        <div className={styles.register__form}>
          <form onSubmit={heandleSubmit}>
            <div className={styles.register__form__item}>
              <label htmlFor="fullname">Fullname</label>
              <input type="text" id='fullname' name="fullname" placeholder="" className={styles.register__form__item__input} />
            </div>
            <div className={styles.register__form__item}>
              <label htmlFor="email">Email</label>
              <input type="email" id='email' name="email" placeholder="" className={styles.register__form__item__input} />
            </div>
            <div className={styles.register__form__item}>
              <label htmlFor="phone">Phone</label>
              <input type="number" id='phone' name="phone" placeholder="" className={styles.register__form__item__input} />
            </div>
            <div className={styles.register__form__item}>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' name="password" placeholder="" className={styles.register__form__item__input} />
            </div>
            <button type='submit' className={styles.register__form__button}>
              {isLoading ? "Loading..." : "Register"}
              </button>
          </form>
        </div>
        <p className={styles.register__link}>
          have an account? Sign in <Link href="/auth/login">here</Link>
        </p>
      </div>
    </main>);
}

export default RegisterView;
