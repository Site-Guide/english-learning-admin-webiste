import React from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite";
import { Container } from "./accountVerification";

function AccountVerification() {
  const navigate = useNavigate();
  const accountVerify = async () => {
    const acc = await account.get();
    console.log("USER", acc);
    if (acc && acc.emailVerification) {
      navigate("/auth");
    }
  };
  React.useEffect(() => {
    accountVerify();
  }, []);
  return (
    <Container>
      An mail has been sent to you email, Please verify your email first
    </Container>
  );
}

export default AccountVerification;
