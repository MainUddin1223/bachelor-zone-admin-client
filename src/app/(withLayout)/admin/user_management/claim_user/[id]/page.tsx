import ClaimUser from '@/Components/Admin/ClaimUser';

const User = ({ params }: { params: any }) => {
	const userId = Number(params.id);
	return (
		<div>
			<ClaimUser userId={userId} />
		</div>
	);
};

export default User;
