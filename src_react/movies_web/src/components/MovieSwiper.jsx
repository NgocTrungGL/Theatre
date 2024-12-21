import React from "react";
import "./movieSwiper.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles

import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Autoplay, EffectCoverflow } from "swiper/modules";
function MovieSwiper({ slides, slideChange }) {
    return (
        <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredsSlides={true}
            slidesPerView={"auto"}
            autoplay={{
                dealay: 2500,
                disableOnInteraction: false,
            }}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            loop={true}
            modules={[Autoplay, EffectCoverflow]}
            className="movieSwiper"
        >
            {slides.map((slide) => (
                <SwiperSlide key={slide.movie_id}>
                    <img
                        src={`data:image/jpeg;base64,${slide.previewImg}`}
                        alt="Freview img"
                        onClick={() => slideChange(slide.movie_id)}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default MovieSwiper;
