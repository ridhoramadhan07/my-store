import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ModalUpdateUser from './ModalUpdateUser';
import ModalDleleteUser from './ModalDeleteUser';
import styles from './Users.module.scss';
import { useSession } from 'next-auth/react';
import { User } from '@/types/user.type';

type Propstypes = {
  users: User[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const UsersAdminView = (props: Propstypes) => {
  const session: any = useSession();

  const [usersData, setUsersData] = useState<User[]>([]);
  const { users, setToaster } = props;
  const [updatedUser, setUpdatedUser] = useState<User[] | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>({});
  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h1 className={styles.title}>User Management</h1>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: User, index: number) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className={styles.users__table__action}>
                      <Button className={styles.users__table__action__edit} type="button" onClick={() => setUpdatedUser(user)}>
                        <i className="bx bxs-edit " />
                      </Button>
                      <Button type="button" className={styles.users__table__action__delete} onClick={() => setDeletedUser(user)}>
                        <i className="bx bxs-trash" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length > 0 && <ModalUpdateUser updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} setUsersData={setUsersData} setToaster={setToaster} />}
      {Object.keys(deletedUser).length > 0 && <ModalDleleteUser deletedUser={deletedUser} setDeletedUser={setDeletedUser} setUsersData={setUsersData} setToaster={setToaster} />}
    </>
  );
};

export default UsersAdminView;
