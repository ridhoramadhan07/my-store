import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styles from './ModalUpdateProduct.module.scss';
import { Product } from '@/types/product.type';
import InputFile from '@/components/ui/InputFile';
import productServices from '@/services/product';
import { useSession } from 'next-auth/react';
import { uploadFile } from '@/lib/firebase/service';
import Image from 'next/image';

type propsTypes = {
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  updatedProduct: Product | any;
};

const ModalUpdateProduct = (props: propsTypes) => {
  const { setUpdatedProduct, updatedProduct, setToaster, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const heandleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };
  const updateProduct = async (form: any, newImageURL: string = updatedProduct.image) => {
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: newImageURL,
    };
    const result = await productServices.updateProduct(updatedProduct.id, data, session.data?.accessToken);
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: 'success',
        message: 'Success Update Product ',
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: 'danger',
        message: 'Failed Update Product ',
      });
    }
  };

  const heandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = 'main.' + file.name.split('.')[1];
      uploadFile(updatedProduct.id, file, newName, 'products', async (status: boolean, newImageURL: string) => {
        if (status) {
          updateProduct(form, newImageURL);
        } else {
          setIsLoading(false);
          setToaster({
            variant: 'danger',
            message: 'Failed Update Product ',
          });
        }
      });
    } else {
      updateProduct(form);
    }
  };
  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1>Update User</h1>
      <form onSubmit={heandleSubmit} className={styles.form}>
        <Input type="text" label="Name" name="name" placeholder="Insert Product Name" defaultValue={updatedProduct?.name} />
        <Input type="number" label="Price" name="price" placeholder="Insert Product Price" defaultValue={updatedProduct?.price} />
        <Select
          name="category"
          label="Category"
          disabled
          options={[
            { label: 'Men', value: `Men'${'s'}` },
            { label: 'Women', value: `Women'${'s'}` },
          ]}
          defaultValue={updatedProduct?.category}
        />
        <Select
          name="status"
          label="Status"
          disabled
          options={[
            { label: 'Relesed', value: 'true' },
            { label: 'Not Relesed', value: 'false' },
          ]}
          defaultValue={updatedProduct?.status}
        />
        <label htmlFor="stock">Stock</label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div key={i} className={styles.form__stock}>
            <div className={styles.form__stock__item}>
              <Input
                type="text"
                label="Size"
                name="size"
                placeholder="Insert product size"
                onChange={(e) => {
                  heandleStock(e, i, 'size');
                }}
                defaultValue={item.size}
              />
            </div>
            <div className={styles.form__stock__item}>
              <Input
                type="number"
                label="QTY"
                name="qty"
                placeholder="Insert product quantity"
                onChange={(e) => {
                  heandleStock(e, i, 'qty');
                }}
                defaultValue={item.qty}
              />
            </div>
          </div>
        ))}
        <div className={styles.form__btn}>
          <Button className={styles.form__btn__stock} type="button" onClick={() => setStockCount([...stockCount, { size: '', qty: 0 }])}>
            {isLoading ? 'Loading...' : 'Add Stock'}
          </Button>
        </div>
        <label htmlFor="image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          Image
        </label>
        <div className={styles.form__image}>
          <Image width={200} height={200} src={uploadedImage ? URL.createObjectURL(uploadedImage) : updatedProduct?.image} alt="image" className={styles.form__image__preview} />
          <InputFile setUploadedImage={setUploadedImage} name="image" uploadedImage={uploadedImage} />
        </div>
        <div className={styles.form__btn}>
          <Button className={styles.form__btn__add} type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Update Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
