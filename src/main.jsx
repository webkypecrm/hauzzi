import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Index2 from "./Index/Index2.jsx";
import Index3 from "./Index/Index3.jsx";
import Blog from "./Pages/Blog/Blog.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import AgentProfile from "./Pages/Agent/AgentProfile.jsx";
import AgentMobiliario from "./Pages/Agent/AgentMobiliario.jsx";
import About from "./Pages/About/About.jsx";
import AppDownloading from "./Pages/AppDownload/AppDownloading.jsx";
import MyAds from "./Pages/Ads/MyAds.jsx";
import MyFavorites from "./Pages/Favorites/MyFavorites.jsx";
import Plans from "./Pages/Plans/Plans.jsx";
import PropertySell from "./Pages/Property/PropertySell.jsx";
import Messages from "./Pages/Messages/Messages.jsx";
import MyAlert from "./Pages/Alert/MyAlert.jsx";
import Agencies from "./Pages/RealState/Agencies.jsx";
import Profile from "./Pages/RealState/AgencyProfile.jsx";
import PublishProperty from "./Pages/Property/PublishProperty.jsx";
import PropertyDetils from "./Pages/Property/PropertyDetils.jsx";
import SellForRent from "./Pages/Sell/SellForRent.jsx";
import MyVisit from "./Pages/Visit/MyVisit.jsx";
import MyProfile from "./Pages/Profile/MyProfile.jsx";
import MyComparisons from "./Pages/Comparisons/MyComparisons.jsx";
import SignIn from "./Pages/Signin/SignIn.jsx";
import SignUp from "./Pages/Signup/SignUp.jsx";
import ForgotPassword from "./Pages/Password/ForgotPassword.jsx";
import CreatePassword from "./Pages/Password/CreatePassword.jsx";
import BlogDetails from "./Pages/Blog/BlogDetails.jsx";
import PrivateRoute from "./PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropertyEdit from "./Pages/Property/PropertyEdit.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/index2" element={<Index2 />} />
        <Route path="/index3" element={<Index3 />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/agentprofile/:id" element={<AgentProfile />} />
        <Route path="/agentmobiliario" element={<AgentMobiliario />} />
        <Route path="/appdownload" element={<AppDownloading />} />
        <Route path="/myads" element={<MyAds />} />
        <Route
          path="/myfavoriets"
          element={
            <PrivateRoute>
              <MyFavorites />
            </PrivateRoute>
          }
        />
        <Route path="/mymessages" element={<Messages />} />
        <Route path="/myalert" element={<MyAlert />} />
        <Route path="/myvisit" element={<MyVisit />} />
        <Route
          path="/myprofile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycomparisons"
          element={
            <PrivateRoute>
              <MyComparisons />
            </PrivateRoute>
          }
        />
        <Route path="/plans" element={<Plans />} />
        <Route path="/propertysell" element={<PropertySell />} />
        <Route
          path="/publish-propert"
          element={
            <PrivateRoute>
              <PublishProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-propert/:id"
          element={
            <PrivateRoute>
              <PropertyEdit/>
            </PrivateRoute>
          }
        />
        <Route path="/propert-details/:id" element={<PropertyDetils />} />
        <Route path="/real-state-agencies" element={<Agencies />} />
        <Route path="/agencyprofile/:id" element={<Profile />} />
        <Route path="/sellforrent" element={<SellForRent />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details/:slug" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-password" element={<CreatePassword />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer style={{ padding: "20px" }} />
  </StrictMode>
);
