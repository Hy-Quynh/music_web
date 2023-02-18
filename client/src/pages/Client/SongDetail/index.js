import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSongById, updateSongView } from "../../../services/song";
import "./style.scss";
import PlayIcon from "../../../assets/image/play-music.svg";
import StopIcon from "../../../assets/image/stop-music.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setSongPlaying,
  setSongState,
  songData,
} from "../../../slices/songSlice";
import SongReview from "./components/SongReview";
import ControlList from "./components/ControlList";

export default function SongDetail() {
  const [songDetail, setSongDetail] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const { song } = useSelector(songData);

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

  useEffect(() => {
    (async () => {
      await updateSongView(id);
    })();
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
            <div className="song-detail-singer">
              Ca sĩ:{" "}
              {songDetail?.singer?.length
                ? songDetail?.singer?.map((it) => it?.name).join(", ")
                : ""}
            </div>
          </div>
          <div className="col-12 col-sm-8 col-md-9">
            <div className="song-desc">{songDetail?.description}</div>
            <ControlList songId={id} />
            <div className="song-player-button">
              <button>
                <div>Phát nhạc</div>
                <div style={{ marginLeft: "10px" }}>
                  {song?._id === songDetail?._id && song?.playing ? (
                    <img
                      src={StopIcon}
                      alt="play music"
                      style={{ width: "25px", height: "25px" }}
                      onClick={() => {
                        dispatch(setSongState(false));
                      }}
                    />
                  ) : (
                    <img
                      src={PlayIcon}
                      alt="play music"
                      style={{ width: "25px", height: "25px" }}
                      onClick={() => {
                        dispatch(
                          setSongPlaying({ ...songDetail, playing: true })
                        );
                      }}
                    />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 60px" }} className="song-review">
        <SongReview songId={id} />
      </div>
    </div>
  );
}
