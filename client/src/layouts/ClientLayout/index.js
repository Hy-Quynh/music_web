import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongPlaying, songData } from "../../slices/songSlice";
import "./style.scss";

export default function ClientLayout(props) {
  const { song } = useSelector(songData);
  const audioRef = useRef(null);
  const dispatch = useDispatch();

  const pauseAndPlaySong = () => {
    if (song.playing) {
      audioRef?.current?.play();
    } else {
      audioRef?.current?.pause();
    }
  };

  useEffect(() => {
    if (audioRef) {
      pauseAndPlaySong();
    }
  }, [song.playing]);

  useEffect(() => {
    if (audioRef) {
      audioRef?.current?.load();
      pauseAndPlaySong();
    }
  }, [song._id]);

  return (
    <>
      <header className="header-area">
        {/* Navbar Area */}
        <div className="oneMusic-main-menu">
          <div className="classy-nav-container breakpoint-off">
            <div className="container">
              {/* Menu */}
              <nav
                className="classy-navbar justify-content-between"
                id="oneMusicNav"
              >
                {/* Nav brand */}
                <a href="/" className="nav-brand">
                  <img src="img/core-img/logo.png" alt="" />
                </a>
                {/* Navbar Toggler */}
                <div className="classy-navbar-toggler">
                  <span className="navbarToggler">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                {/* Menu */}
                <div className="classy-menu">
                  {/* Close Button */}
                  <div className="classycloseIcon">
                    <div className="cross-wrap">
                      <span className="top" />
                      <span className="bottom" />
                    </div>
                  </div>
                  {/* Nav Start */}
                  <div className="classynav">
                    <ul>
                      <li>
                        <a href="/">Trang chủ</a>
                      </li>
                      <li>
                        <a href="/album">Albums</a>
                      </li>
                      <li>
                        <a href="/category">Thể loại</a>
                      </li>
                      <li>
                        <a href="/new-song">Nhạc mới</a>
                      </li>
                      <li>
                        <a href="event.html">Sự kiện</a>
                      </li>
                      <li>
                        <a href="blog.html">Bài viết</a>
                      </li>
                      <li>
                        <a href="contact.html">Liên hệ</a>
                      </li>
                    </ul>

                    <div className="login-register-cart-button d-flex align-items-center">
                      <div className="login-register-btn mr-50">
                        <a href="/login" id="loginBtn">
                          Login / Register
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Nav End */}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div style={{ marginBottom: "100px" }}>{props.children}</div>
      {song?._id ? (
        <div className="fixed-playing-song">
          <div
            className="single-new-item d-flex align-items-center justify-content-between"
            data-wow-delay="100ms"
          >
            <div
              className="first-part d-flex align-items-center"
              style={{ gap: "20px" }}
            >
              <div
                className="thumbnail"
                style={{
                  minWidth: "73px",
                  minHeight: "73px",
                  border: "0.5px solid gray",
                }}
              >
                <img
                  src={song?.avatar}
                  alt=""
                  style={{ width: "73px", height: "73px" }}
                />
              </div>
              <div className="content-">
                <h6 style={{ color: "white" }}>{song?.name}</h6>
                <p style={{ color: "white" }}>
                  {song?.singer?.length
                    ? song?.singer?.map((it) => it?.name).join(", ")
                    : ""}
                </p>
              </div>
            </div>
            <audio
              preload="auto"
              controls
              ref={audioRef}
              onPlay={(event) => {
                dispatch(setSongPlaying({ ...song, playing: true }));
              }}
              onPause={(event) => {
                dispatch(setSongPlaying({ ...song, playing: false }));
              }}
            >
              <source src={song?.link} />
            </audio>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
