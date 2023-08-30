import React from "react";

import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import Link from "next/link"
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
export default function Blogbody() {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}blog/all`);
    await Promise.all(
      response.data.map(async (prod) => {
        if (prod.img_blog) {
          const storageRef = ref(storage, `blog/${prod.img_blog}`);
          const imgUrl = await getDownloadURL(storageRef);
          prod.img_blog = imgUrl;
        }
      })
    );
    setBlog(response.data);
  };
  const settings = {
    accessibility: false,
    arrows: false,
    dots: false,
    draggable: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
    ],
    vertical: false,
    mobileFirst: false,
    pauseOnHover: false,
    rows: 1,
    slidesPerRow: 1,
    rtl: 0,
    slidesToShow_992: 2,
    slidesToScroll_992: 2,
    arrows_992: false,
    dots_992: false,
    slidesToShow_767: 2,
    slidesToScroll_767: 2,
    arrows_767: false,
    dots_767: false,
    slidesToShow_450: 1,
    slidesToScroll_450: 1,
    arrows_450: false,
    dots_450: false,
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
    <div>
      <div className="blog-post">
        <div className="container">
          <h2 className="section-header">Tin tức</h2>
          

          <Slider
            className="blog-list blog-slick apslick slick-initialized slick-slider"
            onSwipe={handleSwiped}
            {...settings}
          >
            {blog.map((item) => (
              <div key={item.idblog} className="blog-items blog-layout-items-1 slick-slide">
                <div className="blog-layout">
                  <a className="blog-link">
                    <div className="article-card__image media">
                      <Link onClickCapture={handleOnItemClick} href={`/blog/${item.url}`}>
                      <img
                        alt={item.title}
                        width="1230"
                        height="690"
                        loading="lazy"
                        className="motion-reduce"
                        src={item.img_blog}
                      />
                      </Link>
                    </div>
                    <div className="blog-content text-center">
                      <p className="blog-date">
                        Post Date: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                      <Link className="blog-link" href={`/blog/${item.url}`}>
                        <h2 className="blog-title">
                          <span className="link-hover">{item.tenblog}</span>
                        </h2>
                      </Link>
                      <Link className="link-base link-" href={`/blog/${item.url}`}>
                        Xem Thêm <i class="fa-solid fa-plus"></i>
                      </Link>
                      <div dangerouslySetInnerHTML={{ __html: item.mota_chinh }}></div>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
            }