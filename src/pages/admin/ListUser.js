'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Table, Button,Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";



const ListUser = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/user`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "makh",
      key: "makh",
      width: 120,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "tenkhh",
      key: "tenkh",
      width: 120,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
     
      width: 120,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      
      render: (_, record) => (
        <Space>
          {/* <Link href={`editReview/${record.makh}`}>
            <Button type="primary"
              size="large" icon={<EditOutlined />} />
          </Link> */}
          <Button
            type="primary"
            size="large"
            danger
            icon={<DeleteOutlined />}
            onClick={() =>  handleDelete(record.makh)}
          />
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];
  

  const handleDelete = async (makh) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/user/${makh}`);
      getUser();
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div style={{ height: '83.8vh', width: '100%' }}>
       <Table columns={columns} dataSource={user} pagination={false} bordered scroll={{
          x: 1000,
          y: "100vh",
        }}/>
    </div>
  );

};

export default ListUser;
