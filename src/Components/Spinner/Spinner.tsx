import { Spin } from 'antd';

const Spinner = () => {
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

export default Spinner;
