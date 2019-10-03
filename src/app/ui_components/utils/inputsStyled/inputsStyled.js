import React, { Component } from "react";
import { DownArrow } from "../../../../consts/icons";

import "./inputsStyled.css";

export const renderInputStyled = props => {
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
    <div className="">
      <div className="customProfileLabelFieldWrapper">
        {label && <label className="profileLabelField">{label}</label>}
        {addonAfter && addonAfter({ active: !!value })}
      </div>
      <div className="input-styled__input_wrapper">
        <input
          className={`input-styled__item input-styled__shadow-${
            props.shadowType
          } input-styled__item_text`}
          {...input}
          type={type}
          placeholder={placeholder}
          noValidate
        />
      </div>
      {touched &&
        ((error && <span className="errorField">{error}</span>) ||
          (warning && <span className="warningField">{warning}</span>))}
    </div>
  );
};

export const renderSelectStyled = props => {
  const {
    input,
    type,
    placeholder,
    itemsList,
    label,
    meta: { touched, error, warning },
  } = props;
  return (
    <div className="">
      <div className="customProfileLabelFieldWrapper">
        {label && <label className="profileLabelField">{label}</label>}
      </div>
      <div className="input-styled__input_wrapper">
        {props.isLoading ? (
          <div
            className={`input-styled__spinner input-styled__shadow-${
              props.shadowType
            }`}
          />
        ) : (
          <div>
            <select
              className={`input-styled__item input-styled__shadow-${
                props.shadowType
              } input-styled__item_select`}
              {...input}
              type={type}
              placeholder={placeholder}
            >
              <option value="" disabled={true} hidden={true} selected={false} />
              {itemsList.map(item => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="input-styled__input_arrow" />
            {input.value === "" ? (
              <div className="input-styled__select_placeholder input-styled__placeholder">
                {placeholder}
              </div>
            ) : null}
          </div>
        )}
      </div>
      {touched &&
        ((error && <span className="errorField">{error}</span>) ||
          (warning && <span className="warningField">{warning}</span>))}
    </div>
  );
};

export class renderDropDownStyled extends Component {
  state = {
    showList: false,
  };

  handleItemLiClick = value => {
    this.props.input.onChange(value);
    this.props.updateList(this.props.input.name, value);
    this.setState({ showList: false });
  };
  handleInputClick = () => {
    this.setState({
      showList: !this.state.showList,
    });
  };
  render() {
    const { touched, error, warning } = this.props.meta;

    return (
      <div>
        <div className="input-styled__item input-styled__item_dropdown">
          <div style={{ width: "100%" }} onClick={this.handleInputClick}>
            {this.props.input.value === "" ? (
              <div className="input-styled__placeholder">
                {this.props.placeholder || ""}
              </div>
            ) : (
              <div className="input-styled__value">
                {this.props.input.value || ""}
              </div>
            )}
          </div>
          <DownArrow value={"#96c9fd"} />
          {this.state.showList ? (
            <ul>
              {this.props.itemsList &&
                this.props.itemsList.map((item, index) => (
                  <li key={index} onClick={() => this.handleItemLiClick(item)}>
                    {item}
                  </li>
                ))}
            </ul>
          ) : null}
          {touched &&
            ((error && <span className="errorField">{error}</span>) ||
              (warning && <span className="warningField">{warning}</span>))}
        </div>
      </div>
    );
  }
}

export const renderInputUnderlined = props => {
  const {
    addonBefore,
    addonAfter,
    input,
    type,
    placeholder,
    label,
    input: { value },
    warnOffset = "-217px",
    meta: { touched, error, warning, dirty },
  } = props;
  return (
    <div className="input-styled-ul__container">
      {label && (
        <label
          className={`input-styled-ul__label ${
            !!value ? "input-styled-ul__label-touched" : ""
          }`}
        >
          {addonBefore ? <img src={require(`./${addonBefore}.png`)} /> : null}
          {label}
        </label>
      )}
      {addonAfter && addonAfter({ active: !!value })}
      <input
        className="input-styled-ul__input"
        {...input}
        type={type}
        placeholder={placeholder}
        noValidate
      />
      <span
        className={`input-styled-ul__errorField_ul ${
          touched && error ? "input-styled-ul__warn-visible" : ""
        }`}
        style={{ right: warnOffset }}
      >
        {error}
      </span>
      {/*<span*/}
      {/*  className={`input-styled-ul__warningField_ul ${*/}
      {/*    warning ? "input-styled-ul__warn-visible" : ""*/}
      {/*  } `}*/}
      {/*>*/}
      {/*  {warning}*/}
      {/*</span>*/}
    </div>
  );
};

export const renderSelectUnderlined = props => {
  const {
    addonBefore,
    addonAfter,
    input,
    type,
    placeholder,
    label,
    input: { value },
    warnOffset = "-217px",
    meta: { touched, error, warning, dirty },
  } = props;
  return (
    <div className="input-styled-ul__container">
      {label && (
        <label
          className={`input-styled-ul__label ${
            !!value ? "input-styled-ul__label-touched" : ""
          }`}
        >
          {addonBefore ? <img src={require(`./${addonBefore}.png`)} /> : null}
          {label}
        </label>
      )}
      {addonAfter && addonAfter({ active: !!value })}
      <input
        className="input-styled-ul__input"
        {...input}
        type={type}
        placeholder={placeholder}
        noValidate
      />
      <span
        className={`input-styled-ul__errorField_ul ${
          touched && error ? "input-styled-ul__warn-visible" : ""
        }`}
        style={{ right: warnOffset }}
      >
        {error}
      </span>
      {/*<span*/}
      {/*  className={`input-styled-ul__warningField_ul ${*/}
      {/*    warning ? "input-styled-ul__warn-visible" : ""*/}
      {/*  } `}*/}
      {/*>*/}
      {/*  {warning}*/}
      {/*</span>*/}
    </div>
  );
};

export default {};
