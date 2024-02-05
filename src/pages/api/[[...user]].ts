import { deleteData, retriveData, updateData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function heandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await retriveData('users');
    const data = users.map((user : any) => {
        delete user.password;
        return user;
    })
    res.status(200).json({ status: true, ststusCode: 200, massage: 'sussces', data });
  }
  else if (req.method === 'PUT') {
    const {id , data } = req.body;
    await updateData('users', id,data , (result : boolean)=> {
      if(result) {
        res.status (200).json({status : true ,statusCode : 200 ,massage : 'sussces'});
      }else {
        res.status(400).json({status : false ,statusCode : 400 ,massage : 'failed'});
      };
    })
  }
  else if (req.method === 'DELETE') {
    const { user }: any= req.query;
    await deleteData('users', user[1] , (result : boolean)=> {
      if(result) {
        res.status (200).json({status : true ,statusCode : 200 ,massage : 'sussces'});
      }else {
        res.status(400).json({status : false ,statusCode : 400 ,massage : 'failed'});
      };
    })
  }
}
