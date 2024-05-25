import { Table } from 'antd';

const CommonMealUI = ({
	mobileColumns,
	mobileData,
	columns,
	data,
}: {
	mobileColumns: any;
	mobileData: any;
	columns: any;
	data: any;
}) => {
	const screenSize = typeof window !== 'undefined' ? window.innerWidth : 1000;
	const isMobile = screenSize < 768;
	return (
		<div>
			<div>
				<div>
					{isMobile ? (
						<Table columns={mobileColumns} dataSource={mobileData} />
					) : (
						<Table columns={columns} dataSource={data} />
					)}
				</div>
			</div>
		</div>
	);
};

export default CommonMealUI;
