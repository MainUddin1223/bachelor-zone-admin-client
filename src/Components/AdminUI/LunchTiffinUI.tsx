'use client';
import { Button, DatePicker, Table } from 'antd';
import type { DatePickerProps, TableColumnsType } from 'antd';
import CommonMealUI from './CommonMealUI';

interface DataType {
	key: React.Key;
	name: string;
	address: string;
	leader_name: string;
	phone: string;
	amount: number;
	status: 'pending' | 'received';
}

interface MobileDataType {
	key: React.Key;
	details: Partial<DataType>;
}

const mobileData: MobileDataType[] = [
	{
		key: 1,
		details: {
			name: 'Team mafia',
			address: 'basundora',
			leader_name: 'Hakim',
			phone: '+8801728276573',
			amount: 10,
			status: 'pending',
		},
	},
	{
		key: 2,
		details: {
			name: 'Team mafia',
			address: 'basundora',
			leader_name: 'Hakim',
			phone: '+8801728276573',
			amount: 10,
			status: 'pending',
		},
	},
	{
		key: 3,
		details: {
			name: 'Team mafia',
			address: 'basundora',
			leader_name: 'Hakim',
			phone: '+8801728276573',
			amount: 10,
			status: 'pending',
		},
	},
	{
		key: 4,
		details: {
			name: 'Team mafia',
			address: 'basundora',
			leader_name: 'Hakim',
			phone: '+8801728276573',
			amount: 10,
			status: 'pending',
		},
	},
];

const data: DataType[] = [
	{
		key: 1,
		name: 'Team mafia',
		address: 'basundora',
		leader_name: 'Hakim',
		phone: '+8801728276573',
		amount: 10,
		status: 'pending',
	},
];

const personData: any[] = [
	{
		key: 1,
		name: 'Abdullah',
		address: 'basundora',
		phone: '+8801728276573',
		status: 'pending',
	},
];

const personMobileData: any[] = [
	{
		key: 1,
		details: {
			name: 'Abdullah',
			address: 'basundora',
			phone: '+8801728276573',
			status: 'pending',
		},
	},
];

const Meals = ({ receiverType }: { receiverType: string }) => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;

	const updatePersonLunchStatus = (id: number) => {
		console.log(`This is person meal ${id}`);
	};

	const updateLunchStatus = (id: any) => {
		console.log(`This is team meal ${id}`);
	};

	const columns: TableColumnsType<DataType> = [
		{
			title: <h3>Team Name</h3>,
			dataIndex: 'name',
		},
		{
			title: <h3>Address</h3>,
			dataIndex: 'address',
		},
		{
			title: <h3>Team Leader</h3>,
			dataIndex: 'leader_name',
		},
		{
			title: <h3>Phone number</h3>,
			dataIndex: 'phone',
		},
		{
			title: <h3>Amount</h3>,
			dataIndex: 'amount',
		},
		{
			title: <h3>Status</h3>,
			dataIndex: 'status',
		},
		{
			title: '',
			render: (data) => {
				return (
					<div>
						{data.status == 'pending' ? (
							<Button onClick={() => updateLunchStatus(data.key)}>
								Deliver
							</Button>
						) : (
							<Button danger>Received</Button>
						)}
					</div>
				);
			},
		},
	];

	const personColumns: TableColumnsType<any> = [
		{
			title: <h3>Name</h3>,
			dataIndex: 'name',
		},
		{
			title: <h3>Address</h3>,
			dataIndex: 'address',
		},
		{
			title: <h3>Phone number</h3>,
			dataIndex: 'phone',
		},
		{
			title: <h3>Status</h3>,
			dataIndex: 'status',
		},
		{
			title: '',
			render: (data) => {
				return (
					<div>
						{data.status == 'pending' ? (
							<Button onClick={() => updatePersonLunchStatus(data.key)}>
								Deliver
							</Button>
						) : (
							<Button danger>Received</Button>
						)}
					</div>
				);
			},
		},
	];

	const mobileColumns: TableColumnsType<MobileDataType> = [
		{
			title: (
				<>
					<h3>Team Info</h3>
				</>
			),
			dataIndex: 'details',
			render: (details, data) => (
				<div>
					<p>Team Name : {details?.name}</p>
					<p>Address: {details?.address}</p>
					<p>
						<p>Team Leader: {details?.leader_name}</p>
						<p>Phone: {details?.phone}</p>
						Amount
						{details?.amount}
					</p>
					<p>Status: {details?.status}</p>
					{details?.status == 'pending' ? (
						<Button onClick={() => updateLunchStatus(data.key)}>Deliver</Button>
					) : (
						<Button danger>Received</Button>
					)}
				</div>
			),
		},
	];

	const personMobileColumns: TableColumnsType<any> = [
		{
			title: (
				<>
					<h3>Details</h3>
				</>
			),
			dataIndex: 'details',
			render: (details, data) => (
				<div>
					<p>Name : {details?.name}</p>
					<p>Address: {details?.address}</p>
					<p>Phone: {details?.phone}</p>
					<p>Status: {details?.status}</p>
					{details?.status == 'pending' ? (
						<Button onClick={() => updatePersonLunchStatus(data.key)}>
							Deliver
						</Button>
					) : (
						<Button danger>Received</Button>
					)}
				</div>
			),
		},
	];

	return (
		<div>
			{receiverType === 'team' ? (
				<CommonMealUI
					columns={columns}
					data={data}
					mobileColumns={mobileColumns}
					mobileData={mobileData}
				/>
			) : (
				<CommonMealUI
					columns={personColumns}
					data={personData}
					mobileColumns={personMobileColumns}
					mobileData={personMobileData}
				/>
			)}
		</div>
	);
};

export default Meals;
