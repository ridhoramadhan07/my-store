import ProductsAdminView from '@/components/views/admin/Products';
import productServices from '@/services/product';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const AdminProductsPage = ({ setToaster }: any) => {
  const [products, setProducts] = useState([]);
const session:any = useSession()
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <ProductsAdminView products={products} setToaster={setToaster} session={session}/>
    </>
  );
};

export default AdminProductsPage;
