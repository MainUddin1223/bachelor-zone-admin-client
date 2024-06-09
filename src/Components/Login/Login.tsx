'use client';
import { Button, Card, Input, Modal, message } from 'antd';
import Styles from './Login.module.css';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { useRouter } from 'next/navigation';
import { getAuthInfo } from '@/utils/jwt';
import { useLoginMutation } from '@/redux/api/adminApi';

const Login = () => {
	const userInfo: any = getAuthInfo();
	const router = useRouter();
	const [login] = useLoginMutation();
	const [isLoading, setIsLoading] = useState(false);
	const [loginData, setLoginData] = useState({
		phone: '',
		password: '',
	});
	useEffect(() => {
		if (userInfo?.role) {
			router.push(`${userInfo?.role}/`);
		}
	}, []);

	const handleLogin = async () => {
		try {
			const phoneRegex = /^(01|\+8801)\d{9}$/;
			if (!phoneRegex.test(loginData.phone)) {
				message.error('Invalid Phone number');
				return;
			}
			setIsLoading(true);
			const res = loginData.phone.startsWith('0')
				? await login({
						...loginData,
						phone: '+88' + loginData.phone,
					}).unwrap()
				: await login(loginData).unwrap();
			if (res.success) {
				message.success('User logged in successfully');
				const accessToken = res?.accessToken;
				typeof window !== 'undefined' &&
					localStorage.setItem('accessToken', accessToken);
				const getInfo: any = getAuthInfo();
				router.push(`${getInfo?.role}/`);
				setIsLoading(false);
			} else {
				setIsLoading(false);
				Modal.error({
					content: res.message || 'Failed to login',
				});
			}
			setLoginData({ phone: '', password: '' });
		} catch (error) {
			setIsLoading(false);
			Modal.error({
				content: 'Failed to login',
			});
		}
	};

	return (
		<div className={Styles.container}>
			<Card className={Styles.login_card}>
				{/* <Spinner/> */}
				<h2>Login as Admin</h2>
				<div className={Styles.login_input_container}>
					<div className={Styles.input_container}>
						<p>Phone </p>
						<Input
							value={loginData.phone}
							placeholder="+8801*********"
							onChange={(e) => {
								setLoginData({ ...loginData, phone: e.target.value });
							}}
						/>
					</div>
					<div className={Styles.input_container}>
						<p>Password</p>
						<Input.Password
							value={loginData.password}
							placeholder="********"
							type="password"
							onChange={(event) => {
								setLoginData({ ...loginData, password: event.target.value });
							}}
						/>
					</div>
				</div>
				<Button
					style={{
						margin: '0 auto',
						display: 'block',
						backgroundColor: 'var(--brand-color)',
					}}
					className={Styles.login_btn}
					loading={isLoading}
					disabled={
						loginData.phone.length == 11 || loginData.phone.length == 14
							? !loginData.phone || !loginData.password
								? true
								: false
							: true
					}
					onClick={handleLogin}
				>
					Login
				</Button>
			</Card>
		</div>
	);
};

export default Login;
