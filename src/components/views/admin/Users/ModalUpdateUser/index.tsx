import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import userServices from '@/services/user';
import { FormEvent, useEffect, useState } from 'react';

const ModalUpdateUser = (props: any) => {

  const { updatedUser, setUpdatedUser , setUsersData} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState('');

  
  const heandleUpdateUser =  async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setIsError('');
        const form:any= event.target as HTMLFormElement;
        const data = {
          
          role: form.role.value,
        };
    
        const result = await userServices.updateUser(updatedUser.id,data);
        console.log(result);
        if (result.status === 200 && result.data) {
          setIsLoading(false);
          setUpdatedUser({});
          const {data} = await userServices.getAllUsers()
          setUsersData(data.data)
        } else {
          setIsLoading(false);
        }
      };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={heandleUpdateUser}>
      <Input type="email" label="Email" name="email" defaultValue={updatedUser.email} disabled/>
      <Input type="fullname" label="Fullname" name="fullname" defaultValue={updatedUser.fullname} disabled/>
      <Input type="phone" label="Phone" name="phone" defaultValue={updatedUser.phone} disabled/>
      <Select name="role" label="Role"  defaultValue={updatedUser.role} disabled options={[
        {label : "Member", value : "member"},
        {label : "Admin", value : "admin"},
      ]} />
      <Button type='submit'>
        {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
