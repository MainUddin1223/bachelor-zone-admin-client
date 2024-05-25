import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const Dashboard = () => {
	const today = dayjs(Date.now()).format('DD-MM-YYYY');
	return (
		<Card
			title={
				<h1 style={{ textAlign: 'center' }}>Overall Summary of {today}</h1>
			}
		>
			<div>
				<Row gutter={[10, 10]} justify={'center'}>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Today's Total Order</h3>}>
							<h3>250</h3>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Delivery Completed</h3>}>
							<h3>350</h3>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Delivery Remaining</h3>}>
							<h3>150</h3>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Today's Total Cost</h3>}>
							<h3>12000</h3>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Today's Total Deposit</h3>}>
							<h3>5000</h3>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Total Users</h3>}>
							<h3>130</h3>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Total Team</h3>}>
							<h3>10</h3>
						</Card>
					</Col>
					<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
						<Card title={<h3>Dew Boxes</h3>}>
							<h3>18</h3>
						</Card>
					</Col>
				</Row>
			</div>
		</Card>
	);
};

export default Dashboard;
