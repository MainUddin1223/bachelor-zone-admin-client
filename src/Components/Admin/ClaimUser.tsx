'use client';

import {
	useClaimUserMutation,
	useGetUnclaimedUserQuery,
} from '@/redux/api/adminApi';
import Spinner from '../Spinner/Spinner';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Input, Modal, Row, Select, message } from 'antd';
const { Option } = Select;

const ClaimUser = ({ userId }: { userId: number }) => {
	const [teams, setTeams] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [addresses, setAddresses] = useState<any[]>([]);
	const [claimUserPayload, setClaimUserPayload] = useState({
		id: userId,
		balance: 0,
		addressId: '',
		address: '',
		teamId: '',
		team: '',
		leader: '',
		leaderPhone: '',
		user: '',
		phone: '',
	});
	const [claimUser] = useClaimUserMutation();
	const { data, isLoading } = useGetUnclaimedUserQuery(userId);

	useEffect(() => {
		if (data?.team_member) {
			setTeams([data?.team_member]);
			setAddresses([data?.address]);
			setClaimUserPayload({
				...claimUserPayload,
				user: data?.user?.name,
				phone: data?.user?.phone,
				addressId: data?.address.id,
				address: data?.address?.address,
				teamId: data.team_member.id,
				team: data?.team_member?.name,
				leader: data.team_member?.leader?.name,
				leaderPhone: data.team_member?.leader?.phone,
				balance: data?.Balance,
			});
		} else if (data?.address) {
			setAddresses(data?.address);
			setTeams(data?.address[0]?.Team);
			setClaimUserPayload({
				...claimUserPayload,
				user: data?.authInfo?.name,
				phone: data?.authInfo?.phone,
			});
		}
	}, [data, isLoading]);

	const handleAddressChange = (value: number) => {
		if (addresses?.length > 1) {
			const address = addresses.find((address) => address.id == value);
			setClaimUserPayload({
				...claimUserPayload,
				address: address?.address,
				addressId: address?.id,
			});
			setTeams(addresses.find((address) => address.id == value)?.Team);
		}
	};

	const handleTeamChange = (value: number) => {
		const teamInfo = teams.find((team) => team.id == value);
		setClaimUserPayload({
			...claimUserPayload,
			teamId: teamInfo?.id,
			team: teamInfo?.name,
			leader: teamInfo?.leader?.name,
			leaderPhone: teamInfo?.leader?.phone,
		});
	};

	const handleOk = async () => {
		setConfirmLoading(true);
		const result: any = await claimUser({
			id: claimUserPayload?.id,
			balance: Number(claimUserPayload?.balance),
			addressId: claimUserPayload?.addressId,
			teamId: claimUserPayload?.teamId,
		});
		if (result?.data?.success) {
			message.success('success');
		} else {
			message.error(result?.data?.message);
		}
		setConfirmLoading(false);
		setOpen(false);
	};

	const handleCancel = () => {
		console.log('Clicked cancel button');
		setOpen(false);
	};

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<Card
					title={
						<h3 style={{ textAlign: 'center' }}>
							Claim {data?.authInfo?.name}'s account
						</h3>
					}
				>
					<Modal
						title={
							<h3>
								Are you sure to add {claimUserPayload?.user} in{' '}
								{claimUserPayload?.team} at {claimUserPayload?.address} ?
							</h3>
						}
						open={open}
						onOk={handleOk}
						confirmLoading={confirmLoading}
						onCancel={handleCancel}
					>
						<div>
							<h4>User : {claimUserPayload?.user}</h4>
							<h4>Balance : {claimUserPayload?.balance}</h4>
							<h4>Address : {claimUserPayload?.address}</h4>
							<h4>Team : {claimUserPayload?.team}</h4>
							<h4>Leader : {claimUserPayload?.leader}</h4>
						</div>
					</Modal>
					<div>
						<div>
							<h3>User name : {claimUserPayload?.user}</h3>
							<h3>Phone number : {claimUserPayload?.phone}</h3>
							<h3>Balance : {claimUserPayload?.balance}</h3>
							<h3>Address : {claimUserPayload?.address}</h3>
							<h3>Team : {claimUserPayload?.team}</h3>
							<h3>Team leader : {claimUserPayload?.leader}</h3>
							<h3>Leader phone : {claimUserPayload?.leaderPhone}</h3>
						</div>
						<Row gutter={[10, 10]}>
							<Col xs={24} lg={8}>
								<p>Balance</p>
								<Input
									value={
										claimUserPayload?.balance ? claimUserPayload?.balance : ''
									}
									onChange={(e: any) => {
										const numberRegex = /^(?:[0-9]\d*|)$/;
										const checkNumber = numberRegex.test(e.target.value);
										if (checkNumber) {
											setClaimUserPayload({
												...claimUserPayload,
												balance: e.target.value,
											});
										}
									}}
								/>
							</Col>
							<Col xs={24} lg={8}>
								<p>Address</p>

								{addresses.length > 0 ? (
									<Select
										style={{ minWidth: '100%' }}
										defaultValue={
											data?.team_member
												? addresses[0]?.address
												: 'Select an address'
										}
										onChange={handleAddressChange}
									>
										{addresses.map((option) => (
											<Option value={option.id} label={option.address}>
												{option.address}
											</Option>
										))}
									</Select>
								) : (
									<p>No address available</p>
								)}
							</Col>
							<Col xs={24} lg={8}>
								<p>Team</p>
								{teams.length > 0 ? (
									<Select
										style={{ minWidth: '100%' }}
										onChange={handleTeamChange}
										defaultValue={
											data?.team_member ? teams[0]?.name : 'Select a team'
										}
									>
										{teams.map((option) => (
											<Option value={option.id} label={option.name}>
												{option.name}
											</Option>
										))}
									</Select>
								) : (
									<p>No team available</p>
								)}
							</Col>
						</Row>
						<Button
							onClick={() => setOpen(true)}
							disabled={
								!claimUserPayload?.id ||
								!claimUserPayload?.balance ||
								claimUserPayload?.balance == 0 ||
								!claimUserPayload?.addressId ||
								!claimUserPayload?.teamId
									? true
									: false
							}
							style={{ margin: '15px auto', display: 'block' }}
						>
							Submit
						</Button>
					</div>
				</Card>
			)}
		</div>
	);
};

export default ClaimUser;
