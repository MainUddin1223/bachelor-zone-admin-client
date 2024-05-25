import { Spin } from 'antd';
import React from 'react';

const Loading = () => {
	return (
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
	);
};

export default Loading;
