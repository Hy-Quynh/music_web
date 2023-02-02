import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../../../services/category";

const COLOR_LIST = ["#03001C", "#301E67", "#1C82AD", "#5B8FB9"];

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);

  const getListCountry = async () => {
    try {
      const result = await getAllCategory();
      if (result?.data?.success) {
        setCategoryList(result?.data?.payload);
      }
    } catch (error) {
      console.log("get list category error >>> ", error);
    }
  };

  useEffect(() => {
    getListCountry();
  }, []);

  return (
    <div className="country">
      <div className="title category-title">Thể loại</div>
      <div className="list category-list">
        {categoryList?.map((item, index) => {
          return (
            <div
              className="category-list-item list-item item1"
              key={`country-item-${index}`}
              style={{ background: COLOR_LIST[index % 4] }}
            >
              {item?.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
