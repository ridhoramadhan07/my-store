import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
type Proptypes = {
  lists: Array<{
    title: string;
    link: string;
    icon: string;
  }>;
};
const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  const {pathname} = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h1 className={styles.sidebar__top__title}>Admin Panel</h1>
        <div className={styles.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link hrefLang="en" href={list.link} key={list.title} className={`${styles.sidebar__top__lists__item} ${pathname === list.link && styles.sidebar__top__lists__item__active }`}>
              <i className={`${styles.sidebar__top__lists__item__icon} bx ${list.icon}`} />
              <h4 className={styles.sidebar__top__lists__item__title}>{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <button type="button" className={styles.sidebar__bottom__button} onClick={() => (signOut())}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
