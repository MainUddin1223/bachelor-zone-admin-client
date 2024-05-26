'use client';

import {
	useGetUserByIdQuery,
	useRechargeBalanceMutation,
	useRefundBalanceMutation,
} from '@/redux/api/adminApi';
import {
	Button,
	Card,
	Col,
	Flex,
	Input,
	Modal,
	Row,
	Table,
	TableColumnsType,
	message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';

interface DataType {
	key: React.Key;
	date: string;
	status: string;
}

interface TransactionType {
	key: React.Key;
	date: string;
	amount: number;
	isUpdated: boolean;
	update_reason: string;
}

const UserDetails = ({ userId }: { userId: number }) => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;
	const router = useRouter();
	const { data, isLoading } = useGetUserByIdQuery(userId);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [refundData, setRefundData] = useState({
		balance: 0,
		description: '',
		userId,
	});
	const [rechargeBalance] = useRechargeBalanceMutation();
	const [refundBalance] = useRefundBalanceMutation();
	const [open, setOpen] = useState(false);
	const [openRefund, setOpenRefund] = useState(false);
	const [amount, setAmount] = useState(0);
	const orderHistory = data?.Order;
	const transaction = data?.Transaction;
	console.log(data);
	const columns: TableColumnsType<DataType> = [
		{
			title: <h3>Date</h3>,
			render: (data) => <h4>{data.delivery_date.split('T')[0]}</h4>,
		},
		{
			title: <h3>Status</h3>,
			dataIndex: 'status',
		},
	];

	const mobileColumns: TableColumnsType<DataType> = [
		{
			title: 'Transaction details',
			render: (data: any) => {
				return (
					<div>
						<h4>Date : {data.date.split('T')[0]}</h4>
						<p>Amount : {data.amount}</p>
						<p>Description : {data.description}</p>
						<p>Transaction Type : {data.transaction_type}</p>
					</div>
				);
			},
		},
	];

	const transactionColumn: TableColumnsType<TransactionType> = [
		{
			title: <h3>Date</h3>,
			render: (data) => <h5>{data.date.split('T')[0]}</h5>,
		},
		{
			title: <h3>Amount</h3>,
			dataIndex: 'amount',
		},
		{
			title: <h3>Description</h3>,
			dataIndex: 'description',
		},
		{
			title: <h3>Transaction Type</h3>,
			dataIndex: 'transaction_type',
		},
	];
	const handleRecharge = async () => {
		setConfirmLoading(true);
		const result: any = await rechargeBalance({
			balance: Number(amount),
			userId,
		});
		setConfirmLoading(false);
		setAmount(0);
		if (result.data.success) {
			message.success('Balance recharged successfully ');
			setOpen(false);
		} else {
			message.error(result?.data?.message);
			setOpen(false);
		}
	};

	const handleRefund = async () => {
		setConfirmLoading(true);
		const result: any = await refundBalance(refundData);
		setConfirmLoading(false);
		setRefundData({ ...refundData, balance: 0, description: '' });
		if (result.data.success) {
			message.success('Amount refund successfully ');
			setOpenRefund(false);
		} else {
			message.error(result?.data?.message);
			setOpenRefund(false);
		}
	};

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<Card
					title={
						<h2 style={{ textAlign: 'center', padding: '15px' }}>
							Details of {data?.name}
						</h2>
					}
				>
					<Modal
						title={
							<h3>
								Are you sure recharging {amount}TK to {data?.name}'s account ?
							</h3>
						}
						open={open}
						onOk={handleRecharge}
						confirmLoading={confirmLoading}
						onCancel={() => setOpen(false)}
						okText={'Confirm'}
						okButtonProps={{
							disabled: amount ? false : true,
						}}
					></Modal>
					<Modal
						title={
							<h3>
								Are you sure to refund {refundData.balance}TK from {data?.name}
								's account ?
							</h3>
						}
						open={openRefund}
						onOk={handleRefund}
						confirmLoading={confirmLoading}
						onCancel={() => setOpenRefund(false)}
						okText={'Confirm'}
						okButtonProps={{
							disabled:
								refundData?.balance &&
								refundData?.userId &&
								refundData?.description
									? false
									: true,
						}}
					></Modal>
					<Row gutter={[15, 15]}>
						<Col md={24} lg={8}>
							<div>
								<h3>Name : {data?.name}</h3>
								<h3>Phone : {data?.phone}</h3>
								<h3>Team : {data?.teams?.name}</h3>
								<h3>Team Leader : {data?.teams?.leader?.name}</h3>
								<h3>Leader phone : {data?.teams?.leader?.phone}</h3>
								<p>Address : {data?.teams?.address?.address}</p>
								<p>Balance : {data?.UserInfo?.Balance}</p>
								<p>
									Status :{' '}
									{data?.UserInfo?.is_claimed ? 'Claimed' : 'Unclaimed'}
								</p>
								<Flex gap={5} style={{ marginTop: '10px' }}>
									<Button onClick={() => router.push(`team/${userId}`)}>
										Change Team
									</Button>
								</Flex>
							</div>
						</Col>
						<Col md={24} lg={8}>
							<Card title={<h3>Recharge Balance</h3>}>
								<div>
									<h4 style={{ paddingBottom: '10px' }}>Amount</h4>
									<Flex gap={10}>
										<Input
											value={amount ? amount : ''}
											onChange={(e: any) => {
												const numberRegex = /^(?:[0-9]\d*|)$/;
												const checkNumber = numberRegex.test(e.target.value);
												if (checkNumber) {
													setAmount(e.target.value);
												}
											}}
										/>
										<Button disabled={!amount} onClick={() => setOpen(true)}>
											Recharge
										</Button>
									</Flex>
								</div>
							</Card>
						</Col>
						<Col md={24} lg={8} style={{ width: '100%' }}>
							<Card title={<h3>Refund Balance</h3>}>
								<div>
									<div>
										<h4 style={{ paddingBottom: '10px' }}>Amount</h4>
										<Input
											value={refundData?.balance ? refundData?.balance : ''}
											onChange={(e: any) => {
												const numberRegex = /^(?:[0-9]\d*|)$/;
												const checkNumber = numberRegex.test(e.target.value);
												if (checkNumber) {
													setRefundData({
														...refundData,
														balance: Number(e.target.value),
													});
												}
											}}
										/>
									</div>
									<div>
										<h4 style={{ paddingBottom: '10px' }}>Description</h4>
										<TextArea
											rows={3}
											autoSize={{ minRows: 3, maxRows: 5 }}
											value={
												refundData?.description ? refundData?.description : ''
											}
											onChange={(e: any) => {
												setRefundData({
													...refundData,
													description: e.target.value,
												});
											}}
										/>
									</div>
									<Button
										style={{ marginTop: '10px' }}
										disabled={
											!refundData.balance ||
											!refundData?.userId ||
											!refundData?.description
										}
										onClick={() => setOpenRefund(true)}
									>
										Refund
									</Button>
								</div>
							</Card>
						</Col>
					</Row>
					<Card style={{ margin: '20px 0' }} title={<h4>Meal History</h4>}>
						<Table columns={columns} dataSource={orderHistory} />
					</Card>
					<Card
						style={{ margin: '20px 0' }}
						title={<h4>Transaction History</h4>}
					>
						{isMobile ? (
							<Table
								columns={mobileColumns}
								dataSource={transaction}
								pagination={false}
							/>
						) : (
							<Table
								columns={transactionColumn}
								dataSource={transaction}
								pagination={false}
							/>
						)}
					</Card>
				</Card>
			)}
		</>
	);
};

export default UserDetails;
