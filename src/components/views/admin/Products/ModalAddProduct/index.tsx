import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styles from './ModalAddproduct.module.scss';
import { Product } from '@/types/product.type';
import InputFile from '@/components/ui/InputFile';
import productServices from '@/services/product';
import { useSession } from 'next-auth/react';
import { uploadFile } from '@/lib/firebase/service';
import Image from 'next/image';

type propsTypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalAddProduct = (props: propsTypes) => {
  const { setModalAddProduct, setToaster, setProductsData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: '', qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const heandleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };
  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = 'main.' + file.name.split('.')[1];
    if (file) {
      uploadFile(id, file, newName, 'products', async (status: boolean, newImageURL: string) => {
        if (status) {
          const data = {
            image: newImageURL,
          };
          const result = await productServices.updateProduct(id, data, session.data?.accessToken);
          if (result.status === 200) {
            setIsLoading(false);
            setUploadedImage(null);
            form.reset();
            setModalAddProduct(false);
            const { data } = await productServices.getAllProducts();
            setProductsData(data.data);
            setToaster({
              variant: 'success',
              message: 'Success Add Product ',
            });
          } else {
            setIsLoading(false);
            setToaster({
              variant: 'danger',
              message: 'Failed Add Product ',
            });
          }
        } else {
          setIsLoading(false);
          setToaster({
            variant: 'danger',
            message: 'Failed Add Product ',
          });
        }
      });
    }
  };
  const heandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: '',
    };
    const result = await productServices.addProduct(data, session.data?.accessToken);
    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };
  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1>Update User</h1>
      <form onSubmit={heandleSubmit} className={styles.form}>
        <Input type="text" label="Name" name="name" placeholder="Insert Product Name" />
        <Input type="number" label="Price" name="price" placeholder="Insert Product Price" />
        <Select
          name="category"
          label="Category"
          disabled
          options={[
            { label: 'Men', value:`Men'${'s'}` },
            { label: 'Women', value: `Women'${'s'}`},
          ]}
        />
        <Select
          name="status"
          label="Status"
          disabled
          options={[
            { label: 'Relesed', value: 'true' },
            { label: 'Not Relesed', value: 'false' },
          ]}
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
          {uploadedImage ? (
            <Image width={200} height={200} src={URL.createObjectURL(uploadedImage)} alt="image" className={styles.form__image__preview} />
          ) : (
            <div className={styles.form__image__placeholder}>
              <p style={{ textAlign: 'center' }}>Image</p>
            </div>
          )}

          <InputFile setUploadedImage={setUploadedImage} name="image" uploadedImage={uploadedImage} />
        </div>

        <div className={styles.form__btn}>
          <Button className={styles.form__btn__add} type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
