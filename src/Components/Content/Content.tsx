'use client';
import { getUserInfo } from '@/services/auth.service';
import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Content.module.css';
import SmallDeviceSideBar from '../Sidebar/SmallDeviceSideBar';

const { Content } = Layout;

const getCrumbs = (currentPath: string) => {
	let items: any = [];
	const paths = currentPath.split('/');
	let prevPath: string;

	paths.map((path) => {
		if (!path) {
			prevPath = '';
		} else {
			prevPath = `${prevPath}/${path}`;
			items.push({
				label: path,
				link: `${prevPath}`,
			});
		}
	});
	items.pop();
	return items;
};

const Contents = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	const { role } = getUserInfo() as any;
	const currentPath = usePathname();
	const res = getCrumbs(currentPath);
	const router = useRouter();

	const handleLogout = async () => {
		localStorage.clear();
		router.push('/');
	};

	return (
		<Content style={{ minHeight: '100vh', color: 'black' }}>
			<Header
				className={styles.header_container}
				style={{ backgroundColor: 'var(--primary-color)', padding: '15px' }}
			>
				{/* mobile nav bar */}
				<div className={styles.nav_container_mobile}>
					<p>
						<b>LUNCH TIME</b>
					</p>
					<MenuOutlined
						onClick={() => setOpen(true)}
						style={{
							fontSize: '35px',
							color: 'var(--button-color)',
						}}
					/>
				</div>
			</Header>
			<div>
				<SmallDeviceSideBar open={open} setOpen={setOpen} />
			</div>
			<div style={{ padding: '15px' }}>{children}</div>
		</Content>
	);
};

export default Contents;
