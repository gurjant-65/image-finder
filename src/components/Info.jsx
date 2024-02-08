import "../styles/index.css";
import React, { useEffect, useState } from "react";
import { getImages } from "../api/api";
import { IoIosSearch } from "react-icons/io";
import { FaDownload } from "react-icons/fa";

const Info = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("nature");

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log("value" + search);
  };

  const handleClick = () => {
    getImages(search, 200).then((data) => {
      setData(data.data.hits);
    });
  };

  useEffect(() => {
    getImages(search, 100).then((data) => {
      setData(data.data.hits);
    });
  }, []);

  const handleDownload = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(blobURL);
      });
  };
  return (
    <div style={{}}>
      <div style={{ textAlign: "center" }}>
        <h1 className="heading">Image Finder </h1>

        <div className="input_div">
          <input
            type="search"
            placeholder="Search"
            className="input"
            onChange={handleChange}
          ></input>
          <button
            disabled={search === ""}
            className="btn"
            onClick={handleClick}
            style={{
              opacity: search === "" || search === "nature" ? "0.7" : "1",
            }}
          >
            <div>
              <IoIosSearch style={{ height: "20px", width: "20px" }} />
              Search
            </div>
          </button>
        </div>
      </div>
      <div className="map_div">
        {data?.length === 0 ? (
          <h1>No Data Found</h1>
        ) : (
          data.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                <div className="sub-div ">
                  <div
                    style={{
                      position: "relative",
                      height: "400px",
                      width: "100%",
                    }}
                  >
                    <img src={item.largeImageURL} alt="" className="image" />
                    <a
                      onClick={() =>
                        handleDownload(item.largeImageURL, `image_${idx}`)
                      }
                      className="download-btn"
                    >
                      <FaDownload size={20} />
                    </a>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Info;
