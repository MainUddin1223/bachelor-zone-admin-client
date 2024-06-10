'use client';

import Spinner from '@/Components/Spinner/Spinner';
import { useGetTransactionsQuery } from '@/redux/api/supplierApi';
import { useDebounced } from '@/redux/hooks';
import { Flex, Input, Table, TableColumnsType } from 'antd';
import { useState } from 'react';

const Transaction = () => {
	const query: Record<string, any> = {};
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [page, setPage] = useState<number>(1);

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 3000,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}
	query['page'] = page;
	const onPaginationChange = (page: number) => {
		setPage(page);
	};
	const { data, isLoading } = useGetTransactionsQuery({ ...query });
	console.log(data);
	const result = data?.result;
	const meta = data?.meta;

	const mobileColumns: TableColumnsType<any> = [
		{
			render: (data: any) => {
				return (
					<div>
						<h4>Transaction Date : {data?.date.split('T')[0]}</h4>
						<p>
							<b>Amount : {data?.amount}</b>
						</p>
						<p>
							Status :{' '}
							{data?.status == 'paid' ? (
								<span
									style={{
										color: 'green',
										fontWeight: 'bold',
										textTransform: 'capitalize',
									}}
								>
									{data?.status}
								</span>
							) : (
								<span
									style={{
										color: 'red',
										fontWeight: 'bold',
										textTransform: 'capitalize',
									}}
								>
									{data?.status}
								</span>
							)}
						</p>
						<p>User Name : {data?.user?.name}</p>
						<p>User Phone Number : {data?.user?.phone}</p>
					</div>
				);
			},
		},
	];

	const paginationConfig = {
		pageSize: meta?.size,
		total: meta?.total,
		onChange: onPaginationChange,
	};

	return (
		<div>
			<h1 style={{ textAlign: 'center', margin: '15px' }}>Transactions</h1>
			<Flex gap={10}>
				<Input
					style={{ maxWidth: '350px' }}
					onChange={(e) => {
						setSearchTerm(e.target.value);
					}}
					placeholder="Search an address"
				/>
			</Flex>
			<div>
				{isLoading ? (
					<Spinner />
				) : (
					<div>
						<Table
							columns={mobileColumns}
							dataSource={result}
							pagination={paginationConfig}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default Transaction;
