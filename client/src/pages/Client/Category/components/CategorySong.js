import React, { useEffect, useState } from "react";
import { getCategorySong } from "../../../../services/category";
import PlayMusicIcon from "../../../../assets/image/play-music.svg";
import StopMusicIcon from "../../../../assets/image/stop-music.svg";

export default function CategorySong() {
  const [categorySong, setCategorySong] = useState([]);
  const [songPlayId, setSongPlayId] = useState(-1);

  const getSong = async () => {
    try {
      const result = await getCategorySong();
      if (result?.data?.success) {
        setCategorySong(result?.data?.payload);
      }
    } catch (error) {
      console.log("category song error >>> ", error);
    }
  };

  useEffect(() => {
    getSong();
  }, []);

  return (
    <div className="category-song">
      {categorySong
        ?.filter((i) => i?.song?.length)
        ?.map((item, index) => {
          return (
            <div key={`category-song-${index}`}>
              <div
                className="category-title"
                style={{ marginTop: index > 1 ? "20px" : 0 }}
              >
                {item?.name}
              </div>
              <div className="category-song-list">
                {item?.song?.map((it, id) => {
                  return (
                    <div class="card hover" key={`category-song-${id}`}>
                      <div
                        class="card-img"
                        style={{ backgroundImage: `url(${it?.avatar})` }}
                      >
                        <div class="overlay">
                          <div class="overlay-content">
                            <a
                              class="hover"
                              href="#!"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                if (it?._id === songPlayId) {
                                  return setSongPlayId(-1);
                                }
                                setSongPlayId(it?._id);
                              }}
                            >
                              {it?._id === songPlayId ? (
                                <img
                                  src={StopMusicIcon}
                                  alt="play-icon"
                                  style={{
                                    width: "35px",
                                    height: "35px",
                                    marginTop: "-5px",
                                  }}
                                />
                              ) : (
                                <img
                                  src={PlayMusicIcon}
                                  alt="play-icon"
                                  style={{
                                    width: "35px",
                                    height: "35px",
                                    marginTop: "-5px",
                                  }}
                                />
                              )}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div class="card-content">
                        <a href="#!">
                          <p style={{ margin: 0, padding: 0 }}>
                            {it?.singer?.length
                              ? it?.singer?.map((i) => i.name)?.join(", ")
                              : ""}
                          </p>
                          <p style={{ fontWeight: 700, fontSize: "16px" }}>
                            {it?.name}
                          </p>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
