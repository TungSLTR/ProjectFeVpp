import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import Slider from "react-slick";

import Currency from "./Currency";

import Link from "next/link"

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
const ProductSlide = () => {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}product`);
    await Promise.all(
      response.data.products.map(async (prod) => {
        if (prod.img) {
          const storageRef = ref(storage, `product/${prod.img}`);
          const imgUrl = await getDownloadURL(storageRef);
          prod.img = imgUrl;
        }
      })
    );
    setProducts(response.data.products);
  };
  useEffect(() => {

    fetchProduct();
  }, []);

  const settings = {
    swipeToSlide: true,
    accessibility: false,
    arrows: true,
    dots: true,
    infinite: true,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 2000,
    speed: 400,
    slidesToShow: 7,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    vertical: false,
    mobileFirst: false,
    pauseOnHover: false,
    rows: 1,
    slidesPerRow: 1,
    rtl: 0,
  };
  const [swiped, setSwiped] = useState(false)

  const handleSwiped = useCallback(() => {
    setSwiped(true)
  }, [setSwiped])

  const handleOnItemClick = useCallback(
    (e) => {
      if (swiped) {
        e.stopPropagation()
        e.preventDefault()
        setSwiped(false)
      }
    },
    [swiped],
  )
  return (
    <div className="container">


      <div className="container-slide-pro">
        <div className="title-pro">
          <h2 className="titlenew cate-title"><Link href={`/product`} className="linktitle">Sản phẩm tiêu biểu</Link></h2>
          <Link href={`/product`}
            className="morenew">Xem thêm</Link>
        </div>
        <Slider {...settings} onSwipe={handleSwiped}>
          {products.slice(0, 12).map((product) => (
            <div key={product.id} className="product-slide-item">
              <Link
              onClickCapture={handleOnItemClick}
                href={`/product/${product.url}`}
              >
                <div style={{ position: "relative" }}>
                  {product.giacu && product.giacu > 0 ? (
                    <div className="sale">Sale</div>
                  ) : null}
                </div>
                <img src={product.img} alt={product.tensp} />
                <div className="product-slide-name" title={product.tensp}>
                  {product.tensp}
                </div>
              </Link>
              <div className="product-slide-price">
                {product.giacu && product.giacu > 0 ? (
                  <div style={{ fontSize: "15px", color: "#4d4d4d" }}>
                    <del>
                      <Currency value={product.giacu} />
                    </del>
                  </div>
                ) : null}
                {product.dongia && product.dongia > 0 ? (
                  <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                    <Currency value={product.dongia} />
                  </div>
                ) : (
                  <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                    Liên hệ
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlide;
