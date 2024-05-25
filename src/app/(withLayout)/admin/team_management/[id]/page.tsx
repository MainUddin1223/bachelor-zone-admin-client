'use client';

import TeamDetails from '@/Components/Admin/TeamDetails';

const Team = ({ params }: { params: any }) => {
	const userId = Number(params.id);
	return <TeamDetails id={userId} />;
};

export default Team;
