'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"
import { Table, Button, Space, Tag  } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";


const ListCTHD = () => {
  const [cthoadon, setCTHoadon] = useState([]);

  useEffect(() => {
    getCTHoadon();
  }, []);
  
  const getCTHoadon = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/cthoadons/all`);
      setCTHoadon(response.data);
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
      title: "Mã sản phẩm",
      dataIndex: "masp",
      key: "masp",
     
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "soluong",
      key: "soluong",
      width: 130,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
      width: 150,
    },
    {
      title: "Đơn giá",
      dataIndex: "dongia",
      key: "dongia",
      width: 130,
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongtien",
      key: "tongtien",
      width: 150,
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
          <Link href={`/admin/editcthoadon/${record.mahd}/${record.masp}`}>
            <Button type="primary"
              size="large" icon={<EditOutlined />} />
          </Link>
          <Button
            type="primary"
            size="large"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.mahd,record.masp)}
          />
        </Space>
      ),
      fixed: "right",
      width: 120,
    },
  ];

  // const columns = [
  //   { field: 'mahd', headerName: 'Mã hóa đơn', width: 130 },
  //   { field: 'masp', headerName: 'Mã sản phẩm', width: 130 },
  //   { field: 'soluong', type: 'number', headerName: 'Số lượng', width: 130 },
  //   {
  //     field: 'dongia',
  //     headerName: 'Đơn giá',
  //     type: 'number',
  //     width: 250,
  //   },
  //   { field: 'tongtien',type: 'number', headerName: 'Tổng tiền', width: 200},
  //   { field: "tinhtrang", headerName: "Tình trạng", width: 130, valueGetter: (params) => getTinhTrang(params.row.tinhtrang) },
   
  //   {
  //     field: 'actions',
  //     headerName: 'Actions',
  //     width: 200,
  //     renderCell: (params) => (
      
  //       <div>
  //         <Link href={`/admin/editcthoadon/${params.row.mahd}/${params.row.masp}`}>
  //           <EditOutlined style={{ marginRight: 8 }} />
  //         </Link>
          
  //         <Button
  //           type="danger"
  //           icon={<DeleteOutlined />}
  //           onClick={() => handleDelete(params.row.mahd,params.row.masp)}
  //         />
  //       </div>
  //     ),
  //   },
  // ];

  const handleDelete = async (id,masp) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/cthoadon/${id}/${masp}`);
      getCTHoadon();
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
  //   return "Không xác định";
  // };


  return (
    <div style={{ height: '83.8vh', width: '100%' }}>
     <Table columns={columns} dataSource={cthoadon} pagination={true} bordered scroll={{
          x: 1000,
          y: "100vh",
        }}/>
    </div>
  );

};

export default ListCTHD;
