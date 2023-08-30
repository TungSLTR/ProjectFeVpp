import React from "react";

import { useState } from "react";
import Link from "next/link"
// import "rc-tooltip/assets/bootstrap.css";
// import Tooltip from "rc-tooltip";
// import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import Currency from "./Currency";
import { addProduct } from "../../redux/slice.js";
import { Rate } from 'antd';
// import Rating from "@mui/material/Rating";
// import Modal from "react-modal";

export default function ProductContain(props) {
  const { product, selectedRating } = props;
  const quantity = 1;
  const handleAddtocart = () => {
    addProduct({ product, quantity });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const averageRating = () => {
    if (product.reviews && product.reviews.length > 0) {
      return (
        product.reviews.reduce((acc, item) => acc + item.danhgia, 0) /
        product.reviews.length
      );
    } else {
      return 0;
    }
  };
  
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const ModalContent = ({ product, closeModal }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
      setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    };
    const averageRating = () => {
      if (product.reviews && product.reviews.length > 0) {
        return (
          product.reviews.reduce((acc, item) => acc + item.danhgia, 0) /
          product.reviews.length
        );
      } else {
        return 0;
      }
    };

    const handleAddToCart = () => {
      // Add logic to handle adding the product to the cart
    };
    if (selectedRating && product.rating !== selectedRating) {
      return null; // Không hiển thị sản phẩm nếu không trùng với số sao đánh giá đã chọn
    }
    return (
      <div className="modal fade modal-content" id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close btn-lg"
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <img
                    src={product?.img}
                    alt=""
                    style={{ width: "100%", height: "300px" }}
                  />
                </div>
                <div className="col-6">
                  <h2>{product?.tensp}</h2>
                  <p className="mota-modal">
                    <div dangerouslySetInnerHTML={{ __html: product?.mota }} />
                  </p>
                  <p className="price-modal">
                    {product?.giacu && product.giacu > 0 ? (
                      <div style={{ fontSize: "15px" }}>
                        <del>
                          <Currency value={product?.giacu} />
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
                  </p>

                  <div className="modal-quantity">
                    Số lượng:{" "}
                    <button className="quantity-btn" onClick={decreaseQuantity}>
                      -
                    </button>{" "}
                    {quantity}{" "}
                    <button className="quantity-btn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>

                  <div
                    className="d-flex gap-2 flexbut"
                    style={{ marginTop: "30px" }}
                  >
                    <button type="button" className="btn btn-danger " active>
                      Thêm vào giỏ hàng
                    </button>
                    <div>
                      <Link
                       href={`/product/${product?.url}`}
                      >
                        <button type="button" className="btn btn-primary " active>
                          Xem chi tiết sản phẩm
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="col-lg-3 col-md-4 col-6 container-card">
        <div style={{ position: "relative" }}>
          {product?.giacu && product.giacu > 0 ? (
            <div className="sale">Sale</div>
          ) : null}
        </div>
        <div className="img-product">
          <Link
            href={`/product/${product?.url}`}
          >
            <img className="bottom-image" src={product?.img} alt={product?.tensp} />
          </Link>
        </div>
        {/* <div className="more-button">
          <div className="box">
            <span>
              <a style={{ cursor: "pointer" }}>
                <Tooltip placement="left" overlay={<span>Quick View</span>}>
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
                  <i className="fa-regular fa-heart"></i>
                </Tooltip>
              </a>
            </span>
            <span>
              <a style={{ cursor: "pointer" }}>
                <Tooltip placement="left" overlay={<span>Compare</span>}>
                  <i className="fa-solid fa-rotate-right"></i>
                </Tooltip>
              </a>
            </span>
            <span>
              <a style={{ cursor: "pointer" }} onClick={handleAddtocart}>
                <Tooltip placement="left" overlay={<span>Add to Cart</span>}>
                  <i className="fa-solid fa-cart-plus"></i>
                </Tooltip>
              </a>
            </span>
          </div>
        </div> */}
        <div className="product-info">
          <div className="name-product ">
            <Link
              className="hover-underline-animation"
              href={`/product/${product?.url}`}
            >
              {product?.tensp}
            </Link>
          </div>
          <div className="star-review">
            {product?.reviews && product.reviews.length > 0 ? (
              <>
                {/* <Rating
                  name="read-only"
                  value={averageRating()}
                  precision={0.5}
                  readOnly
                /> */}
                <Rate disabled  defaultValue={averageRating()} />
                <div>({product.reviews.length} đánh giá)</div>
              </>
            ) : (
              <span>Chưa có đánh giá</span>
            )}
          </div>
          <div className="price-product">
            {product?.giacu && product.giacu > 0 ? (
              <div style={{ fontSize: "15px" }}>
                <del>
                  <Currency value={product?.giacu} />
                </del>
              </div>
            ) : null}
            {product?.dongia && product?.dongia > 0 ? (
                  <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                    <Currency value={product?.dongia} />
                  </div>
                ) : (
                  <div style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                    Liên hệ
                  </div>
                )}
          </div>
        </div>
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
    </>
  );
}
