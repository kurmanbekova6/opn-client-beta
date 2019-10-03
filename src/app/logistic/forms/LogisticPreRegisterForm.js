import React, { Component } from "react";
import { reduxForm, InjectedFormProps, Field, reset } from "redux-form";
import validateFunc from "./registerValidation";
import asyncValidate from "./asyncValidate";

import axios from "axios";

import {
  renderInputStyled,
  renderSelectStyled,
} from "../../ui_components/utils/inputsStyled/inputsStyled";

import continents from "../../../consts/continents";

class LogisticPreRegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientId: "",
      continentsList: continents,
      countriesList: [],
      countriesListIsLoading: false,
      deliveryMethodsList: [
        { code: "sea", name: "Sea" },
        { code: "land", name: "Land" },
      ],
      errors: [],
      messages: [],
      err: "",
    };
  }

  componentDidMount() {
    // Request clientId:
    axios
      .get("/client/id")
      .then(res => {
        if (res.status === 200 || res.status === 304) {
          this.setState({ clientId: res.data.result.clientId }, () => {});
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Fetches list for specified? field
  updateList = (field, filter) => {
    this.setState({ countriesListIsLoading: true });
    axios
      .post(`/geo/countries`, {
        clientId: this.state.clientId,
        continent: filter,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            countriesList: res.data.result,
            countriesListIsLoading: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Clear messages and errors
  clear = () => {
    if (this.state.errors !== []) {
      this.setState({
        errors: [],
      });
    }
    if (this.state.messages !== []) {
      this.setState({
        messages: [],
      });
    }
    if (this.state.err !== "") {
      this.setState({
        err: "",
      });
    }
  };

  onFormSubmit = values => {
    this.clear();
    const {
      continent,
      country,
      zip,
      companyFullName,
      deliveryMethod,
      email,
      phone,
    } = values;

    return axios
      .post(`/partners/logistic`, {
        clientId: this.state.clientId,
        continent,
        country,
        code: zip,
        delivery: deliveryMethod,
        org_name: companyFullName,
        phone,
        email,
      })
      .then(res => {
        if (res.status === 200) {
          if (res.data && res.data.result) {
            this.setState({
              messages: [...this.state.messages, res.data.result],
            });
          } else {
            this.setState({
              messages: [...this.state.messages, "Registered successfully"],
            });
          }
          reset("preRegisterForm");
        }
      })
      .catch(error => {
        this.clear();
        if (error.response) {
          if (
            this.state.errors[this.state.errors.length - 1] !==
            error.response.data.error_message
          ) {
            if (typeof error.response.data.error_message !== "string") {
              error.response.data.error_message.map(err => {
                if (err.expected) {
                  this.setState({
                    errors: [...this.state.errors, err.expected],
                  });
                }
              });
            } else {
              this.setState({
                errors: [
                  ...this.state.errors,
                  error.response.data.error_message,
                ],
              });
            }
          } else {
            this.setState({
              errors: [...this.state.errors, error.response.data.error_message],
            });
          }
        } else {
          console.log(error);
        }
      });
  };

  render() {
    const { submitting, handleSubmit, change } = this.props;
    const { messages, errors } = this.state;
    return (
      <div className="login-register-wrapper" style={{ paddingTop: "2em" }}>
        <form
          onSubmit={handleSubmit(this.onFormSubmit)}
          onChange={e => {
            change("clientId", this.state.clientId);
            const element = e.target;
            switch (element.name) {
              case "continent":
                this.updateList("continent", element.value);
                break;
            }
          }}
          style={{ marginTop: 0, alignItems: "flex-start" }}
        >
          <Field
            name="companyFullName"
            placeholder="Full name of the organization"
            component={renderInputStyled}
            type="text"
          />
          <Field
            name="continent"
            placeholder="Continent"
            itemsList={this.state.continentsList}
            component={renderSelectStyled}
            updateList={this.updateList}
          />
          <Field
            name="country"
            placeholder={
              this.state.countriesList.length === 0
                ? "Chose continent first"
                : "Country"
            }
            itemsList={this.state.countriesList}
            component={renderSelectStyled}
            isLoading={this.state.countriesListIsLoading}
          />
          <Field
            name="zip"
            placeholder="ZIP Code"
            component={renderInputStyled}
            type="text"
          />
          <Field
            name="phone"
            placeholder="Phone"
            component={renderInputStyled}
            type="text"
          />
          <Field
            name="email"
            placeholder="Email"
            component={renderInputStyled}
            type="text"
          />
          <Field
            name="deliveryMethod"
            placeholder="Delivery Method"
            itemsList={this.state.deliveryMethodsList}
            component={renderSelectStyled}
          />
          <button className="form-button" type="submit" disabled={submitting}>
            BECOME A PARTNER
          </button>
        </form>

        {messages.length !== 0 ? (
          messages.map((it, i) => (
            <div className="register-sucess" key={i}>
              {it}
            </div>
          ))
        ) : (
          <React.Fragment />
        )}
        {errors.length !== 0 ? (
          errors.map((it, i) => (
            <div className="register-fail" key={i}>
              {it}
            </div>
          ))
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }
}

export default reduxForm({
  form: "preRegisterForm",
  validate: validateFunc,
  asyncValidate,
  asyncBlurFields: ["zip", "continent", "country"],
})(LogisticPreRegisterForm);
