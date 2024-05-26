'use client';

import {
	Button,
	Card,
	DatePicker,
	DatePickerProps,
	Flex,
	Select,
	Table,
	TableColumnsType,
	Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { Input } from 'antd';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import { useGetTeamOrdersQuery } from '@/redux/api/adminApi';

const Lunch_tiffin = () => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 1000;
	const defaultValue = dayjs(Date.now());
	const todayDate = defaultValue.format();
	const formatDate = todayDate.split('T')[0];
	const query: Record<string, any> = {};
	const [orderDate, setOrderDate] = useState<any>(formatDate);

	const [searchTerm, setSearchTerm] = useState<string>('');
	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 1000,
	});

	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}
	query['status'] = status;
	query['date'] = orderDate;

	const { data: result, isLoading } = useGetTeamOrdersQuery({ ...query });
	const data = result?.orders;
	const columns: TableColumnsType<any> = [
		{
			title: <h3>Delivery Date</h3>,
			render: (data) => {
				return <p>{data?.user?.name}</p>;
			},
		},
		{
			title: <h3>User Phone</h3>,
			render: (data) => {
				return <p>{data?.user?.phone}</p>;
			},
		},
		{
			title: <h3>Status</h3>,
			dataIndex: 'status',
		},
		{
			title: <h3>Address</h3>,
			render: (data) => {
				return <p>{data?.team?.address?.address}</p>;
			},
		},
		{
			title: <h3>Delivery Date</h3>,
			render: (data) => {
				return <p>{data?.delivery_date.split('T')[0]}</p>;
			},
		},
	];
	const mobileColumns: TableColumnsType<any> = [
		{
			title: 'Order Details',
			render: (data: any) => {
				return (
					<div>
						<h4>User name: {data?.user?.name}</h4>
						<p>User Phone : {data?.user?.phone}</p>
						<p>Status: {data?.status}</p>
						<p>Address : {data?.team?.address?.address}</p>
						<p>Delivery Date: {data?.delivery_date.split('T')[0]}</p>
					</div>
				);
			},
		},
	];
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		setOrderDate(date);
	};
	return (
		<div>
			<Flex gap={10} style={{ margin: '15px 0' }}>
				<Input
					placeholder="Search a team"
					style={{ maxWidth: '350px' }}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
				/>
				<DatePicker onChange={onChange} defaultValue={defaultValue} />
			</Flex>
			<div style={{ marginTop: '15px' }}>
				{isMobile ? (
					<Table columns={mobileColumns} dataSource={data} />
				) : (
					<Table columns={columns} dataSource={data} />
				)}
			</div>
		</div>
	);
};

export default Lunch_tiffin;
