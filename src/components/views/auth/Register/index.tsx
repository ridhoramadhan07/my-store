import Link from 'next/link';
import styles from './Register.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const RegisterView = () => {
  const {push} = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [Error , setIsError] = useState('');

  const heandleSubmit = async  (event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setIsLoading(true)
    setIsError('');
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
     setIsError('');
     setIsLoading(false)
     push('/auth/login')
    }else { 
      setIsLoading(false)
      setIsError('Email is already taken');
      console.log("Error");
    }
  };

  return (
    <main>
      <div className={styles.register}>
        <h1 className={styles.register__title}>Register</h1>
        {Error && <p className={styles.register__error}>{Error}</p>}
        <div className={styles.register__form}>
          <form onSubmit={heandleSubmit}>
            <Input type="fullname" label="Fullname" name="fullname" />
            <Input type="email" label="Email" name="email"/>
            <Input type="phone" label="Phone" name="phone"/>
            <Input type="password" label="Password" name="password"/>
            <Button type='submit'>{isLoading? "Loading..." : "Register"}</Button>
          </form>
        </div>
        <p className={styles.register__link}>
          have an account? Sign in <Link href="/auth/login">here</Link>
        </p>
      </div>
    </main>);
}

export default RegisterView;
