import React, { useState ,useEffect} from "react";

import axios from "axios";
import {useRouter} from "next/router"



export default function ForgotPassword(){
    const route = useRouter()
    const [email,setEmail] = useState("")

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}account/send-mail`,{
                email : email
            })
            route.push(`/account/${email}`)
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <section>
            <h1>Quên mật khẩu</h1>
            <form onSubmit={handleSubmit}>
                <label for="">Nhập email</label>
                <input type="email" name="" value={email}  onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit">Xác nhận</button>
            </form>
        </section>
    )
}