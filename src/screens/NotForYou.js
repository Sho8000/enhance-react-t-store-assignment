// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";

import Rodal from "rodal";

import imageData from "../shared/itemdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/productDisp.css";
import "rodal/lib/rodal.css";
import NotForYouDetail from "./NotForYouDetail";
import NotForYouDetailFormpart from "./NotForYouDetailFormpart";
import { changeStatus } from "../features/counter/navSlice";
import { useDispatch } from "react-redux";


// import ReactPlayer from "react-player";

function NotForYou() {

  const smallScreenMediaQuery = '(max-width: 700px)';
  const delta = 5;
  let startX;
  let startY;
  const imageNFY = imageData.find((img) => img.id === "nfy");
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("nfu1.jpg");
  const detailRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false)
    
    useEffect(()=>{
      dispatch(changeStatus(isVisible));
    },[dispatch,isVisible])
  
    useEffect(()=>{
      if(!detailRef.current) return;
  
      const observer = new IntersectionObserver(
        ([entry])=>{
        setIsVisible(entry.isIntersecting);
        console.log("isVisible updated:", entry.isIntersecting);
      },
      {threshold:0.5}
    );
    observer.observe(detailRef.current)
    return () => observer.disconnect()
  },[])
  
  const handleMouseDown = (event) => {
    startX = event.pageX;
    startY = event.pageY;
  };
  const handleMouseUp = (event, image) => {
    const diffX = Math.abs(event.pageX - startX);
    const diffY = Math.abs(event.pageY - startY);

    if (diffX < delta && diffY < delta) {
      handleImageClick(image);
    }
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const getCustomStyles = () => {
    return {
      width: window.matchMedia(smallScreenMediaQuery).matches ? "70%" : "50%",
      height: window.matchMedia(smallScreenMediaQuery).matches? "35%" : "80.5%",
      borderRadius: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      padding: 0
    };
  };

  const customStyles = getCustomStyles();

  const ScrolleDownHandler = () => {
    detailRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div>
      <div className="rodal-parent">
        <Rodal
          visible={isModalOpen}
          onClose={closeModal}
          customStyles={customStyles}
        >
          <div>
            <img
              src={require(`../shared/${selectedImage}`)}
              alt="enlarged"
              className="enlarged-image"
              style={{height: '100%'}}            
            />
          </div>
        </Rodal>
      </div>

      <div className="displayProductContents">
        <section className="video-container" style={{ height: "100vh",position:"relative"}}>
          <div className="titleContainer">
            <h2 className="title">Not For you</h2>
          </div>

          <img src="nfynew.jpg" className="newImg" alt="new dtf img"></img>
          <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute", bottom:"2%"}} onClick={ScrolleDownHandler}>
            <rect width="50" height="50" rx="50" ry="50" fill="rgb(218, 218, 218)" />
            <rect width="25" height="4" rx="4" ry="4" x="20" y="6" style={{stroke:"black",fill:"black",transform:"rotate(45deg)"}} />
            <rect width="25" height="4" rx="4" ry="4" x="-9" y="41" style={{stroke:"black",fill:"black",transform:"rotate(-45deg)"}} />
          </svg>

        </section>

        <section className="productionDtailSection" ref={detailRef}>
          <div className="productArea">
            {imageNFY.images.map((image, index) => (
              <div key={index} className="productContainer">
                <div
                  className="image-container"
                  onMouseDown={handleMouseDown}
                  onMouseUp={(event) => handleMouseUp(event, image)}
                >
                  <img
                    src={require(`../shared/${image}`)}
                    alt='jaja'
                    className="carousel-image"
                  />
                </div>
              </div>
            ))}
            <div className="detail-container">
              <NotForYouDetail />
            </div>
            <div className="detail-container">
              <NotForYouDetailFormpart />
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

export default NotForYou;
