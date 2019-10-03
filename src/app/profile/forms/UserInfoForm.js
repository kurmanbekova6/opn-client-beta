import React from "react";
import { Field, reduxForm } from "redux-form";
import { formNamesConst } from "../../../consts/index";
import { renderInputField } from "./components/customComponents";
import { EditIcon } from "../../../consts/icons";
import { connect } from "react-redux";
import validateFunc from "./userInfoValidation";

let UserInfoForm = props => {
  return (
    <form>
      <Field
        name="full_name"
        label="Full name: *"
        placeholder={props.full_name ? props.full_name : "John Smith"}
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="position"
        label="Position: *"
        placeholder={props.position ? props.position : "Purchasing manager"}
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="mobile"
        label="Mobile:"
        placeholder={props.mobile ? props.mobile : "+ 1 234 567 89 01"}
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
        name="chief_full_name"
        label="Chief's Name:"
        placeholder={
          props.chief_full_name ? props.chief_full_name : "John Smith"
        }
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="chief_phone"
        label="Chief's Phone:"
        placeholder={
          props.chief_phone ? props.chief_phone : "+ 1 234 567 89 01"
        }
        component={renderInputField}
        type="text"
        addonAfter={EditIcon}
      />
      <Field
        name="chief_email"
        label="Chief's Email"
        placeholder={props.chief_email ? props.chief_email : "info@company.io"}
        component={renderInputField}
        type="email"
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
    form: formNamesConst.USER_INFO_FORM,
    validate: validateFunc,
  })(UserInfoForm)
);
