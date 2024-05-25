import {
	FacebookFilled,
	InstagramFilled,
	LinkedinFilled,
} from '@ant-design/icons';
import Styles from './Footer.module.css';
import { Col, Row } from 'antd';

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();
	return (
		<div className={Styles.container}>
			<div className={Styles.footer_container}>
				<Row gutter={[20, 20]}>
					<Col xs={12} md={6}>
						<div>
							<h3>Bachelor Zone</h3>
							<p className={Styles.info_container}>
								Enjoy your profession and make your life easier
							</p>
						</div>
					</Col>
					<Col xs={12} md={6}>
						<div>
							<h3>Address</h3>
							<div className={Styles.info_container}>
								<p>Street plaza, </p>
								<p> Mirpur, Dhaka, Bangladesh</p>
							</div>
						</div>
					</Col>
					<Col xs={12} md={6}>
						<div>
							<h3>Find us</h3>
							<div className={Styles.icon_container}>
								<LinkedinFilled className={Styles.icon} />
								<FacebookFilled className={Styles.icon} />
								<InstagramFilled className={Styles.icon} />
							</div>
						</div>
					</Col>
					<Col xs={12} md={6}>
						<div>
							<h3>Call us</h3>
							<div className={Styles.info_container}>
								<p>+8801854545445</p>
								<p>+8801854545445</p>
								<p>info@gmail.com</p>
							</div>
						</div>
					</Col>
				</Row>
				<hr />
				<div className={Styles.copyright_container}>
					<p>
						&#169; {year} Bachelor Zone, Catering service, Mirshari, Chattogram
					</p>
					<div className={Styles.privacy_container}>
						<p> PRIVACY POLICY</p>
						<p>TERMS AND CONDITION</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
