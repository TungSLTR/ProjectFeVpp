import React, { useEffect, useState } from "react";

import axios from "axios";

export default function PolicyBody() {
  const [mota, setMota] = useState("");

  useEffect(() => {
    const fetchHome = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}home/status`);
      setMota(response.data.mota);
    };
    fetchHome();
  }, []);
  return (
    <div className="container policy">
      <div style={{ width: "100%"}} dangerouslySetInnerHTML={{ __html: mota }} />
    </div>
  );
}
