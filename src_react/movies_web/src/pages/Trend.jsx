import React, { useState, useEffect } from "react";
import "./trend.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import TrendCard from "../components/TrendCard";

function Trend() {
    const [slides, setSlides] = useState([]);
    const fetchData = () => {
        fetch("http://127.0.0.1:5000/movies")
            .then((res) => res.json())
            .then((data) => {
                setSlides(data);
            })
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section id="trend" className="trend">
            <div className="container-fluid">
                <div className="row">
                    <h4 className="section-title">Coming Soon</h4>
                </div>
                <div className="row">
                    <Swiper
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            480: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            640: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                            992: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                        spaceBetween={30}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay]}
                        className="trendSwiper"
                    >
                        {slides &&
                            slides.length > 0 &&
                            slides
                                .filter((slide) => slide.type === "coming")
                                .map((slide) => (
                                    <SwiperSlide key={slide.movie_id}>
                                        <TrendCard slide={slide} />
                                    </SwiperSlide>
                                ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default Trend;
