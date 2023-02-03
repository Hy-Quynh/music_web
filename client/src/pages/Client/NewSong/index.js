import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSong } from "../../../services/song";
import {
  setSongPlaying,
  setSongState,
  songData,
} from "../../../slices/songSlice";
import PlayMusicIcon from "../../../assets/image/play-music.svg";
import StopMusicIcon from "../../../assets/image/stop-music.svg";

const PAGE_LIMIT = 100;

export default function NewSong() {
  const [listSong, setListSong] = useState([]);
  const dispatch = useDispatch();
  const { song } = useSelector(songData);

  const getListSong = async () => {
    try {
      const result = await getAllSong(PAGE_LIMIT, 0);
      if (result?.data?.success) {
        setListSong(result?.data?.payload?.song);
      }
    } catch (error) {
      console.log("get song error >>> ", error);
    }
  };

  useEffect(() => {
    getListSong();
  }, []);

  return (
    <div style={{ marginBottom: "100px" }}>
      <section
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: "url(img/bg-img/breadcumb3.jpg)" }}
      >
        <div className="bradcumbContent">
          <h2>Nhạc mới</h2>
        </div>
      </section>

      <div className="one-music-songs-area mb-70 mt-70">
        <div className="container">
          <div className="row">
            {listSong?.map((item, index) => {
              return (
                <div className="col-12">
                  <div className="single-song-area mb-30 d-flex align-items-end">
                    <div
                      className="song-thumbnail"
                      style={{
                        width: "118px",
                        height: "118px",
                        border: "0.5px solid gray",
                        maxWidth: "118px",
                      }}
                    >
                      <img
                        src={item?.avatar}
                        alt=""
                        style={{ width: "118px", height: "118px" }}
                      />
                    </div>
                    <div
                      className="song-play-area d-flex align-items-center"
                      style={{
                        maxWidth: "unset",
                        flex: "unset",
                        justifyContent: "space-between",
                        width: "calc(100% - 140px)",
                      }}
                    >
                      <div>
                        <div className="song-name">
                          <p>{item?.name}</p>
                        </div>
                        <div className="singer-name">
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
                            src={StopMusicIcon}
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
                            src={PlayMusicIcon}
                            alt="play music"
                            style={{
                              width: "50px",
                              height: "50px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              dispatch(
                                setSongPlaying({ ...item, playing: true })
                              );
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
