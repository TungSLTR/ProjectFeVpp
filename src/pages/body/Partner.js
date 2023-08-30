import React from "react";
import Slider from "react-slick";


export default function PartnerSlider() {
  const partnerSettings = {
    accessibility: false,
    arrows: false,
    dots: true,
    draggable: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const imgItems = [
    {
      id: 1,
      imageSrc: "img/home/doublea.png",
      alt: "Double A",
    },
    {
      id: 2,
      imageSrc: "img/home/thienlong.png",
      alt: "Thiên Long",
    },
    {
      id: 3,
      imageSrc: "img/home/eras.jpeg",
      alt: "Eras",
    },
    {
      id: 4,
      imageSrc: "img/home/casio.png",
      alt: "Casio",
    },
    {
      id: 5,
      imageSrc: "img/home/Deli_logo.png",
      alt: "Deli",
    },
  ];

  return (
    <div className="partner-slider">
      <h2>Đối tác của chúng tôi</h2>
      <Slider {...partnerSettings}>
        {imgItems.map((item) => (
          <div key={item.id} className="partner-slide">
            <img alt={item.alt} loading="lazy" src={item.imageSrc} />
            
          </div>
        ))}
      </Slider>
    </div>
  );
}
