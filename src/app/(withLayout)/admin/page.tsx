import Dashboard from '@/Components/Admin/AdminDashboard';
import AuthAdmin from '@/Components/Admin/AuthAdmin';

const AdminDashboard = () => {
	return (
		<AuthAdmin>
			<Dashboard />
		</AuthAdmin>
	);
};

export default AdminDashboard;
