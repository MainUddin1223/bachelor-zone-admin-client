'use client';

import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import StyledComponentsRegistry from './AntdRegistry';
import { ConfigProvider } from 'antd';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<StyledComponentsRegistry>
				<ConfigProvider
					theme={{
						components: {
							Input: {
								activeBg: 'white',
								hoverBg: 'rgb(229, 235, 240)',
							},
							Button: {
								fontWeight: 500,
							},
							Drawer: {
								colorBgElevated: 'white',
							},
							Breadcrumb: {
								itemColor: '#327012',
								linkHoverColor: '#327012',
								fontSize: 25,
							},
						},
						token: {
							//   colorBgContainer: "#070d17",
							borderRadius: 0,
							// colorText: "rgb(224, 223, 223)",
							colorPrimary: '#5942cb',
							colorBgContainerDisabled: 'gray',
							colorBgSpotlight: 'white',
							colorTextLightSolid: 'black',
						},
					}}
				>
					{children}
				</ConfigProvider>
			</StyledComponentsRegistry>
		</Provider>
	);
};

export default Providers;
