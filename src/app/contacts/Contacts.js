import React from "react";
import { Col, Row } from "reactstrap";

import RenderBreadcrumbs from "../ui_components/utils/Breadcrumbs";
import ContactMap from "./ContactMap";
import apiServices from "../../consts/apiServices";
import FeedbackForm from "./form/FeedbackForm";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import "./contacts.scss";

function Contacts() {
  return (
    <div className="contacts">
      <Typography
        variant="h2"
        component="h2"
        style={{ alignSelf: "start", marginBottom: "32px", marginTop: "86px" }}
      >
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <Typography
            variant="h5"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Our location
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "41px" }}
          >
            Baarerstrasse 82, Zug, 6302 Switzerland
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Email for
          </Typography>
          <Typography
            variant="subtitle1"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            General:
            <a href="mailto:info@opnplatform.com"> info@opnplatform.com</a>
          </Typography>
          <Typography
            variant="subtitle1"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Investors:
            <a href="mailto:CEO@opnplatform.com"> CEO@opnplatform.com</a>
          </Typography>
          <Typography
            variant="subtitle1"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Partners:
            <a href="mailto:marketing@opnplatform.com">
              {" "}
              marketing@opnplatform.com
            </a>
          </Typography>
          <Typography
            variant="subtitle1"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Media center:{" "}
            <a href="mailto:pr@opnplatform.com">pr@opnplatform.com</a>
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography
            variant="h5"
            component="h2"
            style={{ alignSelf: "start", marginBottom: "9px" }}
          >
            Ask Us
          </Typography>
          <FeedbackForm />
        </Grid>
      </Grid>
      <div className="contacts-map">
        <div className="print">
          <ContactMap {...apiServices.GOOGLE_MAPS_SETTINGS} />
          <img
            className="d-none"
            src="https://maps.googleapis.com/maps/api/staticmap?center=47.177463,+8.518213&zoom=16&scale=2&size=600x300&maptype=roadmap&key=AIzaSyCsBa0Nb3AZz_8fcX4ShBDusN74GmlGt-c&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C47.177463,+8.518213"
          />
        </div>
      </div>
    </div>
  );
}

export default Contacts;
