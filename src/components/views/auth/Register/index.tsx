import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import authServices from '@/services/auth';
import AuthLayout from '@/components/layouts/AuthLayout';
import styles from './Register.module.scss'

const RegisterView = ({setToaster}: {setToaster: Dispatch<SetStateAction<{}>>;}) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const heandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };
    try{
      const result = await authServices.registerAccount(data)  ;
      if (result.status === 200 && result.data) {
        form.reset();
        setIsLoading(false);
        push('/auth/login');
        setToaster ({
          variant: 'success',
          message: 'Register Success',
        })
      } else {
        setIsLoading(false);
        setToaster({
          variant: 'danger',
          message: 'Email is already taken',
        });
      }
    }catch(error){
      setIsLoading(false);
      setToaster({
        variant: 'danger',
        message: 'Email is already taken',
      });
    }

  };

  return (
    <AuthLayout setToaster={setToaster} title="Register" link="/auth/login" linkText="Already have an account? ">
      <form onSubmit={heandleSubmit}>
        <Input type="fullname" label="Fullname" name="fullname" />
        <Input type="email" label="Email" name="email" />
        <Input type="phone" label="Phone" name="phone" />
        <Input type="password" label="Password" name="password" />
        <Button className={styles.register__btn} type="submit">{isLoading ? 'Loading...' : 'Register'}</Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
