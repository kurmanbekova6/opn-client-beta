import React, { Fragment } from "react";
import { connect } from "react-redux";

// Material UI
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "./Modal.scss";
import { Field, formValueSelector, reduxForm } from "redux-form";
import validateFunc from "./formFieldsValidation";
import { MaterialOutlinedInput } from "../../ui_components/materialBased/materialBasedInputs";
import { MaterialPrimaryButton } from "../../ui_components/materialBased/materialBasedButtons";
import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { MaterialOutlinedSelect } from "../../ui_components/materialBased/materialBasedSelectInputs";
import countries from "../../../consts/countries";
import ResponseMessage from "../../ui_components/responseMessage/ResponseMessage";

const AccountSettingsModal = ({
  openModal,
  setOpenModal,
  textField,
  handleSubmit,
  pristine,
  reset,
  submitting,
  onFormSubmit,
  valid,
  errors,
  countryValue,
}) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        reset();
      }}
    >
      <div className="make-order_step-one">
        <div className="make-order_step-one_head">
          <div className="make-order_step-one_head-name">
            Change {textField.label}
          </div>
          <div>
            <IconButton
              size="small"
              className="make-order_step-one_head-step-close"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="make-order_step-one_body">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            // style={{ marginBottom: 9 }}
          >
            {textField.name === "country" ? (
              <Field
                name="country"
                label="Country"
                component={MaterialOutlinedSelect}
                type="text"
                menuItems={countries}
              />
            ) : textField.name === "password" ? (
              <Fragment>PA</Fragment>
            ) : textField.name === "companyDescription" ? (
              <Field
                name={textField.name}
                label={textField.label}
                component={MaterialOutlinedInput}
                type="text"
                multiline
                rows="4"
                maxSymbols={80}
              />
            ) : (
              <Field
                name={textField.name}
                label={textField.label}
                component={MaterialOutlinedInput}
                type="text"
              />
            )}
            {countryValue === "US" || countryValue === "CA" ? (
              <Field
                name="jurisdiction"
                label="Jurisdiction Of Incorporation"
                component={MaterialOutlinedInput}
                type="text"
              />
            ) : null}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "baseline",
              }}
            >
              <Button
                component="span"
                className={classes.button}
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                CANCEL
              </Button>

              <MaterialPrimaryButton
                label="CONFIRM"
                type="submit"
                style={{ width: 118 }}
                disabled={pristine || submitting || !valid}
              />
            </div>
          </form>
          {errors
            ? errors.map((item, index) => {
                return (
                  <Fragment>
                    <br />
                    <ResponseMessage key={index} message={item} />
                  </Fragment>
                );
              })
            : null}
        </div>
      </div>
    </Modal>
  );
};
const countrySelector = formValueSelector("changeAccountSettingsForm");
const mapStateToProps = state => ({
  countryValue: countrySelector(state, "country"),
});
export default connect(mapStateToProps)(
  reduxForm({
    form: "changeAccountSettingsForm",
    validate: validateFunc,
    enableReinitialize: true,
  })(AccountSettingsModal)
);

const useStyles = makeStyles(theme => ({
  button: {
    width: 106,
    height: 48,
    marginRight: 8,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
}));
