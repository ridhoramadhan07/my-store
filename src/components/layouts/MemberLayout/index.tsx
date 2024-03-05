import Sidebar from '@/components/fragmants/Sidebar';
import styles from './MemberLayout.module.scss';
type Propstypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: 'Dashboard',
    link: '/member',
    icon: 'bxs-dashboard',
  },
  {
    title: 'Orders',
    link: '/member/orders',
    icon: 'bxs-cart-alt',
  },
  {
    title: 'Profile',
    link: '/member/profile',
    icon: 'bxs-user',
  },
];

const MemberLayout = (props: Propstypes) => {
  const { children } = props;
  return (
    <div className={styles.member}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.member__content}>{children}</div>
    </div>
  );
};

export default MemberLayout;
