import React, { Component, useEffect, useContext, useState } from "react";

const useWindow = () => {
  const [height, setHeight] = useState(window.screen.height);
  const [width, setWidth] = useState(window.screen.width);
  var widerScreenWidth = window.matchMedia("(min-width: 768px)");
  useEffect(() => {
    setHeight(window.screen.height);
    setWidth(window.screen.width);
  }, []);
  
  useEffect(() => {
    setHeight(window.screen.height);
    setWidth(window.screen.width);
  }, [widerScreenWidth]);
  


  return { height: height, width: width };
};

export default useWindow;
