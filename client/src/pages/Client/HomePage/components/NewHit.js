import React, { useEffect, useState } from "react";
import { getAllSong } from "../../../../services/song";

const PAGE_LIMIT = 6;

export default function NewHit() {
  const [listHit, setListHit] = useState([]);

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
              <div className="thumbnail">
                <img
                  src={item?.avatar}
                  alt=""
                  style={{ width: "73px", height: "73px" }}
                />
              </div>
              <div className="content-">
                <h6>{item?.name}</h6>
                <p>{item?.singer?.length ? item?.singer?.map((it) => it?.name).join(", ") : ""}</p>
              </div>
            </div>
            <audio preload="auto" controls>
              <source src={item?.link} />
            </audio>
          </div>
        );
      })}
      {/* <div
        className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
        data-wow-delay="100ms"
      >
        <div className="first-part d-flex align-items-center">
          <div className="thumbnail">
            <img src="img/bg-img/wt7.jpg" alt="" />
          </div>
          <div className="content-">
            <h6>Sam Smith</h6>
            <p>Underground</p>
          </div>
        </div>
        <audio preload="auto" controls>
          <source src="audio/dummy-audio.mp3" />
        </audio>
      </div>
      <div
        className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
        data-wow-delay="150ms"
      >
        <div className="first-part d-flex align-items-center">
          <div className="thumbnail">
            <img src="img/bg-img/wt8.jpg" alt="" />
          </div>
          <div className="content-">
            <h6>Power Play</h6>
            <p>In my mind</p>
          </div>
        </div>
        <audio preload="auto" controls>
          <source src="audio/dummy-audio.mp3" />
        </audio>
      </div>
      <div
        className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
        data-wow-delay="200ms"
      >
        <div className="first-part d-flex align-items-center">
          <div className="thumbnail">
            <img src="img/bg-img/wt9.jpg" alt="" />
          </div>
          <div className="content-">
            <h6>Cristinne Smith</h6>
            <p>My Music</p>
          </div>
        </div>
        <audio preload="auto" controls>
          <source src="audio/dummy-audio.mp3" />
        </audio>
      </div>
      <div
        className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
        data-wow-delay="250ms"
      >
        <div className="first-part d-flex align-items-center">
          <div className="thumbnail">
            <img src="img/bg-img/wt10.jpg" alt="" />
          </div>
          <div className="content-">
            <h6>The Music Band</h6>
            <p>Underground</p>
          </div>
        </div>
        <audio preload="auto" controls>
          <source src="audio/dummy-audio.mp3" />
        </audio>
      </div>
      <div
        className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
        data-wow-delay="300ms"
      >
        <div className="first-part d-flex align-items-center">
          <div className="thumbnail">
            <img src="img/bg-img/wt11.jpg" alt="" />
          </div>
          <div className="content-">
            <h6>Creative Lyrics</h6>
            <p>Songs and stuff</p>
          </div>
        </div>
        <audio preload="auto" controls>
          <source src="audio/dummy-audio.mp3" />
        </audio>
      </div>
      <div
        className="single-new-item d-flex align-items-center justify-content-between wow fadeInUp"
        data-wow-delay="350ms"
      >
        <div className="first-part d-flex align-items-center">
          <div className="thumbnail">
            <img src="img/bg-img/wt12.jpg" alt="" />
          </div>
          <div className="content-">
            <h6>The Culture</h6>
            <p>Pop Songs</p>
          </div>
        </div>
        <audio preload="auto" controls>
          <source src="audio/dummy-audio.mp3" />
        </audio>
      </div> */}
    </div>
  );
}
