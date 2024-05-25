'use client';
import { Table, type TableColumnsType } from 'antd';

interface DataType {
	key: React.Key;
	product_name: string;
	quantity: string;
	date: string;
	price: number;
}

const data: DataType[] = [
	{
		key: 1,
		product_name: 'Ruhi Fish',
		quantity: '3 kg',
		date: '18-03-2024',
		price: 10,
	},
	{
		key: 2,
		product_name: ' Chicken',
		quantity: '3 kg',
		date: '18-03-2024',
		price: 10,
	},
];

const ExpensesList = () => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;

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
			title: <h3>Price</h3>,
			dataIndex: 'price',
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
						<p>Price : {data.price}</p>
						<p>Date : {data.date}</p>
					</div>
				);
			},
		},
	];

	return (
		<div>
			{isMobile ? (
				<Table columns={mobileColumns} dataSource={data} />
			) : (
				<Table columns={columns} dataSource={data} />
			)}
		</div>
	);
};

export default ExpensesList;
