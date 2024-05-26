'use client';
import { Button, Card, Col, Input, Modal, Row, message } from 'antd';
import { useState } from 'react';
import ExpensesList from '../AdminUI/ExpensesList';
import Styles from '../AdminCSS/CostManagement.module.css';
import { useAddExpenseMutation } from '@/redux/api/adminApi';

const CostManagement = () => {
	const [totalExpenses, setTotalExpense] = useState(0);
	const [addExpense] = useAddExpenseMutation();
	const [newExpenses, setNewExpenses] = useState({
		product_name: '',
		quantity: '',
		amount: 0,
	});

	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const handleOk = async () => {
		setConfirmLoading(true);
		const result: any = await addExpense(newExpenses);
		if (result?.data?.success) {
			message.success(result?.data?.message);
		} else {
			message.error('Failed to add expenses');
		}
		setOpen(false);
		setConfirmLoading(false);
		setNewExpenses({ product_name: '', quantity: '', amount: 0 });
	};
	return (
		<Card
			title={
				<h1 style={{ padding: '10px', textAlign: 'center' }}>
					Cost Management
				</h1>
			}
		>
			<Modal
				title="Are you sure to add the cost"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={() => setOpen(false)}
			>
				<h3>Product Name : {newExpenses?.product_name}</h3>
				<h3>Product Quantity : {newExpenses?.quantity}</h3>
				<h3>Amount : {newExpenses?.amount}</h3>
			</Modal>
			<Row gutter={[15, 15]}>
				<Col xs={24} sm={8}>
					<Card title={<h5>Total Expenses</h5>}>{totalExpenses} TK</Card>
				</Col>
			</Row>
			<div className={Styles.product_input_container}>
				<Card title={<h4>List new expenses</h4>}>
					<div>
						<div className={Styles.product_input_container}>
							<p>Product Name</p>
							<Input
								placeholder="Product name"
								value={newExpenses.product_name}
								onChange={(event) => {
									setNewExpenses({
										...newExpenses,
										product_name: event.target.value,
									});
								}}
							/>
						</div>
						<Row gutter={15}>
							<Col xs={24} md={12}>
								<div className={Styles.product_input_container}>
									<p>Product Quantity</p>
									<Input
										value={newExpenses.quantity}
										placeholder="Product quantity"
										onChange={(event) => {
											setNewExpenses({
												...newExpenses,
												quantity: event.target.value,
											});
										}}
									/>
								</div>
							</Col>
							<Col xs={24} md={12}>
								<div className={Styles.product_input_container}>
									<p>Product Price</p>
									<Input
										placeholder="Product price"
										value={newExpenses.amount}
										type="number"
										onChange={(event) => {
											setNewExpenses({
												...newExpenses,
												amount: Number(event.target.value),
											});
										}}
									/>
								</div>
							</Col>
						</Row>
						<Button onClick={() => setOpen(true)}>Submit</Button>
					</div>
				</Card>
			</div>
			<Card title={<h2>List of Expenses</h2>}>
				<ExpensesList setTotalExpense={setTotalExpense} />
			</Card>
		</Card>
	);
};

export default CostManagement;
