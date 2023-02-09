import React from "react";
import AlbumList from "./components/AlbumList";
import MostSearchList from "./components/MostSearchList";
import NewHit from "./components/NewHit";
import PopularArtist from "./components/PopularArtist";

export default function HomePage() {
  return (
    <>
      <section className="hero-area">
        <div className="hero-slides owl-carousel" style={{ display: "block" }}>
          <div className="single-hero-slide d-flex align-items-center justify-content-center">
            <div
              className="slide-img bg-img"
              style={{ backgroundImage: "url(img/bg-img/bg-1.jpg)" }}
            />
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="hero-slides-content text-center">
                    <h6 data-animation="fadeInUp" data-delay="100ms">
                      Latest album
                    </h6>
                    <h2 data-animation="fadeInUp" data-delay="300ms">
                      Beyond Time <span>Beyond Time</span>
                    </h2>
                    <a
                      data-animation="fadeInUp"
                      data-delay="500ms"
                      href="#"
                      className="btn oneMusic-btn mt-50"
                    >
                      Discover <i className="fa fa-angle-double-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AlbumList />

      <section
        className="featured-artist-area section-padding-100 bg-img bg-overlay bg-fixed"
        style={{ backgroundImage: "url(img/bg-img/bg-4.jpg)" }}
      >
        <div className="container">
          <div className="row align-items-end">
            <div className="col-12 col-md-5 col-lg-4">
              <div className="featured-artist-thumb">
                <img src="img/bg-img/fa.jpg" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-7 col-lg-8">
              <div className="featured-artist-content">
                {/* Section Heading */}
                <div className="section-heading white text-left mb-30">
                  <p>See what’s new</p>
                  <h2>Buy What’s New</h2>
                </div>
                <p>
                  Nam tristique ex vel magna tincidunt, ut porta nisl finibus.
                  Vivamus eu dolor eu quam varius rutrum. Fusce nec justo id sem
                  aliquam fringilla nec non lacus. Suspendisse eget lobortis
                  nisi, ac cursus odio. Vivamus nibh velit, rutrum at ipsum ac,
                  dignissim iaculis ante. Donec in velit non elit pulvinar
                  pellentesque et non eros.
                </p>
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
      </section>

      <section className="miscellaneous-area section-padding-100-0">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <MostSearchList />
            </div>
          </div>
        </div>
      </section>

      <section className="miscellaneous-area ">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <NewHit />
            </div>
            <div className="col-12 col-lg-4">
              <PopularArtist />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
