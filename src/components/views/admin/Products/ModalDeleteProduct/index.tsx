import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import styles from './ModalDeleteProduct.module.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import productServices from '@/services/product';
import { Product } from '@/types/product.type';
import { deletedFile } from '@/lib/firebase/service';

type propTypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};
const ModalDleleteProduct = (props: propTypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster, session } = props;
  const [isLoading, setIsLoading] = useState(false);

  const heandleDeleteProduct = async () => {
    const result = await productServices.deleteProduct(deletedProduct.id, session.data?.accessToken);
    if (result.status === 200 && result.data) {
      setIsLoading(false);
      deletedFile(`/images/products/${deletedProduct.id}/${deletedProduct.image.split('%2F')[3].split('?')[0]}`, async (status: boolean) => {
        if (status) {
          setToaster({
            variant: 'success',
            message: 'Success Delete User',
          });
          setDeletedProduct({});
          const { data } = await productServices.getAllProducts();
          setProductsData(data.data);
        }
      });
      
    } else {
      setIsLoading(false);
      setToaster({
        variant: 'danger',
        message: 'Failed Delete User',
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className={styles.notif}>Are you sure ? </h1>
      <Button className={styles.notif__btn} type="button" onClick={() => heandleDeleteProduct()}>
        {isLoading ? 'Loading...' : 'Delete'}
      </Button>
    </Modal>
  );
};

export default ModalDleleteProduct;
