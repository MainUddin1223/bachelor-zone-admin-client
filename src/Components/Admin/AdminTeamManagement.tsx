'use client';

import { debounced } from '@/helpers';
import {
	useCreateAddressMutation,
	useGetTeamsQuery,
	useUpdateDueBoxesMutation,
} from '@/redux/api/adminApi';
import { useDebounced } from '@/redux/hooks';
import { LoadingOutlined } from '@ant-design/icons';
import {
	Button,
	Card,
	Flex,
	Input,
	Modal,
	Table,
	TableColumnsType,
	message,
} from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';

interface DataType {
	key: React.Key;
	team_name: string;
	address: string;
	team_leader: string;
	dew_boxes: number;
	leader_phone_number: string;
}

const AdminTeamManagement = () => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [updateBoxOpen, setUpdateBoxOpen] = useState(false);
	const [amount, setAmount] = useState('');
	const [updateTeamDetails, setUpdateTeamDetails] = useState({
		name: '',
		id: '',
	});
	const [updateBoxConfirmLoading, setUpdateBoxConfirmLoading] = useState(false);
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [address, setAddress] = useState('');
	const [createAddress] = useCreateAddressMutation();
	const [updateDueBoxes] = useUpdateDueBoxesMutation();
	const query: Record<string, any> = {};
	const [page, setPage] = useState<number>(1);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleUpdateBoxes = async () => {
		setUpdateBoxConfirmLoading(true);
		const result: any = await updateDueBoxes({
			amount: Number(amount),
			id: updateTeamDetails.id,
		});
		setUpdateBoxConfirmLoading(false);
		setAmount('');
		if (result.data.success) {
			message.success('Due boxes updated successfully ');
			setUpdateBoxOpen(false);
		} else {
			message.error(result?.data?.message);
			setUpdateBoxOpen(false);
		}
	};

	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 600,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}
	query['page'] = page;

	const onPaginationChange = (page: number) => {
		setPage(page);
	};

	const { data: result, isLoading } = useGetTeamsQuery({ ...query });
	const meta = result?.meta;
	const data: any = result?.result;
	const columns: TableColumnsType<DataType> = [
		{
			title: <h3>Team Name</h3>,
			dataIndex: 'name',
		},
		{
			title: <h3>Leader</h3>,
			render: (data: any) => {
				return <p>{data.leader.name}</p>;
			},
		},
		{
			title: <h3>Address</h3>,
			render: (data: any) => {
				return <p>{data.address.address}</p>;
			},
		},
		{
			title: <h3>Dew Boxes</h3>,
			render: (data: any) => {
				return <p>{data.due_boxes}</p>;
			},
		},
		{
			title: <h3>Total Member</h3>,
			render: (data: any) => {
				return <p>{data.member}</p>;
			},
		},
		{
			title: <h3>Leader Phone Number</h3>,
			render: (data: any) => {
				return <p>{data.leader.phone}</p>;
			},
		},
		{
			render: (data) => (
				<div style={{ display: 'flex', gap: '5px' }}>
					<Button onClick={() => router.push(`team_management/${data.id}`)}>
						Details
					</Button>
					<Button
						onClick={() => {
							setUpdateBoxOpen(true);
							setUpdateTeamDetails({
								...updateTeamDetails,
								name: data?.name,
								id: data?.id,
							});
						}}
					>
						Update Due Boxes
					</Button>
				</div>
			),
		},
	];

	const mobileColumns: TableColumnsType<DataType> = [
		{
			title: 'Team Details',
			render: (data: any) => {
				return (
					<div>
						<h4>Team Name : {data.name}</h4>
						<p>Address : {data.address.address}</p>
						<p>Team Leader : {data.leader.name}</p>
						<p>Leader Phone Number : {data.leader.phone}</p>
						<p>Total Member : {data.member}</p>
						<p>Due Boxes : {data.due_boxes}</p>
						<div style={{ display: 'flex', gap: '5px' }}>
							<Button onClick={() => router.push(`team_management/${data.id}`)}>
								Details
							</Button>
							<Button
								onClick={() => {
									setUpdateBoxOpen(true);
									setUpdateTeamDetails({
										...updateTeamDetails,
										name: data?.name,
										id: data?.id,
									});
								}}
							>
								Update Due Boxes
							</Button>
						</div>
					</div>
				);
			},
		},
	];

	const handleOk = async () => {
		setConfirmLoading(true);
		const result: any = await createAddress({ address });
		setConfirmLoading(false);
		setAddress('');
		if (result.data.success) {
			message.success('Address created successfully ');
			setOpen(false);
		} else {
			message.error(result?.data?.message);
			setOpen(false);
		}
	};

	const handleCancel = () => {
		setAddress('');
		setOpen(false);
		setUpdateBoxOpen(false);
	};
	const paginationConfig = {
		pageSize: meta?.size,
		total: meta?.total,
		onChange: onPaginationChange,
	};

	return (
		<Card
			title={
				<h2 style={{ textAlign: 'center', padding: '15px' }}>Manage Teams</h2>
			}
		>
			<Modal
				title="Create an address"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				okText={'Create address'}
				okButtonProps={{
					disabled: address ? false : true,
				}}
			>
				<Input
					placeholder="Type an address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					style={{ margin: '10px 0' }}
				/>
			</Modal>
			<Modal
				title="Update due boxes"
				open={updateBoxOpen}
				onOk={handleUpdateBoxes}
				confirmLoading={updateBoxConfirmLoading}
				onCancel={handleCancel}
				okText={'Update Due Boxes'}
				okButtonProps={{
					disabled: amount ? false : true,
				}}
			>
				<Input
					placeholder="Input amount"
					value={amount}
					onChange={(e: any) => {
						const numberRegex = /^(?:[0-9]\d*|)$/;
						const checkNumber = numberRegex.test(e.target.value);
						if (checkNumber) {
							setAmount(e.target.value);
							// if (e.target.value >15) {
							// 	message.warning("Due box should be less than 16")
							// } else {

							// }
						}
					}}
					style={{ margin: '10px 0' }}
				/>
			</Modal>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<Flex gap={10}>
						<Input
							placeholder="Search a team"
							style={{ maxWidth: '350px' }}
							onChange={(e) => {
								setSearchTerm(e.target.value);
							}}
						/>
					</Flex>
					<Flex gap={10} style={{ marginTop: '15px' }}>
						<Button onClick={() => router.push('/admin/create_team')}>
							Create a team
						</Button>
						<Button onClick={() => setOpen(true)}>Create an address</Button>
					</Flex>
					<div style={{ marginTop: '15px' }}>
						{isMobile ? (
							<Table
								columns={mobileColumns}
								dataSource={data}
								pagination={paginationConfig}
							/>
						) : (
							<Table
								columns={columns}
								dataSource={data}
								pagination={paginationConfig}
							/>
						)}
					</div>
				</>
			)}
		</Card>
	);
};

export default AdminTeamManagement;
