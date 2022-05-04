import React, { useEffect, useState } from "react";

const useWindow = () => {
  const isSSR = typeof window !== "undefined";
  const [height, setHeight] = useState(isSSR ? 800 : window.innerHeight);
  const [width, setWidth] = useState(isSSR ? 1200 : window.innerWidth);
  // var widerScreenWidth = window.matchMedia("(min-width: 768px)");
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
    };
  }, []);

  return { height: height, width: width };
};

export default useWindow;
