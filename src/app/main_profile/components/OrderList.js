import React from "react";
import { PdfIcon } from "../../../consts/icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import PdfDocument from "../Pdf/PdfDocument";
import { renderToString } from "react-dom/server";

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
    };
  }

  print = () => {
    const string = renderToString(<PdfDocument orders={this.props.orders} />);
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.fromHTML(string);
    pdf.save("pdf");
  };

  render() {
    const { text, orders } = this.props;
    const activeOrders = orders.filter(order => {
      return order.is_deleted === false;
    });
    return (
      <div className="order-list">
        <article className="order-list__list">
          {activeOrders.length > 0 ? (
            activeOrders.map((order, i) => (
              <div key={i}>
                {order.name !== undefined ? (
                  <Link
                    to={{
                      pathname: `/orders_history`,
                      state: order,
                    }}
                    className="undrl-link"
                  >
                    {order && order.name ? order.name : "-"}
                  </Link>
                ) : (
                  <a className="undrl-link">Crashed order</a>
                )}
              </div>
            ))
          ) : (
            <a className="undrl-link">You have no orders</a>
          )}
        </article>
        {orders.length > 0 && (
          <div className="order-list__dwnld">
            <div className="profileCommonLinkWrapper">
              <PdfIcon active={true} />{" "}
              <a className="profileSubsectionCommonLink" onClick={this.print}>
                {text}
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
