import GroupCard from '../components/GroupCard';
import { useAppContext } from '../context/appContext';

const Groups = () => {
	const { groupData } = useAppContext();

	return (
		<div>
			{groupData?.map((group) => (
				<GroupCard key={group.id} {...group} />
			))}
		</div>
	);
};
export default Groups;
