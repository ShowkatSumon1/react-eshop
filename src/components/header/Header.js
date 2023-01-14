import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';

const logo = (
    <div className={styles.logo}>
        <Link to='/'>
            <h2>
                e<span>Shop</span>.
            </h2>
        </Link>
    </div>
)
const cart = (
    <span className={styles.cart}>
        <Link to="/cart">
            Cart
            <FaShoppingCart size={20} />
            <p>0</p>
        </Link>
    </span>
)
const activeClass = ({ isActive }) => (isActive ? `${styles.active}` : "")

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [displayName, setDisplayName] = useState('');

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const hideMenu = () => {
        setShowMenu(false);
    }

    const navigate = useNavigate();

    const userLogout = () => {
        signOut(auth).then(() => {
            toast.success('Logout successful');
            navigate('/');
        }).catch((error) => {
            toast.error(error.message);
        });
    }

    ////// Redux toolkit options
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.displayName == null) {
                    const u1 = user.email.substring(0, user.email.indexOf('@'))
                    const dName = u1.charAt(0).toUpperCase() + u1.slice(1);

                    setDisplayName(dName);
                } else {
                    setDisplayName(user.displayName);
                }

                ///// send to reducer
                dispatch(SET_ACTIVE_USER({
                    userName: user.displayName,
                    userID: user.uid,
                    email: user.email,
                }))
            } else {
                setDisplayName('');
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName])

    return (
        <header>
            <div className={styles.header}>
                {logo}
                <nav className={showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`}>
                    <div
                        className={showMenu ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}` : `${styles['nav-wrapper']}`}
                        onClick={hideMenu}
                    >

                    </div>
                    <ul onClick={hideMenu}>
                        <li className={styles['logo-mobile']}>
                            {logo}
                            <FaTimes size={22} color='#fff' onClick={hideMenu} />
                        </li>
                        <AdminOnlyLink>
                            <li>
                                <Link to='/admin/home'>
                                    <button className='--btn --btn-primary'>Admin</button>
                                </Link>
                            </li>
                        </AdminOnlyLink>
                        <li>
                            <NavLink to='/' className={activeClass}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/contact' className={activeClass}>
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>

                    <div className={styles['header-right']} onClick={hideMenu}>
                        <span className={styles.links}>
                            <ShowOnLogout>
                                <NavLink to='/login' className={activeClass}>
                                    Login
                                </NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <a href="#home" style={{ color: '#ff7722' }}>
                                    <FaUserCircle size={16} />
                                    Hi, {displayName}
                                </a>
                            </ShowOnLogin>
                            <ShowOnLogin>
                                <NavLink to='/order-history' className={activeClass}>
                                    My Order
                                </NavLink>
                            </ShowOnLogin>
                            <ShowOnLogin>
                                <NavLink to='/' onClick={userLogout}>
                                    Logout
                                </NavLink>
                            </ShowOnLogin>
                        </span>
                        {cart}
                    </div>
                </nav>
                <div className={styles['menu-icon']}>
                    {cart}
                    <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
                </div>
            </div>
        </header>
    );
};

export default Header;
