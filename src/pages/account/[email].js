import React, { useState ,useEffect} from "react";

import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router"
import { useDispatch, useSelector } from "react-redux";



export default function LastStep(){
    const route = useRouter()
    const {email} = route.query
    const [code,setCode] = useState("")
    const [matkhau, setMatkhau] = useState("")

    const handleSubmit = async (e)=>{
        try {
            e.preventDefault()
            await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}account/rspass`,{
                matkhau: matkhau,
                resetCode: code,
                email: email
            })
            route.push('/account/login')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        // <section>
        //     <form onSubmit={handleSubmit}>
        //         <label for="">Mã xác nhận</label>
        //         <input type="number" name="" onChange={(e) => setCode(e.target.value)}/>
        //         <label for="">Mật khẩu mới</label>
        //         <input type="text" name="" onChange={(e) => setMatkhau(e.target.value)}/>
        //         <button type="submit">xác nhận</button>
        //     </form>
        // </section>
        <>
        <div className="box-login">
         
          <main
            id="MainContent"
            class="content-for-layout focus-none"
            role="main"
            tabindex="-1"
          >
            <link
              href="//cdn.shopify.com/s/files/1/0642/1161/5996/t/2/assets/customer.css?v=64096048890753148901651743151"
              rel="stylesheet"
              type="text/css"
              media="all"
            />
            <div class="customer login">
              
              <h1 id="login" tabindex="-1">
                Vui lòng nhập code được gửi trong email và mật khẩu mới
              </h1>
              <div>
                <form
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="form_type" value="customer_login" />
                  <input type="hidden" name="utf8" value="✓" />
                  <div class="field">
                    <input
                      type="number"
                      name=""
                      id="CustomerEmail"
                   
                      placeholder="Mã xác nhận"
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <label for="CustomerEmail">Mã xác nhận</label>
                  </div>
                  <div class="field">
                    <input
                      type="text"
                      name=""
                      id="CustomerPassword"
              
                      placeholder="Mật khẩu mới"
                      onChange={(e) => setMatkhau(e.target.value)}
                    />
                    <label for="CustomerPassword">Mật khẩu mới</label>
                  </div>
                  
                  <button type="submit">Xác nhận</button>
                 
                </form>
              </div>
            </div>
          </main>
        </div>
      </>
    )
}