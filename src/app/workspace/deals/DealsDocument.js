import React from "react";
import moment from "moment";
import { connect } from "react-redux";
// Icons
import iconWord from "../../../assets/img/svg/icon-word.svg";
import iconPDF from "../../../assets/img/svg/icon-pdf.svg";
import iconExcel from "../../../assets/img/svg/icon-excel.svg";
import iconPP from "../../../assets/img/svg/icon-power-point.svg";
// Components
// import DropdownMenu from "./DropdownMenu";
// Materal UI
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";

import "./css/deals-documents.scss";

class DealsDocument extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { doc, currUser } = this.props;
    return (
      <li className="deals-documents-item">
        {currUser === doc.owner.user ? (
          <ArrowUpIcon
            fontSize="small"
            style={{ color: "#12be89", marginRight: "0.5em" }}
          />
        ) : (
          <ArrowDownIcon
            fontSize="small"
            style={{ color: "#3d7efd", marginRight: "0.5em" }}
          />
        )}

        {doc.mimetype.split("/")[1] === "pdf" ? (
          <img src={iconPDF} alt="file" />
        ) : doc.mimetype.split(".")[1] === "docx" ? (
          <img src={iconWord} alt="file" />
        ) : doc.mimetype.split(".")[1] === "xlsx" ? (
          <img src={iconExcel} alt="file" />
        ) : doc.mimetype.split(".")[1] === "pptx" ? (
          <img src={iconPP} alt="file" />
        ) : null}
        <div className="deals-documents-item-about">
          <a
            className="deals-documents-item_name"
            href={`${location.protocol}//${
              location.hostname == "localhost"
                ? "dev.opnplatform.com"
                : location.hostname
            }/api/v1/file/${doc._id}`}
            target="_blank"
          >
            {doc.name ? doc.name.split(".")[0] : null}
          </a>
          <p className="deals-documents-item_date">
            Uploaded {moment(doc.updated_at).format("lll")}
          </p>
        </div>
        {/* <div style={{ marginLeft: "auto" }}>
          <DropdownMenu />
        </div> */}
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
  };
};

export default connect(
  mapStateToProps,
  null
)(DealsDocument);
