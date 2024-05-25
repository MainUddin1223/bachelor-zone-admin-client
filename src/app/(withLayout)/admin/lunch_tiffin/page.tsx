import Lunch_tiffin from '@/Components/Admin/Lunch_tiffin';
import { Card, Col, Row } from 'antd';
import React from 'react';

const Tiffin = () => {
	return (
		<div>
			<Card title={<h2 style={{ textAlign: 'center' }}>Order list</h2>}>
				<Lunch_tiffin />
			</Card>
		</div>
	);
};

export default Tiffin;
