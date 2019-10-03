import React from "react";
import { Link } from "react-router-dom";

import footerMenu from "../../../consts/footerMenu";

const FooterMenu = () => {
  return (
    <div className="footer-menu">
      {footerMenu.map((value, i) => {
        if (!!value.others.href) {
          return (
            <a
              className="footer-menu_item"
              href={value.others.href}
              target={value.others.target}
              title={value.others.title}
              key={i}
            >
              {value.page}
            </a>
          );
        } else {
          return (
            <Link
              key={value.key}
              to={!!value.linkTo && value.linkTo}
              className="footer-menu_item"
              {...value.others}
            >
              {value.page}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default FooterMenu;
