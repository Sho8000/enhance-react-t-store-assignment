import React, { useEffect, useState, useRef } from "react";

import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
//components
import LandingPage from "./components/LandingPage";

//screens
import DesireToFly from "./screens/DesireToFly";
import NotForYou from "./screens/NotForYou";
import DesireToFlyDetail from "./screens/DesireToFlyDetail";
import NotForYouDetail from "./screens/NotForYouDetail";

import "./App.css";

//icons
import { AiFillShopping } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

import SidePanel from "./components/SidePanel";
import { useSelector, useDispatch } from "react-redux";
import { setCartIsOpen } from "../src/features/counter/cartSlice.js";
import ViewCart from "./screens/ViewCart";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import ErrorPage from "./components/Errorpage.js";
import { selectVisible } from "./features/counter/navSlice.js";
//import { useInView } from 'react-hook-inview'

toast.configure();


function App() {
  const dispatch = useDispatch();
  const {
    // total,
    // fnfItemsTotal,
    CartIsOpen: sidePanel,
  } = useSelector((state) => state.cart);
  const [navOpened, setNavOpen] = useState(false);

  const openNavBarRef = useRef();
  const sidePanelRef = useRef();
  const navigate = useNavigate();
  const isNavVisible = useSelector(selectVisible);
  const [svgColor,setSvgColor] = useState('white');

  useEffect(()=>{
    isNavVisible?setSvgColor('black'):setSvgColor('white');
  },[isNavVisible])


  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const fnfSectionRef = useRef(null);
  const scrollToFnFSection = () => {
    navigate("/", { state: { targetId: "fnfSection" } });
  };

  const handleNavOutsideClick = (e) => {
    if (!openNavBarRef?.current?.contains(e.target)) {
      setNavOpen(false);
    }
  };

  const handlePanelOutsideClick = (e) => {
    if (!sidePanelRef?.current?.contains(e.target)) {
      dispatch(setCartIsOpen(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleNavOutsideClick);
    document.addEventListener("mousedown", handlePanelOutsideClick);

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleNavOutsideClick);
      document.removeEventListener("mousedown", handlePanelOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  });
  // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      <ScrollToTop />

      {/* Navbar */}
      <nav className="navbar">
        {navOpened ? (
          <div ref={openNavBarRef} className="openNavBar" >
            <ul className="navElements">
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/"
                onClick={() => setNavOpen(false)}
              >
                <h2>Home</h2>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/desiretofly"
                onClick={() => setNavOpen(false)}
              >
                <h2>Desire to fly</h2>
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="navBtn"
                to="/notforyou"
                onClick={() => setNavOpen(false)}
              >
                <h2>Not for you</h2>
              </Link>
              <h2
                style={{ textDecoration: "none" }}
                className="navBtn fnfBtn"
                onClick={() => {
                  setNavOpen(false);
                  scrollToFnFSection();
                }}
              >
                Friends & Family
              </h2>
            </ul>
          </div>
        ) : (
          <HiMenuAlt4
            size={40}
            className="hiMenu"
/* For svg COLOR */            color={svgColor}
            onClick={() => {
              setNavOpen(!navOpened);
            }
          }
          />
        )}
        {(navOpened && screenSize.width < 430) || (
          <AiFillShopping
            className="shoppingCartIcon"
            size={40}
            color={svgColor}
            onClick={() => {
              dispatch(setCartIsOpen(!sidePanel));
            }}
          />
        )}
      </nav>

      <SidePanel
        sidePanelOpen={sidePanel}
        setSidePanelOpen={dispatch(setCartIsOpen)}
        sidePanelRef={sidePanelRef}
      />

      <Routes>
        <Route
          path="/"
          element={<LandingPage fnfSectionRef={fnfSectionRef} />}
        />
        <Route path="/desiretofly" element={<DesireToFly />} />
        <Route path="/notforyou" element={<NotForYou />} />
        <Route path="/desiretoflydetail" element={<DesireToFlyDetail />} />
        <Route path="/notforyoudetail" element={<NotForYouDetail />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="*" element={<ErrorPage/>} />

      </Routes>
      <Footer />
    </div>
  );
}
export default App;
