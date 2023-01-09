import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

const ShowOnLogin = ({children}) => {
    const isLogin = useSelector(selectIsLoggedIn);
    if (isLogin) {
        return children;
    }
    return null;
};

export const ShowOnLogout = ({children}) => {
    const isLogin = useSelector(selectIsLoggedIn);
    if (!isLogin) {
        return children;
    }
    return null;
};

export default ShowOnLogin;