import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
const LogoOnlyLayout = lazy(() => import('./layouts/LogoOnlyLayout'));

// views
const DashboardHome = lazy(() => import('./pages/dashboard/home'));
const Metrics = lazy(() => import('./pages/dashboard/metrics'));
const NotFound = lazy(() => import('./pages/Page404'));


// ----------------------------------------------------------------------

export default function Routing() {
	return useRoutes([
		{
			path: '/dashboard',
			element: <DashboardLayout />,
			children: [
				{ path: '', element: <Navigate to="home" /> },
				{ path: 'home', element: <DashboardHome /> },
				{
					path: 'metrics',
					element: <Metrics />,
					children: [
						{ path: ':storeId', element: <Metrics /> }
					]
				}
			]
		},
		{
			path: '/',
			element: <LogoOnlyLayout />,
			children: [
				{ path: '404', element: <NotFound /> },
				{ path: '/', element: <Navigate to="/dashboard" /> },
				{ path: '*', element: <Navigate to="/404" /> }
			]
		},
		{ path: '*', element: <Navigate to="/404" replace /> }
	]);
}
