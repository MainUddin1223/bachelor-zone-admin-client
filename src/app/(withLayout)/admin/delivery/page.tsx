import { Card, Col, Row } from 'antd';
import React from 'react';

const Delivery = () => {
	return (
		<div style={{ textAlign: 'center' }}>
			<Card title={<h2>Select a Category</h2>}>
				<Row gutter={[15, 15]}>
					<Col xs={24} md={8}>
						<Card>
							<h3>Lunch</h3>
						</Card>
					</Col>
					<Col xs={24} md={8}>
						<Card>
							<h3>Tiffin</h3>
						</Card>
					</Col>
					<Col xs={24} md={8}>
						<Card>
							<h3>Dinner</h3>
						</Card>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default Delivery;
