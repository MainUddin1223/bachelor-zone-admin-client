import DeliveryAddressDetails from '@/Components/Supplier/DeliveryAddressDetails/DeliveryAddressDetails';
import React from 'react';

const page = ({ params }: { params: any }) => {
	const addressId = Number(params?.id);
	return (
		<div>
			<DeliveryAddressDetails addressId={addressId} />
		</div>
	);
};

export default page;
