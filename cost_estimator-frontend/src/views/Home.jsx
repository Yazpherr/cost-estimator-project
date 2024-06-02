import { Button, Modal } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react"; // import from 'keen-slider/react.es' for to get an ES module
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
// import { NavBar } from "../components/navegation/NavBar";


import { CheckClean } from "../components/ui/icons/CheckClean";
import NavBar from "./home/NavBar";
import Hero from "./home/Hero";
import Features from "./home/Features";
import Data from "./home/Data";
import MainFeatures from "./home/MainFeatures";
import ProductHighlight from "./home/ProductHighlight";
import Footer from "./home/Footer";

export const Home = () => {
  useEffect(() => {
    AOS.init({
      offset: 79,
    });
  }, []);

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState("");
  const [openModalNewVersion, setOpenModalNewVersion] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 120px)": {
        slides: { perView: 1, spacing: 15 },
      },
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 500px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(min-width: 725px)": {
        slides: { perView: 4, spacing: 15 },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [showFirstTimeNewVersion, setShowFirstTimeNewVersion] = useState(
    localStorage.getItem("show-modal-new-version") ? true : false
  );

  function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </svg>
    );
  }

  return (
    <>
      {/* <NavBar /> */}

      <main className="mx-4">
      <NavBar/>
      <Hero/>
      <Features/>
      <Data/>
      <MainFeatures/>
      <ProductHighlight/>
      <Footer/>
      

      </main>
      {/* Footer */}
    </>
  );
};
