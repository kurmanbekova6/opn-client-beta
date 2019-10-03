import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
// Material UI
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import FilterList from "@material-ui/icons/FilterList";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/styles";
import { withTheme } from "@material-ui/styles";

import countries from "../../../consts/continent-country-2";
import "./css/filter.scss";

const manufacturers = [
  "Crown Holder",
  "International Paper",
  "Sealed Air",
  "Reynolds Group",
];

const styles = theme => ({
  menu: {
    width: "320px",
    position: "absolute",
    top: "54px",
    zIndex: "1000",
    "& .Mui-expanded": {
      border: 0,
    },
    "& > div:last-child": {
      overflow: "hidden",
    },
    "& > div:last-child > div:last-child": {
      borderBottomLeftRadius: "12px",
      borderBottomRightRadius: "12px",
      overflow: "hidden",
    },
  },
  root: {
    margin: "0 !important",
    boxShadow: "none",
    maxWidth: "320px",
    "&.MuiExpansionPanelSummary-root.Mui-expanded": {
      maxHeight: "40px !important",
    },
    "&:before": {
      display: "none",
    },
  },
  panelTitleFirst: {
    background: "#ddd",
    minHeight: "40px !important",
    maxHeight: "40px !important",
    padding: "0 12px",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    "&:before": {
      display: "none",
    },
    "& > div:first-child p": {
      fontFamily: "'Montserrat', sans-serif !important",
    },
  },
  panelTitle: {
    background: "#ddd",
    minHeight: "40px !important",
    maxHeight: "40px !important",
    padding: "0 12px",
    "&:before": {
      display: "none",
    },
    "& > div:first-child p": {
      fontFamily: "'Montserrat', sans-serif !important",
    },
  },
  panelBody: {
    maxWidth: "320px",
    background: "#f0eff1",
    flexDirection: "column",
    boxShadow: "none",
    margin: "0",
    padding: "10px 16px 10px 12px !important",
    maxHeight: "250px",
    overflowX: "hidden",
  },

  panelBodyItem: {
    margin: "auto",
    padding: "2px 0",
    fontSize: "12px",
    letterSpacing: "0.5px",
    lineHeight: "16px",
    "&:hover": {
      background: "rgba(186, 206, 246, 0.3)",
      borderRadius: "8px",
    },
    "& span": {
      display: "block",
      fontFamily: "'Montserrat', sans-serif !important",
      fontSize: "12px",
      fontWeight: 500,
      textTransform: "lowercase",
      "&:first-letter": {
        textTransform: "uppercase",
      },
    },
    "& .MuiListItemIcon-root": {
      minWidth: "auto !important",
    },
  },
  title: {
    color: "#333",
    lineHeight: "20px",
    margin: "4px 0 3px",
    fontSize: "16px",
    letterSpacing: "0.2px",
    fontWeight: "600",
    fontFamily: "'Montserrat', sans-serif !important",
  },
  checkbox: {
    padding: "0px !important",
    minHeight: "26px",
    marginLeft: "4px",
    marginRight: "6px",
  },
});

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openMenu: false,
      categories: [],
      selectedFilters: [],
      categoryChecked: [],
      countryChecked: [],
    };
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getAllCategories = () => {
    axios
      .post("/category/list/all", {
        access_token: this.props.token,
        clientId: this.props.clientId,
      })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            categories: res.data.result,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  toggleMenu = () => {
    this.setState({
      openMenu: !this.state.openMenu,
    });
  };

  // selectFilters1 = (item, name) => {
  //   if (this.state.selectedFilters.length > 0) {
  //     this.props.filters.map(it => {
  //       it.value === item
  //         ? null
  //         : this.setState(
  //             {
  //               selectedFilters: [
  //                 ...this.state.selectedFilters,
  //                 { value: item, name: name },
  //               ],
  //             },
  //             () => this.props.setFilters(this.state.selectedFilters)
  //           );
  //     });
  //   } else {
  //     this.setState(
  //       {
  //         selectedFilters: [
  //           ...this.state.selectedFilters,
  //           { value: item, name: name },
  //         ],
  //       },
  //       () => this.props.setFilters(this.state.selectedFilters)
  //     );
  //   }
  // };

  selectFilters = (id, name) => {
    const { filters } = this.props;

    // add first selected item from filters
    if (filters.length <= 0) {
      return this.props.setFilters([{ id, name }]);
    }

    // remove duplicate item from exist array
    let itemIsDeleted = filters.findIndex((item, index) => {
      if (item.id === id) {
        filters.splice(index, 1);
        this.props.setFilters(filters);
        return true;
      }
    });

    // add new item to exist array
    if (itemIsDeleted < 0) {
      const newFilters = [...filters, { id, name }];
      this.props.setFilters(newFilters);
    }
  };

  handleCategory = category => {
    const { categoryChecked } = this.state;
    const currentIndex = categoryChecked.indexOf(category._id);
    const newCategoryChecked = [...categoryChecked];

    if (currentIndex === -1) {
      newCategoryChecked.push(category._id);
    } else {
      newCategoryChecked.splice(currentIndex, 1);
    }

    this.setState({ categoryChecked: newCategoryChecked });
    this.selectFilters(category._id, category.name);
  };

  handleCountry = country => {
    const { countryChecked } = this.state;
    const currentIndex = countryChecked.indexOf(country.code);
    const newCountryChecked = [...countryChecked];

    if (currentIndex === -1) {
      newCountryChecked.push(country.code);
    } else {
      newCountryChecked.splice(currentIndex, 1);
    }

    this.setState({ countryChecked: newCountryChecked });
    this.selectFilters(country.code, country.name);
  };

  render() {
    const {
      openMenu,
      categories,
      categoryChecked,
      countryChecked,
    } = this.state;
    const { classes, filters } = this.props;

    return (
      <div className="filter">
        <Button
          variant="contained"
          className="filter_button"
          onClick={this.toggleMenu}
        >
          <FilterList />
          Filter
        </Button>
        {console.log("CATS:", categories)}

        {openMenu ? (
          <div className={classes.menu}>
            <ExpansionPanel className={classes.root}>
              <ExpansionPanelSummary
                className={classes.panelTitleFirst}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Category</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelBody}>
                {categories.map((category, i) => (
                  <React.Fragment key={i}>
                    <Typography className={classes.title}>
                      {category.name}
                    </Typography>
                    {category.children.length !== 0
                      ? category.children.map(child => (
                          <React.Fragment key={child._id}>
                            {child.children.length !== 0 ? (
                              child.children.map(item => (
                                <ListItem
                                  className={classes.panelBodyItem}
                                  key={item._id}
                                  role={undefined}
                                  dense
                                  button
                                  onClick={() => this.handleCategory(item)}
                                  // onClick={() => alert(item._id)}
                                >
                                  <ListItemIcon>
                                    <Checkbox
                                      className={classes.checkbox}
                                      edge="start"
                                      checked={
                                        categoryChecked.indexOf(item._id) !== -1
                                      }
                                      disableRipple={true}
                                      color="primary"
                                      // onChange={() =>
                                      //   this.selectFilters(item._id, item.name)
                                      // }
                                    />
                                  </ListItemIcon>
                                  <ListItemText id={i} primary={item.name} />
                                </ListItem>
                              ))
                            ) : (
                              <ListItem
                                className={classes.panelBodyItem}
                                key={child._id}
                                role={undefined}
                                dense
                                button
                                onClick={() => this.handleCategory(child)}
                              >
                                <ListItemIcon>
                                  <Checkbox
                                    className={classes.checkbox}
                                    edge="start"
                                    checked={
                                      categoryChecked.indexOf(child._id) !== -1
                                    }
                                    tabIndex={-1}
                                    disableRipple
                                    // inputProps={{ "aria-labelledby": i }}
                                    color="primary"
                                    // onClick={() =>
                                    //   this.selectFilters(child._id, child.name)
                                    // }
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  id={child._id}
                                  primary={child.name}
                                />
                              </ListItem>
                            )}
                          </React.Fragment>
                        ))
                      : null}
                  </React.Fragment>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel>

            {/* <ExpansionPanel className={classes.root}>
              <ExpansionPanelSummary
                className={classes.panelTitle}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Country</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelBody}>
                {countries.map(group => (
                  <React.Fragment key={group.continent}>
                    <Typography className={classes.title}>
                      {group.continent}
                    </Typography>

                    {group.countries.map(country => (
                      <ListItem
                        className={classes.panelBodyItem}
                        key={country.code}
                        role={undefined}
                        dense
                        button
                        onClick={() => this.handleCountry(country)}
                      >
                        <ListItemIcon>
                          <Checkbox
                            className={classes.checkbox}
                            edge="start"
                            checked={
                              countryChecked.indexOf(country.code) !== -1
                            }
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": country.code }}
                            color="primary"
                            // onClick={() =>
                            //   this.selectFilters(child._id, child.name)
                            // }
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={country.code}
                          primary={country.name}
                        />
                      </ListItem>
                    ))}
                  </React.Fragment>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel> */}

            {/* <ExpansionPanel className={classes.root}>
              <ExpansionPanelSummary
                className={classes.panelTitle}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Company</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelBody}>
                {manufacturers.map((item, i) => (
                  <React.Fragment key={i}>
                    <ListItem
                      className={classes.panelBodyItem}
                      //key={value}
                      //role={undefined}
                      dense
                      button
                      //onClick={handleCategory(value)}
                    >
                      <ListItemIcon>
                        <Checkbox
                          className={classes.checkbox}
                          edge="start"
                          //checked={}
                          disableRipple={true}
                          onChange={() =>
                            this.selectFilters(item._id, item.name)
                          }
                          color="primary"
                        />
                      </ListItemIcon>
                      <ListItemText id={i} primary={item} />
                    </ListItem>
                  </React.Fragment>
                ))}
              </ExpansionPanelDetails>
            </ExpansionPanel> */}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    clientId: state.clientId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchRes: result => {
      dispatch(setSearchRes(result));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withTheme(Filter)));
