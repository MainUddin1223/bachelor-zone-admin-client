import { getUserInfo } from '@/services/auth.service';
import { CloseCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import { sidebarItems } from '../constants/sidebarItems';
import { getAuthInfo } from '@/utils/jwt';

export type ISideBarProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

const SmallDeviceSideBar = ({ open, setOpen }: ISideBarProps) => {
	const info: any = getAuthInfo();
	const router = useRouter();

	const onClose = () => {
		setOpen(false);
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
					items={sidebarItems(info.role)}
				/>
			</Drawer>
		</>
	);
};

export default SmallDeviceSideBar;
