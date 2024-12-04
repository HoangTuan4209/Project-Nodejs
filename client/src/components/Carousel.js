import React from "react";
import Slider from "react-slick";

const Carousel = () => {
  var settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Bật tính năng tự động chuyển slide
    autoplaySpeed: 3000, // Đặt thời gian chuyển slide là 2 giây
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings} className="w-full h-full">
        <div>
          <img
            src="/images/carousel1.png"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/carousel2.png"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/carousel3.png"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/carousel4.png"
            alt="Slide 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/carousel5.png"
            alt="Slide 5"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/carousel6.png"
            alt="Slide 6"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <img
            src="/images/carousel7.png"
            alt="Slide 7"
            className="w-full h-full object-cover"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
