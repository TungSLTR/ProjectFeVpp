import React, { useState, useEffect } from "react";
import axios from "axios";
import {useRouter} from "next/router"
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";

export default function Blog({blog}) {
  const router = useRouter();
  const { url } = router.query;
 
  useEffect(() => {
    // getBlogs();
  }, [url]);
  return (
    <section>
      <div class="container mt-3 blogct">
        {blog.mota ? (
          <div dangerouslySetInnerHTML={{ __html: blog.mota }}></div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}
export async function getStaticPaths() {

  // Gọi API để lấy dữ liệu sản phẩm
  const response = await fetch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}blog/all`);
  const datablog = await response.json();

  // Tạo danh sách paths từ dữ liệu
  const paths = datablog.map((product) => ({
    params: { url: `${product.url}` },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
export async function getStaticProps({ params: { url } }) {
  try {
    // Fetch data from external API
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}blog/${url}`);
  
    const blog = data;
    console.log(blog)

    // Check if product is undefined and handle accordingly
    if (!blog) {
      throw new Error("Blog not found");
    }
    if (blog.img_blog) {
      const storageRef = ref(storage, `blog/${blog.img_blog}`);
      const imgUrl = await getDownloadURL(storageRef);
      blog.imgUrl = imgUrl;
    }
    // Pass data to the page via props
    return {
      props: {
       blog,
        title: `${blog.tenblog} - Gaming Zone`,
        description: `${blog.tenblog} - Gaming Zone`,
        image: `${blog.imgUrl}`,
        
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error(error);
    
  }
}