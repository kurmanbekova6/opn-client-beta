import React, { Fragment } from "react";
import Chip from "@material-ui/core/Chip";
import DeteleIcon from "@material-ui/icons/HighlightOff";
import Cancel from "@material-ui/icons/Cancel";

import "./css/filter.scss";

const Chips = ({ filters, handleDelete, cancelFilter }) => {
  return (
    <div className="filter_chips-container">
      {filters && filters.length > 0 ? (
        <Fragment>
          {filters.map((filter, i) => (
            <Chip
              key={i}
              label={filter.name}
              onDelete={() => handleDelete(filter.id)}
              className="filter_chips-item"
              variant="outlined"
              deleteIcon={
                <DeteleIcon style={{ width: "18px", height: "18px" }} />
              }
            />
          ))}
          <Cancel className="filter_cancel" onClick={() => cancelFilter([])} />
        </Fragment>
      ) : null}
    </div>
  );
};

export default Chips;
