import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectPrevious_URL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  /////// for navigate system
  const previous_URL = useSelector(selectPrevious_URL);
  const navigateURL = () => {
    if (previous_URL.includes("cart")) {
      navigate("/cart");
    } else {
      navigate("/");
    }
  };

  const userLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        setIsLoading(false);
        toast.success("Successfully Login");
        navigateURL();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  /////// Login with onClick google
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const user = result.user;
        toast.success("Login Successful");
        navigateURL();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={userLogin}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>

              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>

            <button
              className="--btn --btn-danger --btn-block"
              onClick={loginWithGoogle}
            >
              <FaGoogle color="#fff" /> Login With Google
            </button>

            <span className={styles.register}>
              <p>Don't have a account?</p>
              <Link to="/register">&nbsp; Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
