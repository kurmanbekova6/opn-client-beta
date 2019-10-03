import React from "react";
import moment from "moment";
// Icons
import iconExcel from "../../../../assets/img/svg/icon-excel.svg";
import iconWord from "../../../../assets/img/svg/icon-word.svg";
import iconPP from "../../../../assets/img/svg/icon-power-point.svg";
import iconPDF from "../../../../assets/img/svg/icon-pdf.svg";
// Components
import DropdownMenu from "./DropdownMenu";

import "./css/documents.scss";

const DocumentItem = props => {
  return (
    <li className="documents-list-item" style={props.style}>
      {props.doc.name.split(".")[1] === "pdf" ? (
        <img src={iconPDF} alt="file" />
      ) : props.doc.name.split(".")[1] === "docx" ? (
        <img src={iconWord} alt="file" />
      ) : props.doc.name.split(".")[1] === "xlsx" ? (
        <img src={iconExcel} alt="file" />
      ) : props.doc.name.split(".")[1] === "pptx" ? (
        <img src={iconPP} alt="file" />
      ) : null}
      <div className="documents-list-item-about">
        <a
          className="documents-list-item_name"
          href={`${location.protocol}//${
            location.hostname == "localhost"
              ? "dev.opnplatform.com"
              : location.hostname
          }/api/v1/file/${props.doc._id}`}
          target="_blank"
        >
          {props.doc.name ? props.doc.name.split(".")[0] : " - "}
        </a>
        <p className="documents-list-item_date">
          Uploaded {moment(props.doc.updated_at).format("lll")}
        </p>
      </div>
      {/* <div style={{ marginLeft: "auto" }}>
        <DropdownMenu doc={props.doc} removeDocument={props.removeDocument} />
      </div> */}
    </li>
  );
};

export default DocumentItem;
