import React from "react";
import DocumentItem from "../common/documents/DocumentItem";

import "./css/accountSettings.scss";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const Documents = ({ documents, removeDocument, uploadDoc }) => {
  const classes = useStyles();
  // const [count, setCount] = useState(0);

  return (
    <div className="account-settings__documents">
      <div className="account-settings__documents-header">
        <Typography variant="h6" component="h2">
          Documents
        </Typography>
        <input
          accept="application/pdf"
          className={classes.input}
          id="doc"
          type="file"
          onChange={uploadDoc}
        />
        <label htmlFor="doc">
          <Button component="span" className={classes.button}>
            Add document
          </Button>
        </label>
      </div>
      <ul className="account-settings__documents-list">
        {documents.length > 0
          ? documents.map((doc, id) => (
              <DocumentItem
                key={id}
                doc={doc}
                removeDocument={removeDocument}
              />
            ))
          : null}
      </ul>
    </div>
  );
};

export default Documents;

const useStyles = makeStyles(theme => ({
  button: {
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
      width: "175px",
      height: "40px",
    },
  },
  input: {
    display: "none",
    width: "175px",
    height: "40px",
  },
}));
