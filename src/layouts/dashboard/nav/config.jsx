// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
    {
        title: 'Dashboard',
        path: '/dashboard/app',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Transaction',
        path: '/dashboard/transaction',
        icon: icon('ic_cart'),
    },
    {
        title: 'Reseller',
        path: '/dashboard/reseller',
        icon: icon('ic_user'),
    },
    {
        title: 'Product',
        path: '/dashboard/product',
        icon: icon('ic_box'),
    },
    {
        title: 'Report',
        path: '/dashboard/report',
        icon: icon('ic_analytics'),
    },
    {
        title: 'Admin',
        path: '/dashboard/admin',
        icon: icon('ic_user'),
    },
];

export default navConfig;
