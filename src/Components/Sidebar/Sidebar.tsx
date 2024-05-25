'use client';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import { sidebarItems } from '../constants/sidebarItems';

const { Sider } = Layout;

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value) => setCollapsed(value)}
			width={280}
			style={{
				overflow: 'hidden',
				height: '100vh',
				position: 'sticky',
				left: 0,
				top: 0,
				bottom: 0,
				backgroundColor: 'var(--secondary-color)',
			}}
		>
			<div
				style={{
					fontSize: '1.5rem',
					textAlign: 'center',
					fontWeight: 'bold',
					margin: '1rem 0',
					color: 'black',
				}}
			>
				{collapsed ? 'BZ' : 'BACHELOR ZONE'}
			</div>
			<Menu
				style={{
					backgroundColor: 'var(--secondary-color)',
					fontWeight: 'bold',
					fontSize: '19px',
					color: 'var(--accent-color)',
				}}
				defaultSelectedKeys={['1']}
				mode="inline"
				items={sidebarItems('admin')}
			/>
		</Sider>
	);
};

export default Sidebar;
