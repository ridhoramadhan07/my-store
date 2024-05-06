import instance from '@/lib/axios/instance';


const endPointUser = '/api/user';
const endPointProfile = '/api/user/profile';
const endPointCart = '/api/user/cart';


const userServices = {
  getAllUsers: () => instance.get(`${endPointUser}`),
  updateUser: (id: string, data: any) => instance.put(`${endPointUser}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endPointUser}/${id}`, {}),
  getProfile: () => instance.get(`${endPointProfile}`, {}),
  updateProfile: (data: any) => instance.put(`${endPointProfile}`, { data }),
  getCart: () => instance.get(`${endPointCart}`, {}),
  addToCart: (data: any) => instance.put(`${endPointCart}`, { data }),
};

export default userServices;
