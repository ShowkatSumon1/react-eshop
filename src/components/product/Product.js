import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import {
  PRICE_RANGE,
  selectProduct,
  STORE_PRODUCTS,
} from "../../redux/slice/productSlice";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";

const Product = () => {
  //////// for responsive state
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchCollection("products");
  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);
  const products = useSelector(selectProduct);

  return (
    <section id="products">
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : styles.filter
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              style={{ width: "50px" }}
              className="--center-all"
              src={spinnerImg}
              alt="Loading..."
            />
          ) : (
            <ProductList products={products} />
          )}
          {/* for responsive icon */}
          <div
            className={styles.icon}
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide filter" : "Show filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
