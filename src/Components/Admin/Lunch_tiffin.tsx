'use client';

import { Button, Card, Flex, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Input } from 'antd';
const { Search } = Input;
import LunchTiffinUI from '../AdminUI/LunchTiffinUI';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const Lunch_tiffin = () => {
	// const localTime = dayjs().format('HH')
	const [receiverType, setReceiverType] = useState('team');

	const handleChange = (value: string) => {
		setReceiverType(value);
	};
	const dummyInfo = [
		{
			address: 'baximco',
			order: 15,
		},
		{
			address: 'basundora',
			order: 12,
		},
		{
			address: 'asian paint',
			order: 10,
		},
	];
	return (
		<div>
			<Flex justify="space-between" style={{ marginBottom: '15px' }}>
				<Select
					defaultValue={'team'}
					style={{ width: 120 }}
					onChange={handleChange}
					options={[
						{ value: 'team', label: 'Team' },
						{ value: 'person', label: 'Person' },
					]}
				/>
				<Tooltip
					title={
						<div>
							{dummyInfo.map((info) => (
								<Card>
									<h4>Address: {info.address}</h4>
									<h4>Pending Orders : {info.order}</h4>
								</Card>
							))}
						</div>
					}
					trigger="click"
				>
					<Button>
						More Info <InfoCircleOutlined />
					</Button>
				</Tooltip>
			</Flex>
			<div>
				<Search
					style={{ marginBottom: '15px' }}
					placeholder="input search text"
					enterButton="Search"
					size="large"
					loading
				/>
			</div>
			<div>
				<LunchTiffinUI receiverType={receiverType} />
			</div>
		</div>
	);
};

export default Lunch_tiffin;
