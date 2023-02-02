import React, { useEffect, useState } from "react";
import { getAllAlbum } from "../../../services/album";
import AlbumList from "./components/AlbumList";
import FilterList from "./components/FilterList";

const PAGE_LIMIT = 24;

export default function AlbumPage() {
  const [filterKey, setFilterKey] = useState("al");
  const [albumList, setAlbumList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const getAlbumList = async () => {
    try {
      const result = await getAllAlbum(PAGE_LIMIT, page, filterKey);
      if (result?.data?.success) {
        setAlbumList(result?.data?.payload?.album);
        setTotalPage(Math.ceil(result?.data?.payload?.totalItem / PAGE_LIMIT));
      }
    } catch (error) {
      console.log("get album error >>> ", error);
    }
  };

  useEffect(() => {
    getAlbumList();
  }, [filterKey, page]);

  useEffect(() => {
    setPage(0)
  }, [filterKey])

  return (
    <div>
      <section
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: "url(img/bg-img/breadcumb3.jpg)" }}
      >
        <div className="bradcumbContent">
          <h2>Danh sách Album</h2>
        </div>
      </section>

      <section className="album-catagory section-padding-100-0">
        <div className="container">
          <div className="row">
            <FilterList
              setFilterKey={(key) => setFilterKey(key)}
              filterKey={filterKey}
            />
          </div>
          <div style={{ marginBottom: "100px" }}>
            <AlbumList
              albumList={albumList}
              page={page}
              totalPage={totalPage}
              setPage={setPage}
            />
          </div>
        </div>
      </section>

      <div className="add-area mb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="adds">
                <a href="#">
                  <img src="img/bg-img/add3.gif" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="one-music-songs-area mb-70">
        <div className="container">
          <div className="row">
            {/* Single Song Area */}
            <div className="col-12">
              <div className="single-song-area mb-30 d-flex flex-wrap align-items-end">
                <div className="song-thumbnail">
                  <img src="img/bg-img/s1.jpg" alt="" />
                </div>
                <div className="song-play-area">
                  <div className="song-name">
                    <p>01. Main Hit Song</p>
                  </div>
                  <audio preload="auto" controls>
                    <source src="audio/dummy-audio.mp3" />
                  </audio>
                </div>
              </div>
            </div>
            {/* Single Song Area */}
            <div className="col-12">
              <div className="single-song-area mb-30 d-flex flex-wrap align-items-end">
                <div className="song-thumbnail">
                  <img src="img/bg-img/s2.jpg" alt="" />
                </div>
                <div className="song-play-area">
                  <div className="song-name">
                    <p>01. Main Hit Song</p>
                  </div>
                  <audio preload="auto" controls>
                    <source src="audio/dummy-audio.mp3" />
                  </audio>
                </div>
              </div>
            </div>
            {/* Single Song Area */}
            <div className="col-12">
              <div className="single-song-area mb-30 d-flex flex-wrap align-items-end">
                <div className="song-thumbnail">
                  <img src="img/bg-img/s3.jpg" alt="" />
                </div>
                <div className="song-play-area">
                  <div className="song-name">
                    <p>01. Main Hit Song</p>
                  </div>
                  <audio preload="auto" controls>
                    <source src="audio/dummy-audio.mp3" />
                  </audio>
                </div>
              </div>
            </div>
            {/* Single Song Area */}
            <div className="col-12">
              <div className="single-song-area mb-30 d-flex flex-wrap align-items-end">
                <div className="song-thumbnail">
                  <img src="img/bg-img/s4.jpg" alt="" />
                </div>
                <div className="song-play-area">
                  <div className="song-name">
                    <p>01. Main Hit Song</p>
                  </div>
                  <audio preload="auto" controls>
                    <source src="audio/dummy-audio.mp3" />
                  </audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="contact-area section-padding-100 bg-img bg-overlay bg-fixed has-bg-img"
        style={{ backgroundImage: "url(img/bg-img/bg-2.jpg)" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading white">
                <p>See what’s new</p>
                <h2>Get In Touch</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Contact Form Area */}
              <div className="contact-form-area">
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-6 col-lg-4">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="E-mail"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          className="form-control"
                          id="message"
                          cols={30}
                          rows={10}
                          placeholder="Message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button className="btn oneMusic-btn mt-30" type="submit">
                        Send <i className="fa fa-angle-double-right" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
