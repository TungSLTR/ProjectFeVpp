'use client'

import React, { useState, useEffect } from "react";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {useRouter} from "next/router"
import { updateUser } from "../../redux/slice";

export default function Account() {
    let user = useSelector((state) => state.user.login.currentUser);
    const [editTenkh, setTenkh] = useState(user?.tenkh ?? "");
const [editEmail, setEmail] = useState(user?.email ?? "");
const [editSdt, setSdt] = useState(user?.sodienthoai ?? "");
const [editDc, setDc] = useState(user?.diachi ?? "");

    const accessToken = user?.accessToken;
    const route = useRouter();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

        try {
            e.preventDefault()
            await axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}account/edit/${user.makh}`, {
                tenkh: editTenkh,
                email: editEmail,
                sodienthoai: editSdt,
                diachi: editDc
            })
            const newUser = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}account/${user.makh}`, {
                headers: { token: accessToken }
            })
            dispatch(updateUser(newUser.data))
            route.push('/account/user')
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

    }, [user]);
    if (user == null) {
        return (
            <div>Vui lòng đăng nhập!!!</div>
        )
    } else {
        return (
            <section className="info-user">
                <div class="profile-container container"  >
                    <div class="sidebar">
                        <ul class="sidebar-menu">
                            <li class="menu-item active">
                                <Link href="/account/user" class="menu-link">
                                    <i class="fas fa-user"></i>
                                    <span class="menu-text">Thông tin khách hàng</span>
                                </Link>
                            </li>
                            <li class="menu-item">
                                <Link href="/account/cart" class="menu-link">
                                    <i class="fas fa-shopping-cart"></i>
                                    <span class="menu-text">Đơn hàng</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div class="profile-main">
                        <div class="profile-header">
                            <h2 class="profile-title">Thông tin Khách hàng</h2>
                        </div>
                        <div class="profile-body">
                            <div class="profile-info">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="tenkh">Tên khách hàng</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="tenkh"
                                            defaultValue={editTenkh}
                                            onChange={(e) => setTenkh(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            defaultValue={editEmail}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="sdt">Số điện thoại</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sdt"
                                            defaultValue={editSdt}
                                            onChange={(e) => setSdt(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="dc">Địa chỉ</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="dc"
                                            defaultValue={editDc}
                                            onChange={(e) => setDc(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Lưu</button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
    }
}