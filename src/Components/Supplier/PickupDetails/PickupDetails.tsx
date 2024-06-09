'use client';

import {
	useGetPickupPointByIdQuery,
	usePickupBoxesMutation,
} from '@/redux/api/supplierApi';
import locationImg from '@/assets/location.png';
import Image from 'next/image';
import {
	Button,
	Card,
	Col,
	Input,
	Modal,
	Radio,
	RadioChangeEvent,
	Row,
	message,
} from 'antd';
import { useEffect, useState } from 'react';
import Spinner from '@/Components/Spinner/Spinner';

const PickupDetails = ({ addressId }: { addressId: number }) => {
	const { data, isLoading } = useGetPickupPointByIdQuery(addressId);
	const [orderData, setOrderData] = useState([]);
	const [teams, setTeams] = useState([]);
	const [open, setOpen] = useState(false);
	const [teamData, setTeamData] = useState<any>();
	const [openConfirmPickup, setOpenConfirmPickup] = useState(false);
	const [confirming, setConfirming] = useState(false);
	const [pickupBoxes] = usePickupBoxesMutation();
	const [defaultSelected, setDefaultSelected] = useState('all');

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

	const handleConfirm = async (id: number) => {
		setConfirming(true);
		const result: any = await pickupBoxes(id);
		if (!result?.data?.success) {
			message.error(result?.data?.message);
		} else {
			message.success('Order pickup successfully');
		}
		setOpenConfirmPickup(false);
		setConfirming(false);
	};

	const handleFilter = (e: RadioChangeEvent) => {
		setDefaultSelected(e.target.value);
		if (e.target.value == 'all') {
			setTeams(data?.Teams);
		} else {
			const findTeams = data.Teams.filter(
				(team: { totalAvailableOrderForPickup: number }) =>
					team.totalAvailableOrderForPickup > 0
			);
			setTeams(findTeams);
		}
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
					{/* confirm pickup Modal */}
					<Modal
						open={openConfirmPickup}
						confirmLoading={confirming}
						onOk={() => handleConfirm(teamData?.id)}
						okText={<p style={{ color: 'white' }}>Confirm Pickup</p>}
						onCancel={() => setOpenConfirmPickup(false)}
						title={<h4>Confirm Pickup</h4>}
					>
						<div>
							<h3>Address : {data?.address}</h3>
							<h3>Team Name : {teamData?.name}</h3>
							<h3>
								Total Pickup boxes : {teamData?.totalAvailableOrderForPickup}
							</h3>
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
						<div style={{ display: 'block' }}>
							<Radio.Group
								value={defaultSelected}
								style={{ marginBottom: '15px' }}
								onChange={handleFilter}
							>
								<Radio.Button value="all">All teams</Radio.Button>
								<Radio.Button value="pickup">Available for pickup</Radio.Button>
							</Radio.Group>
							<Input
								onChange={(e) => handleSearch(e.target.value)}
								placeholder="Search a team"
								style={{ maxWidth: '370px', marginBottom: '15px' }}
							/>
						</div>
					</div>
					<div style={{ marginLeft: '5px' }}>
						<Row gutter={[10, 10]}>
							{data?.Teams?.length ? (
								teams?.map((team: any, index: number) => (
									<Col xs={24} sm={12} lg={8} xxl={6}>
										<Card>
											<div key={index}>
												<h3>Date : {team?.date.split('T')[0]}</h3>
												<h3>Team Name : {team?.name}</h3>
												<h4>Total Member : {team?.member}</h4>
												<h4>Team leader : {team?.leader?.name}</h4>
												<h4>Team leader Phone: {team?.leader?.phone}</h4>
												<h4>
													Total available for pickup :{' '}
													{team?.totalAvailableOrderForPickup}
												</h4>
												<h4>Due Boxes : {team?.due_boxes}</h4>
												<div style={{ display: 'flex', gap: '5px' }}>
													<Button
														disabled={
															team?.totalAvailableOrderForPickup == 0
																? true
																: false
														}
														style={{ marginTop: '10px' }}
														onClick={() => {
															setOrderData(team?.order);
															setOpen(true);
														}}
													>
														<p>See Order details</p>
													</Button>
													<Button
														disabled={
															team?.totalAvailableOrderForPickup == 0
																? true
																: false
														}
														style={{ marginTop: '10px' }}
														onClick={() => {
															setTeamData(team);
															setOpenConfirmPickup(true);
														}}
														type="primary"
													>
														<p style={{ color: 'white' }}>Pickup Orders</p>
													</Button>
												</div>
											</div>
										</Card>
									</Col>
								))
							) : (
								<h3 style={{ display: 'block', margin: '100px auto' }}>
									No Teams found
								</h3>
							)}
						</Row>
					</div>
				</div>
			)}
		</div>
	);
};

export default PickupDetails;
