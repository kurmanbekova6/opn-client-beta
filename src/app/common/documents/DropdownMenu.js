import React from "react";
// Material UI
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHoriz from "@material-ui/icons/MoreHoriz";

const options = ["Delete"];

function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleDelete() {
    setAnchorEl(null);
    props.removeDocument(props.doc._id);
  }

  return (
    <div>
      <IconButton
        aria-label="More"
        aria-controls="dropdown-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ outline: "none" }}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: 12,
            backgroundColor: "#f0eff1",
            width: 132,
          },
        }}
      >
        {options.map(option => (
          <MenuItem
            key={option}
            onClick={handleDelete}
            style={{
              color: "#333",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: 0.5,
              minHeight: 32,
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;
