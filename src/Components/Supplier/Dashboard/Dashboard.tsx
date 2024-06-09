'use client';

import Spinner from '@/Components/Spinner/Spinner';
import { useGetAdminStaticsQuery } from '@/redux/api/adminApi';
import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs';

const Dashboard = () => {
	const today = dayjs(Date.now()).format('DD-MM-YYYY');
	const { data, isLoading } = useGetAdminStaticsQuery(undefined);
	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<Card>
					<div>
						<h2>SUPPLIER INFO</h2>
						<div>
							<h3>Name : {data?.name}</h3>
							<h3>Phone : {data?.phone}</h3>
						</div>
					</div>
					<h2 style={{ margin: '10px 0' }}>Statics</h2>
					<Row gutter={[10, 10]}>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={'Total Delivery address'}>
								<h2 style={{ textAlign: 'center' }}>{data?.totalAddress}</h2>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={'Total Teams'}>
								<h2 style={{ textAlign: 'center' }}>{data?.totalTeam}</h2>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={'Total Users'}>
								<h2 style={{ textAlign: 'center' }}>{data?.totalUser}</h2>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={'Total Pending Order'}>
								<h2 style={{ textAlign: 'center' }}>{data?.pendingOrder}</h2>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={'Total Ready to Pickup Order'}>
								<h2 style={{ textAlign: 'center' }}>{data?.readyToPickUp}</h2>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={'Total Collected Orders'}>
								<h2 style={{ textAlign: 'center' }}>
									{data?.totalPickedOrder}
								</h2>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={`Today's Due Transaction`}>
								<h2 style={{ textAlign: 'center' }}>
									{data?.todayTransactionSum}
								</h2>
							</Card>
						</Col>
						<Col xs={24} sm={12} md={8} xxl={6}>
							<Card title={`Total Due Transaction`}>
								<h2 style={{ textAlign: 'center' }}>{data?.transactionSum}</h2>
							</Card>
						</Col>
					</Row>
				</Card>
			)}
		</div>
	);
};

export default Dashboard;
