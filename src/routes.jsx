import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import ReportPage from './pages/ReportPage';
import ResellerPage from './pages/ResellerPage';
import TransactionPage from './pages/TransactionPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            element: <SimpleLayout />,
            children: [
                { element: <Navigate to='/login' />, index: true },
                { path: '404', element: <Page404 /> },
                { path: '*', element: <Navigate to='/404' /> },
            ],
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to='/dashboard/app' />, index: true },
                { path: 'app', element: <DashboardAppPage /> },
                { path: 'reseller', element: <ResellerPage /> },
                { path: 'transaction', element: <TransactionPage /> },
                { path: 'product', element: <ProductPage /> },
                { path: 'report', element: <ReportPage /> },
                { path: 'admin', element: <AdminPage /> },
            ],
        },
        {
            path: 'login',
            element: <LoginPage />,
        },
        {
            path: '*',
            element: <Navigate to='/404' replace />,
        },
    ]);

    return routes;
}
