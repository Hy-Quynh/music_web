import React from "react";

export default function AlbumList({ albumList, page, totalPage, setPage }) {
  return (
    <div className="row oneMusic-albums">
      {!albumList?.length ? (
        <div
          className="col-12"
          style={{
            textAlign: "center",
            marginBottom: "100px",
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Không có album phù hợp với từ khoá tìm kiếm
        </div>
      ) : (
        albumList?.map((item, index) => {
          return (
            <div
              className="col-12 col-sm-4 col-md-3 col-lg-2 single-album-item"
              key={`album-item-${index}`}
            >
              <div className="single-album">
                <img src={item?.avatar} alt="" style={{width: '150px', height: '150px'}} />
                <div className="album-info">
                  <a href="#">
                    <h5>{item?.name}</h5>
                  </a>
                  {/* <p>Second Song</p> */}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="load-more-btn text-center"
                onClick={() => {
                  if (page > 0) {
                    setPage(page - 1);
                  }
                }}
              >
                <a className="btn oneMusic-btn">
                  Previous
                </a>
              </div>
              <div className="load-more-btn text-center">
                <a
                  className="btn oneMusic-btn"
                  style={{ padding: 0, minWidth: "100px", width: "100px" }}
                >
                  {page + 1} / {totalPage}
                </a>
              </div>

              <div
                className="load-more-btn text-center"
                onClick={() => {
                  if (page + 1 < totalPage) {
                    setPage(page + 1);
                  }
                }}
              >
                <a className="btn oneMusic-btn">
                  Next
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
