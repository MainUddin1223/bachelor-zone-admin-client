import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
	console.log('loading');
	return (
		<div style={{ position: 'relative' }}>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}
			>
				<Spin size="large" />
			</div>
		</div>
	);
};

export default Loading;
