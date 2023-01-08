import React, { useState } from 'react';
import resetImg from '../../assets/forgot.png'
import { Link } from 'react-router-dom';
import Card from '../../components/card/Card';
import styles from './auth.module.scss';
import Loader from '../../components/loader/Loader';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-toastify';

const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                toast.success('Check your email address');
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    }
    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={resetImg} alt="Login" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Reset Password</h2>
                        <form onSubmit={resetPassword}>
                            <input
                                type="email"
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <button type='submit' className="--btn --btn-primary --btn-block">Reset</button>

                            <div className={styles.links}>
                                <p>
                                    <Link to="/login">
                                        - Login
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/register">
                                        - Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default Reset;