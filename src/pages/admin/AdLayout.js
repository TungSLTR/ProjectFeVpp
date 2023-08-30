'use client'
import {
  AppstoreOutlined,
  MenuOutlined,
  InboxOutlined,
  BookOutlined,
  SkinOutlined,
  FileTextOutlined,
  FileOutlined,
  SmileOutlined,
  TeamOutlined,
  PhoneOutlined, FundProjectionScreenOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import ListMenu from "./ListMenu";
import ListHome from "./ListHome";
import ListBlog from "./ListBlog";
import ListCateProd from "./ListCateProd";
import ListReview from "./ListReview";
import ListContact from "./ListContact";
import Link from "next/link"
import Dashboard from "./Dashboard";
import ListHoadon from "./ListHoadon";
import ListCTHD from "./ListCTHD";
import Head from "next/head";
import ListUser from "./ListUser"
import { Provider, useSelector } from "react-redux";

import { useRouter } from "next/router";

const { Header, Content, Footer, Sider } = Layout;

const AdLayout = () => {
  const route = useRouter();

 
  const user = useSelector((state) => state.user.login.currentUser);
  const accessToken = user?.accessToken;
  const vaitro = user?.vaitro
  const [selectedMenuItem, setSelectedMenuItem] = useState("1"); // 1 là key của item "Product" trong menu
  useEffect(() => {
    if (vaitro == 0 || user == null) {
      route.push("/");
    }
  }, [route, vaitro, user]);
  if (typeof window === 'undefined') {
    return null; // Hoặc bất kỳ phản hồi nào khác mà bạn muốn trả về trong phần render trên phía máy chủ
  }
  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
  };
 
  const {
    token: { colorBgContainer },
  } = theme.useToken();
    return (
      <>
        <Head>
      <title>Admin - Văn Phòng Phẩm Vũ Phong</title>
    </Head>
      <Layout>

        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedMenuItem]}
            onClick={handleMenuClick}
            items={[
              { key: "1", icon: <FundProjectionScreenOutlined />, label: "Tổng quan" },
              { key: "2", icon: <InboxOutlined />, label: "Sản phẩm" },
              { key: "3", icon: <MenuOutlined />, label: "Menu" },
              { key: "4", icon: <SkinOutlined />, label: "Chủ đề" },
              { key: "5", icon: <BookOutlined />, label: "Blog" },
              { key: "6", icon: <AppstoreOutlined />, label: "Phân loại" },
              { key: "7", icon: <SmileOutlined />, label: "Đánh giá" },
              { key: "8", icon: <PhoneOutlined />, label: "Liên hệ" },
              { key: "9", icon: <FileOutlined />, label: "Hóa đơn" },
              { key: "10", icon: <FileTextOutlined />, label: "Chi tiết Hóa đơn" },
              { key: "11", icon: <TeamOutlined />, label: "Quản lí tài khoản" },
            ]}
          />
        </Sider>
        <Layout>
        <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div></div> {/* Dùng để căn chỉnh các phần tử trái */}
      <div style={{ textAlign: "right" }}>
        <Link href="/"><button className="gohomepage">Về trang chủ</button></Link>
      </div>
    </Header>
          <Content
            style={{
              margin: "24px 16px 0", minHeight: "100vh"
            }}
          >
            {selectedMenuItem === "1" ? (
              <Dashboard />
            ) : selectedMenuItem === "2" ? (
              <ListProduct />
            ) : selectedMenuItem === "3" ? (
              <ListMenu />
            ) : selectedMenuItem === "4" ? (
              <ListHome />
            ) : selectedMenuItem === "5" ? (
              <ListBlog />
            ) : selectedMenuItem === "6" ? (
              <ListCateProd />
            ) : selectedMenuItem === "7" ? (
              <ListReview />
            ) : selectedMenuItem === "8" ? (
              <ListContact />
            ) : selectedMenuItem === "9" ? (
              <ListHoadon />
            ) : selectedMenuItem === "10" ? (
              <ListCTHD />
              ) : selectedMenuItem === "11" ? (
                <ListUser />
            ) : null}
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            GameZone
          </Footer>
        </Layout>
      </Layout>
      </>
    );
  
};
export default AdLayout;
