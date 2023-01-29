import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageStatus } from "../../redux/actions/pageStatusAction";
import {
  ButtonLabel,
  Container,
  DashboardBox,
  MuiButton,
} from "./dashboardStyles";
import Papa from "papaparse";
import { database } from "../../appwrite";
import { ID } from "appwrite";
import sendEmail from "../../utils/Email";

function Dashboard() {
  const dispatch = useDispatch();
  const [emails, setEmails] = useState([]);
  const [readyToSend, setReadyToSend] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  const convertCSVTOJSON = async (file) => {
    console.log(file);
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
      console.log("emails", emails);
      await Promise.all(
        emails.map(async (user) => {
          if (user.email && user.amount && user.paymentId) {
            // await database.createDocument(
            //   "main",
            //   "razorpay_purchases",
            //   ID.unique(),
            //   {
            //     amount: user.amount,
            //     email: user.email,
            //     paymentId: user.paymentId,
            //   }
            // );
            await sendEmail("tushardeepak22@gmail.com");
          }
        })
      );
      setUploadDone(true);
    }
  };
  useEffect(() => {
    dispatch(setPageStatus("Dashboard"));
  }, []);

  return (
    <Container>
      <DashboardBox>
        <input
          type="file"
          accept=".csv"
          hidden
          id="csvUploadButton"
          onChange={(e) => convertCSVTOJSON(e.target.files[0])}
        />
        <ButtonLabel htmlFor="csvUploadButton">Upload CSV</ButtonLabel>
        {readyToSend && !uploadDone ? (
          uploadDone ? (
            <MuiButton>Upload Done</MuiButton>
          ) : (
            <MuiButton onClick={handleEmailRegisterAndSend}>
              Send Email
            </MuiButton>
          )
        ) : (
          <MuiButton style={{ opacity: 0 }}>Send Email</MuiButton>
        )}
      </DashboardBox>
    </Container>
  );
}

export default Dashboard;
