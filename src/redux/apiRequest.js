import axios from 'axios';
import {useSelector} from 'react-redux'

import { loginStart,loginFailed,loginSuccess,registerFailed,registerStart,registerSuccess,logoutFailed,logoutStart,logoutSuccess,clearProduct } from './slice';

import store from './store';


// Sử dụng biến cart trong logic của bạn


export const loginUser = async (user, dispatch ) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}account/login`, user);
  
      const cart = store.getState().cart.cart;
      if (cart) {
        const masp = cart.map((item) => item.id);
        const quantity = cart.map((item) => item.quantity);
        await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}cart/addmulti`, {
          quantity: quantity,
          makh: res.data.makh,
          masp: masp,
        });
      }
      dispatch(loginSuccess(res.data));
      dispatch(clearProduct());
      
      window.scrollTo(0, 0);
    } catch (error) {
      if (error.response) {
        // Xử lý lỗi từ phía server (response có status code)
        if (error.response.status === 401) {
          // Sai mật khẩu
          dispatch(loginFailed("Sai mật khẩu"));
        } else if (error.response.status === 404) {
          // Sai tên đăng nhập
          dispatch(loginFailed("Sai tên đăng nhập hoặc mật khẩu"));
        } else {
          // Xử lý các lỗi khác từ phía server
          dispatch(loginFailed("Đã có lỗi xảy ra"));
        }
      } else {
        // Xử lý lỗi không có response từ phía server
        dispatch(loginFailed("Đã có lỗi xảy ra"));
      }
    }
  };

export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}account/register`,user);
        dispatch(registerSuccess());
       
        // router.push('/account/login');
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const logoutUser = async ( dispatch,id,accessToken) => {
    dispatch(logoutStart());
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}account/logout`,id,{
            headers: {token: accessToken}
        });
        dispatch(logoutSuccess());
        // router.push('/');
    } catch (error) {
        dispatch(logoutFailed());
      
    }
}

export const addToCart = async (newCart) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}cart/add`, newCart);
      return response.data;
    } catch (error) {
        console.log(error);
      console.log(newCart);
    }
  };