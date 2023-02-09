import { Popover, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSongPlaying, songData } from "../../slices/songSlice";
import { USER_KEY } from "../../utils/constants";
import { parseJSON } from "../../utils/utils";
import SearchIcon from "@mui/icons-material/Search";
import "./style.scss";
import { InputAdornment } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { createKeyWordSearch } from "../../services/search";

export default function ClientLayout(props) {
  const { song } = useSelector(songData);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const userData = parseJSON(localStorage.getItem(USER_KEY));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
  const searchText = useRef("");

  const open = Boolean(anchorEl);
  const searchOpen = Boolean(searchAnchorEl);

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
                        <a href="contact.html">Liên hệ</a>
                      </li>
                      <li>
                        <SearchIcon
                          style={{ color: "white", cursor: "pointer" }}
                          onClick={(event) => {
                            setSearchAnchorEl(event.currentTarget);
                          }}
                        />
                        <Popover
                          id={"user-info-popover"}
                          open={searchOpen}
                          anchorEl={searchAnchorEl}
                          onClose={() => setSearchAnchorEl(null)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          style={{ marginTop: "10px", marginLeft: "-100px" }}
                        >
                          <div
                            style={{
                              minWidth: "300px",
                              minHeight: "80px",
                              padding: "20px 20px",
                            }}
                          >
                            <TextField
                              sx={{ width: "280px" }}
                              style={{ width: "280px" }}
                              onChange={(event) =>
                                (searchText.current = event.target.value)
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment>
                                    <IconButton
                                      onClick={async () => {
                                        await createKeyWordSearch(
                                          searchText.current
                                        );
                                        navigate(
                                          `/search?search=${searchText.current}`
                                        );
                                      }}
                                    >
                                      <SearchIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </div>
                        </Popover>
                      </li>
                    </ul>

                    <div className="login-register-cart-button d-flex align-items-center">
                      <div className="login-register-btn mr-50">
                        {userData?._id ? (
                          <>
                            <a
                              id="loginBtn"
                              onClick={(event) => {
                                setAnchorEl(event.currentTarget);
                              }}
                            >
                              {userData?.email}
                            </a>
                            <Popover
                              id={"user-info-popover"}
                              open={open}
                              anchorEl={anchorEl}
                              onClose={() => setAnchorEl(null)}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              style={{ marginTop: "10px" }}
                            >
                              <div
                                style={{
                                  minWidth: "150px",
                                  minHeight: "80px",
                                  padding: "10px 20px",
                                }}
                              >
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="user-link"
                                  onClick={() => {
                                    navigate("/personal-info");
                                  }}
                                >
                                  Trang cá nhân
                                </div>
                                <hr style={{ margin: "10px 0" }} />
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="user-link"
                                  onClick={() => {
                                    navigate("/");
                                    localStorage.clear();
                                  }}
                                >
                                  Đăng xuất
                                </div>
                              </div>
                            </Popover>
                          </>
                        ) : (
                          <a href="/login" id="loginBtn">
                            Đăng nhập / Đăng kí
                          </a>
                        )}
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
