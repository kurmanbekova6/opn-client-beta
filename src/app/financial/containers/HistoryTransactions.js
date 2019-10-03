import React, { Component } from "react";
import TransactionItem from "../components/TransactionItem";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";

// const data = [
//   {
//     date: "May, 10, 2019",
//     status: "Recieved",
//     curr: "$",
//     num: "650.02",
//   },
//   {
//     date: "May, 10, 2019",
//     status: "Sent",
//     curr: "$",
//     num: "650.02",
//   },
//   {
//     date: "May, 10, 2019",
//     status: "Sent",
//     curr: "OPK",
//     num: "2000",
//   },
//   {
//     date: "May, 10, 2019",
//     status: "Recieved",
//     curr: "$",
//     num: "650.02",
//   },
//   {
//     date: "May, 10, 2019",
//     status: "Recieved",
//     curr: "OPK",
//     num: "650.02",
//   },
//   {
//     date: "May, 10, 2019",
//     status: "Sent",
//     curr: "$",
//     num: "650.02",
//   },
//   {
//     date: "May, 10, 2019",
//     status: "Sent",
//     curr: "$",
//     num: "650.02",
//   },
//   {
//     date: "May, 10, 2019",
//     status: "Recieved",
//     curr: "OPK",
//     num: "20000",
//   },
// ];

export default class HistoryTransactions extends Component {
  render() {
    return (
      <Scrollbars
        className="chatroom-list-scrollbar"
        renderView={({ style }) => (
          <div style={{ ...style, paddingRight: "10px" }} />
        )}
        renderThumbVertical={({ style }) => (
          <div
            style={{
              ...style,
              backgroundColor: "#548cc4",
              borderRadius: "1px",
            }}
          />
        )}
        style={{ height: 320 }}
      >
        <div className="history-transactions">
          {this.props.data.length > 0 ? (
            this.props.data.map(it => (
              <TransactionItem
                key={it._id}
                date={moment(it.created_at).format("DD | MM | YYYY")}
                status={"Sent"}
                curr={it.currency}
                num={it.amount / 100}
              />
            ))
          ) : (
            <div className="transaction-item__info_info">
              There is no outgoing transactions yet
            </div>
          )}
        </div>
      </Scrollbars>
    );
  }
}
