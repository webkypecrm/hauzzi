import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import blogImg from "../../assets/img/blog.jpg";

const BlogDetails = () => {
     const [blogsData, setBlogsData] = useState([]);
      const [blogsData5, setBlogsData5] = useState([]);
      const [loading, setLoading] = useState(false);
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
    
      // get all blog
      const handelBlogData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${apiUrl}/blog/getAll?limit=10`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          const allBlogs = res.data?.data || [];
          setBlogsData(allBlogs);
          setBlogsData5(allBlogs.slice(2, 12));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    
      console.log("blogdata", blogsData);
    
       useEffect(() => {
        handelBlogData();
      }, []);
 
  return (
     <Fragment>
          <div className="index-page">
            {loading ? (
              <div style={{ marginTop: "20%" }}>
                <Loading />
              </div>
            ) : (
              <Fragment>
                <Header />
                <div className="main">
                  <section id="hero" className="hero section slider-sec" style={{paddingTop:"160px"}}>
                    <div
                      className="container"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div
                            className="hero-content"
                            data-aos="fade-up"
                            data-aos-delay="200"
                            style={{paddingTop:"120px"}}
                          >
                            <h1 className="" style={{ fontSize: "30px",marginBottom:"150px",}}>
                              {" "}
                              Los errores más comunes al comprar una propiedad en Venezuela y cómo evitarlos 🏠
                              {" "}
                            </h1>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div
                            className="hero-image"
                            data-aos="zoom-out"
                            data-aos-delay="300"
                          >
                            <img
                              src={blogImg}
                              alt="Hero Image"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
    
                  <div id="services" className="services section light-background">
                    <div className="container">
                      <div className="row gy-4">

                          <div className="col-md-8">
                            <div className="row">
                              {/* {blogsData4.map((blog) => (
                                <div className="col-xl-6 col-md-6" key={blog.id}>
                                  <Link to="#">
                                    <div className="feat_property">
                                      <div className="thumb">
                                        {blog.photoUrl && (
                                          <img
                                            src={blog.photoUrl}
                                            alt="Blog Image"
                                            className="img-whp"
                                          />
                                        )}
                                      </div>
                                      <div className="details">
                                        <div className="tc_content">
                                          <p className="text-thm sub-t">
                                            <span>Bienes raíces</span>
                                          </p>
                                          <div className="title-price">
                                            <h4>{blog.title}</h4>
                                          </div>
                                          <h5
                                            className="mt-2"
                                            style={{
                                              color: "#FFBD59",
                                              fontSize: "18px",
                                            }}
                                          >
                                            Seguir leyendo{" "}
                                            <i
                                              className="fa fa-long-arrow-right"
                                              style={{ marginLeft: "10px" }}
                                            ></i>
                                          </h5>
                                          <div
                                            className="fp_footer"
                                            style={{ border: "unset" }}
                                          >
                                            <ul className="fp_meta float-left mb0 mb-0 p-0">
                                              <li className="list-inline-item">
                                                <span to="#">
                                                  <img
                                                    src="img/my-img/Image.png"
                                                    alt="pposter1.png"
                                                    width="30%"
                                                  />{" "}
                                                  <span
                                                    style={{
                                                      marginLeft: "6px",
                                                      color: "#97989F",
                                                    }}
                                                  >
                                                    Tracey Wilson
                                                  </span>
                                                </span>
                                              </li>
                                            </ul>
                                            <div className="fp_pdate float-right">
                                              {new Date(
                                                blog.createdAt
                                              ).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                              })}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))} */}
                              {/* <!-- End Feature Borx--> */}
                              {/* <div className="col-md-12">
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn"
                                    style={{ border: "1px solid #7c7c7c" }}
                                  >
                                    Leer más
                                  </button>
                                </div>
                              </div> */}
                              {/* <!-- End Feature Borx--> */}
                            </div>
                          </div>

                        {blogsData5?.length > 0 && (
                          <div className="col-md-4">
                            <h4 className="mb-3">Post populares</h4>
                            <div className="row">
                              {blogsData5.map((e) => (
                                <Fragment key={e.id}>
                                  <div className="col-md-4">
                                    <div className="img-v">
                                      <img
                                        // src="img/my-img/blog1.png"
                                        src={e.photoUrl}
                                        alt=""
                                        width="100%"
                                        height="65px"
                                        
                                        style={{borderRadius:"5px"}}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-8 p-0">
                                    <div className="text-v1">
                                      <p>
                                        {e.title}
                                      </p>
                                      <div className="mt-3">
                                        <div
                                          className="fp_footer"
                                          style={{ border: "unset" }}
                                        >
                                          <ul className="fp_meta float-left mb0 mb-0 p-0">
                                            <li className="list-inline-item">
                                              <span to="#">
                                                <img
                                                  src="img/my-img/Image.png"
                                                  alt="pposter1.png"
                                                  width="20%"
                                                />{" "}
                                                <span
                                                  style={{
                                                    marginLeft: "6px",
                                                    color: "#97989F",
                                                  }}
                                                >
                                                  Tracey Wilson
                                                </span>
                                              </span>
                                            </li>
                                          </ul>
                                          <div
                                            className="fp_pdate float-right"
                                            style={{
                                              fontSize: "14px",
                                              color: "#97989F",
                                            }}
                                          >
                                            {new Date(
                                                e.createdAt
                                              ).toLocaleDateString("en-US", {
                                                weekday: "short",
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                              })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
    
                  <Footer />
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
  )
}

export default BlogDetails