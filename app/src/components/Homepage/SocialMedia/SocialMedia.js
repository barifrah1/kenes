import React from "react";
import FacebookLogo from "../../../images/facebook2x.png";
import InstagramLogo from "../../../images/instagram2x.png";
import "./SocialMedia.less";
import { facebookLink, instgramLink } from "../../../Constants";
const SocialMedia = () => {
  return (
    <div className="social_media">
      <a href={facebookLink}>
        <img src={FacebookLogo} alt="facebook" target="_blank" />
      </a>
      <a href={instgramLink}>
        <img src={InstagramLogo} alt="instgram" target="_blank" />
      </a>
    </div>
  );
};
export default SocialMedia;
