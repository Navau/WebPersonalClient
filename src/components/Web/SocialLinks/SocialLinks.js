import React from "react";
import { Menu } from "antd";

import { ReactComponent as YoutubeIcon } from "../../../assets/img/svg/youtube.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/img/svg/facebook.svg";
import { ReactComponent as TwitterIcon } from "../../../assets/img/svg/twitter.svg";
import { ReactComponent as LinkedInIcon } from "../../../assets/img/svg/linkedin.svg";

import "./SocialLinks.scss";

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://youtu.be/BXGDMlWYdkM"
        className="youtube"
        target="_blank"
        rel="noreferrer"
      >
        <YoutubeIcon />
      </a>
      <a
        href="https://twitter.com/i/status/1492337497694740482"
        className="twitter"
        target="_blank"
        rel="noreferrer"
      >
        <TwitterIcon />
      </a>
      <a
        href="https://www.facebook.com/100078311740689/videos/3168794453364927/"
        className="facebook"
        target="_blank"
        rel="noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://www.linkedin.com/company/softwareone/jobs/"
        className="linkedin"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedInIcon />
      </a>
    </div>
  );
}
