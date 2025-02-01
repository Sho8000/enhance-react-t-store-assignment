import React, { useState } from "react";

import "../css/productDispDetail.css";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

function DesireToFlyDetail() {
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

  return (
    /* TODO: introduce media query for body container to not hide while screen is reduced. I think its resolved!! */
    <div className="detail-view">
      <Rodal
        visible={isModalOpen}
        onClose={closeModal}
        customStyles={customStyles}
      >
        <div>
          <img
            src={require(`../shared/asset.png`)}
            alt="enlarged"
            className="enlarged-image"
            style={{width: '100%'}}
          />
        </div>
      </Rodal>

      <div className="body-container">
        <div className="product-view">
          {/* <span className="verticalBar"></span> */}
          <p className="product-description">
            Desire to Fly (DTF) represents the embodiment of aspirations,
            symbolizing personal growth and the pursuit of new horizons. This
            concept carries a playful undertone that resonates well with pop
            culture. All HUH clothing is proudly manufactured in Bangladesh. The
            initial series, DTF and NFU, showcase oversized T-shirts made from
            100% cotton. Crafted with exceptional attention to detail, these
            premium garments have a weight of 400 GSM, ensuring unparalleled
            quality and unmatched comfort.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DesireToFlyDetail;
