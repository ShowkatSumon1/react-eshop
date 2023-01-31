import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import styles from "./ReviewProducts.module.scss";
import spinnerImg from "../../assets/spinner.jpg";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";

const ReviewProducts = () => {
  const [product, setProduct] = useState(null);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);

  const userName = useSelector(selectUserName);
  const userID = useSelector(selectUserID);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Product</h2>
        {product === null ? (
          <img src={spinnerImg} style={{ width: "50px" }} alt="Loading..." />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating: </label>
            <StarsRating
              value={rate}
              required
              onChange={(value) => {
                setRate(value);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              cols="30"
              rows="10"
            ></textarea>
            <button className="--btn --btn-primary">Submit Review</button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
