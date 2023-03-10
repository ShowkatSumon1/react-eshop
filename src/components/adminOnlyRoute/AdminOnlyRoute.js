import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "sowkatalisumon@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This page only for admin user</p>
        <br />
        <Link to={"/"}>
          <button className="--btn --btn-primary">&larr; Back to home</button>
        </Link>
      </div>
    </section>
  );
};
export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "sowkatalisumon@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
