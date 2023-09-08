import axios from "axios";
import { useState, useEffect } from "react";
import Link from 'next/link'
import Currency from "./Currency";
// import "rc-tooltip/assets/bootstrap.css";
// import Tooltip from "rc-tooltip";
// import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { animateScroll as scroll } from "react-scroll";
// import Modal from "react-modal";
import { Rate } from 'antd';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
// import Rating from "@mui/material/Rating";
function CategoryProdHome() {
  const [products, setProducts] = useState([]);
  const [cateprod, setCateProd] = useState([]);
  const [cateUrls, setCateUrls] = useState([]);
  const [cateurl, setCateUrl] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  console.log(products);

  const [categoryProducts, setCategoryProducts] = useState([]);

  const fetchProducts = async (cateUrl) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}categories/${cateUrl}`);
      const categoryProduct = {
        cateUrl: cateUrl,
        name: response.data.name,
        products: response.data.products,
      };
      await Promise.all(
        response.data.products.map(async (prod) => {
          if (prod.img) {
            const storageRef = ref(storage, `product/${prod.img}`);
            const imgUrl = await getDownloadURL(storageRef);
            prod.img = imgUrl;
          }
        })
      );
      setCategoryProducts((prevCategoryProducts) => [
        ...prevCategoryProducts,
        categoryProduct,
      ]);
      setReview(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(cateurl);
  const fetchCateProd = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}cateprod/pro`);
      const cateData = response.data;
      const sortedCateData = cateData.sort((a, b) => a.stt - b.stt);
      setCateUrls(sortedCateData);

      let count = 0;
      const fetchProductPromises = sortedCateData.map(async (cateItem) => {
        await fetchProducts(cateItem.url);
        count++;
        if (count === sortedCateData.length) {
          // Tất cả các yêu cầu đã hoàn thành
          // Cập nhật trạng thái categoryProducts một lần nữa theo thứ tự chính xác
          setCategoryProducts((prevCategoryProducts) =>
            sortedCateData.map((cateItem) =>
              prevCategoryProducts.find(
                (product) => product.cateUrl === cateItem.url
              )
            )
          );
        }
      });

      await Promise.all(fetchProductPromises);
    } catch (err) {
      console.error(err);
      // Xử lý lỗi
    }
  };


  useEffect(() => {
    fetchCateProd();
  }, []);
  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [review, setReview] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);

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
  //               class="btn-close btn-lg"
  //               onClick={closeModal}
  //             ></button>
  //           </div>

  //           <div class="modal-body">
  //             <div class="row">
  //               <div class="col-6">
  //                 <img
  //                   src={product.img}
  //                   alt=""
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
  //                   {product.dongia && product.dongia > 0 ? (
  //                     <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
  //                       <Currency value={product.dongia} />
  //                     </div>
  //                   ) : (
  //                     <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
  //                       Liên hệ
  //                     </div>
  //                   )}
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
    <section class="product-thuy">
      <div class="container">
        {currentProducts.map((categoryProduct) => (
          <div className="mar" key={categoryProduct.cateUrl}>
      
              <div className="title-pro">
                <h2 className="cate-title"><Link href={`/${categoryProduct.cateUrl}`} className="linktitle">{categoryProduct.name}</Link></h2>
                <Link href={`/${categoryProduct.cateUrl}`}>
                  Xem thêm
                </Link>
              </div>
              {categoryProduct.products.slice(0, 6).map((product) => (

                <div
                  key={product.id}
                  class="col-lg-2 col-md-3 col-6 container-card"
                >
                  <div style={{ position: "relative" }}>
                    {product.giacu && product.giacu > 0 ? (
                      <div className="sale">Sale</div>
                    ) : null}
                  </div>
                  <div class="img-product">
                    <Link
                      href={`/product/${product.url}`}
                      passHref
                      title={product.tensp}
                    >
                      <picture>
                        <img
                          class="bottom-image"
                          src={product.img}
                          alt={product.tensp}

                        />
                      </picture>
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
                          <Tooltip
                            placement="left"
                            overlay={<span>Wishlist</span>}
                          >
                            <i class="fa-regular fa-heart"></i>
                          </Tooltip>
                        </a>
                      </span>
                      <span>
                        <a style={{ cursor: "pointer" }}>
                          <Tooltip
                            placement="left"
                            overlay={<span>Compare</span>}
                          >
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
                        passHref
                        title={product.tensp}
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
        ))}
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
  );
}

export default CategoryProdHome;
