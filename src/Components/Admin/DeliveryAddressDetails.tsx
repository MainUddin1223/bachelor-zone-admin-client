'use client';

import { useGetDeliveryPointByIdQuery } from '@/redux/api/supplierApi';
import locationImg from '@/assets/location.png';
import Image from 'next/image';
import { Button, Card, Col, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';

const DeliveryAddressDetails = ({ addressId }: { addressId: number }) => {
	const { data, isLoading } = useGetDeliveryPointByIdQuery(addressId);
	const [orderData, setOrderData] = useState([]);
	const [teams, setTeams] = useState([]);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setTeams(data?.Teams);
	}, [data]);
	const handleSearch = (value: string) => {
		const lowercasedValue = value.toLowerCase();
		const findTeams = data.Teams.filter((team: { name: string }) =>
			team.name.toLowerCase().includes(lowercasedValue)
		);
		setTeams(findTeams);
	};
	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<div>
					<Modal
						cancelButtonProps={{ style: { display: 'none' } }}
						open={open}
						onOk={() => setOpen(false)}
						onCancel={() => setOpen(false)}
						title={<h4>Order Details</h4>}
					>
						{orderData.length ? (
							<div>
								{orderData.map((order: any, index: number) => (
									<div key={index}>
										<h5>User Name : {order?.user?.name}</h5>
										<h5>User Phone : {order?.user?.phone}</h5>
										<h5>Order status : {order?.status}</h5>
										<hr style={{ margin: '15px 0' }} />
									</div>
								))}
							</div>
						) : (
							<h3>No order available</h3>
						)}
					</Modal>
					<div>
						<div style={{ display: 'flex', gap: '5px' }}>
							<Image
								style={{ marginTop: '7px' }}
								src={locationImg}
								alt="location"
								width={25}
							/>
							<h1>{data?.address}</h1>
						</div>
						<div style={{ marginLeft: '5px' }}>
							<h4>Supplier : {data?.supplierName}</h4>
							<h4>Supplier Phone: {data?.supplierPhone}</h4>
						</div>
					</div>
					<div style={{ marginLeft: '5px' }}>
						<h2 style={{ margin: '15px 0' }}>Teams</h2>
						<Input
							onChange={(e) => handleSearch(e.target.value)}
							placeholder="Search a team"
							style={{ maxWidth: '370px', marginBottom: '15px' }}
						/>
					</div>
					<div style={{ marginLeft: '5px' }}>
						<Row gutter={[10, 10]}>
							{teams?.map((team: any, index: number) => (
								<Col xs={24} sm={12} lg={8} xxl={6}>
									<Card>
										<div key={index}>
											<h3>Team Name : {team?.name}</h3>
											<h4>Total Member : {team?.member}</h4>
											<h4>Team leader : {team?.leader?.name}</h4>
											<h4>Team leader Phone: {team?.leader?.phone}</h4>
											{team?.totalPendingOrder > 0 ? (
												<h4>
													Total Pending Order :{' '}
													<span style={{ color: 'red' }}>
														{team?.totalPendingOrder}
													</span>
												</h4>
											) : (
												<></>
											)}

											{team?.pickUp_status ? (
												<h4>
													Total Ready to pickup Order :{' '}
													<span style={{ color: 'red' }}>
														{team?.totalDeliverOrder}
													</span>
												</h4>
											) : (
												<></>
											)}
											<h4>Due Boxes : {team?.due_boxes}</h4>

											<h4>Total Canceled Order : {team?.totalCanceledOrder}</h4>
											<Button
												style={{ marginTop: '10px' }}
												onClick={() => {
													setOrderData(team?.order);
													setOpen(true);
												}}
												type="primary"
											>
												<p style={{ color: 'white' }}>See Order details</p>
											</Button>
										</div>
									</Card>
								</Col>
							))}
						</Row>
					</div>
				</div>
			)}
		</div>
	);
};

export default DeliveryAddressDetails;
