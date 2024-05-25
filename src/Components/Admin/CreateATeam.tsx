'use client';
import {
	useCreateTeamMutation,
	useGetUserInfoMutation,
} from '@/redux/api/adminApi';
import { Button, Card, Flex, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CreateATeam = () => {
	const [phone, setPhone] = useState('');
	const router = useRouter();
	const [createTeam] = useCreateTeamMutation();
	const [teamData, setTeamData] = useState({
		teamName: '',
		phone: '',
		leader_id: '',
		address: '',
		address_id: '',
		isSavedAddress: false,
	});
	const [addresses, setAddresses] = useState({
		isSavedAddress: false,
		addresses: [],
	});
	const [getUserInfo] = useGetUserInfoMutation();
	const handleSearch = async () => {
		const phoneRegex = /^(01|\+8801)\d{9}$/;
		if (!phoneRegex.test(phone)) {
			message.error('Invalid Phone number');
			return;
		}
		const phoneNumber = phone.startsWith('0') ? '+88' + phone : phone;
		const result: any = await getUserInfo({ phone: phoneNumber });
		if (!result?.data?.success) {
			message.error(result?.data?.message);
		} else {
			if (result?.data?.isSavedAddress) {
				setTeamData({
					...teamData,
					phone: result.data.phone,
					leader_id: result.data.id,
					address: result.data.addresses[0].address,
					address_id: result.data.addresses[0].id,
					isSavedAddress: true,
				});
				setAddresses({ ...addresses, isSavedAddress: true, addresses: [] });
			} else {
				setTeamData({
					...teamData,
					phone: result.data.phone,
					leader_id: result.data.id,
					isSavedAddress: false,
				});
				setAddresses({
					...addresses,
					addresses: result.data.addresses,
					isSavedAddress: true,
				});
			}
		}
	};

	const handleCreateTeam = async () => {
		const data = {
			name: teamData.teamName,
			leader_id: teamData.leader_id,
			address_id: teamData.address_id,
		};
		const result: any = await createTeam(data);
		if (!result?.data.success) {
			message.error(result?.data?.message);
		} else {
			message.success(result?.data?.message);
			router.push('/admin/team_management');
		}
	};

	return (
		<Card
			title={
				<h2 style={{ textAlign: 'center', padding: '15px' }}>Create a Team</h2>
			}
		>
			<Card>
				<h4>Team Info</h4>
				<div>
					<div>
						<div style={{ margin: '10px 0' }}>
							<p style={{ margin: '5px 0' }}>Team Name</p>
							<Input
								placeholder="Team name"
								onChange={(e) => {
									setTeamData({ ...teamData, teamName: e.target.value });
								}}
							/>
						</div>
						<div style={{ margin: '10px 0' }}>
							<p style={{ margin: '5px 0' }}>Leader Phone number</p>
							<Input
								readOnly
								value={teamData.phone}
								placeholder="Leader Phone number"
							/>
						</div>
						<div style={{ margin: '10px 0' }}>
							<p style={{ margin: '5px 0' }}>Address</p>
							<Input readOnly value={teamData.address} placeholder="Address" />
						</div>
						<Button
							style={{ margin: '15px 0' }}
							onClick={handleCreateTeam}
							disabled={
								!teamData.teamName ||
								!teamData.address_id ||
								!teamData.leader_id
							}
						>
							Create Team
						</Button>
					</div>
					<div>
						<h4 style={{ margin: '15px 0' }}>Search Info</h4>
						<div>
							<div>
								<p style={{ margin: '5px 0' }}>Find Leader</p>
								<Flex gap={10}>
									<Input
										placeholder="Search a team"
										style={{ maxWidth: '350px' }}
										onChange={(e) => setPhone(e.target.value)}
									/>
									<Button
										disabled={
											phone.length == 11 || phone.length == 14 ? false : true
										}
										onClick={handleSearch}
									>
										Search
									</Button>
								</Flex>
							</div>
							{addresses.addresses.length ? (
								<div>
									<p style={{ margin: '15px 0', fontWeight: 'bold' }}>
										Select an Address
									</p>
									{addresses.addresses.map((data: any) => (
										<div
											style={{
												margin: '15px 0',
												padding: '5px',
												fontWeight: 'bold',
												cursor: 'pointer',
												boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
											}}
											onClick={() => {
												setTeamData({
													...teamData,
													address_id: data.id,
													address: data.address,
												});
											}}
										>
											<p>{data.address}</p>
										</div>
									))}
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</Card>
		</Card>
	);
};

export default CreateATeam;
