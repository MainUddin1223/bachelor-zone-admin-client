'use client';

import { getUserInfo, isLoggedIn } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthAdmin = ({ children }: { children: React.ReactNode }) => {
	const adminInfo: any = getUserInfo();
	console.log(adminInfo);
	const router = useRouter();

	useEffect(() => {
		if (adminInfo.role !== 'admin') {
			router.push('/');
		}
	}, [router]);
	return <div>{children}</div>;
};

export default AuthAdmin;
