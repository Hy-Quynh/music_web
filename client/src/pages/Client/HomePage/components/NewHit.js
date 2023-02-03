import React, { useEffect, useState } from "react";
import { getAllSong } from "../../../../services/song";
import PlayIcon from "../../../../assets/image/play-music-black.svg";
import StopIcon from "../../../../assets/image/stop-music-black.svg";
import { useDispatch, useSelector } from "react-redux";
import { setSongPlaying, setSongState, songData } from "../../../../slices/songSlice";

const PAGE_LIMIT = 6;

export default function NewHit() {
  const [listHit, setListHit] = useState([]);
  const dispatch = useDispatch();
  const { song } = useSelector(songData);

  const getListHit = async () => {
    try {
      const hit = await getAllSong(PAGE_LIMIT, 0);
      if (hit?.data?.success) {
        setListHit(hit?.data?.payload?.song);
      }
    } catch (error) {
      console.log("get list hit error ", error);
    }
  };

  useEffect(() => {
    getListHit();
  }, []);

  return (
    <div className="new-hits-area mb-100">
      <div
        className="section-heading text-left mb-50 wow fadeInUp"
        data-wow-delay="50ms"
      >
        <p>Điều gì mới</p>
        <h2>Bài hát mới nhất</h2>
      </div>
      {listHit?.map((item, index) => {
        return (
          <div
            className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
            data-wow-delay="100ms"
            key={`album-item-${index}`}
          >
            <div className="first-part d-flex align-items-center">
              <div
                className="thumbnail"
                style={{
                  minWidth: "73px",
                  minHeight: "73px",
                  border: "0.5px solid gray",
                }}
              >
                <img
                  src={item?.avatar}
                  alt=""
                  style={{ width: "73px", height: "73px" }}
                />
              </div>
              <div className="content-">
                <h6>{item?.name}</h6>
                <p>
                  {item?.singer?.length
                    ? item?.singer?.map((it) => it?.name).join(", ")
                    : ""}
                </p>
              </div>
            </div>
            <div>
              {song?._id === item?._id && song?.playing ? (
                <img
                  src={StopIcon}
                  alt="play music"
                  style={{
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(setSongState(false));
                  }}
                />
              ) : (
                <img
                  src={PlayIcon}
                  alt="play music"
                  style={{
                    width: "50px",
                    height: "50px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(setSongPlaying({ ...item, playing: true }));
                  }}
                />
              )}
            </div>
            {/* <audio preload="auto" controls>
              <source src={item?.link} />
            </audio> */}
          </div>
        );
      })}
    </div>
  );
}
