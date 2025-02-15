import { NavLink } from 'react-router';

import { Nav, Navbar } from 'react-bootstrap';

const SplitwiseNavbar: React.FC = (): JSX.Element => {
	return (
		<Navbar
			className='p-3 border-bottom'
			bg='light'
			expand='lg'
			data-bs-theme='light'
		>
			<Navbar.Brand>Splitwise Clone</Navbar.Brand>
			<Nav className='me-auto '>
				<Nav.Link>
					<NavLink to='/'>Groups</NavLink>
				</Nav.Link>
				<Nav.Link>
					<NavLink to='/friends'>Friends</NavLink>
				</Nav.Link>
				<Nav.Link>
					<NavLink to='/activity'>Activity</NavLink>
				</Nav.Link>
				<Nav.Link>
					<NavLink to='/account'>Account</NavLink>
				</Nav.Link>
			</Nav>
		</Navbar>
	);
};
export default SplitwiseNavbar;
