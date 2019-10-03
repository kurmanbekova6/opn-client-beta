import React from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

//images
import workFeature1 from "../../../assets/img/svg/find_new_customers_in–few_clicks.svg";
import workFeature2 from "../../../assets/img/svg/ai-driven_deal_processing.svg";
import workFeature3 from "../../../assets/img/svg/verify_the_business_partner_instantly.svg";
import workFeature4 from "../../../assets/img/svg/capture_new_supplier_fast.svg";
import workFeature5 from "../../../assets/img/svg/work_with_verified_vendors.svg";
import workFeature6 from "../../../assets/img/svg/croww_board_payments.svg";

import TabContent from "./TabContent";

const sellerData = [
  {
    img: workFeature1,
    title: " Find New Customers In Few Clicks",
    desc:
      "Place an ORDER for packaging raw material: resin, substrates, or labels and receive thousands of customer demands to strike the best deals and multiply your revenue streams today.",
  },
  {
    img: workFeature2,
    title: " Ai-Driven Deal Processing ",
    desc:
      "OPN has developed a programming code to avoid human errors to validate the deal by a sophisticated artificial intelligence algorithm.",
  },
  {
    img: workFeature3,
    title: "Verify The Business Partner Instantly",
    desc:
      "Get instant  business partner verification - by KYB (Know Your Business) to protect you from fraud and save your money.",
  },
];
const buyerData = [
  {
    img: workFeature4,
    title: "Capture New Suppliers Fast",
    desc:
      "Place a REQUEST and OPN allows you access dedicated deals. Find the best product and price for you, whether it’s a bulk material, for flexible packaging or premium packaging, you get the deal in record time.",
  },
  {
    img: workFeature5,
    title: "Work With Verified Vendors",
    desc:
      "Partner only with verified counterparties to save money and time. Use the Real-Time business verification to be 100% confident in the partner before you pay.",
  },
  {
    img: workFeature6,
    title: "Cross Board Payments",
    desc:
      "Connect to your bank directly without going beyond the platform by Open Banking API. You can manage fast and secure payouts inside.",
  },
];

const StyledAppBar = withStyles(theme => ({
  root: {
    marginBottom: "3em",
    backgroundColor: "#fff",
    boxShadow: "none",
    outline: "none",
  },
}))(props => <AppBar {...props} />);

const StyledTabs = withStyles(() => ({
  root: {
    backgroundColor: "#fff",
  },
  indicator: {
    width: "100px",
    height: "4px",
    borderRadius: "2px",
    backgroundColor: "#2f7bff",
  },
}))(props => <Tabs {...props} />);

const StyledTab = withStyles(() => ({
  root: {
    maxWidth: "100px",
    minWidth: "100px !important",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#aaa !important",
    backgroundColor: "#fff",
    outline: "none !important",
    fontWeight: "400",
    fontSize: "14px",
  },
  selected: {
    color: "#2f7bff !important",
  },
}))(props => <Tab disableRipple {...props} />);

function TabContainer({ children, dir }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#fff",
  },
}));

export default function CustomTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div className={classes.root}>
      <StyledAppBar position="static" color="default">
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered={true}
        >
          <StyledTab label="Seller" />
          <StyledTab label="Buyer" />
        </StyledTabs>
      </StyledAppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        animateTransitions={false}
      >
        <TabContainer dir={theme.direction}>
          {sellerData.map((item, id) => (
            <TabContent key={id} data={item} />
          ))}
        </TabContainer>

        <TabContainer dir={theme.direction}>
          {buyerData.map((item, id) => (
            <TabContent key={id} data={item} />
          ))}
        </TabContainer>
      </SwipeableViews>
    </div>
  );
}
