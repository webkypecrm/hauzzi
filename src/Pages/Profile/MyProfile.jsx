import React, { Fragment, useEffect, useState } from "react";
import Footer from "../MainPage/Footer";
import Header from "../MainPage/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Select from "react-select";

const MyProfile = () => {
  const [allData, setAllData] = useState([]);

  const customerId = localStorage.getItem("tokenId") || "";
  const token = localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [previewImage, setPreviewImage] = useState(
    "img/my-img/pp-textarea.png"
  );

  // get Data

  const getAllData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/profile/getById/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allData?.email) {
      setProfileData((prev) => ({
        ...prev,
        email: allData.email,
      }));
    }
  }, [allData]);

  useEffect(() => {
    getAllData();
  }, []);

  const name = allData?.name;
  const phn = allData?.userDetails?.map((item) => item.phone);
  const profileImg = allData?.userDetails?.map((item) => item.photoUrl);
  const photo = allData?.userDetails?.map((item) => item.photo);

  // post Api
  const initialData = {
    whatsApp: "",
    name: "",
    email: allData?.email || "",
    phone: "",
    address: "",
    website: "",
    agency: "",
    notes: "",
    photo: "",
    customerId: localStorage.getItem("tokenId") || "",
    userType: localStorage.getItem("userType") || "",
  };
  const [profileData, setProfileData] = useState(initialData);

  const handelInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo" && files.length > 0) {
      const file = files[0];
      setProfileData((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Generate preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (let key in profileData) {
        formData.append(key, profileData[key]);
      }

      const res = await axios.post(`${apiUrl}/profile/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfileData(initialData);
      toast.success("Profile Updated", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  // Password reset
  const initialPasswordState = {
    customerId: localStorage.getItem("tokenId") || "",
    // userType: localStorage.getItem("userType") || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [resetPassword, setResetPassword] = useState(initialPasswordState);

  const handelPasswordInputChange = (e) => {
    setResetPassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/employee/reset-password`,
        resetPassword
      );

      setResetPassword(initialPasswordState);
      toast.success("Password changed", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Social Media
  const initialSocialMediaState = {
    customerId: localStorage.getItem("tokenId") || "",
    userType: localStorage.getItem("userType") || "",
    facebook: "",
    instagram: "",
    linkedIn: "",
    youtube: "",
    tiktok: "",
  };
  const [socialMedia, setSocialMedia] = useState(initialSocialMediaState);

  const handelSocialMediaInputChange = (e) => {
    setSocialMedia((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmitSocialMedia = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/profile/add`, socialMedia, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Social Media Updated", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Specialties
  const initialSpecialtiesState = {
    customerId: localStorage.getItem("tokenId") || "",
    specialities: "",
    userType: localStorage.getItem("userType") || "",
  };
  const [specialties, setSpecialties] = useState(initialSpecialtiesState);

  const handelSpecialtiesInputChange = (e) => {
    setSpecialties((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitSpecialties = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/profile/add`, specialties, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Specialities Updated", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // usertype GET
  const getUserTypeLabel = () => {
    const type = localStorage.getItem("userType");
    if (type === "1") return "Agent";
    if (type === "2") return "Real Estate";
    return "User";
  };

  // language options and Api
  const [languages, setLanguages] = useState([]);

  const languageOptions = [
    { value: "Inglés", label: "Inglés" },
    { value: "Chino mandarín", label: "Chino mandarín" },
    { value: "Hindi", label: "Hindi" },
    { value: "Español", label: "Español" },
    { value: "Francés", label: "Francés" },
    { value: "Árabe", label: "Árabe" },
    { value: "Bengalí", label: "Bengalí" },
    { value: "Portugués", label: "Portugués" },
    { value: "Ruso", label: "Ruso" },
    { value: "Urdu", label: "Urdu" },
    { value: "Indonesio", label: "Indonesio" },
    { value: "Alemán", label: "Alemán" },
    { value: "Japonés", label: "Japonés" },
    { value: "Swahili", label: "Swahili" },
    { value: "Maratí", label: "Maratí" },
    { value: "Telugu", label: "Telugu" },
    { value: "Turco", label: "Turco" },
    { value: "Tamil", label: "Tamil" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Coreano", label: "Coreano" },
    { value: "Vietnamita", label: "Vietnamita" },
    { value: "Italiano", label: "Italiano" },
    { value: "Tailandés", label: "Tailandés" },
    { value: "Persa (Farsi)", label: "Persa (Farsi)" },
    { value: "Polaco", label: "Polaco" },
    { value: "Malayo", label: "Malayo" },
    { value: "Holandés", label: "Holandés" },
    { value: "Griego", label: "Griego" },
    { value: "Hebreo", label: "Hebreo" },
    { value: "Checo", label: "Checo" },
    { value: "Hausa", label: "Hausa" },
    { value: "Birmano", label: "Birmano" },
    { value: "Serbocroata", label: "Serbocroata" },
  ];

  const initialLanguage = {
    languages: [],
    customerId: localStorage.getItem("tokenId") || "",
    userType: localStorage.getItem("userType") || "",
  };

  const [language, setLanguage] = useState(initialLanguage);

  const handleSubmitLanguages = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/profile/add`, language, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Languages Updated", {
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <div className="index-page">
        <Header />

        <main className="main">
          <section className="top-btn12">
            <div className="container-lg py-3">
              {/* Navigation */}
              {/* <div className="d-flex flex-wrap justify-content-center mb-2 myadsnav">
                <button type="" className="nav-button">Publicar inmueble</button>
                <button className="nav-button">Mis anuncios</button>
                <button className="nav-button">Mis favoritos</button>
                <button className="nav-button">Mis alertas</button>
                <button className="nav-button">Mis mensajes</button>
                <button className="nav-button">Mis comparaciones</button>
                <button className="nav-button">Mis visitas</button>
                <button className="nav-button active">Mi perfil</button>
              </div> */}
              <div className="d-flex flex-wrap justify-content-center mb-4 ">
                <Link to={"/publish-propert"} className="nav-button ">
                  Publicar inmueble
                </Link>
                <Link to={"/myads"} className="nav-button">
                  Mis anuncios
                </Link>
                <Link to={"/myfavoriets"} className="nav-button">
                  Mis favoritos
                </Link>
                <Link to={"/myalert"} className="nav-button">
                  Mis alertas
                </Link>
                <Link to={"/mymessages"} className="nav-button">
                  Mis mensajes
                </Link>
                <Link to={"/mycomparisons"} className="nav-button">
                  Mis comparaciones
                </Link>
                <Link to={"/myvisit"} className="nav-button">
                  Mis visitas
                </Link>
                <Link to={"/myprofile"} className="nav-button active">
                  Mi perfil
                </Link>
              </div>
              <hr style={{ borderColor: "#d7d6d6" }} />
              <div className="row g-4">
                <div className="col-lg-6">
                  <h4 className="mb-4">Información básica</h4>
                  <form onSubmit={handleSubmit}>
                    {/* Nombre */}

                    {/* <div className="col-lg-12"> */}
                    {/* <div className="profile-container mt-1"> */}
                    <div className="profile-pic-wrapper ms-lg-0 mb-3">
                      {/* <img src={previewImage} alt="Profile" id="profileImage" /> */}
                      {photo == "" || photo == null ? (
                        <img
                          src={previewImage}
                          alt="Profile"
                          id="profileImage"
                        />
                      ) : (
                        <img src={profileImg} alt="Profile" id="profileImage" />
                      )}
                      <label htmlFor="fileInput" className="edit-icon">
                        <img src="img/my-img/gallery-edit.svg" />
                      </label>
                      <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        name="photo"
                        onChange={handelInputChange}
                      />
                    </div>
                    {/* </div> */}
                    {/* </div> */}

                    <div className="mb-3">
                      <label className="form-label">User Type</label>
                      <div className="input-group">
                        <span className="input-group-text  border-0">
                          <i className="bi bi-person-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          value={getUserTypeLabel()}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nombre(s)</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-person-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          // defaultValue="VictorIA"
                          placeholder={name ? name : "Nombre"}
                          name="name"
                          value={profileData.name}
                          onChange={handelInputChange}
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-envelope-fill primary-text" />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="nombre@gmail.com"
                          name="email"
                          value={profileData.email}
                          // onChange={handelInputChange}
                          disabled
                        />
                      </div>
                    </div>
                    {/* Teléfono */}
                    <div className="mb-3">
                      <label className="form-label">Teléfono</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-telephone-fill primary-text" />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder={phn ? phn : "+58 123 456 789"}
                          name="phone"
                          value={profileData.phone}
                          onChange={handelInputChange}
                        />
                      </div>
                    </div>
                    {/* Whatsapp */}
                    <div className="mb-3">
                      <label className="form-label">Whatsapp</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-whatsapp primary-text" />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="+58 123 456 789"
                          name="whatsApp"
                          value={profileData.whatsApp}
                          onChange={handelInputChange}
                        />
                      </div>
                    </div>
                    {/* Dirección */}
                    <div className="mb-3">
                      <label className="form-label">Dirección</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-geo-alt-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Introduzca su dirección"
                          name="address"
                          value={profileData.address}
                          onChange={handelInputChange}
                        />
                      </div>
                    </div>
                    {/* Página Web */}
                    <div className="mb-3">
                      <label className="form-label">Página web</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-globe primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="www.dominio.com"
                          name="website"
                          value={profileData.website}
                          onChange={handelInputChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Agencia inmobiliaria</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-house-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Agencia inmobiliaria"
                          name="agency"
                          value={profileData.agency}
                          onChange={handelInputChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Biografía</label>
                      <textarea
                        type="text"
                        className="form-control"
                        rows={8}
                        placeholder="Introduce tu biografía"
                        // defaultValue={""}
                        name="notes"
                        value={profileData.notes}
                        onChange={handelInputChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 p-2 mb-5"
                    >
                      Guardar cambios
                    </button>
                  </form>
                  <h4 className="mb-4">Gestión de datos</h4>
                  <div className="basic-container mb-4">
                    <input type="checkbox" id="checkbox2" />
                    <label htmlFor="checkbox2">
                      Ofertas y promociones inmobiliarias
                    </label>
                  </div>
                  <p>
                    Información de inmobiliarias o promotoras que ofrecen
                    inmuebles..
                  </p>
                  <div className="basic-container mb-4">
                    <input type="checkbox" id="checkbox3" />
                    <label htmlFor="checkbox3">
                      Información de servicios externos
                    </label>
                  </div>
                  <p>
                    Información de empresas que ofrecen servicios
                    complementarios a la compra-venta-alquiler de casas:
                    servicios financieros (hipotecas), tasaciones, suministros,
                    etc.&nbsp;&nbsp;
                  </p>
                  <div className="basic-container mb-4">
                    <input type="checkbox" id="checkbox4" />
                    <label htmlFor="checkbox4">Novedades de nuestro blog</label>
                  </div>
                  <p>
                    Información relevante de nuestro blog para mantenerte al
                    día.
                  </p>
                  <div className="basic-container mb-4">
                    <input type="checkbox" id="checkbox5" />
                    <label htmlFor="checkbox5">
                      Novedades y recomendaciones Hauzzi
                    </label>
                  </div>
                  <p>
                    Te mantendremos al día de las novedades del portal, las
                    mejoras que realizamos y te recomendaremos inmuebles para
                    que te sea más fácil encontrar piso o vender/alquilar tu
                    inmueble.
                  </p>
                  <div className="basic-container mb-4">
                    <input type="checkbox" id="checkbox6" />
                    <label htmlFor="checkbox6">
                      Ver publicidad basada en mi perfil
                    </label>
                  </div>
                  <p>
                    Si mantienes activada esta opción la publicidad que se te
                    muestre será aquella con la que personas en tu grupo de
                    edad, género, intereses u localización suelen interactuar.
                    Si desactivas esta opción se te mostrará publicidad genérica
                    que no tendrá en cuenta la información de tu perfil.
                  </p>
                  <div className="basic-container mb-4">
                    <input type="checkbox" id="checkbox7" />
                    <label htmlFor="checkbox7">Ofertas para tus anuncios</label>
                  </div>
                  <p>
                    No te pierdas las ofertas para destacar tu anuncio a un
                    precio irrepetible.
                  </p>
                  <button className="btn btn-primary w-100 p-2">
                    Guardar cambios
                  </button>
                </div>
                <div className="col-lg-6">
                  <h4 className="mb-4">Redes sociales</h4>
                  <form onSubmit={handleSubmitSocialMedia}>
                    {/* Nombre */}
                    <div className="mb-3">
                      <label className="form-label">Facebook</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-facebook primary-text" />
                        </span>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.facebook.com"
                          name="facebook"
                          value={socialMedia.facebook}
                          onChange={handelSocialMediaInputChange}
                        />
                      </div>
                    </div>
                    {/* Apellido */}
                    <div className="mb-3">
                      <label className="form-label">Instagram</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-instagram primary-text" />
                        </span>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.instagram.com"
                          name="instagram"
                          value={socialMedia.instagram}
                          onChange={handelSocialMediaInputChange}
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label">Youtube</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-youtube primary-text" />
                        </span>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.youtube.com"
                          name="youtube"
                          value={socialMedia.youtube}
                          onChange={handelSocialMediaInputChange}
                        />
                      </div>
                    </div>
                    {/* Teléfono */}
                    <div className="mb-3">
                      <label className="form-label">TikTok</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-tiktok primary-text" />
                        </span>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.tiktok.com"
                          name="tiktok"
                          value={socialMedia.tiktok}
                          onChange={handelSocialMediaInputChange}
                        />
                      </div>
                    </div>
                    {/* Whatsapp */}
                    {/* <div className="mb-3">
                      <label className="form-label">LinkedIn</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-linkedin primary-text" />
                        </span>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://www.linkedin.com"
                        />
                      </div>
                    </div> */}
                    {/* Dirección */}
                    {/* <div className="mb-4">
                      <label className="form-label">Dirección</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-linkedin primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Introduzca su dirección"
                        />
                      </div>
                    </div> */}
                    <button
                      type="submit"
                      className="btn btn-primary w-100 p-2 mb-4"
                    >
                      Guardar cambios
                    </button>
                  </form>
                  <h4 className="mb-4">Idiomas</h4>
                  <form onSubmit={handleSubmitLanguages}>
                  <div className="mb-4">
                    <label className="form-label">Selecciona idioma(s) </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <i className="bi bi-translate primary-text" />
                      </span>

                      <Select
                        isMulti
                        options={languageOptions}
                        className="form-control"
                        classNamePrefix="select"
                        placeholder="Selecciona idioma(s)"
                        onChange={(selected) => {
                          setLanguages(selected);
                          setLanguage((prev) => ({
                            ...prev,
                            languages: selected
                              .map((lang) => lang.value)
                              .join(", "),
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 p-2 mb-4">
                    Guardar cambios
                  </button>
                  </form>
                  <h4 className="mb-4">Especialidades</h4>
                  <form onSubmit={handleSubmitSpecialties}>
                    <div className="mb-4">
                      <label className="form-label">Especialidades</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-houses-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="#Apartamentos #Casas de lujo #Locales # Galpones"
                          name="specialities"
                          value={specialties.specialities}
                          onChange={handelSpecialtiesInputChange}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 p-2 mb-4"
                    >
                      Guardar cambios
                    </button>
                  </form>

                  <h4 className="mb-4">Seguridad</h4>
                  <form onSubmit={handleSubmitPassword}>
                    <div className="mb-3">
                      <label className="form-label">Contraseña actual</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-lock-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Introduza contraseña"
                          name="oldPassword"
                          value={resetPassword.oldPassword}
                          onChange={handelPasswordInputChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nueva Contraseña</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-lock-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nueva Contraseña"
                          name="newPassword"
                          value={resetPassword.newPassword}
                          onChange={handelPasswordInputChange}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Confirmar Contraseña</label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-0">
                          <i className="bi bi-lock-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Vuelva a introducir la contraseña"
                          name="confirmPassword"
                          value={resetPassword.confirmPassword}
                          onChange={handelPasswordInputChange}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 p-2 mb-4"
                    >
                      Guardar cambios
                    </button>
                  </form>

                  <h4 className="mb-4">Eliminar mi cuenta de Hauzzi</h4>
                  <p>
                    Si tienes previsto volver a utilizar Hauzzi dentro de un
                    tiempo, te recomendamos conservar tu cuenta.&nbsp;¡Cuando
                    nos necesites estaremos encantados de volver a recibirte!
                  </p>
                  <p>
                    La baja del servicio implica la eliminación de todos tus
                    datos almacenados hasta el momento por Hauzzi.
                  </p>
                  <div className="basic-container mb-4">
                    <input type="checkbox" id="basic1" defaultChecked="" />
                    <label htmlFor="basic1">
                      Entiendo que al darme de baja perderé mis anuncios
                      publicados, mis alertas de búsquedas guardadas, mis
                      favoritos y otros servicios de Hauzzi.
                    </label>
                  </div>
                  <button className="btn btn-primary w-100 p-2 mb-4">
                    Eliminar mi cuenta
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default MyProfile;
