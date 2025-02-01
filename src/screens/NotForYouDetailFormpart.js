// eslint-disable-next-line
import React, { useState, useRef, useEffect } from "react";

import '../css/productDispDetail.css';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import itemData from '../shared/itemdata';

import { useDispatch } from 'react-redux';
import Rodal from 'rodal';
import { addItem, setCartIsOpen } from '../features/counter/cartSlice';
import 'rodal/lib/rodal.css';

function NotForYouDetailFormpart() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("small");

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleSizeChart = (image) => {
    setIsModalOpen(true);
  };

  const handleAddToCart = (item) => {
    dispatch(addItem({ newItem: item, size: size, newQuantity: quantity }));
    dispatch(setCartIsOpen(true));

  };

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
        <div className='product-form'>
          <h3 className="formTytle overflowHidden">NOT FOR YOU</h3>
          <h4 className="overflowHidden" >C${itemData[1].priceInCad}</h4>
          <h4 className="overflowHidden" style={{ paddingTop: '1rem', color: 'grey' }}>Quantity</h4>
          <label className="labelStyle">
          <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="inputStyle"
            />
          </label>
          <h4 className="overflowHidden" style={{ height:"auto", paddingTop: '0.2rem', color: 'grey' }}>Size</h4>
          <div className='dropdown' style={{width:"100%", margin:"0 auto 1rem"}}>
            <FormControl sx={{ height: '40px', minWidth: "100%" }} size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                onChange={handleSizeChange}
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <button className='button-cart-add buttonStyle' onClick={() => handleAddToCart(itemData[1])}>Add to Cart</button>
          <br />
          <button className='button-cart-size buttonStyle' onClick={handleSizeChart}>Size Chart</button>
        </div>
      </div>
    </div>
  );
}

export default NotForYouDetailFormpart;
