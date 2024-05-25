'use client';

import {
	useDeliverOrderMutation,
	useGetTeamOrdersQuery,
} from '@/redux/api/adminApi';
import { useDebounced } from '@/redux/hooks';
import {
	Button,
	Card,
	Flex,
	Input,
	Modal,
	Radio,
	RadioChangeEvent,
	Table,
	TableColumnsType,
	message,
} from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useState } from 'react';

interface DataType {
	key: React.Key;
	team_name: string;
	address: string;
	team_leader: string;
	dew_boxes: number;
	leader_phone_number: string;
	order: number;
	status: 'pending' | 'received';
}

const OrderManagement = () => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 1000;
	const [orderList, setOrderList] = useState([]);
	const [open, setOpen] = useState(false);
	const [confirmDeliver, setConfirmDeliver] = useState(false);
	const [confirmData, setConfirmData] = useState<any>('');
	const query: Record<string, any> = {};
	const [status, setStatus] = useState<any>('pending');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [deliverOrder] = useDeliverOrderMutation();
	const [confirmLoading, setConfirmLoading] = useState(false);

	const handleSizeChange = (e: RadioChangeEvent) => {
		setStatus(e.target.value);
	};
	const handleDeliverOrder = async () => {
		setConfirmLoading(true);
		const result: any = await deliverOrder(confirmData.id);
		setConfirmLoading(false);
		if (result.data.success) {
			message.success('Order delivered successfully ');
			setConfirmDeliver(false);
			setConfirmData('');
		} else {
			message.error(result?.data?.message);
			setConfirmDeliver(false);
			setConfirmData('');
		}
	};

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 1000,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}
	query['status'] = status;

	const { data: result, isLoading } = useGetTeamOrdersQuery({ ...query });
	const data = result?.result;
	const columns: TableColumnsType<DataType> = [
		{
			title: <h3>Team Name</h3>,
			dataIndex: 'team_name',
		},
		{
			title: <h3>Leader</h3>,
			dataIndex: 'leaderName',
		},
		{
			title: <h3>Order</h3>,
			dataIndex: 'order_count',
		},
		{
			title: <h3>Status</h3>,
			dataIndex: 'status',
		},
		{
			title: <h3>Address</h3>,
			dataIndex: 'address',
		},
		{
			title: <h3>Delivery Date</h3>,
			render: (data) => <p>{data?.delivery_date.split('T')[0]}</p>,
		},
		{
			title: <h3>Due Boxes</h3>,
			dataIndex: 'due_boxes',
		},
		{
			title: <h3>Leader Phone Number</h3>,
			dataIndex: 'leaderPhoneNumber',
		},
		{
			render: (data) => (
				<div>
					<Button
						onClick={() => {
							setConfirmDeliver(true);
							setConfirmData({
								...confirmData,
								id: data?.team_id,
								team_name: data?.team_name,
								address: data?.address,
							});
						}}
						style={{ marginRight: '10px' }}
					>
						Deliver
					</Button>
					<Button
						onClick={() => {
							setOrderList(data.orderList);
							setOpen(true);
						}}
					>
						User order list
					</Button>
				</div>
			),
		},
	];
	const mobileColumns: TableColumnsType<DataType> = [
		{
			title: 'Order Details',
			render: (data: any) => {
				return (
					<div>
						<h4>Team Name : {data.team_name}</h4>
						<p>Team Leader : {data.leaderName}</p>
						<p>Address : {data.address}</p>
						<p>Order : {data.order_count}</p>
						<p>Delivery Date: {data?.delivery_date.split('T')[0]}</p>
						<p>Status: {data.status}</p>
						<p>Due Boxes : {data.due_boxes}</p>
						<p>Leader Phone Number : {data.leaderPhoneNumber}</p>
						<Button
							onClick={() => {
								setConfirmDeliver(true);
								setConfirmData({
									...confirmData,
									id: data?.team_id,
									team_name: data?.team_name,
									address: data?.address,
								});
							}}
							style={{ marginRight: '10px' }}
						>
							Deliver
						</Button>
						<Button
							onClick={() => {
								setOrderList(data.orderList);
								setOpen(true);
							}}
						>
							User order list
						</Button>
					</div>
				);
			},
		},
	];
	const handleOk = async () => {
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
		setConfirmDeliver(false);
	};
	return (
		<Card
			title={
				<h2 style={{ textAlign: 'center', padding: '15px' }}>Manage Order</h2>
			}
		>
			<Modal open={open} onOk={handleOk} onCancel={handleCancel} okText={'OK'}>
				<Card
					style={{ margin: '30px 0' }}
					title={
						<div>
							<h4>User order list</h4>
						</div>
					}
				>
					<div>
						{orderList.map((order: any) => (
							<div>
								<h5>User name : {order?.user_name}</h5>
								<h5>Phone : {order?.user_phone}</h5>
								<hr style={{ margin: '15px 0' }} />
							</div>
						))}
					</div>
				</Card>
			</Modal>
			<Modal
				title="Confirm Deliver Order"
				open={confirmDeliver}
				onOk={handleDeliverOrder}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				okText={'Confirm'}
			>
				<div>
					<h5>Team name : {confirmData?.team_name}</h5>
					<h5>Address : {confirmData?.address}</h5>
				</div>
			</Modal>
			<Flex gap={10}>
				<Input
					placeholder="Search a team"
					style={{ maxWidth: '350px' }}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				/>
			</Flex>
			<div style={{ marginTop: '10px' }}>
				<Radio.Group value={status} onChange={handleSizeChange}>
					<Radio.Button value="pending">Pending</Radio.Button>
					<Radio.Button value="received">Received</Radio.Button>
					<Radio.Button value="canceled">Canceled</Radio.Button>
				</Radio.Group>
			</div>
			<div style={{ marginTop: '15px' }}>
				{isMobile ? (
					<Table columns={mobileColumns} dataSource={data} />
				) : (
					<Table columns={columns} dataSource={data} />
				)}
			</div>
		</Card>
	);
};

export default OrderManagement;
