import Link from 'next/link';
import styles from './Login.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState('');
  const {push , query} = useRouter();
  const callbackUrl:any = query.callbackUrl || '/';
  const heandleSubmit = async  (event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect:false,
        email:form.email.value,
        password:form.password.value,
        callbackUrl
      })
      if(!res?.error){
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      }else {
        setIsLoading(false);
        setError("Email or password is incorect");
      }
    }catch(error) {
      setIsLoading(false);
      setError("Email or password is incorect");
    }
  };




  return (
    <main>
      <div className={styles.login}>
        <h1 className={styles.login__title}>Login</h1>
        {error && <p className={styles.login__error}>{error}</p>}
        <div className={styles.login__form}>
          <form onSubmit={heandleSubmit}>
            <div className={styles.login__form__item}>
              <label htmlFor="email">Email</label>
              <input type="email" id='email' name="email" placeholder="" className={styles.login__form__item__input} />
            </div>
            <div className={styles.login__form__item}>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' name="password" placeholder="" className={styles.login__form__item__input} />
            </div>
            <button type='submit' className={styles.login__form__button}>
              {isLoading ? "Loading..." : "login"}
              </button>
          </form>
        </div>
        <p className={styles.login__link}>
          Don{"'"}t have an account? Sign Up <Link href="/auth/register">here</Link>
        </p>
      </div>
    </main>);
}

export default LoginView;
