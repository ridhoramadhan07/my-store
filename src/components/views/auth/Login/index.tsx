import Link from 'next/link';
import styles from './Login.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

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
            <Input type={"email"} name={"email"} label={"email"} placeholder=''/>
            <Input type={"password"} name={"password"} label={"password"} placeholder=''/>
            <Button type='submit'>{isLoading ? "Loading..." : "Login"}</Button>
          </form>
          <hr className={styles.login__hr} />
          <div className={styles.login__withgoole}>
            <p>Or login with</p>
          </div>
          <div className={styles.login__google}>
            <button className={styles.login__google__button}><i className='bx bxl-facebook-circle'></i>Facebook</button>
            <button type='button' onClick={() => signIn('google',{callbackUrl, redirect:false})} className={styles.login__google__button}><i className='bx bxl-google'></i>Google</button>
          </div>
        </div>
        <p className={styles.login__link}>
          Don{"'"}t have an account? Sign Up <Link href="/auth/register">here</Link>
        </p>
      </div>
    </main>);
}

export default LoginView;
