import "../styles/index.css";
import React, { useEffect, useState } from "react";
import { getImages } from "../api/api";
import { IoIosSearch } from "react-icons/io";
import { FaDownload } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";

const Info = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("nature");
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log("value" + search);
  };

  const handleClick = () => {
    try {
      setLoading(true);
      getImages(search, 200).then((data) => {
        setData(data.data.hits);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      setLoading(true);
      getImages(search, 200).then((data) => {
        setData(data.data.hits);
        setLoading(false);
      });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          <IoIosImages style={{ height: "40px", width: "40px" }} />
          <h1 className="heading">Image Finder </h1>
        </div>
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
      {loading ? (
        <div className="loader"></div>
      ) : (
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
      )}
    </div>
  );
};

export default Info;
