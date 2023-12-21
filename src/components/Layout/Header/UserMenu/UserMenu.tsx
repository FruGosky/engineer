import useAuth from '../../../../hooks/useAuth';
import Login from './Login/Login';
import UserIcon from './UserIcon/UserIcon';

export default function UserMenu() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [auth, setAuth] = useAuth();

	if (!auth) return <Login />;

	return <UserIcon />;
}
