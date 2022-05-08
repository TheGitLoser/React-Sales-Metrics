import { Icon } from '@iconify/react'; 
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;


const sidebarConfig = [
	{
		title: 'Home',
		path: '/dashboard/home',
		icon: getIcon("bx:bxs-home")
	},
	{
		title: 'Metrics',
		path: '/dashboard/metrics',
		icon: getIcon("cil:pen")
	}
];

export default sidebarConfig;

