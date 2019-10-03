import React from "react";
import ProductsItem from "./ProductsItem";
import "../css/productList.scss";

const ProductsList = props => {
  return (
    <div className="my-products-wrapper">
      {props.products.length !== 0 ? (
        <React.Fragment>
          {/* <p className="my-products_date-separator">22 february</p> */}
          <ul className="my-products-list">
            {props.products.map((product, i) => (
              <React.Fragment key={i}>
                <ProductsItem
                  prodDetailsShow={props.prodDetailsShow}
                  name={product.name ? product.name : ""}
                  company={
                    product.company && product.company.profile
                      ? product.company.profile.name
                      : ""
                  }
                  price={product.price ? product.price : ""}
                  country={product.country}
                  product={product}
                  photo={product.photos !== null ? product.photos[0] : null}
                />
              </React.Fragment>
            ))}
          </ul>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default ProductsList;
