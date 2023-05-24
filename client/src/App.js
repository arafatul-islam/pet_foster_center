import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Error from "./components/Error/Error";
import Booking from "./components/FosterCenter/Booking";
import Profile from "./components/FosterCenter/Profile";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/Admin/Admin";
import Adoption from "./pages/Adoption/Adoption";
import Community from "./pages/Community/Community";
import Contact from "./pages/Contact/Contact";
import PetShop from "./pages/Ecommerce/PetShop";
import Faq from "./pages/FAQ/Faq";
import FosterCenter from "./pages/FosterCenter";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import VetDoctor from "./pages/vet/VetDoctor";

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<FosterCenter />} />
        <Route path="/fostercenter/" element={<FosterCenter />}>
          <Route path=":fcid" element={<Booking />} />
        </Route>
        <Route path="register" element={<Register />} />
        {user?.username ? (
          <>
            <Route path="login" element={<Navigate to="/profile" />} />
            <Route path="profile" element={<Profile />} />
          </>
        ) : (
          <Route>
            <Route path="profile" element={<Navigate to="/login" />} />

            <Route path="login" element={<Login />} />
          </Route>
        )}
        {user?.username && user?.isAdmin ? (
          <>
            <Route path="admin" element={<Admin />} />
          </>
        ) : (
          <>
            <Route path="admin" element={<Navigate to="/profile" replace />} />
          </>
        )}
        <Route path="adoption" element={<Adoption />} />
        <Route path="vet" element={<VetDoctor />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route
          path="community"
          element={user ? <Community /> : <Navigate to="/login" />}
        />
        <Route
          path="petshop"
          element={user ? <PetShop /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={
            <div>
              <div className="row  justify-content-center align-content-center">
                <div className="col-md-8">
                  <Error>404 page not found!</Error>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
      <ScrollToTop smooth />
    </>
  );
}

export default App;
