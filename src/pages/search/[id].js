import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";

import ProductContain from "../body/ProductContain";

import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "../../firebase";
function SearchResults() {
    const router = useRouter();
    const { id } = router.query;
    
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
        console.log(id)
    }, [id]);
    const fetchProducts = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}product`)
        await Promise.all(
            response.data.products.map(async (prod) => {
              if (prod.img) {
                const storageRef = ref(storage, `product/${prod.img}`);
                const imgUrl = await getDownloadURL(storageRef);
                prod.img = imgUrl;
              }
            })
          );
        setProducts(response.data.products);
     
    };

    const filteredProducts = products.filter((product) =>
    product.tensp
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(id?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  );
  

    return (
        <div className="product-thuy">
   
            <div className="container">
            <h2>Kết quả tìm kiếm cho &quot;{id}&quot;</h2>
                <div className="row">
                    {filteredProducts.map((product) => (
                        <ProductContain product={product} key={product.id}/>
                    ))}
                </div>
            </div>

        </div>

    );
}

export default SearchResults;
