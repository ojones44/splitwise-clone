import { NavLink, useNavigate } from 'react-router';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { useAuthStore } from '../context/useAuthStore';

const SplitwiseNavbar: React.FC = (): JSX.Element => {
	const user = useAuthStore((state) => state.user);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<Navbar
			className='p-3 border-bottom'
			bg='light'
			expand='lg'
			data-bs-theme='light'
		>
			<Navbar.Brand>Splitwise Clone</Navbar.Brand>
			<Nav className='me-auto d-flex align-items-center gap-3'>
				<NavLink to='/'>Groups</NavLink>
				<NavLink to='/friends'>Friends</NavLink>
				<NavLink to='/activity'>Activity</NavLink>
				<NavLink to='/account'>Account</NavLink>
			</Nav>
			<Nav.Item className='d-flex align-items-center'>
				<Navbar.Text className='me-4 text-black'>{user?.name}</Navbar.Text>
				<Button variant='danger' onClick={logout}>
					Logout
				</Button>
			</Nav.Item>
		</Navbar>
	);
};
export default SplitwiseNavbar;
