import React from "react";
import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
// import "rc-tooltip/assets/bootstrap.css";
// import Tooltip from "rc-tooltip";

import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import ProductContain from "./body/ProductContain";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import Currency from "./body/Currency";
export default function ProductSale() {
  const [product, setProduct] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filterPrice, setFilterPrice] = useState(maxPrice);
  const [value, setValue] = useState(0);
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const [isLoading, setIsLoading] = useState(true);
  const lastIndex = currentPage * recordsPerPage;
  const fistIndex = lastIndex - recordsPerPage;
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState([]);
  useEffect(() => {
    getProduct();
    setFilterPrice(maxPrice);
  }, [maxPrice]);

  const getProduct = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}products/productsale`);
    await Promise.all(
      response.data.products.map(async (prod) => {
        if (prod.img) {
          const storageRef = ref(storage, `product/${prod.img}`);
          const imgUrl = await getDownloadURL(storageRef);
          prod.img = imgUrl;
        }
      })
    );
    setProduct(response.data.products);
    setReview(response.data);
    const prices = response.data.products.map((p) => p.dongia);
    const tempMaxPrice = Math.max(...prices);
    setMaxPrice(tempMaxPrice);
    setFilterPrice(tempMaxPrice);
    setValue(tempMaxPrice);
      setIsLoading(false);
  };

  const handlePriceFilter = (e) => {
    setFilterPrice(e.target.value);
    setValue(e.target.value);
  };
  const handleRatingFilter = (rating) => {
    setSelectedRating(rating);
  };
  const handleSliderAfterChange = (value) => {
    console.log(value);
  };
  //
  const handleSortChange = (e) => {
    setSortValue(e.target.value);
  };
  //sort product
  const sortedProducts = () => {
    if (sortValue.includes("price")) {
      if (sortValue.includes("Asc")) {
        return product.sort((a, b) => parseInt(a.dongia) - parseInt(b.dongia));
      } else {
        return product.sort((a, b) => parseInt(b.dongia) - parseInt(a.dongia));
      }
    } else if (sortValue.includes("name")) {
      if (sortValue.includes("Asc")) {
        return product.sort((a, b) => a.tensp.localeCompare(b.tensp));
      } else {
        return product.sort((a, b) => b.tensp.localeCompare(a.tensp));
      }
    } else {
      return product;
    }
  };

  const numProducts = product.length;
  const filteredProducts = sortedProducts().filter((p) => {
    const averageRating = p.reviews.reduce(
      (acc, item) => acc + item.danhgia,
      0
    ) / p.reviews.length;
  
    if (selectedRating) {
      return averageRating >= parseInt(selectedRating) && parseInt(p.dongia) <= filterPrice;
    } else {
      return parseInt(p.dongia) <= filterPrice;
    }
  });
  const record = filteredProducts.slice(fistIndex, lastIndex);
  const npage = Math.ceil(filteredProducts.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== fistIndex + 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (n) => {
    setCurrentPage(n);
  };

  return (
    <>
    <Head>
      <title>Sản phẩm giảm giá - Văn Phòng Phẩm Vũ Phong</title>
    </Head>
      <section class="product-thuy">
        <div class="container">
          <div class="title-page">
            <h2 className=" text-center mb-2">Sản phẩm giảm giá</h2>
          </div>
          <div className="row">
            <div class="filter-contain col-lg-3">

              <div className="">
                <span>Hiện có {numProducts} sản phẩm</span>
              </div>
              <div style={{ height: "20px" }}></div>
              <div class="main-contain dropdown rangeslider block-filsort">
                <span>Chọn mức giá phù hợp: </span>
                {" "}
                <RangeSlider
                  class="range-slider "
                  value={filterPrice}
                  onChange={handlePriceFilter}
                  min={0}
                  tooltip="false"
                  onAfterChange={handleSliderAfterChange}
                  max={maxPrice}
                />
                <div className="rangeslider-value">
                  <div >
                    {" "}
                    <Currency value={0} />
                  </div>
                 
                  <div >
                    {" "}
                    <Currency value={value} />
                  </div>
                </div>

              </div>
              <div style={{ height: "20px" }}></div>
              <div class="main-contain block-filsort sort-contain">
                <span>Sắp xếp theo: </span>
                <div>
                  <select value={sortValue} onChange={handleSortChange}>
                    <option value="">Chọn</option>
                    <option value="priceAsc">Giá tăng dần</option>
                    <option value="priceDesc">Giá giảm dần</option>
                    <option value="nameAsc">Tên A - Z</option>
                    <option value="nameDesc">Tên Z - A</option>
                  </select>
                </div>
              </div>

              <div style={{ height: "20px" }}></div>
              <div className="main-contain block-filsort d-flex">
                <span>Đánh giá:  </span>
                <div>
                  <select
                    value={selectedRating}
                    onChange={(e) => handleRatingFilter(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    <option value="5">5 sao</option>
                    <option value="4">4 sao</option>
                    <option value="3">3 sao</option>
                    <option value="2">2 sao</option>
                    <option value="1">1 sao</option>
                  </select>
                </div>
              </div>
            </div>

            {isLoading && <div className="load">
              <div class="loader" />
            </div>}
            {!isLoading && (
              <div className="col-lg-9">
                <div class=" row ">
                  {record.map((product) => (
                    <ProductContain product={product} selectedRating={selectedRating} key={product.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: `50px` }}></div>
        <div className="">
          <ul class="pagination justify-content-center">
            <li
            key={currentPage}
              className={`page-item ${
                currentPage !== fistIndex + 1 ? "" : "disabled"
              }`}
            >
              <a
                className={`page-link `}
                style={{ cursor: "pointer" }}
                onClick={prePage}
              >
                Previous
              </a>
            </li>

            {numbers.map((n, i) => (
              <li key={n} class={`page-item ${currentPage === n ? "active" : ""}`}>
                <a
                  class="page-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => changeCurrentPage(n)}
                >
                  {n}
                </a>
              </li>
            ))}
            <li
              className={`page-item ${currentPage !== npage ? "" : "disabled"}`}
            >
              <a
                class="page-link"
                style={{ cursor: "pointer" }}
                onClick={nextPage}
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
