import { signUP } from '@/services/auth/services';
import type { NextApiRequest, NextApiResponse } from 'next';

export  default async function handler(req:NextApiRequest , res:NextApiResponse){
    if(req.method === 'POST'){
        await signUP(
            req.body,
            (status:boolean)=> {
                if(status){
                    res.status(200).json({status:true ,statusCode:200, massage: 'success'})
                }else {
                    res.status(400).json({status:false , statusCode:400, massage: 'failed'})
                }
            });   
    }else {
        res.status(405).json({status : false ,statusCode:405 , massage: 'Method not allowed'})
    }
}