import "../styles/index.css";
import React, { useEffect, useState } from "react";
import { getImages } from "../api/api";
import { IoIosSearch } from "react-icons/io";
const Info = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("nature");

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log("value" + search);
  };

  const handleClick = () => {
    getImages(search, 100).then((data) => {
      setData(data.data.hits);
    });
  };

  useEffect(() => {
    getImages(search, 30).then((data) => {
      setData(data.data.hits);
    });
  }, []);
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
              opacity: search === "" ? "0.7" : "1",
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
        {data?.length === 0 || data === "nature" ? (
          <h1>No Data Found</h1>
        ) : (
          data.map((item, idx) => {
            return (
              <React.Fragment key={idx}>
                <div className="sub-div ">
                  <div
                    style={{
                      height: "400px",
                      width: "100%",
                    }}
                  >
                    <img src={item.largeImageURL} alt="" className="image" />
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
