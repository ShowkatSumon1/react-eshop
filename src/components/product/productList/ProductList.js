import React, { useEffect, useState } from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  selectFilterProducts,
  FILTER_BY_SORT,
} from "../../../redux/slice/filterSlice";
import Pagination from "../../pagination/Pagination";
import Search from "../../search/Search";
import ProductItem from "../productItem/ProductItem";
import styles from "./ProductList.module.scss";

const ProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  /////Product R search send to reducer to make reducer.
  const dispatch = useDispatch();
  ////for search
  useEffect(() => {
    dispatch(
      FILTER_BY_SEARCH({
        products,
        search,
      })
    );
  }, [dispatch, products, search]);
  ///// For sorting
  useEffect(() => {
    dispatch(
      FILTER_BY_SORT({
        products,
        sort,
      })
    );
  }, [dispatch, products, sort]);
  /////// backFrom reducer.
  const filterProducts = useSelector(selectFilterProducts);

  ///////for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(1);
  /// now some of calculation
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className={styles["product-list"]} id="product">
      <div className={styles.top}>
        <div className={styles.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{filterProducts.length === 0 ? "No" : filterProducts.length}</b>{" "}
            {filterProducts.length > 1 ? "Products" : "product"} found.
          </p>
        </div>

        {/* For search product */}
        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Sort products*/}
        <div className={styles.sort}>
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      <div className={grid ? `${styles.grid}` : `${styles.list}`}>
        {products.length === 0 ? (
          <p>No product found</p>
        ) : (
          <>
            {filterProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} product={product} grid={grid} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productPerPage={productPerPage}
        totalProducts={filterProducts.length}
      />
    </div>
  );
};

export default ProductList;
