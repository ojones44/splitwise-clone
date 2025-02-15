import { useParams } from 'react-router';

const GroupSingle = () => {
	const { groupId } = useParams();

	console.log(groupId);

	return <div>GroupSingle</div>;
};
export default GroupSingle;
