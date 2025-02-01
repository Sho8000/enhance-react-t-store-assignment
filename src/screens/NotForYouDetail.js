// eslint-disable-next-line
import React, { useState } from "react";

import '../css/productDispDetail.css';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

function NotForYouDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCustomStyles = () => {
    const smallScreenMediaQuery = '(max-width: 600px)';
    return {
      width: (window.matchMedia(smallScreenMediaQuery).matches) ? '90%' : '50%',
      height: (window.matchMedia(smallScreenMediaQuery).matches) ? '40%' : '70%',
      backgroundColor: "rgb(128, 128, 128, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      margin: "auto",
      padding: 0,
    }
  };

  const customStyles = getCustomStyles();
  // const videoRef = useRef(undefined);
  //   useEffect(() => {
  //       videoRef.current.defaultMuted = true;
  //   })

  return (
    /* TODO: introduce media query for body container to not hide while screen is reduced */
    <div className="detail-view">

      <Rodal
        visible={isModalOpen}
        onClose={closeModal}
        customStyles={customStyles}
      >
        <div className="size-chart" >
          <img src={require(`../shared/asset.png`)} alt="enlarged" className="enlarged-image" style={{width: '100%'}}/>
        </div>
      </Rodal>

      <div className="body-container">
        <div className="product-view">  
          {/* <span className="verticalBar"></span> */}
          <p className="product-description">
            Not for You (NFU) embodies the essence of individuality and
            self-assuredness, embracing the notion that not every creation is
            meant for everyone. This concept celebrates uniqueness and
            encourages the freedom to be true to oneself. All HUH clothing,
            including the NFU line, is meticulously manufactured in Bangladesh.
            The NFU series features oversized T-shirts made from 100% cotton,
            ensuring exceptional comfort and quality. With a weight of 400 GSM,
            these garments are crafted to provide a distinctive fashion
            statement.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotForYouDetail;
