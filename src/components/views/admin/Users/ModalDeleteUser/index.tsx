import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import userServices from '@/services/user';
import styles from './ModalDeleteUser.module.scss';
import { useState } from 'react';
const ModalDleleteUser = (props: any) => {
  const { deletedUser, setDeletedUser ,setUsersData} = props;
  const [isLoading, setIsLoading] = useState(false);

  const heandleDeleteUser = async() => {
    userServices.deleteUser(deletedUser.id);
    setIsLoading(true);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  }
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.notif}>Are you sure ? </h1>
      <Button
        className={styles.notif__btn}
        type="button"
        onClick={() => heandleDeleteUser()}
      >
        {isLoading ? 'Loading...' : 'Delete'}
      </Button>
    </Modal>
  );
};

export default ModalDleleteUser;
