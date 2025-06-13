import { Fragment } from "react";
import "./App.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import "font-awesome/css/font-awesome.min.css";
import "./assets/css/main.css";
import "./assets/css/custom.css";
import "./assets/css/responsive.css";
import "@fontsource/roboto"; 
import 'swiper/css';
import 'swiper/css/navigation';
import Main from "./Pages/MainPage/Main";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Fragment>
      <Main />
    </Fragment>
  );
}

export default App;
