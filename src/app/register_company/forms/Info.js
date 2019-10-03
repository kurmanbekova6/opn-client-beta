import React, { Fragment } from "react";
import Spinner from "../../common/spinner/Spinner";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router";
import "../RegisterCompany.scss";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
import ResponseMessage from "../../ui_components/responseMessage/ResponseMessage";

const Info = ({ message = "", errors = [], isLoading, setStep, history }) => {
  if (errors.length === 0 && !isLoading) {
    setTimeout(() => {
      history.push("/categories");
    }, 4000);
  }
  return (
    <div
      className="login-form-wrapper"
      style={{ marginTop: "120px", marginBottom: "120px" }}
    >
      {isLoading === true ? (
        <Spinner />
      ) : (
        <div>
          {message !== "" ? (
            <ResponseMessage message={message} type="message" />
          ) : (
            <Fragment />
          )}
          {errors.length !== 0 ? (
            errors.map((item, index) => (
              <ResponseMessage key={index} message={item} />
            ))
          ) : (
            <Fragment />
          )}
          <br />
        </div>
      )}
      {errors.length !== 0 ? (
        <MaterialPrimaryButton
          label="BACK"
          type="button"
          onClick={() => setStep("CompanyInfo")}
        />
      ) : (
        <Fragment />
      )}
    </div>
  );
};

export default withRouter(Info);
