import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../redux/slice/filterSlice";
import {
  selectMaxPrice,
  selectMinPrice,
  selectProduct,
} from "../../../redux/slice/productSlice";
import styles from "./ProductFilter.module.scss";

const ProductFilter = () => {
  //// for category, brand and price range:
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(Infinity);

  const dispatch = useDispatch();
  ///////For select product from reducer and separate the categories.
  const products = useSelector(selectProduct);

  ////////for category
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(
      FILTER_BY_CATEGORY({
        products,
        category: cat,
      })
    );
  };

  ///////// For brand
  const allBrand = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  ///// For price range range:
  const maxPrice = useSelector(selectMaxPrice);
  const minPrice = useSelector(selectMinPrice);
  useEffect(() => {
    dispatch(
      FILTER_BY_PRICE({
        products,
        price,
      })
    );
  }, [dispatch, products, price]);

  const clearFilter = () => {
    setBrand("All");
    setCategory("All");
    setPrice(Infinity);
  };

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={category === cat ? styles.active : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrand.map((brnd, index) => (
            <option key={index} value={brnd}>
              {brnd}
            </option>
          ))}
        </select>
      </div>
      <h4>Price</h4>
      <p>${price}</p>
      <div className={styles.price}>
        <input
          type="range"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          min={minPrice}
          max={maxPrice}
        />
      </div>
      <br />
      <button className="--btn --btn-danger" onClick={clearFilter}>
        Clear filter
      </button>
    </div>
  );
};

export default ProductFilter;
