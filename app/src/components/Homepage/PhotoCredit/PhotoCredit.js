import React from "react";
import "./PhotoCredit.less";
const PhotoCredit = () => {
  return (
    <div className="credit_photo">
      Photo by{" "}
      <a href="https://unsplash.com/@climatereality?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        The Climate Reality Project
      </a>{" "}
      on{" "}
      <a href="https://unsplash.com/s/photos/conference?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
        Unsplash
      </a>
    </div>
  );
};
export default PhotoCredit;
