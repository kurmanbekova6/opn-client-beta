import React from "react";
import InputMask from "react-input-mask";

export const CardInput = props => {
  const {
    input,
    meta: { touched, error, warning },
    placeholder,
  } = props;
  return (
    <div className="customProfileFieldWrapper">
      <div className="wrapperField">
        <InputMask
          mask="9999-9999-9999-9999"
          placeholder={placeholder}
          className="inputField"
          {...input}
        />
        {touched &&
          ((error && <span className="errorField">{error}</span>) ||
            (warning && <span className="warningField">{warning}</span>))}
      </div>
    </div>
  );
};

export const CardDate = props => {
  const {
    input,
    meta: { touched, error, warning },
    placeholder,
  } = props;
  return (
    <div className="customProfileFieldWrapper">
      <div className="wrapperField">
        <InputMask
          mask="99/99"
          placeholder={placeholder}
          className="inputField"
          {...input}
        />
        {touched &&
          ((error && <span className="errorField">{error}</span>) ||
            (warning && <span className="warningField">{warning}</span>))}
      </div>
    </div>
  );
};
