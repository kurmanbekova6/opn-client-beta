import React from "react";

export const renderInputField = props => {
  const {
    addonAfter,
    input,
    type,
    placeholder,
    label,
    value,
    meta: { touched, error, warning },
  } = props;

  return (
    <div className="customProfileFieldWrapper">
      <div className="customProfileLabelFieldWrapper">
        {label && <label className="profileLabelField">{label}</label>}
        {addonAfter && addonAfter({ active: !!value })}
      </div>
      <div className="wrapperField">
        <input
          className="inputField"
          {...input}
          type={type}
          placeholder={placeholder}
          noValidate
        />
        {touched &&
          ((error && <span className="errorField">{error}</span>) ||
            (warning && <span className="warningField">{warning}</span>))}
      </div>
    </div>
  );
};

export const renderSelectField = props => {
  const {
    input,
    type,
    placeholder,
    children,
    label,
    meta: { touched, error, warning },
  } = props;
  return (
    <div className="customFieldWrapper">
      {label && <label className="labelField">{label}</label>}
      <div className="wrapperField">
        <select
          className="selectField"
          {...input}
          type={type}
          placeholder={placeholder}
        >
          {children}
        </select>
        {touched &&
          ((error && <span className="errorField">{error}</span>) ||
            (warning && <span className="warningField">{warning}</span>))}
      </div>
    </div>
  );
};

export default {};
