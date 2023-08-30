// import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
// // import Product from './component/Product';
// import Footer from './Footer';
// import Header from './Header';
// import Login from './Login';
import Body from './Body';
// import Detail from './Detail';
// import CategoryPage from "./CategoryPage";
// import Product from "./Product";
// import SearchResults from "./SearchResult";
// import Register from "./Register";
// import Cart from "./Cart";
// import AccountUser from "./AccountUser";
// import AccountCart from "./AccountCart";
// import Blog from "./Blog";
// import ProductSale from "./ProductSale";
// import Contact from "./Contact";
// import NotFound from "./NotFound";
// import AccountEdit from "./AccountEdit";
// //Admin
// import AddMenu from "./admin/AddMenu";
// import EditMenu from "./admin/EditMenu";
// // import MenuList from "./admin/MenuList";
// // import ProductList from "./admin/ProductList";
// import AddProduct from "./admin/AddProduct";
// import EditProduct from "./admin/EditProduct";
import AdLayout from "./admin/AdLayout";
// import AddHome from "./admin/AddHome";
// import EditHome from "./admin/EditHome";
// import AddBlog from "./admin/AddBlog";
// import EditBlog from "./admin/EditBlog";
// import AddCateProd from "./admin/AddCateProd"
// import EditCateProd from "./admin/EditCateProd";
// import EditReview from "./admin/EditReview";
// import EditHoadon from "./admin/EditHoadon";
// import AddContact from "./admin/AddContact";
// import EditContact from "./admin/EditContact";
// import BlogAll from "./BlogAll"
// import Payment from "./Payment"
// import ForgotPassword from "./ForgotPassword";
// import NextStep from "./nextStepFP"
// import EditCThoadon from "./admin/EditCThoadon";

import App from "../App"
// import { Provider } from "react-redux";
// import { persistor, store } from "../redux/store.js";
// import { PersistGate } from "redux-persist/integration/react";
import React, { useEffect } from 'react';

import { Provider , useSelector} from "react-redux";
import { persistor, store } from "../redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";

// Dynamically import components for static rendering

import { useRouter } from "next/router";
const Dashboard = dynamic(() => import("./admin/AdLayout"));
export default function HomePage() {


  return <Body />;
}