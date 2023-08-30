'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Table, Button, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ListHoaDon= () => {
  const [hoadon, setHoadon] = useState([]);

  useEffect(() => {
    getHoadon();
  }, []);

  const getHoadon = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/hoadon`);
      setHoadon(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Mã hóa đơn",
      dataIndex: "mahd",
      key: "mahd",
      
      fixed: "left",
      width: 100,
    },   
    {
      title: "Mã khách hàng",
      dataIndex: "makh",
      key: "makh",
     
      width: 150,
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongtien",
      key: "tongtien",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 130,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "sodienthoai",
      key: "sodienthoai",
      width: 130,
    },
   
    {
      title: "Tình trạng",
      dataIndex: "tinhtrang",
      key: "tinhtrang",
      width: 150,
      
      render: (tinhtrang) => {
        switch (tinhtrang) {
          case 0:
            return <Tag color="blue">Đang xác nhận</Tag>;
          case 1:
            return <Tag color="green">Đang giao</Tag>;
          case 2:
            return <Tag color="purple">Hoàn thành</Tag>;
          default:
            return <Tag color="default">Không xác định</Tag>;
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      
      render: (_, record) => (
        <Space>
          <Link href={`/admin/edithoadon/${record.mahd}`}>
            <Button type="primary"
              size="large" icon={<EditOutlined />} />
          </Link>
          <Button
            type="primary"
            size="large"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.mahd)}
          />
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];
  // const columns = [
  //   { field: 'mahd', headerName: 'Mã hóa đơn', width: 130 },
  //   { field: 'makh', headerName: 'Mã khách hàng', width: 130 },
  //   { field: 'tongtien', type: 'number', headerName: 'Tổng tiền', width: 130 },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     width: 250,
  //     editable: true
  //   },
  //   { field: 'diachi', headerName: 'Địa chỉ', width: 200, editable: true },
  //   { field: 'sodienthoai', headerName: 'Số điện thoại', width: 130, editable: true },
  //   { field: "tinhtrang", headerName: "Tình trạng", width: 130, valueGetter: (params) => getTinhTrang(params.row.tinhtrang) },
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     width: 200,
  //     renderCell: (params) => (
  //       <div>
  //         <Link href={`/admin/edithoadon/${params.id}`}>
  //           <EditOutlined style={{ marginRight: 8 }} />
  //         </Link>
  //         <Button
  //           type="danger"
  //           icon={<DeleteOutlined />}
  //           onClick={() => handleDelete(params.id)}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/hoadon/${id}`);
      getHoadon();
    } catch (error) {
      console.log(error);
    }
  }

  // const getTinhTrang = (tinhTrang) => {
  //   if (tinhTrang == 0) {
  //     return "Đang xác nhận";
  //   } else if (tinhTrang == 1) {
  //     return "Đang giao";
  //   } else if (tinhTrang == 2) {
  //     return "Hoàn thành";
  //   }
  //   return "Lỗi";
  // };

  return (
    <div style={{ height: '83.8vh', width: '100%' }}>
      <Table columns={columns} dataSource={hoadon} pagination={true} bordered scroll={{
          x: 1000,
          y: "100vh",
        }}/>
    </div>
  );

};

export default ListHoaDon;
