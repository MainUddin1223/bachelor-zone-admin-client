'use client';

import {
	useChangeTeamMutation,
	useGetUserByIdQuery,
} from '@/redux/api/adminApi';
import {
	Button,
	Card,
	Input,
	Modal,
	Table,
	TableColumnsType,
	message,
} from 'antd';
import { useState } from 'react';

const ChangeTeamUI = ({ id }: { id: number }) => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;
	const [open, setOpen] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [changeableTeamData, setChangeableTeamData] = useState({
		teamName: '',
		teamId: '',
		userId: id,
	});
	const [changeTeam] = useChangeTeamMutation();
	const showModal = (data: any) => {
		setChangeableTeamData({
			...changeableTeamData,
			teamId: data?.id,
			teamName: data?.name,
		});
		setOpen(true);
	};
	const handleOk = async () => {
		setConfirmLoading(true);
		const result: any = await changeTeam({
			userId: changeableTeamData?.userId,
			teamId: changeableTeamData?.teamId,
		});
		setConfirmLoading(false);
		if (result?.data?.success) {
			message.success(result?.data?.message);
			setOpen(false);
		} else {
			message.warning(result?.data?.message);
			setOpen(false);
		}
	};
	const { data, isLoading } = useGetUserByIdQuery(id);
	const teamData = data?.teams?.address?.Team;

	const handleCancel = () => {
		setOpen(false);
	};

	const columns: TableColumnsType<any> = [
		{
			title: <h3>Team Name</h3>,
			dataIndex: 'name',
		},
		{
			title: <h3>Address</h3>,
			render: (data) => (
				<div>
					<p>{data?.address?.address}</p>
				</div>
			),
		},
		{
			title: <h3>Team Member</h3>,
			dataIndex: 'member',
		},
		{
			title: <h3>Team Leader</h3>,
			render: (data) => (
				<div>
					<p>{data?.leader?.name}</p>
				</div>
			),
		},
		{
			title: <h3>Leader Number</h3>,
			render: (data) => (
				<div>
					<p>{data?.leader?.phone}</p>
				</div>
			),
		},
		{
			title: '',
			render: (data) => {
				return (
					<div>
						<Button onClick={() => showModal(data)}>Select Team</Button>
						<Modal
							title="Confirm team"
							open={open}
							onOk={handleOk}
							confirmLoading={confirmLoading}
							onCancel={handleCancel}
						>
							<div>
								<h5>Are you sure switching {changeableTeamData?.teamName}</h5>
							</div>
						</Modal>
					</div>
				);
			},
		},
	];
	const mobileColumns: TableColumnsType<any> = [
		{
			title: 'Team Details',
			render: (data: any) => {
				return (
					<div>
						<h3>Name : {data?.name}</h3>
						<h3>Phone : {data?.phone}</h3>
						<h3>Current Team : {data?.teams?.address?.address}</h3>
						<h3>Address : {data?.teams?.name}</h3>
						<h3>Balance : {data?.UserInfo?.Balance}</h3>
						<h3>Team Leader : {data?.teams?.leader?.name}</h3>
						<h3>Leader phone : {data?.teams?.leader?.phone}</h3>

						<div>
							<Button onClick={() => showModal(data)}>Select Team</Button>
							<Modal
								title="Confirm team"
								open={open}
								onOk={handleOk}
								confirmLoading={confirmLoading}
								onCancel={handleCancel}
							>
								<div>
									<h5>Are you sure switching {changeableTeamData?.teamName}</h5>
								</div>
							</Modal>
						</div>
					</div>
				);
			},
		},
	];
	return (
		<div>
			<Card title={<h2>Change Team</h2>}>
				<div>
					<h3>Name : {data?.name}</h3>
					<h3>Phone : {data?.phone}</h3>
					<h3>Current Team : {data?.teams?.address?.address}</h3>
					<h3>Address : {data?.teams?.name}</h3>
					<h3>Balance : {data?.UserInfo?.Balance}</h3>
					<h3>Team Leader : {data?.teams?.leader?.name}</h3>
					<h3>Leader phone : {data?.teams?.leader?.phone}</h3>
				</div>
				<Card title={<h3>Choose a Team</h3>} style={{ marginTop: '15px' }}>
					<div>
						{isMobile ? (
							<Table
								columns={mobileColumns}
								dataSource={teamData}
								pagination={false}
							/>
						) : (
							<Table
								columns={columns}
								dataSource={teamData}
								pagination={false}
							/>
						)}
					</div>
				</Card>
			</Card>
		</div>
	);
};

export default ChangeTeamUI;
