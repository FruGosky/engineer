import useAuth from '../../../../hooks/useAuth';
import Login from './Login/Login';
import UserIcon from './UserIcon/UserIcon';

export default function UserMenu() {
	const [auth] = useAuth();

	if (!auth) return <Login />;

	return <UserIcon />;
}
