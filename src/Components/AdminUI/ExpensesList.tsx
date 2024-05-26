'use client';
import { useGetExpensesQuery } from '@/redux/api/adminApi';
import { Table, type TableColumnsType } from 'antd';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';

interface DataType {
	key: React.Key;
	product_name: string;
	quantity: string;
	date: string;
	amount: number;
}

const ExpensesList = ({
	setTotalExpense,
	setTotalEarning,
}: {
	setTotalExpense: any;
	setTotalEarning: any;
}) => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;
	const query: Record<string, any> = {};
	const [page, setPage] = useState<number>(1);
	const onPaginationChange = (page: number) => {
		setPage(page);
	};

	const columns: TableColumnsType<DataType> = [
		{
			title: <h3>Product Name</h3>,
			dataIndex: 'product_name',
		},
		{
			title: <h3>Quantity</h3>,
			dataIndex: 'quantity',
		},
		{
			title: <h3>Amount</h3>,
			dataIndex: 'amount',
		},
		{
			title: <h3>Date</h3>,
			dataIndex: 'date',
		},
	];
	const mobileColumns: TableColumnsType<DataType> = [
		{
			title: 'Product Details',
			render: (data: DataType) => {
				return (
					<div>
						<h4>Product Name : {data.product_name}</h4>
						<p>Product Quantity : {data.quantity}</p>
						<p>Amount : {data.amount}</p>
						<p>Date : {data.date}</p>
					</div>
				);
			},
		},
	];
	query['page'] = page;
	const { data, isLoading } = useGetExpensesQuery({ ...query });
	if (isLoading) {
		return <Spinner />;
	}
	const result = data?.result;
	const meta = data?.meta;
	const paginationConfig = {
		pageSize: meta?.size,
		total: meta?.total,
		onChange: onPaginationChange,
	};
	setTotalExpense(result?.totalExpensesOfTheMonth);
	setTotalEarning(result?.totalEarningOfTheMonth);
	return (
		<div>
			{isMobile ? (
				<Table
					columns={mobileColumns}
					dataSource={result?.expenses}
					pagination={paginationConfig}
				/>
			) : (
				<Table
					columns={columns}
					dataSource={result?.expenses}
					pagination={paginationConfig}
				/>
			)}
		</div>
	);
};

export default ExpensesList;
