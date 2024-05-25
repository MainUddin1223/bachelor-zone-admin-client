'use client';

import { useGetTeamByIdQuery } from '@/redux/api/adminApi';
import { Card } from 'antd';

const TeamDetails = ({ id }: { id: number }) => {
	const { data, isLoading } = useGetTeamByIdQuery(id);
	console.log(data);

	return (
		<div>
			<Card title={'Team Details'}>
				<h4>Team Info</h4>
				<div>
					<h5>Team Name : {data?.name}</h5>
					<p>Address : {data?.address.address}</p>
					<p>Team Member : {data?.member}</p>
					<p>Due Boxes : {data?.due_boxes}</p>
				</div>
				<h4>Team Leader Info</h4>
				<div>
					<h5>Leader Name : {data?.leader?.name}</h5>
					<p>Phone Number : {data?.leader?.phone}</p>
				</div>
				<h4>Team Member Info</h4>
				{data?.userInfo.map((info: any) => (
					<div>
						<h5>Member Name : {info?.user?.name}</h5>
						<p>Phone Number : {info?.user?.phone}</p>
						<p>Id : {info?.virtual_id}</p>
						<p>Balance : {info?.Balance}</p>
					</div>
				))}
			</Card>
		</div>
	);
};

export default TeamDetails;
