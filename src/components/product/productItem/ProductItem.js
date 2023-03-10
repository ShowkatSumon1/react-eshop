import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_TO_CART, TOTAL_QUANTITY } from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";

const ProductItem = ({ product, grid, id, name, imageURL, desc, price }) => {
  const shortText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  ///////// for cart
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(TOTAL_QUANTITY());
  };
  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>

      <div className={styles.content}>
        <div className={styles.details}>
          <p>${price}</p>
          <h4>{grid ? shortText(name, 18) : name}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortText(desc, 200)}</p>}
        <button
          className="--btn --btn-danger"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
