'use client';

import {
	useChangeLeaderMutation,
	useGetTeamByIdQuery,
} from '@/redux/api/adminApi';
import { Button, Card, Col, Modal, Row, message } from 'antd';
import Spinner from '../Spinner/Spinner';
import { useState } from 'react';

const TeamDetails = ({ id }: { id: number }) => {
	const [newLeaderData, setNewLeaderData] = useState<any>();
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [changeLeader] = useChangeLeaderMutation();
	const [open, setOpen] = useState(false);
	const { data, isLoading } = useGetTeamByIdQuery(id);

	const handleOk = async () => {
		setConfirmLoading(true);
		const result: any = await changeLeader({
			leaderId: newLeaderData?.user_id,
			teamId: id,
		});
		if (!result?.data.success) {
			message.error(result?.data?.message);
			setConfirmLoading(false);
			setOpen(false);
		} else {
			message.success(result?.data?.message);
			setConfirmLoading(false);
			setOpen(false);
		}
	};

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<div>
					<Modal
						okText={<span style={{ color: 'white' }}>Confirm</span>}
						open={open}
						onOk={handleOk}
						confirmLoading={confirmLoading}
						onCancel={() => setOpen(false)}
						title={<h3>Are you sure to change leader of {data?.name}</h3>}
					>
						<div>
							<h4>New Leader : {newLeaderData?.user?.name}</h4>
							<h4>Leader Phone : {newLeaderData?.user?.phone}</h4>
						</div>
					</Modal>
					<Card title={'Team Details'}>
						<h4>Team Info</h4>
						<div>
							<h5>Team Name : {data?.name}</h5>
							<p>Address : {data?.address.address}</p>
							<p>Team Member : {data?.member}</p>
							<p>Due Boxes : {data?.due_boxes}</p>
							<p>Supplier Name : {data?.address?.supplier?.name}</p>
							<p>Supplier Phone : {data?.address?.supplier?.contact_no}</p>
						</div>
						<h4>Team Leader Info</h4>
						<div>
							<h5>Leader Name : {data?.leader?.name}</h5>
							<p>Phone Number : {data?.leader?.phone}</p>
						</div>
						<h3>Team Member Info</h3>
						<Row gutter={[20, 20]}>
							{data?.userInfo.map((info: any) => {
								if (info.user_id !== data?.leader?.id) {
									return (
										<Col xs={24} sm={12} md={8} lg={6}>
											<div>
												<h5>Member Name : {info?.user?.name}</h5>
												<p>Phone Number : {info?.user?.phone}</p>
												<p>Id : {info?.virtual_id}</p>
												<p>Balance : {info?.Balance}</p>
												<Button
													onClick={() => {
														setNewLeaderData(info);
														setOpen(true);
													}}
												>
													Appoint Leadership
												</Button>
											</div>
										</Col>
									);
								}
							})}
						</Row>
					</Card>
				</div>
			)}
		</div>
	);
};

export default TeamDetails;
