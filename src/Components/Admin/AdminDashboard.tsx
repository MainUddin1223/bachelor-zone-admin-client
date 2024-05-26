'use client';
import { useGetAdminStaticsQuery } from '@/redux/api/adminApi';
import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import Spinner from '../Spinner/Spinner';

const Dashboard = () => {
	const today = dayjs(Date.now()).format('DD-MM-YYYY');
	const { data, isLoading } = useGetAdminStaticsQuery(undefined);
	const result = data?.result;
	return (
		<Card
			title={
				<h1 style={{ textAlign: 'center' }}>Overall Summary of {today}</h1>
			}
		>
			<div style={{ position: 'relative' }}>
				{isLoading ? (
					<Spinner />
				) : (
					<div>
						<div>
							<h1 style={{ textAlign: 'center', marginBottom: '15px' }}>
								Order reports
							</h1>
							<Row gutter={[10, 10]} justify={'center'}>
								<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
									<Card title={<h3>Today's Total Order</h3>}>
										<h3>{result?.totalOrder}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
									<Card title={<h3>Delivery Completed</h3>}>
										<h3>{result?.deliveredOrder}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
									<Card title={<h3>Delivery Remaining</h3>}>
										<h3>{result?.remainingOrder}</h3>
									</Card>
								</Col>
							</Row>
						</div>
						<div>
							<h1 style={{ textAlign: 'center', margin: '15px 0' }}>
								Users and Team Info
							</h1>
							<Row gutter={[10, 10]} justify={'center'}>
								<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total Users</h3>}>
										<h3>{result?.totalUsers}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total Team</h3>}>
										<h3>{result?.totalTeam}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
									<Card title={<h3>Dew Boxes</h3>}>
										<h3>{result?.totalDueBoxes}</h3>
									</Card>
								</Col>
							</Row>
						</div>
						<div>
							<h1 style={{ textAlign: 'center', margin: '15px 0' }}>
								Overall Statics
							</h1>
							<Row gutter={[10, 10]} justify={'center'}>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Today's Total Deposit</h3>}>
										<h3>{result?.depositOfTheDay}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Today's Total Expenses</h3>}>
										<h3>{result?.costOfTheDay}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total earning of this month</h3>}>
										<h3>{result?.totalEarningOfTheMonth}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total Expenses of the month</h3>}>
										<h3>{result?.totalExpensesOfTheMonth}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total Earning</h3>}>
										<h3>{result?.totalEarning}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total Expenses</h3>}>
										<h3>{result?.totalExpenses}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total remaining Customer Balance</h3>}>
										<h3>{result?.totalRemainingBalance}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total Transaction</h3>}>
										<h3>{result?.totalTransaction}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Total service & Tiffin box Balance</h3>}>
										<h3>{result?.serviceAndBoxFee}</h3>
									</Card>
								</Col>
								<Col xs={24} sm={12} md={8} style={{ textAlign: 'center' }}>
									<Card title={<h3>Earning Status</h3>}>
										<h3>
											{result?.totalEarning - result?.totalExpenses > 0 ? (
												<span style={{ color: 'green' }}>
													{result?.totalEarning - result?.totalExpenses} Profit
												</span>
											) : (
												<span style={{ color: 'red' }}>
													{result?.totalExpenses - result?.totalEarning} Loss
												</span>
											)}
										</h3>
									</Card>
								</Col>
							</Row>
						</div>
					</div>
				)}
			</div>
		</Card>
	);
};

export default Dashboard;
