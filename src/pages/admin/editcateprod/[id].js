import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import unidecode from "unidecode";
import SweetAlert from "react-bootstrap-sweetalert";
import { storage } from "../../../firebase.js";
const EditCateProd = () => {
  const [ten, setTen] = useState("");
  const [stt, setStt] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const route = useRouter();
  const { id } = route.query;
  useEffect(() => {
    getCateProdById();
  }, []);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ten", ten);
    formData.append("stt", stt);
    formData.append("url", url);
    console.log(formData);
    try {
        setLoading(true);
      await axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/cateProd/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      route.push("/admin/AdLayout");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowAlert(true);
    }
  };

  const getCateProdById = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/cateProd/${id}`);
    
    setTen(response.data.ten);
    setStt(response.data.stt);
    setUrl(response.data.url);
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
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">Stt</label>
            <div>
              <input
                type="number"
                placeholder="Stt"
                className="form-control"
                value={stt}
                onChange={(e) => setStt(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Tên</label>
            <div>
              <input
                type="text"
                placeholder="Tên"
                value={ten}
                className="form-control"
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
          </div>

          <div className="mb-3">
            <label className="form-label">Url</label>
            <div>
              <input
                type="text"
                placeholder="Url"
                className="form-control"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
          <div style={{textAlign: "center"}}>
              <button type="submit" className="btn btn-primary" >Update</button>
            </div>
        </form>
        </div>
      </div>
    </div>
     )}
     </>
  );
};

export default EditCateProd;
