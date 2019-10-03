import React, { Component } from "react";
import { MapsMarkerIconColor } from "../../../consts/icons";
import "./tooltipStyles.css";

class MarkerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  renderTooltip = () => {
    return (
      <div className="marker-tooltip">
        <div className="balloon">
          <div className="tooltip-city">{this.props.city}</div>
          <div className="tooltip-address">{this.props.address}</div>
          <div className="tooltip-address">Logistic partners</div>
          <div className="tooltip-partner-container">
            {this.props.partners.map(item => {
              return (
                <div className="tooltip-partner-logo">
                  <img
                    src={require(`../../../assets/img/logistic/${item}.png`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div
        className="logistic-map-marker"
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <MapsMarkerIconColor
          color={this.props.color}
          size={this.state.isHovered ? 80 : this.props.size}
        />
        {this.state.isHovered ? this.renderTooltip() : null}
      </div>
    );
  }
}

export default MarkerItem;
