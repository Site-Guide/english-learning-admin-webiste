import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ID } from "appwrite";
import Papa from "papaparse";
import * as React from "react";
import { database, functions } from "../../appwrite";
import InfoIcon from "@mui/icons-material/Info";
import {
  baseColor,
  EMAIL_BODY,
  EMAIL_FUNCTION_ID,
  EMAIL_SUBJECT,
  secondBase,
  TEST_CSV_LINK,
} from "../../utils/constants";
import { ButtonLabel } from "../MainPanel/mainPanel";
import { Tooltip } from "@mui/material";
import { getNonActiveUserList } from "../RealTimeFunctions/userFunctions";

export default function UploadCSV({ open, handleClose, setNonActiveUserList }) {
  const [fileName, setFileName] = React.useState("");
  const [emails, setEmails] = React.useState([]);
  const [readyToSend, setReadyToSend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const convertCSVTOJSON = async (file) => {
    setFileName(file.name);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        setEmails([...results.data]);
        setReadyToSend(true);
      },
    });
  };
  const handleEmailRegisterAndSend = async () => {
    if (emails.length > 0) {
      setReadyToSend(false);
      setLoading(true);
      let emailString = "";
      await Promise.all(
        emails.map(async (user) => {
          if (user.email && user.amount && user.paymentId) {
            emailString = emailString + '"' + user.email + '",';
            await database.createDocument(
              "main",
              "razorpay_purchases",
              ID.unique(),
              {
                amount: user.amount,
                email: user.email,
                paymentId: user.paymentId,
              }
            );
          }
        })
      );
      emailString = emailString.substring(0, emailString.length - 1);
      console.log(emailString);
      await functions.createExecution(
        EMAIL_FUNCTION_ID,
        `{\n        "emails": [${emailString}],\n        "subject": "${EMAIL_SUBJECT}",\n        "message": "${EMAIL_BODY}"\n}`
      );
      await getNonActiveUserList(setNonActiveUserList);
      setReadyToSend(true);
      setLoading(false);
      handleClose();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Upload CSV Data
        <Tooltip title="CSV Format">
          <a href={TEST_CSV_LINK} target="_blank">
            <InfoIcon
              style={{
                marginBottom: "-0.5rem",
                marginLeft: "1rem",
                height: "1.5rem",
                width: "1.5rem",
                color: baseColor,
              }}
            />
          </a>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <input
            type="file"
            accept=".csv"
            hidden
            id="csvUploadButton"
            onChange={(e) => convertCSVTOJSON(e.target.files[0])}
          />
          <ButtonLabel
            style={{ width: "30%", margin: "1rem auto" }}
            htmlFor="csvUploadButton"
          >
            Upload CSV
          </ButtonLabel>
          {fileName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={!readyToSend}
          style={{ color: baseColor }}
          onClick={handleEmailRegisterAndSend}
        >
          {loading ? "Sending and Registering..." : "Send and Register email"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
