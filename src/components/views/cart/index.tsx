import { Dispatch, Fragment, SetStateAction } from 'react';
import styles from './Cart.module.scss';
import { Product } from '@/types/product.type';
import Image from 'next/image';
import convertIDR from '@/utils/currency';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  cart: any;
  products?: Product[] | any ;
};
const CartView = (props: propTypes) => {
  const { setToaster, cart, products } = props;
  const getProduct = (id: string) => {
    if (Array.isArray(products)) {
      const product = products.find((product: any) => product.id === id);
      return product;
    }
    return null; // or any other appropriate action
  };
  const getOptionsSize = (id: string, selected: string) => {
    if (Array.isArray(products)) {
      const product = products.find((product: any) => product.id === id);
      const options = product?.stock.map((stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      });
      const data = options?.filter((item: any) => item !== undefined);
      return data;
    }
    return null; // or any other appropriate action
  };

  const getTotalPrice = () => {
    const total = cart.reduce((acc: number, item: { id: string; size: string; qty: number }) => {
      const product: any = getProduct(item.id);

      return (acc += parseInt(product?.price) * item.qty);
    }, 0);
    return total;
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__main}>
        <h2 className={styles.cart__main__title}>Cart Page</h2>
        <div className={styles.cart__main__list}>
          {cart.map((item: { id: string; size: string; qty: number }) => (
            <Fragment key={`${item.id}-${item.size}`}>
              <div className={styles.cart__main__list__item}>
                <Image src={getProduct(item.id)?.image} alt={`${item.id}-${item.size}`} width={150} height={150} className={styles.cart__main__list__item__image} />
                <div className={styles.cart__main__list__item__info}>
                  <h4 className={styles.cart__main__list__item__info__title}>{getProduct(item.id)?.name}</h4>
                  <p className={styles.cart__main__list__item__info__category}>{getProduct(item.id)?.category}</p>
                  <div className={styles.cart__main__list__item__info__data}>
                    <label className={styles.cart__main__list__item__info__data__size} htmlFor="size">
                      Size
                      <Select name="size" options={getOptionsSize(item.id, item.size)} className={styles.cart__main__list__item__info__data__size__select} />
                    </label>
                    <label className={styles.cart__main__list__item__info__data__qty} htmlFor="qty">
                      Quantity
                      <Input name="qty" type="number" className={styles.cart__main__list__item__info__data__qty__input} defaultValue={item.qty} />
                    </label>
                  </div>
                  <button type="button" className={styles.cart__main__list__item__info__deleted}>
                    <i className="bx bx-heart" />
                  </button>
                  <button type="button" className={styles.cart__main__list__item__info__deleted}>
                    <i className="bx bx-trash" />
                  </button>
                </div>
                <h4 className={styles.cart__main__list__item__price}>{convertIDR(getProduct(item.id)?.price)}</h4>
              </div>
              <hr className={styles.cart__main__list__item__hr} />
            </Fragment>
          ))}
        </div>
      </div>
      <div className={styles.cart__summary}>
        <h2 className={styles.cart__summary__title}>Summary</h2>
        <div className={styles.cart__summary__item}>
          <p>Subtotal</p>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <p>Delivery</p>
          <p>{convertIDR(0)}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <p>Tax</p>
          <p>{convertIDR(0)}</p>
        </div>
        <hr />
        <div className={styles.cart__summary__item}>
          <p>Total</p>
          <p>{convertIDR(getTotalPrice())}</p>
        </div>
        <hr />
        <Button type="button" className={styles.cart__summary__button}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartView;
