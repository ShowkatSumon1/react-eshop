import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_CART,
  PREVIOUS_URL,
  REMOVE_PRODUCT,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
  TOTAL_AMOUNT,
  TOTAL_QUANTITY,
} from "../../redux/slice/cartSlice";
import styles from "./Cart.module.scss";

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  //// quantity button
  const dispatch = useDispatch();
  const increaseCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
  };

  //// remove and clear
  const removeProduct = (product) => {
    dispatch(REMOVE_PRODUCT(product));
  };
  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  ////// for total amount
  useEffect(() => {
    dispatch(TOTAL_AMOUNT());
    dispatch(TOTAL_QUANTITY());
    dispatch(PREVIOUS_URL(""));
  }, [dispatch, cartItems]);

  /////// start checkOut functionality:
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  /// for return to login And return back to Checkout.
  const url = window.location.href;
  const doCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(PREVIOUS_URL(url));
      navigate("/login");
    }
  };
  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product, index) => {
                  const { id, name, price, imageURL, cartQuantity } = product;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button
                            className="--btn"
                            onClick={() => decreaseCart(product)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="--btn"
                            onClick={() => increaseCart(product)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeProduct(product)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className={styles.summary}>
              <button className="--btn --btn-danger" onClick={clearCart}>
                Clear cart
              </button>
              <div className={styles.checkout}>
                <div>
                  <Link to="/#products">&larr; Continue shopping</Link>
                </div>
                <br />
                <Card cardClass={styles.card}>
                  <p>
                    <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
                  </p>
                  <div className={styles.text}>
                    <h4>Subtotal:</h4>
                    <h3>${cartTotalAmount.toFixed(2)}</h3>
                  </div>
                  <p>Tex an shipping calculated at checkout</p>
                  <button
                    className="--btn --btn-primary --btn-block"
                    onClick={doCheckout}
                  >
                    Checkout
                  </button>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
