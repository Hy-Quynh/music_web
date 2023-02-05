import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSongById } from "../../../services/song";
import './style.scss';

export default function SongDetail() {
  const [songDetail, setSongDetail] = useState({});
  const { id } = useParams();

  const getSongDetail = async () => {
    try {
      const result = await getSongById(id);
      if (result?.data?.success) {
        setSongDetail(result?.data?.payload);
      }
    } catch (error) {
      console.log("get song detail error >>> ", error);
    }
  };

  useEffect(() => {
    getSongDetail();
  }, []);

  return (
    <div>
      <section
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: "url(/img/bg-img/breadcumb3.jpg)" }}
      >
        <div className="bradcumbContent">
          <h2 style={{ marginLeft: "20px" }}>Bài hát: {songDetail?.name}</h2>
        </div>
      </section>

      <div style={{ padding: "20px 60px" }} className="song-detail">
        <div className="song-about">Về bài hát: {songDetail?.name}</div>
        <div className="song-detail row">
          <div className="song-avatar col-12 col-sm-4 col-md-3">
            <img src={songDetail?.avatar} alt="" />
          </div>
          <div className="song-desc col-12 col-sm-8 col-md-9">
            {songDetail?.description}

            
          </div>
        </div>
      </div>
    </div>
  );
}
