import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "react-bootstrap-sweetalert";
import { useRouter } from 'next/router';

const EditReview = () => {
    const [mahd, setMahd] = useState("");
    const [makh, setMakh] = useState("");
    const [tongtien, setTongtien] = useState("");
    const [email, setEmail] = useState("");
    const [diachi, setDiachi] = useState("");
    const [sodienthoai, setSodienthoai] = useState("");
    const [tinhtrang, setTinhtrang] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const route = useRouter();
    const { id } = route.query;
    useEffect(() => {
        getHoadonById();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/hoadon/${id}`,
                {
                    tongtien: tongtien,
                    email: email,
                    diachi: diachi,
                    sodienthoai: sodienthoai,
                    tinhtrang: tinhtrang,
                }
            );
            route.push("/admin/AdLayout");

        } catch (error) {
            console.log(error);
            setLoading(false);
            setShowAlert(true);
        }
    };

    const getHoadonById = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/hoadon/${id}`);
        setMahd(response.data.mahd);
        setMakh(response.data.makh);
        setTongtien(response.data.tongtien);
        setEmail(response.data.email);
        setSodienthoai(response.data.sodienthoai);
        setTinhtrang(response.data.tinhtrang);
        setDiachi(response.data.diachi);
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
                                    <label className="form-label">Mã Hóa đơn</label>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="makh"
                                            className="form-control"
                                            value={mahd}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mã Khách hàng</label>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="masp"
                                            className="form-control"
                                            value={makh}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Tổng tiền</label>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Tongtien"
                                            className="form-control"
                                            value={tongtien}
                                            onChange={(e) => setTongtien(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="sodienthoai"
                                            className="form-control"
                                            value={sodienthoai}
                                            onChange={(e) => setSodienthoai(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Địa chỉ</label>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="sodienthoai"
                                            className="form-control"
                                            value={diachi}
                                            onChange={(e) => setDiachi(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tình trạng đơn hàng</label>
                                    <div>
                                        <select
                                            className="form-select"
                                            value={tinhtrang}
                                            onChange={(e) => setTinhtrang(e.target.value)}
                                        >
                                            <option value="0">Đang xác nhận đơn hàng</option>
                                            <option value="1">Đang vận chuyển</option>
                                            <option value="2">Đã hoàn thành</option>
                                        </select>
                                    </div>
                                </div>


                                <div style={{ textAlign: "center" }}>
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditReview;
