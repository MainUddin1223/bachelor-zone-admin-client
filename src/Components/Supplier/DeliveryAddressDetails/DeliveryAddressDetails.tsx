'use client';

import { useGetDeliveryPointByIdQuery } from '@/redux/api/supplierApi';
import locationImg from '@/assets/location.png';
import Image from 'next/image';
import { Button, Card, Col, Flex, Input, Modal, Row, message } from 'antd';
import { useEffect, useState } from 'react';
import Spinner from '@/Components/Spinner/Spinner';
import { useDeliverOrderMutation } from '@/redux/api/adminApi';

const DeliveryAddressDetails = ({ addressId }: { addressId: number }) => {
	const [orderData, setOrderData] = useState([]);
	const [teamData, setTeamData] = useState<any>();
	const [teams, setTeams] = useState([]);
	const [openConfirmation, setOpenConfirmation] = useState(false);
	const [confirming, setConfirming] = useState(false);
	const [open, setOpen] = useState(false);
	const [deliverOrder] = useDeliverOrderMutation();

	const { data, isLoading } = useGetDeliveryPointByIdQuery(addressId);
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

	const handleDeliver = async (id: number) => {
		setConfirming(true);
		const result: any = await deliverOrder(id);
		if (!result.success) {
			message.error(result.message);
		} else {
			message.success('Order deliver successfully');
		}
		setConfirming(false);
		setOpenConfirmation(false);
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
					{/* confirm deliver modal */}
					<Modal
						open={openConfirmation}
						confirmLoading={confirming}
						okText={<span style={{ color: 'white' }}>Confirm Deliver</span>}
						onOk={() => handleDeliver(teamData.id)}
						onCancel={() => setOpenConfirmation(false)}
						title={<h4>Team details</h4>}
					>
						<div>
							<h3>Team Name : {teamData?.name}</h3>
							<h4>Total Member : {teamData?.member}</h4>
							<h4>Team leader : {teamData?.leader?.name}</h4>
							<h4>Team leader Phone: {teamData?.leader?.phone}</h4>
							<h4>
								Total Pending Order :{' '}
								{teamData?.totalPendingOrder == 0 ? (
									'0'
								) : (
									<span style={{ color: 'red' }}>
										{teamData?.totalPendingOrder}
									</span>
								)}
							</h4>
						</div>
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
											<h4>
												Total Pending Order :{' '}
												{team?.totalPendingOrder == 0 ? (
													'0'
												) : (
													<span style={{ color: 'red' }}>
														{team?.totalPendingOrder}
													</span>
												)}
											</h4>
											<h4>Due Boxes : {team?.due_boxes}</h4>
											<Flex gap={10}>
												<Button
													style={{ marginTop: '10px' }}
													onClick={() => {
														setOrderData(team?.order);
														setOpen(true);
													}}
												>
													<p>See Order details</p>
												</Button>
												<Button
													disabled={team?.totalPendingOrder == 0 ? true : false}
													style={{ marginTop: '10px' }}
													onClick={() => {
														setTeamData(team);
														setOpenConfirmation(true);
													}}
													type="primary"
												>
													<p style={{ color: 'white' }}>Deliver Order</p>
												</Button>
											</Flex>
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
