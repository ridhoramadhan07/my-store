import AdminLayout from '@/components/layouts/AdminLayout';
import Button from '@/components/ui/Button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Products.module.scss';
import Image from 'next/image';
import convertIDR from '@/utils/currency';
import { Product } from '@/types/product.type';
import dynamic from 'next/dynamic';
import ModalAddProduct from './ModalAddProduct';
import ModalUpdateProduct from './ModalUpdateProduct';
import ModalDleleteProduct from './ModalDeleteProduct';
import { useSession } from 'next-auth/react';

type Propstypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

const ProductsAdminView = (props: Propstypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});
  const session :any = useSession()

  useEffect(() => {
    setProductsData(products);
  }, [products]);
  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h1 className={styles.title}>Product Management</h1>
          <Button type="button" className={styles.products__btn} onClick={() => setModalAddProduct(true)}>
            <i className="bx bx-plus" />
            Add Product
          </Button>

          <table className={styles.products__table} >
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Kategori</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>size</th>
                <th>QTY</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: any, index: any) => (
                <>
                  <tr key={product.id}>
                    <td rowSpan={product.stock.length}>{index + 1}</td>
                    <td rowSpan={product.stock.length}>
                      <Image src={product.image} alt={product.name} width={100} height={100} className={styles.products__table__image} />
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length}>{convertIDR(product.price)}</td>
                    <td>{product.stock[0].size}</td>
                    <td>{product.stock[0].qty}</td>
                    <td rowSpan={product.stock.length}>
                      <div className={styles.products__table__action}>
                        <Button className={styles.products__table__action__edit} type="button" onClick={() => setUpdatedProduct(product)}>
                          <i className="bx bxs-edit " />
                        </Button>
                        <Button type="button" className={styles.products__table__action__delete} onClick={() => setDeletedProduct(product)}>
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map((stock: { size: string; qty: number }, index: number) => (
                    <>
                      {index > 0 && (
                        <tr key={stock.size}>
                          <td>{stock.size}</td>
                          <td>{stock.qty}</td>
                        </tr>
                      )}
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && <ModalAddProduct setModalAddProduct={setModalAddProduct} setToaster={setToaster} setProductsData={setProductsData} />}
      {Object.keys(updatedProduct).length > 0 && <ModalUpdateProduct setUpdatedProduct={setUpdatedProduct} updatedProduct={updatedProduct} setToaster={setToaster} setProductsData={setProductsData} />}
     {Object.keys(deletedProduct).length > 0 && <ModalDleleteProduct setDeletedProduct={setDeletedProduct} deletedProduct={deletedProduct} setToaster={setToaster} setProductsData={setProductsData} session={session}/>}
    </>
  );
};

export default dynamic(() => Promise.resolve(ProductsAdminView), { ssr: false });
