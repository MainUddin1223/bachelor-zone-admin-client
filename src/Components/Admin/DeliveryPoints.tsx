'use client';

import {
	Button,
	Card,
	Col,
	DatePicker,
	DatePickerProps,
	Flex,
	Input,
	Pagination,
	Row,
} from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import location from '../../assets/location.png';
import Image from 'next/image';
import { useGetDeliveryPointQuery } from '@/redux/api/supplierApi';
import { useDebounced } from '@/redux/hooks';
import Spinner from '../Spinner/Spinner';
import { useRouter } from 'next/navigation';

const DeliveryPoints = () => {
	const router = useRouter();
	const defaultValue = dayjs(Date.now());
	const todayDate = defaultValue.format();
	const formatDate = todayDate.split('T')[0];
	const query: Record<string, any> = {};
	const [orderDate, setOrderDate] = useState<any>(formatDate);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const onChange: DatePickerProps['onChange'] = (date, dateString) => {
		setOrderDate(dateString);
	};
	const debouncedTerm = useDebounced({
		searchQuery: searchTerm,
		delay: 3000,
	});
	if (!!debouncedTerm) {
		query['search'] = searchTerm;
	}
	query['date'] = orderDate;
	const { data, isLoading, isFetching } = useGetDeliveryPointQuery({
		...query,
	});
	const result = data?.data;
	const meta = data?.meta;
	return (
		<div>
			<Card
				title={
					<h1 style={{ textAlign: 'center', margin: '10px 0' }}>
						Delivery Point
					</h1>
				}
			>
				<Flex gap={10}>
					<Input
						style={{ maxWidth: '350px' }}
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
						placeholder="Search an address"
					/>
					<DatePicker onChange={onChange} defaultValue={defaultValue} />
				</Flex>
				{isLoading || isFetching ? (
					<Spinner />
				) : (
					<div>
						<div style={{ marginTop: '15px' }}>
							<Row gutter={[20, 20]}>
								{result?.map((address: any) => (
									<Col xs={24} sm={12} md={12} lg={8}>
										<div style={{ border: '1px solid gray', padding: '15px' }}>
											<Flex gap={5}>
												<Image
													src={location}
													width={20}
													alt="location"
													style={{ marginTop: '3px' }}
												/>
												<h3>{address?.address}</h3>
											</Flex>
											<div style={{ marginLeft: '25px' }}>
												<h4>Delivery Date : {address?.date?.split('T')[0]}</h4>
												<h4>Supplier : {address?.supplierName}</h4>
												<h4>Supplier Phone : {address?.supplierContactNo}</h4>
												<h4>Total Team : {address?.totalTeams}</h4>
												<h4>Total Members : {address?.totalMembers}</h4>
												<h4 style={{ color: 'var(--primary-color)' }}>
													Total Pending Order : {address?.totalPendingOrder}
												</h4>
												<h4 style={{ color: 'blue' }}>
													Total ready to Pickup :{' '}
													{address?.totalAvailablePickup}
												</h4>
												<h4>Total due boxes : {address?.totalDueBoxes}</h4>
											</div>
											<Button
												onClick={() =>
													router.push(
														`/admin/delivery_point/${address?.addressId}`
													)
												}
												style={{ margin: '10px 0', marginLeft: '25px' }}
												type="primary"
											>
												<span style={{ color: 'white' }}>See More Info</span>
											</Button>
										</div>
									</Col>
								))}
							</Row>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'right',
								marginTop: '15px',
							}}
						>
							<Pagination defaultCurrent={meta?.page} total={meta?.total} />
						</div>
					</div>
				)}
			</Card>
		</div>
	);
};

export default DeliveryPoints;
