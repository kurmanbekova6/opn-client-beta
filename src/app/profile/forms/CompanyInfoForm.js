import React from "react";
import { Field, reduxForm } from "redux-form";
import { formNamesConst } from "../../../consts/index";
import { renderInputField } from "./components/customComponents";
import { EditIcon } from "../../../consts/icons";
import { connect } from "react-redux";
import validateFunc from "./companyInfoValidation";

let CompanyInfoForm = props => {
  return (
    <form>
      <Field
        name="name"
        label="Company name: *"
        placeholder={props.name ? props.name : "Your Company name"}
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="country"
        label="Country: *"
        placeholder={props.country ? props.country : "Country"}
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="address"
        label="Address: *"
        placeholder={
          props.address ? props.address : "City, Street, # Building, Office"
        }
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="phone1"
        label="Phone 1:"
        placeholder={props.phone1 ? props.phone1 : "+ 1 234 567 89 01"}
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="site"
        label="Site: *"
        placeholder={props.site ? props.site : "http://site.com"}
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="email"
        label="Email: *"
        placeholder={props.email ? props.email : "info@company.io"}
        component={renderInputField}
        type="email"
        addonAfter={EditIcon}
      />
      <Field
        name="description"
        label="Description: *"
        placeholder={
          props.description ? props.description : "abc (370 symbols)"
        }
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
    </form>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      ...ownProps,
    },
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: formNamesConst.COMPANY_INFO_FORM,
    validate: validateFunc,
  })(CompanyInfoForm)
);
