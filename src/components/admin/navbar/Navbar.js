import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectUserName } from "../../../redux/slice/authSlice";
import styles from "./Navbar.module.scss";

const activeClass = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Navbar = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to={"/admin/home"} className={activeClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/all-products"} className={activeClass}>
              View Products
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/add-product/add"} className={activeClass}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/orders"} className={activeClass}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
