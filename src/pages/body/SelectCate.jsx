import Link from "next/link";
import React from "react";

const SelectCate = () => {
  const collectItems = [
    {
      id: 1,
      name: "Bút mực",
      imageSrc: "img/home/pens_collection.webp",
      link: "pen",
    },
    {
      id: 2,
      name: "Bút chì",
      imageSrc: "img/home/pencil_collection.webp",
      link: "pencil",
    },
    {
      id: 3,
      name: "Giấy Planner",
      imageSrc: "img/home/planner.webp",
      link: "planner",
    },
    {
      id: 4,
      name: "Notebook",
      imageSrc: "img/home/notebook.webp",
      link: "notebook",
    },
    {
      id: 5,
      name: "Notepad",
      imageSrc: "img/home/notepad.webp",
      link: "notepad",
    },
    {
      id: 6,
      name: "Nhật ký",
      imageSrc: "img/home/journals.webp",
      link: "nhatky",
    },
    {
      id: 7,
      name: "Bút highlight",
      imageSrc: "img/home/highlighters.webp",
      link: "highlight",
    },{
      id: 8,
      name: "Gôm",
      imageSrc: "img/home/eraser.webp",
      link: "gom",
    },
    {
      id: 9,
      name: "Memo Blocks",
      imageSrc: "img/home/memo.webp",
      link: "memo",
    },
    {
      id: 10,
      name: "Sharpener",
      imageSrc: "img/home/sharpener.webp",
      link: "sharpener",
    },
    {
      id: 11,
      name: "To-do Lists",
      imageSrc: "img/home/todo.webp",
      link: "todo",
    },
    {
      id: 12,
      name: "Sticky Notes",
      imageSrc: "img/home/sticky.webp",
      link: "sticky",
    },
  ];

  return (
    <div className="section">
      <div className="page-width">
        <div className="new-flex">
          {collectItems.map((item) => (
            <div className="flexitem" key={item.id}>
              <Link className="linkitem" href={`/product/${item.link}`}>
                <div className="img-circle">
                  <div className="collection-img">
                    <img className="imgcollect" src={item.imageSrc} loading="lazy" />
                  </div>
                 
                </div>

                <span className="collection-title">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectCate;
