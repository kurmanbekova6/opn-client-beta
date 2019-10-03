import React from "react";
import Icon from "react-icons-kit";
import { androidArrowDropup } from "react-icons-kit/ionicons/androidArrowDropup";
import { androidArrowDropdown } from "react-icons-kit/ionicons/androidArrowDropdown";
import { socialRssOutline } from "react-icons-kit/ionicons/socialRssOutline";
import { androidSearch } from "react-icons-kit/ionicons/androidSearch";
import { iosPrinterOutline } from "react-icons-kit/ionicons/iosPrinterOutline";
import { androidClose } from "react-icons-kit/ionicons/androidClose";

// social icons
import { socialTumblr } from "react-icons-kit/ionicons/socialTumblr";
import { socialGithub } from "react-icons-kit/ionicons/socialGithub";
import { socialYoutube } from "react-icons-kit/ionicons/socialYoutube";
import { socialGoogleOutline } from "react-icons-kit/ionicons/socialGoogleOutline";
import { socialLinkedin } from "react-icons-kit/ionicons/socialLinkedin";
import { medium } from "react-icons-kit/fa/medium";
import { socialFacebook } from "react-icons-kit/ionicons/socialFacebook";
import { socialTwitter } from "react-icons-kit/ionicons/socialTwitter";
import { androidPin } from "react-icons-kit/ionicons/androidPin";
// import {youtube} from 'react-icons-kit/fa/youtube'

//form elements icon
import { edit } from "react-icons-kit/ionicons/edit";
import { filePdf } from "react-icons-kit/icomoon/filePdf";

// buttons
import { logIn } from "react-icons-kit/ionicons/logIn";
import { logOut } from "react-icons-kit/ionicons/logOut";

// other
import { compose } from "react-icons-kit/ionicons/compose";
import { triangle } from "react-icons-kit/ionicons/";
import { colorsConst } from "./index";

// import {
//     logIn,
//     compose,
//     iosPrinterOutline,
//     androidSearch,
//     socialRssOutline,
// } from 'react-icons-kit/ionicons';

const SideIconContainer = ({ color, icon, ...props }) => (
  <Icon
    style={{ color: color ? color : colorsConst.ANAKIWA, ...props.style }}
    icon={icon}
    size={20}
  />
);
const SideIconContainer2 = ({ color, icon, ...props }) => (
  <Icon
    style={{ color: color ? color : colorsConst.ANAKIWA, ...props.style }}
    icon={icon}
    size={20}
  />
);
// const SideIconTinyUpArrowContainer = ({icon, value}) => (<Icon style={{color: (value ? colorsConst.KOBI : colorsConst.MERCURY}} icon={icon} size={9}/>);
// const SideIconTinyDownArrowContainer = ({icon, value}) => (<Icon style={{color: (value ? colorsConst.ANAKIWA : colorsConst.MERCURY}} icon={icon} size={9}/>);

export const RSSIcon = props => <SideIconContainer icon={socialRssOutline} />;
export const SearchIcon = props => (
  <SideIconContainer
    icon={androidSearch}
    style={{
      color: colorsConst.DUSTY_GRAY,
      zIndex: 2,
      position: "absolute",
      left: 0,
      right: 0,
    }}
  />
);
export const SearchIconScr = androidSearch;
export const LoginIcon = props => <SideIconContainer icon={logIn} />;
export const LogoutIcon = props => (
  <SideIconContainer color={colorsConst.DANUBE} icon={logOut} />
);
export const SignUpIcon = props => <SideIconContainer icon={compose} />;
export const PrintIcon = props => (
  <SideIconContainer icon={iosPrinterOutline} />
);

// arrows
export const UpArrow = ({ value }) => (
  <Icon
    style={{
      color: value ? colorsConst.KOBI : colorsConst.MERCURY,
      display: "flex",
      alignItems: "center",
    }}
    icon={androidArrowDropup}
    size={15}
  />
);
export const DownArrow = ({ value }) => (
  <Icon
    style={{
      color: value ? colorsConst.ANAKIWA : colorsConst.MERCURY,
      display: "flex",
      alignItems: "center",
    }}
    icon={androidArrowDropdown}
    size={15}
  />
);

// close
export const CloseCross = () => (
  <Icon
    style={{
      color: colorsConst.WHITE,
      display: "flex",
      alignItems: "center",
    }}
    icon={androidClose}
    size={15}
  />
);

// forms
export const EditIcon = ({ active }) => (
  <Icon
    style={{
      color: active ? colorsConst.ANAKIWA : colorsConst.MERCURY,
      display: "flex",
      alignItems: "center",
    }}
    icon={edit}
    size={15}
  />
);
export const PdfIcon = ({ active }) => (
  <Icon
    style={{
      color: active ? colorsConst.ANAKIWA : colorsConst.MERCURY,
      display: "flex",
      alignItems: "center",
    }}
    icon={filePdf}
    size={15}
  />
);

// social
export const TumblrIcon = props => <SideIconContainer2 icon={socialTumblr} />;
export const GithubIcon = props => <SideIconContainer2 icon={socialGithub} />;
export const YoutubeIcon = props => <SideIconContainer2 icon={socialYoutube} />;
export const GoogleIcon = props => (
  <SideIconContainer2 icon={socialGoogleOutline} />
);
export const LinkedinIcon = props => (
  <SideIconContainer2 icon={socialLinkedin} />
);
export const MediumIcon = props => <SideIconContainer2 icon={medium} />;
export const FacebookIcon = props => (
  <SideIconContainer2 icon={socialFacebook} />
);
export const TwitterIcon = props => <SideIconContainer2 icon={socialTwitter} />;
export const MapsMarkerIcon = props => (
  <Icon icon={androidPin} style={{ color: colorsConst.CINNABAR }} size={30} />
);
export const MapsMarkerIconColor = props => (
  <Icon
    icon={androidPin}
    style={{
      color: props.color,
      display: "block",
      marginTop: -props.size,
      marginLeft: -props.size / 2,
    }}
    size={props.size}
  />
);

export default {
  RSSIcon,
  SearchIcon,
  SearchIconScr,
  LoginIcon,
  LogoutIcon,
  SignUpIcon,
  PrintIcon,
  UpArrow,
  DownArrow,
  PdfIcon,
  EditIcon,

  // social
  FacebookIcon,
  TumblrIcon,
  LinkedinIcon,
  YoutubeIcon,
  GoogleIcon,
  GithubIcon,
  TwitterIcon,
  MapsMarkerIcon,
};
