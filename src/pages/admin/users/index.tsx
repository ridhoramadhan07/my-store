import UsersAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminUsersPage = () => {
  const [users , setUser] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
    const {data} = await userServices.getAllUsers();
    setUser(data.data);
    }
    getAllUsers();
  },[]);
  return (
    <>
      <UsersAdminView users = {users}/>
    </>
  );
};

export default AdminUsersPage;
