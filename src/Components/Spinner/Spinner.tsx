import { Spin } from 'antd';
import Styles from './Spinner.module.css';

const Spinner = () => {
	return (
		<div className={Styles.container}>
			<Spin className={Styles.spinner} size="large" />
		</div>
	);
};

export default Spinner;
