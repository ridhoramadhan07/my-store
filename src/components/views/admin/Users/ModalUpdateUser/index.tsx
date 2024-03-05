import Button from '@/components/ui/Button';
import styles from './ModalUpdateUser.module.scss';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import userServices from '@/services/user';
import { useSession } from 'next-auth/react';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { User } from '@/types/user.type';

type propTypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ModalUpdateUser = (props: propTypes) => {
  const { updatedUser, setUpdatedUser, setUsersData, setToaster, session } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState('');

  const heandleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError('');
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(updatedUser.id, data, session.data?.accessToken);
    if (result.status === 200 && result.data) {
      setIsLoading(false);
      setUpdatedUser({});
      setToaster({
        variant: 'success',
        message: 'Success Update User',
      });
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: 'danger',
        message: 'Failed Update User',
      });
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={heandleUpdateUser}>
        <Input type="email" label="Email" name="email" defaultValue={updatedUser.email} disabled />
        <Input type="fullname" label="Fullname" name="fullname" defaultValue={updatedUser.fullname} disabled />
        <Input type="phone" label="Phone" name="phone" defaultValue={updatedUser.phone} disabled />
        <Select
          name="role"
          label="Role"
          defaultValue={updatedUser.role}
          disabled
          options={[
            { label: 'Member', value: 'member' },
            { label: 'Admin', value: 'admin' },
          ]}
        />
        <Button className={styles.notif__btn} type="submit">
          {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
