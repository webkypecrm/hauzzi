import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import blogImg from "../../assets/img/blog.jpg";

const BlogDetails = () => {
     const [blogData, setBlogData] = useState([]);
      const [blogsData5, setBlogsData5] = useState([]);
      const [loading, setLoading] = useState(false);
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
      const {slug} = useParams();
    
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
          setBlogsData5(allBlogs.slice(0, 10));
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    
      console.log("blogdata", blogData);

      // get blog data
      const getBlogData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${apiUrl}/blog/blogBySlug/${slug}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setBlogData(res.data?.data || []);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      console.log("first", blogData);


    
       useEffect(() => {
        handelBlogData();
        getBlogData();
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
                            <div className="row" style={{padding:"0 10px"}}>

                                {/* <div className="col-xl-6 col-md-6" > */}
                                  {/* <Link to="#"> */}
                                    {/* <div className="feat_property"> */}
                                      
                                      {/* <div className="details"> */}
                                         <div dangerouslySetInnerHTML={{__html: blogData.content}}/>
                                          
                                        
                                      {/* </div> */}
                                    {/* </div> */}
                                  {/* </Link> */}
                                {/* </div> */}

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
                                                  By Hauzzi
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