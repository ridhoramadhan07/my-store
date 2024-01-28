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
    }
]

const AdminLayout = (props : Propstypes) => {
    const {children} = props;
    return (
        <div className={styles.admin}>
            <Sidebar lists = {listSidebarItem}/>
            {children}
        </div>
    );
};

export default AdminLayout ;