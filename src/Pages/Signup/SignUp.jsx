// import React, { Fragment, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const apiUrl = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate();

//   const initialForm = {
//     name: "",
//     email: "",
//     password: "",
//     // confirmPassword:"",
//     userType: "",
//   };

//   const [registerData, setRegisterData] = useState(initialForm);

//   const handelInputChange = (e) => {
//     setRegisterData({
//       ...registerData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // const handelSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await axios.post(
//   //       `${apiUrl}/employee/add-customer`,
//   //       registerData
//   //     );

//   //     localStorage.setItem("token", res.data.data.Token);
//   //     localStorage.setItem("tokenId", res.data.data.id);
//   //     localStorage.setItem("userType", res.data.data.userType);

//   //     toast.success("Registered Successfully", {
//   //       autoClose: 1000,
//   //     });

//   //     setTimeout(() => {
//   //       navigate("/dashboard");
//   //     }, 1500);
//   //   } catch (error) {
//   //     console.log(error);
//   //     toast.error(error.response.data.message);
//   //   }
//   // };


// const handelSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post(
//       `${apiUrl}/employee/add-customer`,
//       registerData
//     );

//     const token = res?.data?.data?.Token;
//     const userId = res?.data?.data?.id;
//     const userType = res?.data?.data?.userType;

//     if (!token || !userId) {
//       toast.error("Invalid response from server");
//       return;
//     }

//     if (rememberMe) {
//       // Remember me ON → localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("tokenId", userId);
//       localStorage.setItem("userType", userType);
//     } else {
//       // Remember me OFF → sessionStorage
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("tokenId", userId);
//       sessionStorage.setItem("userType", userType);
//     }

//     toast.success("Registered Successfully", { autoClose: 1000 });

//     setTimeout(() => {
//       navigate("/dashboard");
//     }, 1500);

//   } catch (error) {
//     console.log(error);
//     toast.error(error?.response?.data?.message || "Something went wrong");
//   }
// };


// useEffect(() => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");
//   if (token) {
//     navigate("/dashboard");
//   }
// }, []);



//   return (
//     <Fragment>
//       <div className="container-fluid">
//         <div className="row align-items-center">
//           <div className="col-md-7 position-relative p-0 overflow-hidden">
//             <div className="position-relative">
//               <div className="left-bannero-top d-md-block d-none">
//                 <img src="left-bannero-top.svg" alt="" />
//               </div>
//               <div className="left-banner-side">
//                 <img className="d-md-block d-none" src="baner-bg.jpeg" alt="" />
//                 <img
//                   className="d-md-none d-block"
//                   src="image 6 (1).png"
//                   alt=""
//                 />
//               </div>
//               <div className="left-banerr-bottom d-md-block d-none">
//                 <img src="left-banerr-bottom.svg" alt="" />
//               </div>
//             </div>
//             <div className="white-logoleft">
//               <img src="logo-white.svg" alt="" />
//               <p>Busca, Compara y Elige</p>
//             </div>
//           </div>
//           <div className="col-md-5 p-0">
//             <div className="right-banner-side" style={{ padding: "0px 40px" }}>
//               <div className="black-logo-right text-center">
//                 <img src="logo-black.svg" alt="" />
//               </div>
//               <div className="my-3 Bienvenido">
//                 <h2>Bienvenido</h2>
//               </div>
//               <form
//                 onSubmit={handelSubmit}
//                 style={{ borderBottom: "1px solid #E5E5E5" }}
//               >
//                 <div className="d-flex justify-content-between align-items-center mb-3">
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       defaultValue=""
//                       id="Usuario"
//                       name="userType"
//                       value={"0"}
//                       checked={registerData.userType === "0"}
//                       onChange={(e) =>
//                         setRegisterData({
//                           ...registerData,
//                           userType: e.target.value,
//                         })
//                       }
//                     />
//                     <label
//                       className="form-check-label new-form-label"
//                       htmlFor="Usuario"
//                     >
//                       Usuario
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       defaultValue=""
//                       id="Agente"
//                       name="userType"
//                       value={1}
//                       checked={registerData.userType === 1}
//                       onChange={(e) =>
//                         setRegisterData({
//                           ...registerData,
//                           userType: parseInt(e.target.value),
//                         })
//                       }
//                     />
//                     <label
//                       className="form-check-label new-form-label"
//                       htmlFor="Agente"
//                     >
//                       Agente
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       defaultValue=""
//                       id="Inmobiliaria"
//                       name="userType"
//                       value={2}
//                       checked={registerData.userType === 2}
//                       onChange={(e) =>
//                         setRegisterData({
//                           ...registerData,
//                           userType: parseInt(e.target.value),
//                         })
//                       }
//                     />
//                     <label
//                       className="form-check-label new-form-label"
//                       htmlFor="Inmobiliaria"
//                     >
//                       Inmobiliaria
//                     </label>
//                   </div>
//                 </div>

//                 {/* <h1 className="header-text">Nos da gusto volver a verte</h1> */}
//                 <div className="mb-3">
//                   <label htmlFor="name" className="form-label">
//                     Nombre completo
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control   input-filed-design-hauzzi"
//                     // id="email"
//                     placeholder="Ingresa tu nombre completo"
//                     name="name"
//                     value={registerData.name}
//                     onChange={handelInputChange}
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email
//                   </label>
//                   <div
//                     className="input-group"
//                     style={{ border: "1ox solid #E5E5E5" }}
//                   >
//                     <input
//                       type="email"
//                       className="form-control input-filed-design-hauzzi border-0"
//                       id="email"
//                       placeholder="Ingresa tu correo electrónico"
//                       name="email"
//                       value={registerData.email}
//                       onChange={handelInputChange}
//                     />
//                     {/* <span
//                       className="input-group-text  border-0"
//                       style={{ background: "#f2f2f2" }}
//                     >
//                       <i className="bi bi-eye" />
//                     </span> */}
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">
//                     Crear contraseña
//                   </label>
//                   <div
//                     className="input-group"
//                     style={{ border: "1ox solid #E5E5E5" }}
//                   >
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="form-control input-filed-design-hauzzi border-0"
//                       // id="password"
//                       placeholder="Ingresar contraseña"
//                       name="password"
//                       value={registerData.password}
//                       onChange={handelInputChange}
//                     />
//                     <span
//                       className="input-group-text  border-0"
//                       style={{ background: "#f2f2f2" }}
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       <i
//                         className={`bi ${
//                           showPassword ? "bi-eye-slash" : "bi-eye"
//                         }`}
//                       />
//                     </span>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-between align-items-center ">
//                   <div className="d-flex align-items-center">
//                     <label className="switch">
//                       <input
//                         type="checkbox"
//                         className="toogle-switch"
//                         checked={rememberMe}
//                         onChange={(e) => setRememberMe(e.target.checked)}
//                       />
//                       <span className="slider" />
//                     </label>
//                     <span
//                       className="ms-2 toogle-switch-text"
//                       style={{ fontSize: 14 }}
//                     >
//                       Recuérdame
//                     </span>
//                   </div>
//                 </div>
//                 <button type="submit" className="Iniciar-bbtn w-100 my-4">
//                   Crear cuenta
//                 </button>
//               </form>
//               <div className="continue-with-section position-relative mt-3">
//                 <div className="continue-with">
//                   <img src="apple.svg" alt="" />
//                 </div>
//                 <div className="continue-with-text">
//                   <p>Continuar con Apple</p>
//                 </div>
//               </div>
//               <div className="continue-with-section position-relative mt-3">
//                 <div className="continue-with">
//                   <img src="facebook.svg" alt="" />
//                 </div>
//                 <div className="continue-with-text">
//                   <p>Continuar con Facebook</p>
//                 </div>
//               </div>
//               <div className="continue-with-section position-relative mt-3">
//                 <div className="continue-with">
//                   <img src="GOOGLE.svg" alt="" />
//                 </div>
//                 <div className="continue-with-text">
//                   <p>Continuar con Google</p>
//                 </div>
//               </div>
//               {/* <div className="mt-3">
//                 <div className="text-end">
//                   <p className="mb-0 dont-have-acount">
//                     <a className="me-2" href="">
//                       ¿No tienes cuenta?
//                     </a>
//                     Crear cuenta
//                   </p>
//                 </div>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default SignUp;




// with remember me
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const initialForm = {
    name: "",
    email: "",
    password: "",
    userType: "",
  };

  const [registerData, setRegisterData] = useState(initialForm);

  const handelInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${apiUrl}/employee/add-customer`,
        registerData
      );

      const token = res?.data?.data?.Token;
      const userId = res?.data?.data?.id;
      const userType = res?.data?.data?.userType;

      if (!token || !userId) {
        toast.error("Invalid response from server");
        return;
      }

      if (rememberMe) {
        // Remember me ON → localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("tokenId", userId);
        localStorage.setItem("userType", userType);
      } else {
        // Remember me OFF → sessionStorage
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("tokenId", userId);
        sessionStorage.setItem("userType", userType);
      }

      toast.success("Registered Successfully", { autoClose: 1000 });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // Auto redirect if already logged in
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-7 position-relative p-0 overflow-hidden">
            {/* Left banner & logo */}
          </div>
          <div className="col-md-5 p-0">
            <div className="right-banner-side" style={{ padding: "0px 40px" }}>
              <div className="black-logo-right text-center">
                <img src="logo-black.svg" alt="" />
              </div>
              <div className="my-3 Bienvenido">
                <h2>Bienvenido</h2>
              </div>

              <form onSubmit={handelSubmit}>
                {/* User type checkboxes */}
                {/* Name field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresa tu nombre completo"
                    name="name"
                    value={registerData.name}
                    onChange={handelInputChange}
                  />
                </div>

                {/* Email field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa tu correo electrónico"
                    name="email"
                    value={registerData.email}
                    onChange={handelInputChange}
                  />
                </div>

                {/* Password field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Crear contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Ingresar contraseña"
                      name="password"
                      value={registerData.password}
                      onChange={handelInputChange}
                    />
                    <span
                      className="input-group-text"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      />
                    </span>
                  </div>
                </div>

                {/* Remember Me toggle */}
                <div className="d-flex align-items-center mb-3">
                  <label className="switch me-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="slider" />
                  </label>
                  <span style={{ fontSize: 14 }}>Recuérdame</span>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Crear cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
