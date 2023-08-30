import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { Spin } from 'antd';
import Link from "next/link"
import {useRouter} from "next/router"
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';


export default function Product() {
    const user = useSelector((state) => state.user.login.currentUser);
    const [Uemail, setEmail] = useState(user?.email || "");
const [Usdt, setSdt] = useState(user?.sodienthoai || "");
const [Udiachi, setDiachi] = useState(user?.diachi || "");

    const [userCart, setUserCart] = useState([]);
    const [productsByMakh, setProductsByMakh] = useState([]);
    const [load,setLoad] = useState(0);
   
    const route = useRouter();
    let tongcong = 0
    console.log(productsByMakh)
    const getUserCart = async () => {
        let userId = user.makh;
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}cart/${userId}`);
        setUserCart(response.data);

        const maspArray = response.data.map((item) => item.masp);
        const products = await getProductsByMakh(maspArray);
        await Promise.all(
            products.map(async (prod) => {
                if (prod.img) {
                    const storageRef = ref(storage, `product/${prod.img}`);
                    const imgUrl = await getDownloadURL(storageRef);
                    prod.img = imgUrl;
                }
            })
        );
        setProductsByMakh(products);
    };

    const getProductsByMakh = async (maspArray) => {
        const products = [];
        for (let i = 0; i < maspArray.length; i++) {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}product/${maspArray[i]}`);
            products.push(response.data);
        }
        return products;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoad(1)
            const hoadon = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}hoadon/${user.makh}`, {
                email: Uemail,
                sodienthoai: Usdt,
                diachi: Udiachi,
                tongtien : tongcong
                
            })
           
            for (let i = 0; i < productsByMakh.length; i++) {
                await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}cthoadon/${hoadon.data.mahd}`,{
                    masp : productsByMakh[i].id,
                    soluong: userCart[i].quantity,
                    dongia : productsByMakh[i].dongia,
                    tinhtrang : "0",
                });
                
            }
            await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}cart/${user.makh}`)
            await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/payment/mail-thanhtoan`,{
                tenkh : user.tenkh,
                email : Uemail
            })
            route.push('/')
            
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getUserCart()
    }, []);
    if(load == 1){
        return (
            <Spin />
          );        
    }else{
        return (
            <section className="payment">
                <h1>Thanh toán sản phẩm</h1>
                <div className="contain-prod">
                    <table className="table-prod">
                        <tbody>
                            {productsByMakh.map((product, index) => {
                                const stt = index + 1;
                                const thanhTien = product.dongia * (userCart[index]?.quantity || 0);
                                tongcong += thanhTien;
                                return (
                                    <tr key={product.id}>
                                        <td>{stt}</td>
                                        <td><img src={product.img} alt="" /></td>
                                        <td>{product.tensp}</td>
                                        <td className="input-quantity">{userCart[index]?.quantity.toLocaleString()}</td>
                                        <td className="thanhtien-thuy"> {product.dongia > 0
                              ? parseInt(product.dongia).toLocaleString("vi-VN") 
                              : "Liên hệ"} </td>
                                    </tr>
                                )
                            })}
    
                        </tbody>
                    </table>
                </div>
                <div className="input-info">
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3 mt-3">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email" defaultValue={Uemail} onChange={(e) => setEmail(e.target.value)} class="form-control" id="email" name="email" />
                        </div>
                        <div class="mb-3">
                            <label for="sdt" class="form-label">Số điện thoại</label>
                            <input type="text" defaultValue={Usdt} onChange={(e) => setSdt(e.target.value)} class="form-control" id="sdt" name="sdt" />
                        </div>
                        <div class="mb-3">
                            <label for="dc" class="form-label">Địa chỉ</label>
                            <input type="text" defaultValue={Udiachi} onChange={(e) => setDiachi(e.target.value)} class="form-control" id="dc" name="dc" />
                        </div>
                        <button type="submit" class="btn btn-primary">Thanh toán</button>
                    </form>
                </div>
                <div className="shipcost">
                    {/* ...developing */}
                </div>
            </section>
        )
    }
    
}