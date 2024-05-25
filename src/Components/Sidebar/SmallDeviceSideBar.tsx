import { getUserInfo } from '@/services/auth.service';
import { CloseCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { sidebarItems } from '../constants/sidebarItems';

export type ISideBarProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

const SmallDeviceSideBar = ({ open, setOpen }: ISideBarProps) => {
	const role = 'admin';
	const router = useRouter();

	const onClose = () => {
		setOpen(false);
	};

	const handleLogout = async () => {
		localStorage.clear();
		onClose();
		router.push('/');
	};

	return (
		<>
			<Drawer
				title=""
				placement="left"
				onClose={onClose}
				closeIcon={
					<CloseCircleOutlined
						style={{ fontSize: '35px', color: 'var(--button-color)' }}
					/>
				}
				open={open}
			>
				<Menu
					onClick={onClose}
					style={{
						fontSize: '19px',
						fontWeight: 'bold',
						backgroundColor: 'white',
						color: 'black',
					}}
					defaultSelectedKeys={['1']}
					mode="inline"
					items={sidebarItems(role)}
				/>
				<p
					onClick={handleLogout}
					style={{
						cursor: 'pointer',
						border: '1px solid var(--accent-color)',
						padding: '10px 20px ',
						margin: '0 auto',
						width: '100%',
						fontSize: '19px',
						fontWeight: 'bold',
						backgroundColor: 'white',
						color: 'black',
					}}
				>
					<LogoutOutlined style={{ fontSize: '21px', marginRight: '10px' }} />
					Logout
				</p>
			</Drawer>
		</>
	);
};

export default SmallDeviceSideBar;
