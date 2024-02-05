import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import authServices from '@/services/auth';
import AuthLayout from '@/components/layouts/AuthLayout';

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState('');

  const heandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError('');
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authServices.registerAccount(data);

    if (result.status === 200 && result.data) {
      form.reset();
      setIsError('');
      setIsLoading(false);
      push('/auth/login');
    } else {
      setIsLoading(false);
      setIsError('Email is already taken');
      console.log('Error');
    }
  };

  return (
    <AuthLayout error={error ? error : '' } title="Register" link="/auth/login" linkText="Already have an account? ">
      <form onSubmit={heandleSubmit}>
        <Input type="fullname" label="Fullname" name="fullname" />
        <Input type="email" label="Email" name="email" />
        <Input type="phone" label="Phone" name="phone" />
        <Input type="password" label="Password" name="password" />
        <Button type="submit">{isLoading ? 'Loading...' : 'Register'}</Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
