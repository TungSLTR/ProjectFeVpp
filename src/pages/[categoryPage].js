import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Currency from "./body/Currency";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { Rate } from 'antd';
import RangeSlider from "react-bootstrap-range-slider";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
function CategoryPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(null);
  const [filterPrice, setFilterPrice] = useState(maxPrice);
  const [value, setValue] = useState(0);
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const fistIndex = lastIndex - recordsPerPage;
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState([]);
  const { categoryPage } = router.query;

  const fetchProducts = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}categories/${categoryPage}`
    );
    await Promise.all(
      response.data.products.map(async (prod) => {
        if (prod.img) {
          const storageRef = ref(storage, `product/${prod.img}`);
          const imgUrl = await getDownloadURL(storageRef);
          prod.img = imgUrl;
        }
      })
    );
    setName(response.data.name);
    setProducts(response.data.products);
    setReview(response.data);
    console.log(response.data);
    console.log(categoryPage);
    console.log(response.data.name);
    const prices = response.data.products.map((p) => p.dongia);
    const tempMaxPrice = Math.max(...prices);
    setMaxPrice(tempMaxPrice);
    setFilterPrice(tempMaxPrice);
    setValue(tempMaxPrice);
    setIsLoading(false);
  };
  useEffect(() => {
    if (categoryPage) {
      fetchProducts();
    }
  }, [categoryPage]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
        return products.sort((a, b) => parseInt(a.dongia) - parseInt(b.dongia));
      } else {
        return products.sort((a, b) => parseInt(b.dongia) - parseInt(a.dongia));
      }
    } else if (sortValue.includes("name")) {
      if (sortValue.includes("Asc")) {
        return products.sort((a, b) => a.tensp.localeCompare(b.tensp));
      } else {
        return products.sort((a, b) => b.tensp.localeCompare(a.tensp));
      }
    } else {
      return products;
    }
  };

  const numProducts = products.length;

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
  // const openModal = (product) => {
  //   setSelectedProduct(product);
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setSelectedProduct(null);
  //   setIsModalOpen(false);
  // };

  // const ModalContent = ({ product, closeModal }) => {
  //   const [quantity, setQuantity] = useState(1);

  //   const increaseQuantity = () => {
  //     setQuantity((prevQuantity) => prevQuantity + 1);
  //   };

  //   const decreaseQuantity = () => {
  //     if (quantity > 1) {
  //       setQuantity((prevQuantity) => prevQuantity - 1);
  //     }
  //   };

  //   const handleAddToCart = () => {
  //     // Add logic to handle adding the product to the cart
  //   };

  //   return (
  //     <div class="modal fade" className="modal-content" id="myModal">
  //       <div class="modal-dialog modal-lg">
  //         <div class="modal-content">
  //           <div class="modal-header">
  //             <button
  //               type="button"
  //               class="btn-close btn-lg btn-modal"
  //               onClick={closeModal}
  //             ></button>
  //           </div>

  //           <div class="modal-body">
  //             <div class="row">
  //               <div class="col-6">
  //                 <img
  //                   src={product.img}
  //                   alt={product.tensp}
  //                   style={{ width: "100%", height: "300px" }}
  //                 />
  //               </div>
  //               <div class="col-6">
  //                 <h2>{product.tensp}</h2>
  //                 <p class="mota-modal">
  //                   <div dangerouslySetInnerHTML={{ __html: product.mota }} />
  //                 </p>
  //                 <p class="price-modal">
  //                   {product.giacu && product.giacu > 0 ? (
  //                     <div style={{ fontSize: "15px" }}>
  //                       <del>
  //                         <Currency value={product.giacu} />
  //                       </del>
  //                     </div>
  //                   ) : null}
  //                    {product.dongia && product.dongia > 0 ? (
  //                 <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
  //                   <Currency value={product.dongia} />
  //                 </div>
  //               ) : (
  //                 <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
  //                   Liên hệ
  //                 </div>
  //               )}
  //                 </p>

  //                 <div className="modal-quantity">
  //                   Số lượng:{" "}
  //                   <button className="quantity-btn" onClick={decreaseQuantity}>
  //                     -
  //                   </button>{" "}
  //                   {quantity}{" "}
  //                   <button className="quantity-btn" onClick={increaseQuantity}>
  //                     +
  //                   </button>
  //                 </div>

  //                 <div
  //                   class="d-flex gap-2 flexbut"
  //                   style={{ marginTop: "30px" }}
  //                 >
  //                   <button type="button" class="btn btn-danger " active>
  //                     Thêm vào giỏ hàng
  //                   </button>
  //                   <div>
  //                     <Link
  //                       href={`/product/${product.url}`}

  //                     >
  //                       <button type="button" class="btn btn-primary " active>
  //                         Xem chi tiết sản phẩm
  //                       </button>
  //                     </Link>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  return (
    <>

      <section class="product-thuy">

        <div class="container">
        <div class="title-page">
        <h2 className=" text-center mb-2">{name}</h2>
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
            <>
              {record.length > 0 ? (
                <div class="col-lg-9">
                     <div class=" row ">
                  {/* <Helmet>
            <title></title>
          </Helmet> */}
 <Head>
        <title>{`${name} - GameZone`}</title>
      </Head>
                  {record.map((product) => (
                    <div class="col-lg-3 col-md-4 col-6 container-card" key={product.id}>
                      <div style={{ position: "relative" }}>
                        {product.giacu && product.giacu > 0 ? (
                          <div className="sale">Sale</div>
                        ) : null}
                      </div>
                      <div class="img-product">
                        <Link href={`/product/${product.url}`} >
                          <img
                            class="bottom-image"
                            src={product.img}
                            alt={product.tensp}
                          />
                        </Link>
                        {/* <a href={product.url}><img class="top-image" src={"/img/product/" + product.img_con} alt="" /></a> */}
                      </div>
                      {/* <div class="more-button">
                        <div class="box">
                          <span>
                            <a style={{ cursor: "pointer" }}>
                              <Tooltip
                                placement="left"
                                overlay={<span>Quick View</span>}
                              >
                                <i
                                  className="fa-solid fa-magnifying-glass"
                                  onClick={() => openModal(product)} // Open modal on click
                                ></i>
                              </Tooltip>
                            </a>
                          </span>
                          <span>
                            <a style={{ cursor: "pointer" }}>
                              <Tooltip placement="left" overlay={<span>Wishlist</span>}>
                                <i class="fa-regular fa-heart"></i>
                              </Tooltip>
                            </a>
                          </span>
                          <span>
                            <a style={{ cursor: "pointer" }}>
                              <Tooltip placement="left" overlay={<span>Compare</span>}>
                                <i class="fa-solid fa-rotate-right"></i>
                              </Tooltip>
                            </a>
                          </span>
                          <span>
                            <a style={{ cursor: "pointer" }}>
                              <Tooltip
                                placement="left"
                                overlay={<span>Add to Cart</span>}
                              >
                                <i class="fa-solid fa-cart-plus"></i>
                              </Tooltip>
                            </a>
                          </span>
                        </div>
                      </div> */}
                      <div class="product-info">
                        <div class="name-product ">
                          <Link
                            class="hover-underline-animation"
                            href={`/product/${product.url}`}

                          >
                            {product.tensp}
                          </Link>
                        </div>
                        <div class="star-review">
                          {product.reviews && product.reviews.length > 0 ? (
                            <>
                              <Rate
                                
                                value={
                                  product.reviews.reduce(
                                    (acc, item) => acc + item.danhgia,
                                    0
                                  ) / product.reviews.length
                                }
                                disabled 
                              />
                              <span>({product.reviews.length} đánh giá)</span>
                            </>
                          ) : (
                            <span>Chưa có đánh giá</span>
                          )}
                        </div>
                        <div class="price-product">
                          {product.giacu && product.giacu > 0 ? (
                            <div style={{ fontSize: "15px" }}>
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
                    </div>
                  ))}
                </div>
                </div>
              ) : (
                <div className="load col-lg-9">
                  <div>Hiện không có sản phẩm</div>
                </div>
                
              )}
              
            </>
          )}
        </div>
        
        </div>
        <div style={{ height: `50px` }}></div>
        <div className="">
          <ul class="pagination justify-content-center">
            <li
              className={`page-item ${currentPage !== fistIndex + 1 ? "" : "disabled"
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

        {/* <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Product Modal"
        >
          {selectedProduct && (
            <ModalContent product={selectedProduct} closeModal={closeModal} />
          )}
        </Modal> */}

      </section>

    </>
  );
}

export default CategoryPage;

