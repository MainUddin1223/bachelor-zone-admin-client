'use client';

import { useGetUsersQuery } from '@/redux/api/adminApi';
import { useDebounced } from '@/redux/hooks';
import {
	Button,
	Card,
	Flex,
	Input,
	Select,
	Space,
	Table,
	TableColumnsType,
} from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
interface DataType {
	key: React.Key;
	user_name: string;
	address: string;
	team: string;
	balance: number;
	status: 'claimed' | 'pending';
}

const UserManagementUI = () => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;
	const [page, setPage] = useState<number>(1);
	const router = useRouter();
	const [status, setStatus] = useState<any>('all');
	const query: Record<string, any> = {};
	const [searchTerm, setSearchTerm] = useState<string>('');
	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 1500,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}
	query['status'] = status;
	query['page'] = page;

	const { data, isLoading, isFetching } = useGetUsersQuery({ ...query });
	const result = data?.result;
	const meta = data?.meta;
	const onPaginationChange = (page: number) => {
		setPage(page);
	};
	const paginationConfig = {
		pageSize: meta?.size,
		total: meta?.total,
		onChange: onPaginationChange,
	};

	const columns: TableColumnsType<DataType> = [
		{
			title: <h3>User Name</h3>,
			dataIndex: 'name',
		},
		{
			title: <h3>Phone</h3>,
			dataIndex: 'phone',
		},
		{
			title: <h3>Team</h3>,
			dataIndex: 'teamName',
		},
		{
			title: <h3>Address</h3>,
			dataIndex: 'address',
		},
		{
			title: <h3>Balance</h3>,
			dataIndex: 'balance',
		},
		{
			title: <h3>Status</h3>,
			render: (data) => <div>{data?.status ? 'Claimed' : 'Unclaimed'}</div>,
		},
		{
			title: 'Details',
			render: (data) => (
				<div>
					{data?.status ? (
						<Button onClick={() => router.push(`user_management/${data.id}`)}>
							Details
						</Button>
					) : (
						<Button
							type="primary"
							onClick={() =>
								router.push(`user_management/claim_user/${data.id}`)
							}
						>
							Claim user
						</Button>
					)}
				</div>
			),
		},
	];
	const mobileColumns: TableColumnsType<DataType> = [
		{
			title: 'Product Details',
			render: (data: any) => {
				return (
					<div>
						<h4>User Name : {data.name}</h4>
						<p>Phone : {data.phone}</p>
						<p>Team : {data.teamName}</p>
						<p>Address : {data.address}</p>
						<p>Balance : {data.balance}</p>
						<p>Status : {data.status ? 'Claimed' : 'Unclaimed'}</p>
						<Button onClick={() => router.push(`user_management/${data.id}`)}>
							Details
						</Button>
					</div>
				);
			},
		},
	];

	const handleChange = (value: string) => {
		setStatus(value);
	};
	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<Card
					title={
						<h1 style={{ padding: '10px', textAlign: 'center' }}>
							User Management
						</h1>
					}
				>
					<Select
						defaultValue={status}
						style={{ width: 120 }}
						onChange={handleChange}
						options={[
							{ value: 'all', label: 'All Users' },
							{ value: 'claimed', label: 'Claimed Users' },
							{ value: 'unclaimed', label: 'Unclaimed User' },
						]}
					/>
					<Flex gap={10} style={{ margin: '15px 0' }}>
						<Input
							placeholder="Search a User"
							style={{ maxWidth: '350px' }}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Flex>
					{isFetching ? (
						<Spinner />
					) : (
						<div>
							{isMobile ? (
								<Table
									columns={mobileColumns}
									dataSource={result}
									pagination={paginationConfig}
								/>
							) : (
								<Table
									columns={columns}
									dataSource={result}
									pagination={paginationConfig}
								/>
							)}
						</div>
					)}
				</Card>
			)}
		</>
	);
};

export default UserManagementUI;
