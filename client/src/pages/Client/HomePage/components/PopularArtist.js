import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopularSinger } from "../../../../services/singer";

export default function PopularArtist() {
  const [popularSinger, setPopularSinger] = useState([]);
  const navigate = useNavigate();

  const getListPopularSinger = async () => {
    try {
      const result = await getPopularSinger();
      if (result?.data?.success) {
        setPopularSinger(result?.data?.payload);
      }
    } catch (error) {
      console.log("get popular singer error >>> ", error);
    }
  };

  useEffect(() => {
    getListPopularSinger();
  }, []);

  return (
    <div className="popular-artists-area mb-100">
      <div
        className="section-heading text-left mb-50 wow fadeInUp"
        data-wow-delay="50ms"
      >
        <p>Điều gì mới</p>
        <h2>Ca sĩ phổ biến</h2>
      </div>
      {popularSinger?.map((item, index) => {
        return (
          <div
            className="single-artists d-flex align-items-center wow fadeInUp"
            data-wow-delay="100ms"
            key={`popular-singer-item-${index}`}
            style={{cursor: 'pointer'}}
            onClick={() => navigate(`/singer/${item?._id}`)}
          >
            <div
              className="thumbnail"
              style={{
                minWidth: "65px",
                minHeight: "65px",
                border: "0.5px solid gray",
                borderRadius: "32.5px",
              }}
            >
              <img
                src={item?.avatar}
                alt=""
                style={{ width: "65px", height: "65px" }}
              />
            </div>
            <div className="content-">
              <p>{item?.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
