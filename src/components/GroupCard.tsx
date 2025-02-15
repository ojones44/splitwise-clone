import { ListGroup } from 'react-bootstrap';
import { GroupData, CategoryIcon } from '../types/interfaces';
import { categories } from '../utils/categories';
import { randomChoice } from '../utils/calculations';
import { Link } from 'react-router';

const GroupCard: React.FC<GroupData> = ({ id, category, name, status }) => {
	return (
		<ListGroup className='my-2' horizontal>
			<ListGroup.Item>
				{randomChoice<CategoryIcon>(categories[category].icons)}
			</ListGroup.Item>
			<ListGroup.Item>{name}</ListGroup.Item>
			<ListGroup.Item>{status}</ListGroup.Item>
			<ListGroup.Item>
				<Link to={`/groups/${id}`}>👉🏻</Link>
			</ListGroup.Item>
		</ListGroup>
	);
};
export default GroupCard;
