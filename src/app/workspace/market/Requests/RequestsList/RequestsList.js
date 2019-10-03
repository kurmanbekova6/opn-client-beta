import React from "react";
import RequestsItem from "./RequestsItem";
import "../css/requestsList.scss";
import ProductsItem from "../../Products/ProductsList/ProductsItem";

const RequestsList = props => {
  if (props.displayList) {
    return (
      <div className="product-list_container">
        {/* <p className="my-requests_date-separator">22 february</p> */}
        {props.products.length !== 0 ? (
          <ul className="my-requests-list">
            {props.products.map((product, i) => (
              <RequestsItem
                product={product}
                key={i}
                name={product.name !== undefined ? product.name : ""}
                company={
                  product.company && product.company.profile
                    ? product.company.profile.name
                    : ""
                }
                price={product.price ? product.price : ""}
                country={product.country}
                date={product.created_at ? product.created_at : ""}
                index={product.index ? product.index : ""}
                amount={product.amount ? product.amount : ""}
                reqDetailsShow={props.reqDetailsShow}
                photo={product.photos !== null ? product.photos[0] : null}
              />
            ))}
          </ul>
        ) : (
          <div>Here are no products</div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default RequestsList;
