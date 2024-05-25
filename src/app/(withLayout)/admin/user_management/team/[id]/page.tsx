import ChangeTeamUI from '@/Components/AdminUI/ChangeTeamUI';

const Teams = ({ params }: { params: any }) => {
	const id = Number(params.id);
	return (
		<div>
			<ChangeTeamUI id={id} />
		</div>
	);
};

export default Teams;
