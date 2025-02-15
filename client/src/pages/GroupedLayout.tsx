import { Outlet } from 'react-router';
import SplitwiseNavbar from '../components/SplitwiseNavbar';
import AddExpense from '../components/AddExpense';

const GroupedLayout = () => {
	return (
		<main>
			<SplitwiseNavbar />
			<section>
				<Outlet />
			</section>
			<AddExpense />
		</main>
	);
};
export default GroupedLayout;
