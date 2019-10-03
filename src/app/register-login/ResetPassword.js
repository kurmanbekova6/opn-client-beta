import React from "react";
import ResetForm from "./forms/ResetForm";
import { Typography } from "@material-ui/core";
import "./ResetPassword.scss";
/* Custom ui */
import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ColumnHeader from "../ui_components/Titles/ColumnHeader";

const ResetPassword = () => {
  return (
    <div className="wrapper">
      <Typography
        variant="h5"
        component="h2"
        style={{ alignSelf: "start", marginBottom: "9px" }}
      >
        Restore password
      </Typography>
      <ResetForm />
    </div>
  );
};

export default ResetPassword;
