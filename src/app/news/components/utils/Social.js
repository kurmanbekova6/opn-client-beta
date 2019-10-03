/* import React, { Component } from 'react';
import { Facebook, Twitter } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';
export default class Social extends Component {
  state = {
    url: "",
    shareText: 'Check this site!'
  }

  componentDidMount() {
    this.setState({
      url: window.location.href
    })
  }

  
  render() {
    const { url, shareText } = this.state;
    return (
      <div className='social-share'>
        <Facebook url={url} />
        <Twitter url={url} shareText={shareText} />
      </div>
    )
  }
}
 */

import React, { Component } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookShareCount } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
export default class Social extends Component {
  state = {
    url: "",
    shareText: "Check this site!",
  };

  componentDidMount = () => {
    this.setState({
      url: window.location.href,
    });
  };
  render() {
    const { url, shareText } = this.state;
    return (
      <div className="social-share">
        <div className="social-share__item">
          <TwitterShareButton
            url={url}
            title={shareText}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="social-share__item">
          <FacebookShareButton
            url={url}
            quote={shareText}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <div className="share-count">
            <FacebookShareCount
              url={url}
              className="Demo__some-network__share-count"
            >
              {count => count}
            </FacebookShareCount>
          </div>
        </div>
      </div>
    );
  }
}
