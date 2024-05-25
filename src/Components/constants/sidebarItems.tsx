import {
	CreditCardOutlined,
	HomeOutlined,
	TableOutlined,
	UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Link from 'next/link';
import { USER_ROLE } from './role';

export const sidebarItems = (role: string) => {
	const defaultSidebarItems: MenuProps['items'] = [
		{
			label: <Link href={`/${role}/lunch_tiffin`}>Lunch</Link>,
			icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
			key: `/${role}/lunch_tiffin`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/order_management`}>Order Management</Link>,
			icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
			key: `/${role}/order_management`,
			style: { border: '1px solid var(--primary-color)' },
		},
		// {
		// 	label: <Link href={`/${role}/dinner`}>Dinner</Link>,
		// 	icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/dinner`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		// {
		// 	label: <Link href={`/${role}/lunch`}>Lunch</Link>,
		// 	icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/lunch`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
	];

	const adminSidebarItems: MenuProps['items'] = [
		{
			label: <Link href={`/${role}/`}>Dashboard</Link>,
			icon: <UserOutlined style={{ fontSize: '21px' }} />,
			key: `/${role}/`,
			style: { border: '1px solid var(--primary-color)' },
		},
		...defaultSidebarItems,
		// {
		// 	label: <Link href={`/${role}/statics`}>Statics</Link>,
		// 	icon: <TableOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/statics`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		// {
		// 	label: <Link href={`/${role}/tiffin`}>Tiffin</Link>,
		// 	icon: <TableOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/tiffin`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		// {
		// 	label: <Link href={`/${role}/lunch`}>Lunch</Link>,
		// 	icon: <TableOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/lunch`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		// {
		// 	label: <Link href={`/${role}/dinner`}>Dinner</Link>,
		// 	icon: <TableOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/dinner`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		{
			label: <Link href={`/${role}/cost_management`}>Cost Management</Link>,
			icon: <TableOutlined style={{ fontSize: '21px' }} />,
			key: `/${role}/cost_management`,
			style: { border: '1px solid var(--primary-color)' },
		},
		{
			label: <Link href={`/${role}/user_management`}>User Management</Link>,
			icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
			key: `/${role}/user_management`,
			style: { border: '1px solid var(--primary-color)' },
		},
		// {
		// 	label: <Link href={`/${role}/bazar`}>Bazar</Link>,
		// 	icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/bazar`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		// {
		// 	label: <Link href={`/${role}/hr`}>Human Recourse</Link>,
		// 	icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/hr`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		// {
		// 	label: <Link href={`/${role}/moderator`}>Moderator</Link>,
		// 	icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
		// 	key: `/${role}/moderator`,
		// 	style: { border: '1px solid var(--primary-color)' },
		// },
		{
			label: <Link href={`/${role}/team_management`}>Team Management</Link>,
			icon: <CreditCardOutlined style={{ fontSize: '21px' }} />,
			key: `/${role}/team_management`,
			style: { border: '1px solid var(--primary-color)' },
		},
	];

	if (role === USER_ROLE.ADMIN) return adminSidebarItems;
	else if (role === USER_ROLE.MOD) return defaultSidebarItems;
};