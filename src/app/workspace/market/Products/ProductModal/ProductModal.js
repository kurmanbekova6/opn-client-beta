import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import validateFunc from "./formValidation";
import axios from "axios";
// Material Ui
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// Custom UI
import {
  MaterialPrimaryButton,
  MaterialNotErrorContainedButton,
} from "../../../../ui_components/materialBased/materialBasedButtons";
// Components
import ModalForm from "./ModalForm";
import ModalUploads from "./ModalUploads";
import "../css/productsModal.scss";
// Errors
import { errorMessageParser } from "../../../../utils/errorMessageParser";
import ResponseMessage from "../../../../ui_components/responseMessage/ResponseMessage";

class ProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: [],
      images: [],
      showMessage: "",
      showError: [],
      disabled: false,
    };
  }

  setDocuments = documents => {
    this.setState({
      documents,
    });
  };

  setImages = images => {
    this.setState({
      images,
    });
  };

  clear = () => {
    if (this.state.showMessage !== []) {
      this.setState({
        showMessage: [],
      });
    }
    if (this.state.showError !== []) {
      this.setState({
        showError: [],
      });
    }
  };

  toggleCheckbox = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  };

  onFormSubmit = values => {
    const {
      productName,
      price,
      parameters,
      category,
      deliveryTerms,
      deliveryVariants,
      location,
      unit,
    } = values;
    if (values !== undefined) {
      axios
        .post("/orders", {
          title: productName,
          price: Number(price),
          photos: this.state.images || [],
          documents: this.state.documents,
          purpose: this.props.purpose,
          description: parameters,
          //requirements: this.props.form.values.requirements,
          //announce: announce,
          product: category,
          id: category,
          delivery: {
            term: Number(deliveryTerms),
            variant: deliveryVariants,
          },
          country: location,
          currency: "EUR",
          access_token: this.props.token,
          clientId: this.props.clientId,
          amount: {
            number: 1,
            unit: unit,
          },
        })
        .then(res => {
          if (res.status === 200) {
            this.setState(
              {
                showMessage:
                  this.props.buttonText === "REQUEST"
                    ? "Success. You have sent a request. Once the seller approves it, we will notify you."
                    : "The product is successfully created!",
              },
              () => {
                this.getMyProducts();
              }
            );
            setTimeout(this.props.toggleModal, 2000);
          }
        })
        .catch(error => {
          this.setState({
            showError: errorMessageParser(error),
          });
        });
    }
  };

  getMyProducts = () => {
    axios
      .post(`/orders/get/1/my`, {
        access_token: this.props.token,
        clientId: this.props.clientId,
        count: 250,
        offset: 0,
      })
      .then(res => {
        const data = res.data.result;
        let userProducts = [];

        data.map(item => {
          if (item.type === "PRODUCT") {
            userProducts.push(item);
          }
        });

        if (window.location.host === "opnplatform.com") {
          /* intercom event */
          window.Intercom("update", {
            app_id: "ulueqf5y",
            name: this.props.loggedIn.data.result.name, // Full name
            email: this.props.loggedIn.data.result.mail.id, // Email address
            "Placed products": userProducts.length,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {
      open,
      categories,
      token,
      clientId,
      handleSubmit,
      buttonText,
    } = this.props;
    const { showMessage, showError, disabled } = this.state;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.props.toggleModal}
        >
          <Grid container>
            <div className="product-modal">
              <div className="product-modal_header">Product parameters</div>
              <div className="product-modal_content">
                <Grid item xs={12} md={6} className="product-modal_left">
                  <ModalForm categories={categories} />
                  <React.Fragment>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={disabled}
                          onChange={this.toggleCheckbox}
                          value="dosabled"
                        />
                      }
                      label="Ready for shipment"
                    />
                    <div className="product-modal_left-under-check">
                      Your product should be labeled as “production time must be
                      discussed.”
                    </div>
                  </React.Fragment>
                </Grid>
                <Grid item xs={12} md={6} className="product-modal_right">
                  <ModalUploads
                    setImages={this.setImages}
                    setDocuments={this.setDocuments}
                    token={token}
                    clientId={clientId}
                  />
                </Grid>
                {showMessage.length !== 0 ? (
                  <ResponseMessage
                    textAlign="center"
                    message={showMessage}
                    type="message"
                  />
                ) : null}
                {showError.length !== 0
                  ? showError.map((error, i) => (
                      <ResponseMessage
                        key={i}
                        textAlign="center"
                        message={error}
                        type="error"
                      />
                    ))
                  : null}
                <div className="product-modal_buttons-holder">
                  <MaterialNotErrorContainedButton
                    onClick={this.props.toggleModal}
                    label="CANCEL"
                    type="button"
                    style={{
                      outline: "none",
                      float: "right",
                      maxWidth: 106,
                      width: "100%",
                      height: 48,
                      fontSize: 14,
                      boxShadow: "none",
                      borderRadius: 12,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  />
                  {!disabled ? (
                    <MaterialPrimaryButton
                      label={
                        buttonText === "REQUEST"
                          ? "Place a request"
                          : "CREATE THE PRODUCT"
                      }
                      type="button"
                      style={{
                        outline: "none",
                        float: "right",
                        maxWidth: 224,
                        height: 48,
                        fontSize: 14,
                        boxShadow: "none",
                        borderRadius: 12,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        margin: "0 0 0 10px !important",
                      }}
                      className="product-modal_submit"
                      onClick={handleSubmit(this.onFormSubmit)}
                      disabled
                    />
                  ) : (
                    <MaterialPrimaryButton
                      label={
                        buttonText === "REQUEST"
                          ? "Place a request"
                          : "CREATE THE PRODUCT"
                      }
                      type="button"
                      style={{
                        outline: "none",
                        float: "right",
                        maxWidth: 224,
                        height: 48,
                        fontSize: 14,
                        boxShadow: "none",
                        borderRadius: 12,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        margin: "0 0 0 10px !important",
                      }}
                      className="product-modal_submit"
                      onClick={handleSubmit(this.onFormSubmit)}
                    />
                  )}
                </div>
              </div>
            </div>
          </Grid>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: "productModalForm",
    validate: validateFunc,
  })(ProductModal)
);
