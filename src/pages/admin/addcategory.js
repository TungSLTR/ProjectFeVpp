import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import SweetAlert from "react-bootstrap-sweetalert";
import unidecode from "unidecode";

const AddCateProd = () => {
  const [ten, setTen] = useState("");
  const [stt, setStt] = useState("");
  const [url, setUrl] = useState("");
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const formData = new FormData();
    formData.append("ten", ten);
    formData.append("stt", stt);
    formData.append("url", url);

    try {
      setLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/cateProd`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      route.replace("/admin/AdLayout");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowAlert(true);
    }
  };

  return (
    <>

      {loading && <div><div class="box-of-star1">
        <div class="star star-position1"></div>
        <div class="star star-position2"></div>
        <div class="star star-position3"></div>
        <div class="star star-position4"></div>
        <div class="star star-position5"></div>
        <div class="star star-position6"></div>
        <div class="star star-position7"></div>
      </div>
        <div class="box-of-star2">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div class="box-of-star3">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div class="box-of-star4">
          <div class="star star-position1"></div>
          <div class="star star-position2"></div>
          <div class="star star-position3"></div>
          <div class="star star-position4"></div>
          <div class="star star-position5"></div>
          <div class="star star-position6"></div>
          <div class="star star-position7"></div>
        </div>
        <div data-js="astro" class="astronaut">
          <div class="head"></div>
          <div class="arm arm-left"></div>
          <div class="arm arm-right"></div>
          <div class="body">
            <div class="panel"></div>
          </div>
          <div class="leg leg-left"></div>
          <div class="leg leg-right"></div>
          <div class="schoolbag"></div>
        </div></div>}
      {!loading && (

        <div className="containeradmin">
          <SweetAlert
            show={showAlert}
            title="Lỗi"
            error
            onConfirm={() => setShowAlert(false)}
          >
            Vui lòng nhập đầy đủ thông tin
          </SweetAlert>

          <div className="row">
            <div className="col-md-12">
              <form
                onSubmit={handleSubmit}
                enctype="multipart/form-data"
                method="post"
              >
                <div className="mb-3">
                  <label htmlFor="stt" className="form-label">
                    Stt
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stt"
                    placeholder="Nhập stt"
                    value={stt}
                    onChange={(e) => setStt(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ten" className="form-label">
                    Tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ten"
                    placeholder="Nhập tên"
                    value={ten}
                    onChange={(e) => {
                      const value = e.target.value;
                      const url = unidecode(value)
                        .toLowerCase()
                        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
                        .replace(/[^a-z0-9-]+/g, ""); // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
                      setTen(value);
                      setUrl(url);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    Url
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="url"
                    placeholder="Nhập tên Blog"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div style={{ textAlign: "center" }}><button type="submit" className="btn btn-primary" >
                  Thêm
                </button></div>
              </form>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default AddCateProd;