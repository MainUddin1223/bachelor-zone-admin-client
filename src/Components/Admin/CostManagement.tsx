'use client';
import { Button, Card, Col, Input, Row } from 'antd';
import { useState } from 'react';
import ExpensesList from '../AdminUI/ExpensesList';
import Styles from '../AdminCSS/CostManagement.module.css';

const CostManagement = () => {
	const [newExpenses, setNewExpenses] = useState({
		productName: '',
		productQuantity: '',
		price: 0,
	});
	return (
		<Card
			title={
				<h1 style={{ padding: '10px', textAlign: 'center' }}>
					Cost Management
				</h1>
			}
		>
			<Row gutter={[15, 15]}>
				<Col xs={24} sm={8}>
					<Card title={<h5>Today's Expenses</h5>}>1000 TK</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card title={<h5>Last 7 Days Expenses</h5>}>5000 TK</Card>
				</Col>
				<Col xs={24} sm={8}>
					<Card title={<h5>Last 30 Days Expenses</h5>}>10000 TK</Card>
				</Col>
			</Row>
			<div className={Styles.product_input_container}>
				<Card title={<h4>List new expenses</h4>}>
					<div>
						<div className={Styles.product_input_container}>
							<p>Product Name</p>
							<Input
								placeholder="Product name"
								onChange={(event) => {
									setNewExpenses({
										...newExpenses,
										productName: event.target.value,
									});
								}}
							/>
						</div>
						<Row gutter={15}>
							<Col xs={24} md={12}>
								<div className={Styles.product_input_container}>
									<p>Product Quantity</p>
									<Input
										placeholder="Product quantity"
										onChange={(event) => {
											setNewExpenses({
												...newExpenses,
												productQuantity: event.target.value,
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
										type="number"
										onChange={(event) => {
											setNewExpenses({
												...newExpenses,
												price: Number(event.target.value),
											});
										}}
									/>
								</div>
							</Col>
						</Row>
						<Button onClick={() => console.log(newExpenses)}>Submit</Button>
					</div>
				</Card>
			</div>
			<Card title={<h2>List of Expenses</h2>}>
				<ExpensesList />
			</Card>
		</Card>
	);
};

export default CostManagement;
