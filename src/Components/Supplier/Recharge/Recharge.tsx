'use client';

import Spinner from '@/Components/Spinner/Spinner';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { useRechargeBalanceMutation } from '@/redux/api/supplierApi';
import { Button, Card, Col, Flex, Input, Modal, Row, message } from 'antd';
import { SearchProps } from 'antd/es/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const { Search } = Input;

const Recharge = () => {
	const router = useRouter();
	const [userData, setUserData] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [open, setOpen] = useState(false);
	const [confirming, setConfirming] = useState(false);
	const [amount, setAmount] = useState('');
	const [rechargeBalance] = useRechargeBalanceMutation();
	const onSearch: SearchProps['onSearch'] = async () => {
		if (searchValue.startsWith('01')) {
			const token = localStorage.getItem('accessToken');
			const getUrl = getBaseUrl();
			setIsLoading(true);
			const result: any = await axios.get(`${getUrl}/supplier/user`, {
				params: {
					search: `+88${searchValue}`,
				},
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			});
			setIsLoading(false);
			if (!result?.data?.success) {
				message.error('User not found');
			} else {
				setUserData(result?.data?.data);
			}
		} else {
			message.error('Invalid Phone number');
		}
	};

	const handleChange = (value: string) => {
		const sanitizedValue = value.replace(/[^0-9]/g, '');
		if (sanitizedValue.length <= 11) {
			setSearchValue(sanitizedValue);
		}
	};

	const handleAmount = (value: string) => {
		// Regular expression to match numbers between 1 and 9999
		const regex = /^([1-9][0-9]{0,3})?$/;

		// Remove all non-digit characters from input
		const sanitizedValue = value.replace(/[^0-9]/g, '');

		// Check if the sanitized value matches the regex
		if (regex.test(sanitizedValue)) {
			setAmount(sanitizedValue);
		}
	};

	const handleConfirm = async () => {
		const balance = Number(amount);
		setConfirming(true);
		const result: any = await rechargeBalance({
			balance,
			userId: userData?.id,
		});
		if (!result?.data?.success) {
			message.error('Failed to recharge');
		} else {
			message.success('Recharge successful');
			router.push('/supplier/transactions');
		}
		setAmount('');
		setConfirming(false);
		setOpen(false);
	};
	return (
		<div>
			<h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
				Recharge Balance
			</h1>
			<Flex gap={5}>
				<Search
					addonBefore="+88"
					style={{ maxWidth: '400px' }}
					value={searchValue}
					placeholder="User phone number"
					enterButton={<p style={{ color: 'white' }}>Search</p>}
					size="large"
					onChange={(e) => handleChange(e.target.value)}
					onSearch={onSearch}
				/>
			</Flex>
			<div>
				{isLoading ? (
					<Spinner />
				) : (
					<div>
						{userData ? (
							<div style={{ marginTop: '15px' }}>
								{/* confirm modal */}

								<Modal
									open={open}
									confirmLoading={confirming}
									onOk={handleConfirm}
									okText={<p style={{ color: 'white' }}>Confirm</p>}
									onCancel={() => setOpen(false)}
								>
									<div>
										<h2>
											Please make sure that your are recharging Balance {amount}
											TK into {userData?.name}'s account
										</h2>
									</div>
								</Modal>

								<Card>
									<Row gutter={[15, 15]}>
										<Col xs={24} sm={12}>
											<h2>User Info</h2>
											<h3>User Name : {userData?.name}</h3>
											<h3>User Phone : {userData?.phone}</h3>
											<h3>Balance : {userData?.UserInfo[0]?.Balance}</h3>
										</Col>
										<Col xs={24} sm={12}>
											<h2>Recharge Balance</h2>
											<div>
												<Input
													placeholder="Amount"
													value={amount}
													onChange={(e) => handleAmount(e.target.value)}
													style={{
														maxWidth: '250px',
														margin: '10px 0',
														display: 'block',
													}}
												/>
												<Button
													disabled={!amount}
													onClick={() => setOpen(true)}
												>
													Recharge
												</Button>
											</div>
										</Col>
									</Row>
								</Card>
							</div>
						) : (
							<h3>Search a user</h3>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Recharge;
