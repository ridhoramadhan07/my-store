import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import userServices from '@/services/user';
import styles from './ModalDeleteUser.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { User } from '@/types/user.type';

type propTypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};
const ModalDleleteUser = (props: propTypes) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster, session } = props;
  const [isLoading, setIsLoading] = useState(false);

  const heandleDeleteUser = async () => {
    const result = await userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    if (result.status === 200 && result.data) {
      setIsLoading(false);
      setToaster({
        variant: 'success',
        message: 'Success Delete User',
      });
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        variant: 'danger',
        message: 'Failed Delete User',
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.notif}>Are you sure ? </h1>
      <Button className={styles.notif__btn} type="button" onClick={() => heandleDeleteUser()}>
        {isLoading ? 'Loading...' : 'Delete'}
      </Button>
    </Modal>
  );
};

export default ModalDleleteUser;
