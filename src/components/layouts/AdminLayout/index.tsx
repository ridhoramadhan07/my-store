import Sidebar from "@/components/fragmants/Sidebar"
import styles from './AdminLayout.module.scss';
type Propstypes = {
    children: React.ReactNode;
};

const listSidebarItem = [
    {
        title : 'Dashboard',
        link : '/admin',
        icon :'bxs-dashboard'
    },
    {
        title : 'Product',
        link : '/admin/product',
        icon : 'bxs-package'
    },
    {
        title : 'Users',
        link : '/admin/users',
        icon : 'bxs-user-account'
    },
]

const AdminLayout = (props : Propstypes) => {
    const {children} = props;
    return (
        <div className={styles.admin}>
            <Sidebar lists = {listSidebarItem}/>
            <div className={styles.admin__content}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout ;