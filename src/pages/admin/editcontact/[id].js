import React, { useState, useEffect } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useRouter } from 'next/router';

const EditBlog = () => {
    const [sdt, setSdt] = useState("");
    const [diachi, setDiachi] = useState("");
    const [gmail, setGmail] = useState("");
    const [mota, setMota] = useState("");
    const [map, setMap] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const route = useRouter();
    const { id } = route.query;

    useEffect(() => {
        getContactById();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("sdt", sdt);
        formData.append("diachi", diachi);
        formData.append("gmail", gmail);
        formData.append("mota", mota);
        formData.append("map", map);
        formData.append("url", url);
        console.log(formData);
        try {
            setLoading(true);

            await axios.patch(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/contact/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            route.push("/admin/AdLayout");

        } catch (error) {
            console.log(error);
            setLoading(false);
            setShowAlert(true);
        }

    };

    const getContactById = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}admin/contact/${id}`);
        setSdt(response.data.sdt);
        setDiachi(response.data.diachi);
        setGmail(response.data.gmail);
        setMota(response.data.mota);
        setUrl(response.data.url);
        setMap(response.data.map);
    };

    return (
        <>

            {loading && <div><div class="box-of-star1">
                <div class="star star-position1"></div>
                <div class="star star-position2"></div>
                <div class="star star-position3"></div>
                <div class="star star-position4"></div>
                <div class="star star-position5"></div>
                <div class="star star-position6"></div>
                <div class="star star-position7"></div>
            </div>
                <div class="box-of-star2">
                    <div class="star star-position1"></div>
                    <div class="star star-position2"></div>
                    <div class="star star-position3"></div>
                    <div class="star star-position4"></div>
                    <div class="star star-position5"></div>
                    <div class="star star-position6"></div>
                    <div class="star star-position7"></div>
                </div>
                <div class="box-of-star3">
                    <div class="star star-position1"></div>
                    <div class="star star-position2"></div>
                    <div class="star star-position3"></div>
                    <div class="star star-position4"></div>
                    <div class="star star-position5"></div>
                    <div class="star star-position6"></div>
                    <div class="star star-position7"></div>
                </div>
                <div class="box-of-star4">
                    <div class="star star-position1"></div>
                    <div class="star star-position2"></div>
                    <div class="star star-position3"></div>
                    <div class="star star-position4"></div>
                    <div class="star star-position5"></div>
                    <div class="star star-position6"></div>
                    <div class="star star-position7"></div>
                </div>
                <div data-js="astro" class="astronaut">
                    <div class="head"></div>
                    <div class="arm arm-left"></div>
                    <div class="arm arm-right"></div>
                    <div class="body">
                        <div class="panel"></div>
                    </div>
                    <div class="leg leg-left"></div>
                    <div class="leg leg-right"></div>
                    <div class="schoolbag"></div>
                </div></div>}
            {!loading && (
                <div className="containeradmin">
                    <SweetAlert
                        show={showAlert}
                        title="Lỗi"
                        error
                        onConfirm={() => setShowAlert(false)}
                    >
                        Vui lòng nhập đầy đủ thông tin
                    </SweetAlert>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="mota_chinh" className="form-label">
                                        Mô tả chi tiết
                                    </label>
                                    <Editor
                                        apiKey="f6zg9q8gblile6r6rmxkgy1b153klpznygp25qf70md614u4"
                                        value={mota}
                                        init={{
                                            height: 500,
                                            menubar: true,
                                            images_upload_max_filesize: "5mb",
                                            plugins: [
                                                "autoresize",
                                                "autosave",
                                                "autolink",
                                                "autosubmit",
                                                "bbcode",
                                                "codesample",
                                                "directionality",
                                                "emoticons",
                                                "fullpage",
                                                "fullscreen",
                                                "help",
                                                "hr",
                                                "image",
                                                "imagetools",
                                                "importcss",
                                                "insertdatetime",
                                                "legacyoutput",
                                                "link",
                                                "lists",
                                                "media",
                                                "nonbreaking",
                                                "noneditable",
                                                "pagebreak",
                                                "paste",
                                                "preview",
                                                "print",
                                                "quickbars",
                                                "searchreplace",
                                                "spellchecker",
                                                "tabfocus",
                                                "table",
                                                "template",
                                                "textcolor",
                                                "textpattern",
                                                "toc",
                                                "visualblocks",
                                                "visualchars",
                                                "wordcount",
                                            ],
                                            toolbar:
                                                "undo redo | styleselect | bold italic underline strikethrough | " +
                                                "forecolor backcolor | link image media | alignleft aligncenter " +
                                                "alignright alignjustify | numlist bullist outdent indent | " +
                                                "removeformat | subscript superscript | code | table | hr | " +
                                                "blockquote | charmap | emoticons | preview | searchreplace | " +
                                                "visualblocks | visualchars | fullscreen | help | insertdatetime | " +
                                                "nonbreaking | pagebreak | paste",
                                            content_style:
                                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                        }}
                                        onEditorChange={(content) => setMota(content)}
                                    />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="sdt" className="form-label">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sdt"
                                        placeholder="Số điện thoại"
                                        value={sdt}
                                        onChange={(e) => setSdt(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="diachi" className="form-label">
                                        Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="diachi"
                                        placeholder="Địa chỉ"
                                        value={diachi}
                                        onChange={(e) => setDiachi(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gmail" className="form-label">
                                        Gmail
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="gmail"
                                        placeholder="Gmail"
                                        value={gmail}
                                        onChange={(e) => setGmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="map" className="form-label">
                                        Google Map
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="map"
                                        placeholder="map"
                                        value={map}
                                        onChange={(e) => setMap(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="url" className="form-label">
                                        Url
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="url"
                                        placeholder="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <button type="submit" className="btn btn-primary" >Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditBlog;
