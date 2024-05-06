import CartView from '@/components/views/cart';
import productServices from '@/services/product';
import userServices from '@/services/user';
import { Product } from '@/types/product.type';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};
const CartPage = (props: propTypes) => {
  const { setToaster } = props;
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState<Product | {}>({});

  const session :any = useSession();
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  }
  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>Cart Page</title>
      </Head>
      <CartView setToaster={setToaster} cart={cart} products={products}/>
    </>
  );
};

export default CartPage;
