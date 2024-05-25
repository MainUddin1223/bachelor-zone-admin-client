'use client';

import { Button, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Input } from 'antd';
const { Search } = Input;
import LunchTiffinUI from '../AdminUI/LunchTiffinUI';
import { InfoCircleOutlined } from '@ant-design/icons';

const Lunch_tiffin = () => {
	// const localTime = dayjs().format('HH')

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	return (
		<div>
			<Select
				defaultValue={'team'}
				style={{ width: 120 }}
				onChange={handleChange}
				options={[
					{ value: 'team', label: 'Team' },
					{ value: 'person', label: 'Person' },
				]}
			/>
			<Tooltip title="Thanks for using antd. Have a nice day!" trigger="click">
				<Button>
					Team Info <InfoCircleOutlined />
				</Button>
			</Tooltip>
			<div>
				<Search
					placeholder="input search text"
					enterButton="Search"
					size="large"
					loading
				/>
			</div>
		</div>
	);
};

export default Lunch_tiffin;
