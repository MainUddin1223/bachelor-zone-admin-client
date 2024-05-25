import UserDetails from '@/Components/Admin/UserDetails';

const User = ({ params }: { params: any }) => {
	const userId = Number(params.user);
	return (
		<div>
			<UserDetails userId={userId} />
		</div>
	);
};

export default User;
