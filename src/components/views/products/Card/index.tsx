import { Product } from '@/types/product.type';
import styles from './Card.module.scss';
import convertIDR from '@/utils/currency';
import Image from 'next/image';

type propType = {
  product: Product;
  key: string;
};

const Card = (props: propType) => {
  const { product, key } = props;
  return (
    <div className={styles.card__item} key={key}>
      <Image src={product.image} alt={product.name} width={500} height={500} className={styles.card__item__image} />
      <h4 className={styles.card__item__title}>{product.name}</h4>
      <p className={styles.card__item__category}>{product.category }</p>
      <p className={styles.card__item__price}>{convertIDR(product.price)}</p>
    </div>
  );
};

export default Card;
