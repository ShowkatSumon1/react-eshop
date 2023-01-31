import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE_CART,
  selectCartItems,
  TOTAL_QUANTITY,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { document } = useFetchDocument("products", id);

  /////// for review
  const { data } = useFetchCollection("reviews");
  const filterReviews = data.filter((items) => items.productID === id);

  /////Before fetch. Now come from fetch.
  /*
  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const withId = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(withId);
    } else {
      toast.error("No product found");
    }
  };
*/

  ///// getProduct function in state
  useEffect(() => {
    setProduct(document);
  }, [document]);

  /////// items from cart
  const cartItems = useSelector(selectCartItems);
  const thisProduct = cartItems.find((item) => item.id === id);
  const thisItem = cartItems.findIndex((item) => item.id === id);

  /////// add to cart button and increase
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(TOTAL_QUANTITY());
  };
  //// decrease cart
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(TOTAL_QUANTITY());
  };
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} style={{ width: "50px" }} alt="loading..." />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className={styles.count}>
                  {thisItem < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>{thisProduct.cartQuantity}</p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
          <div>
            {filterReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filterReviews.map((reviews, index) => {
                  const { review, userName, reviewDate, rate } = reviews;
                  return (
                    <div className={styles.review}>
                      <StarsRating disabled value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>By: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
