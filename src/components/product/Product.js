import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectProduct, STORE_PRODUCTS } from "../../redux/slice/productSlice";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";

const Product = () => {
    const dispatch = useDispatch();
    const { data, isLoading } = useFetchCollection('products');
    useEffect(() => {
        dispatch(STORE_PRODUCTS({
            products: data,
        }))
    }, [dispatch, data])
    const products = useSelector(selectProduct);

    return (
        <section>
            <div className={`container ${styles.product}`}>
                <aside className={styles.filter}>
                    <ProductFilter/>
                </aside>
                <div className={styles.content}>
                    <ProductList products={products}/>
                </div>
            </div>
        </section>
    )
};

export default Product;