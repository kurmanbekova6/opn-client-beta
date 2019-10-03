import React from "react";

const Sidebar = props => {
  const { categories } = props;
  return (
    <div className="products-sidebar">
      <ul className="products-menu">
        {categories.map((item, key) => (
          <li key={key} className="products-menu__item">
            {item.name}
            {item.children !== [] ? (
              item.children.map((child, i) => (
                <React.Fragment>
                  <span className="products-menu__item-sub" key={i}>
                    {child.name}
                  </span>
                  {child.children !== [] ? (
                    child.children.map((ch, i) => {
                      <span className="products-menu__item-sub-sub" key={i}>
                        {ch.name}
                      </span>;
                    })
                  ) : (
                    <React.Fragment />
                  )}
                </React.Fragment>
              ))
            ) : (
              <React.Fragment />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
