import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import { retriveDataById, updateData } from '@/lib/firebase/service';
import { compare, hash } from 'bcrypt';
import { decode } from 'punycode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.NEXT_AUTH_SECRET || '', async (err: any, decoded: any) => {
        if (decoded) {
          const profile: any = await retriveDataById('users', decoded.id);
          if (profile) {
            profile.id = decoded.id;
            res.status(200).json({ status: true, statusCode: 200, massage: 'success', data: profile });
          } else {
            return res.status(404).json({ status: false, statusCode: 404, massage: 'data not found', data: {} });
          }
        }
      });
    } else {
      res.status(403).json({ status: false, statusCode: 404, massage: 'Access Denied', data: {} });
    }
  } else if (req.method === 'PUT') {
    const { user }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.NEXT_AUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded) {
        if (data.password) {
          const passwordConfirm = await compare(data.oldPassword, data.encryptedPassword);
          if (!passwordConfirm ) {
            res.status(400).json({ status: false, statusCode: 400, massage: 'failed' });
          }
          delete data.oldPassword;
          delete data.encryptedPassword;
          data.password = await hash(data.password, 10);
        }
        await updateData('users', decoded.id, data, (result: boolean) => {
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
