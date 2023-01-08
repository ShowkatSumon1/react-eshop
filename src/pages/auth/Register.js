import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import regiImg from '../../assets/register.png';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const registerUser = (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("Passwords don't match")
        }
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                setIsLoading(false);
                toast.success('Account is created');
                navigate('/login');
            })
            .catch((error) => {
                setIsLoading(false);
                toast(error.message);
            });
    }
    return (
        <>
            {
                isLoading && <Loader />
            }
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>
                        <form onSubmit={registerUser}>
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                type="password"
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <input
                                type="password"
                                placeholder='Confirm password'
                                required
                                value={cPassword}
                                onChange={(e) => {
                                    setCPassword(e.target.value);
                                }}
                            />

                            <button type='submit' className="--btn --btn-primary --btn-block">Register</button>
                        </form>
                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login">&nbsp; Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={regiImg} alt="Register" width="400" />
                </div>
            </section>
        </>
    );
};

export default Register;