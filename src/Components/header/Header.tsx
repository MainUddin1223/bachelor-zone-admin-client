'use client';
import Styles from './Header.module.css';
import { Switch, Flex, ConfigProvider } from 'antd';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import { useEffect } from 'react';
import Link from 'next/link';
import { addBasicData } from '@/redux/slice/basicSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
	const router = useRouter();

	return (
		<div className={Styles.container}>
			<div className={Styles.header_container}>
				<Flex justify="space-between" align="center">
					<div>
						<h1 className={Styles.text_logo} onClick={() => router.push('/')}>
							Bachelor Zone
						</h1>
					</div>
				</Flex>
			</div>
		</div>
	);
};

export default Header;
