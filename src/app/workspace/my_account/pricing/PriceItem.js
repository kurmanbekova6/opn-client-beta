import React from "react";
import { connect } from "react-redux";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// Components

const useStyles = makeStyles(theme => ({
  tariffBox: {
    border: "1px solid #dddddd",
    borderRadius: "12px",
    maxWidth: 260,
    minHeight: 472,
    padding: "24px 28px",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    color: "#212121",
    fontSize: "24px",
    lineHeight: "28px",
    letterSpacing: "0.3px",
    marginBottom: "35px",
    fontWeight: "600",
  },
  limitsContainer: {
    marginBottom: "27px",
  },
  limitsName: {
    fontSize: "16px",
    color: "#333333",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    marginBottom: "13px",
    fontWeight: "700",
  },
  bonusName: {
    fontSize: "16px",
    color: "#333333",
    lineHeight: "20px",
    letterSpacing: "0.2px",
    marginBottom: "13px",
    fontWeight: "700",
  },
  limitItem: {
    color: "#8d8d8d",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
  },
  bonusItem: {
    color: "#8d8d8d",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.2px",
  },
  pricingButton: {
    color: "#fff",
    background: "#3d7efd",
    borderRadius: "12px",
    fontSize: "14px",
    letterSpacing: "1px",
    padding: "15px",
    textAlign: "center",
    maxHeight: "48px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0053c9",
    },
  },
}));

const PriceItem = props => {
  const classes = useStyles();
  return (
    <Grid item xs={4} className={classes.tariffBox}>
      <div>
        <h5 className={classes.title}>{props.plan}</h5>
        <div className={classes.limitsContainer}>
          <div className={classes.limitsName}>
            {props.id === 3 ? "Unlimited" : "Limits"}{" "}
          </div>
          {props.content.map((item, i) => (
            <div className={classes.limitItem} key={i}>
              {item}
            </div>
          ))}
        </div>
        {props.bonus ? (
          <div className={classes.bonusContainer}>
            <div className={classes.bonusName}>Bonus</div>
            {props.bonus.map((item, i) => (
              <div className={classes.bonusItem} key={i}>
                {item}
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {props.id === 3 ? (
        <a
          href="mailto:sergio@opnplatform.com"
          onClick={() => {
            if (window.location.host === "opnplatform.com") {
              /* intercom event */
              window.Intercom("update", {
                app_id: "ulueqf5y",
                name: props.loggedIn.data.result.name,
                email: props.loggedIn.data.result.mail.id,
                "Plan type": "Enterprise",
              });
            }
          }}
        >
          <div className={classes.pricingButton}>{props.price}</div>
        </a>
      ) : props.id === 2 ? (
        <div className={classes.pricingButton} onClick={props.toggleModal}>
          {props.price}
        </div>
      ) : (
        <div className={classes.pricingButton}>{props.price}</div>
      )}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    clientId: state.clientId,
    access_token: state.loggedIn,
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(PriceItem);
