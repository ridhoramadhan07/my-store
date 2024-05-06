import { Product } from './../../../types/product.type';
import { addData, deleteData, retriveData, retriveDataById, updateData } from '@/lib/firebase/service';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function heandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { product }: any = req.query;
    if(product && product[0]) {
      const data = await retriveDataById('products', product[0]);
      res.status(200).json({ status: true, statusCode: 200, massage: 'sussces', data });
    }else {
      const data = await retriveData('products');
      res.status(200).json({ status: true, statusCode: 200, massage: 'sussces', data });
    }
  } else if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.NEXT_AUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        let data = req.body;
        data.created_at = new Date();
        data.updated_at = new Date();
        data.price = parseInt(data.price);
        data.stock.filter((stock: any) => {
          stock.qty = parseInt(stock.qty);
        });
        await addData('products', data, (status: boolean, result: any) => {
          if (status) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              massage: 'success',
              data: { id: result.id },
            });
          } else {
            res.status(400).json({
              status: false,
              statusCode: 400,
              massage: 'failed',
              data: {},
            });
          }
        });
      } else {
        res.status(403).json({
          status: false,
          statusCode: 403,
          massage: 'Access Dinied',
        });
      }
    });
  } else if (req.method === 'PUT') {
    const { product }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.NEXT_AUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await updateData('products', product[0], data, (status: boolean) => {
          if (status) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              massage: 'success',
            });
          } else {
            res.status(400).json({
              status: false,
              statusCode: 400,
              massage: 'failed',
            });
          }
        });
      } else {
        res.status(403).json({
          status: false,
          statusCode: 403,
          massage: 'Access Dinied',
        });
      }
    });
  } else if (req.method === 'DELETE') {
    const { product }: any = req.query;
    const token = req.headers.authorization?.split(' ')[1] || '';
    jwt.verify(token, process.env.NEXT_AUTH_SECRET || '', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await deleteData('products', product[0], (status: boolean) => {
          if (status) {
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
