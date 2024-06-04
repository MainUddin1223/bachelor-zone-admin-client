'use client';

import { isLoggedIn } from '@/services/auth.service';
import { Layout } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './layout.module.css';
import Spinner from '@/Components/Spinner/Spinner';
import Sidebar from '@/Components/Sidebar/Sidebar';
import Contents from '@/Components/Content/Content';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	const [open, setOpen] = useState(false);
	const userLoggedIn = isLoggedIn();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!userLoggedIn) {
			router.push('/');
		}
		setIsLoading(true);
	}, [router, isLoading]);

	if (!isLoading) {
		return <Spinner />;
	}
	return (
		<Layout hasSider>
			<div className={styles.desktop_sideBar}>
				<Sidebar />
			</div>
			<Contents>{children}</Contents>
		</Layout>
	);
};

export default DashboardLayout;
