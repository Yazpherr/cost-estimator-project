

import { Button, Modal } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import React, { useEffect, useState } from "react";
import { Link as LinkScroll } from "react-scroll";
import NavBar from "../home/NavBar";
import Hero from "../home/Hero";
import Features from "../home/Features";
import Data from "../home/Data";
import MainFeatures from "../home/MainFeatures";
import ProductHighlight from "../home/ProductHighlight";
import Footer from "../home/Footer";

const LandingPage = () => {
    useEffect(() => {
        AOS.init({
            offset: 79,
        });
    }, []);

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
            <main className="mx-4">
                <NavBar />
                <Hero />
                <Features />
                <Data />
                <MainFeatures />
                <ProductHighlight />
                <Footer />
            </main>
        </>
    );
};

export default LandingPage;
