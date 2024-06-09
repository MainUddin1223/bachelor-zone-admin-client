import PickupDetails from '@/Components/Supplier/PickupDetails/PickupDetails';
import React from 'react';

const page = ({ params }: { params: any }) => {
	const addressId = Number(params?.id);
	return (
		<div>
			<PickupDetails addressId={addressId} />
		</div>
	);
};

export default page;
