import React, { useEffect } from "react";
import InfoBox from "../../infoBox/InfoBox";
import styles from "./Home.module.scss";
import { FaCartArrowDown } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { AiFillDollarCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  ORDER_TOTAL_AMOUNT,
  selectOrderHistory,
  selectOrderTotalAmount,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import {
  selectProduct,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Chart from "../../chart/Chart";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const orderIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  //////// For fetch every time. Refresh problem solve:
  const fbProducts = useFetchCollection("products");
  const { data } = useFetchCollection("orders");
  /////// for dispatch everything;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: fbProducts.data,
      })
    );
    dispatch(STORE_ORDERS(data));
    dispatch(ORDER_TOTAL_AMOUNT());
  }, [dispatch, fbProducts, data]);

  const totalAmount = useSelector(selectOrderTotalAmount);
  const allProducts = useSelector(selectProduct);
  const allOrders = useSelector(selectOrderHistory);
  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`$${totalAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={allProducts.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={allOrders.length}
          icon={orderIcon}
        />
      </div>
      <Chart />
    </div>
  );
};

export default Home;
