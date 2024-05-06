import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useState } from 'react';

const navItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Products',
    url: '/products',
  },
];
const Navbar = () => {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropDownUser, setDropDownUser] = useState(false);
  return (
    <div className={styles.navbar}>
      <h3>Toko Sepatu</h3>
      <div className={styles.navbar__nav}>
        {navItems.map((item, index) => (
          <div key={index}>
            <Link href={item.url} className={`${styles.navbar__nav__item} ${pathname === item.url && styles['navbar__nav__item--active']}`}>
              {item.title}
            </Link>
          </div>
        ))}
      </div>
      {data ? (
        <div className={styles.navbar__user}>
          <div className={styles.navbar__user__profile__icon}>
            <i onClick={() => push('/cart')} className={`bx bx-cart-alt ${styles.navbar__user__profile__icon__cart}`}></i>
          </div>
          <div className={styles.navbar__user__profile}>
            <Image className={styles.navbar__user__profile__image} src={data?.user.image} alt={data?.user.name} width={40} height={40} onClick={() => setDropDownUser(!dropDownUser)}></Image>
            <div className={`${styles.navbar__user__profile__dropdown} ${dropDownUser === true && styles['navbar__user__profile__dropdown--active']}`}>
              <button className={styles.navbar__user__profile__dropdown__item} onClick={() => push('/member/profile')}>
                Profile
              </button>
              <button className={styles.navbar__user__profile__dropdown__item} onClick={() => signOut()}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button type="button" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
