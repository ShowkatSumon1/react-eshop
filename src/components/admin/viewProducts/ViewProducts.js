import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import { db, storage } from "../../../firebase/config";
import {
  selectProduct,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import Loader from "../../loader/Loader";
import styles from "./ViewProducts.module.scss";

const ViewProducts = () => {
  //// Before custom hook:
  /*
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    /*
    const getProducts = () => {
        setIsLoading(true);
        try {
            const productsRef = collection(db, "products");
            const q = query(productsRef, orderBy("createdAt", "desc"));

            onSnapshot(q, (snapshot) => {
                const allProducts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setProducts(allProducts);
                //// for reducer
                dispatch(STORE_PRODUCTS({
                    products: allProducts,
                }))
                setIsLoading(false);
            });
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }
    useEffect(() => {
        getProducts();
    }, [])
    */

  ////// Now from custom hook:
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

  //// For delete product
  const handleDelete = async (id, imageURL) => {
    try {
      /// Delete product
      await deleteDoc(doc(db, "products", id));
      //// delete image
      const imageRef = ref(storage, imageURL);
      deleteObject(imageRef);
      toast.success("Product delete successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //////// Confirm delete:
  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete product!!",
      "Are you going to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        handleDelete(id, imageURL);
      },
      function cancelCb() {
        return null;
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        {products.length === 0 ? (
          <p>No product found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => {
                const { id, name, imageURL, category, price } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>${price}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color={"green"} />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color={"red"}
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
