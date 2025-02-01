import React, { useEffect, useRef, useState } from "react";
import Rodal from "rodal";
import DesireToFlyDetail from "./DesireToFlyDetail";
import imageData from "../shared/itemdata";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/productDisp.css";
import "rodal/lib/rodal.css";
import DesireToFlyDetailFormpart from "./DesireToFlyDetailFormpart";
import { changeStatus } from "../features/counter/navSlice";
import { useDispatch } from "react-redux";

// import ReactPlayer from "react-player";

function DesireToFly() {
  const smallScreenMediaQuery = "(max-width: 700px)";
  const delta = 5;
  let startX;
  let startY;
  const imageDTF = imageData.find((img) => img.id === "dtf");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("dtf1.jpg");
  const dispatch = useDispatch();

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
      height: window.matchMedia(smallScreenMediaQuery).matches 
        ? "35%"
        : "80.5%",
      borderRadius: "3px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      padding: 0,
    };
  };
  const customStyles = getCustomStyles();

  const ScrolleDownHandler = () => {
    detailRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div id="parent-div" className="parent-parent">
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
              style={{ height: "100%" }}
            />
          </div>
        </Rodal>
      </div>

      <div className="displayProductContents">
        <section className="video-container" style={{ height: "100vh", position:"relative"}}>
          <div className="titleContainer">
            <h2 className="title">Desire To Fly</h2>
          </div>

          {/* <ReactPlayer
            className="reactPlayer"
            url="/dtf.mp4"
            playing={true}
            controls={false}
            volume={null}
            muted={true}
            width="100%"
            height="100%"
            loop={true}
            playsinline={true}
          /> */}
          <img src="dtfnew.jpg" className="newImg" alt="new dtf img"></img>
          <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute", bottom:"2%"}} onClick={ScrolleDownHandler}>
            <rect width="50" height="50" rx="50" ry="50" fill="rgb(218, 218, 218)" />
            <rect width="25" height="4" rx="4" ry="4" x="20" y="6" style={{stroke:"black",fill:"black",transform:"rotate(45deg)"}} />
            <rect width="25" height="4" rx="4" ry="4" x="-9" y="41" style={{stroke:"black",fill:"black",transform:"rotate(-45deg)"}} />
          </svg>
        </section>

        <section className="productionDtailSection" ref={detailRef}>
          <div className="productArea">
            {imageDTF.images.map((image, index) => (
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
              <DesireToFlyDetail />
            </div>
            <div className="detail-container">
              <DesireToFlyDetailFormpart/>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default DesireToFly;
