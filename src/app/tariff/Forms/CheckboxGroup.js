import React from "react";

class CheckboxGroup extends React.Component {
  checkboxGroup() {
    let { label, required, options, input, meta } = this.props;
    return options.map((option, index) => {
      return (
        <div className="checkbox" key={index}>
          <div className="pretty p-default p-curve">
            <input
              type="checkbox"
              name={`${input.name}[${index}]`}
              value={option.name}
              checked={input.value.indexOf(option.name) !== -1}
              onChange={event => {
                let newValue = "";
                if (event.target.checked) {
                  newValue = option.name;
                } else {
                  newValue = option.name;
                }

                return input.onChange(newValue);
              }}
            />
            <div className="state p-primary-o">
              <label>{option.name}</label>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.checkboxGroup()}</div>;
  }
}

export default CheckboxGroup;
