import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

////// components from index
import { Footer, Header } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
//// pages from index
import { Admin, Contact, Home, Login, Register, Reset } from "./pages";

function App() {
  return (
    <>
      <ToastContainer autoClose={500}/>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route path="/admin/*" element={ <AdminOnlyRoute> <Admin /> </AdminOnlyRoute>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
