import React, { useEffect, useRef, useState } from "react";
import './style.css'

function ScrollIndecator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLodaing] = useState(false);
  const [error, setError] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const effctRan = useRef(false);

  async function fetchData(getUrl) {
    try {
      const response = await fetch(getUrl);
      const data = await response.json();
      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLodaing(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  useEffect(() => {
    if (effctRan.current === false) {
      fetchData(url);
    }

    return () => {
      effctRan.current = true;
    };
  }, [url]);

  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const scrolled =
      document.body.scrollTop || document.documentElement.scrollTop;

    const hight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((scrolled / hight) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

    console.log(data, scrollPercentage);

    if (loading) {
        return (
            <div>Loading.... please wait!</div>
        )
    }
    if (error) {
        return (
            <div>oppps error, {error.message}</div>
        )
    }
  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indecator</h1>
        <div className="bar-progress-container">
                  <div className="currunt-prograss-bar"
                style={{width:`${scrollPercentage}%`}}></div>
        </div>
      </div>
      <div className="data-container">
        {data && data.length > 0
                  ? data.map((dataItem) =>
                     <p key={dataItem.id}>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
}

export default ScrollIndecator;
