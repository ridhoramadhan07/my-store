import { deleteData, retriveData, updateData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { decode } from 'punycode';

export default async function heandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await retriveData('users');
    const data = users.map((user: any) => {
      delete user.password;
      return user;
    });
    res.status(200).json({ status: true, ststusCode: 200, massage: 'sussces', data });
  } else if (req.method === 'PUT') {
    const { data } = req.body;
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.NEXT_AUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await updateData('users', user[1], data, (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, statusCode: 200, massage: 'sussces' });
          } else {
            res.status(400).json({ status: false, statusCode: 400, massage: 'failed' });
          }
        });
      } else {
        res.status(403).json({ status: false, statusCode: 403, massage: 'Access denied' });
      }
    });
  } else if (req.method === 'DELETE') {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.NEXT_AUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await deleteData('users', user[1], (result: boolean) => {
          if (result) {
            res.status(200).json({ status: true, statusCode: 200, massage: 'sussces' });
          } else {
            res.status(400).json({ status: false, statusCode: 400, massage: 'failed' });
          }
        });
      } else {
        res.status(403).json({ status: false, statusCode: 403, massage: 'Access denied' });
      }
    });
  }
}
