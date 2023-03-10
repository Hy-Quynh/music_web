import React, { useEffect, useState } from "react";
import PlayIcon from "../../../../assets/image/play-music-black.svg";
import StopIcon from "../../../../assets/image/stop-music-black.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setListSongPlaying,
  setListType,
  setSongPlaying,
  setSongState,
  songData,
} from "../../../../slices/songSlice";
import { useNavigate } from "react-router-dom";
import { getSongMostSearch } from "../../../../services/search";

export default function MostSearchList() {
  const [listHit, setListHit] = useState([]);
  const dispatch = useDispatch();
  const { song } = useSelector(songData);
  const navigate = useNavigate();
  const { listSongPlaying } = useSelector(songData);
  const { listType } = useSelector(songData);

  const getListSong = async () => {
    try {
      const hit = await getSongMostSearch();
      if (hit?.data?.success) {
        setListHit(hit?.data?.payload);
      }
    } catch (error) {
      console.log("get most search song ", error);
    }
  };

  useEffect(() => {
    getListSong();
  }, []);

  return (
    <div className="new-hits-area mb-100">
      <div
        className="section-heading text-left mb-50"
        data-wow-delay="50ms"
      >
        <h2>Bài hát được tìm kiếm nhiều nhất</h2>
      </div>
      {listHit?.map((item, index) => {
        return (
          <div
            className="single-new-item d-flex align-items-center justify-content-between"
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate(`/song/${item?._id}`);
                }}
              >
                <img
                  src={item?.avatar}
                  alt=""
                  style={{ width: "73px", height: "73px" }}
                />
              </div>
              <div className="content-">
                <h6
                  onClick={() => {
                    navigate(`/song/${item?._id}`);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item?.name}
                </h6>
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
                    if (
                      !listSongPlaying?.length ||
                      listType?.type !== "most-search"
                    ) {
                      dispatch(setListSongPlaying(listHit));
                      dispatch(
                        setListType({
                          type: "most-search",
                          ...listType,
                        })
                      );
                    }

                    dispatch(setSongPlaying({ ...item, playing: true }));
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
