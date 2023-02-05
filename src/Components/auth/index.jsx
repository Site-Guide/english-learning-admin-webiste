import { ID } from "appwrite";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite";
import { setCurrentUser } from "../../redux/actions/authAction";
import { setPageStatus } from "../../redux/actions/pageStatusAction";
import {
  Container,
  HeaderText,
  MainBox,
  MuiButton,
  MuiTextField,
  SubText,
} from "./authStyle";

function Auth() {
  const [signUp, setSignUp] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUpForm = (e, key) => {
    setErrorMessage("");
    setSignUpForm({ ...signUpForm, [key]: e.target.value });
  };
  const handleSignInForm = (e, key) => {
    setErrorMessage("");
    setSignInForm({ ...signInForm, [key]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const acc = await account.create(
        ID.unique(),
        signUpForm.email,
        signUpForm.password,
        signUpForm.name
      );
      console.log("Created", acc);
      if (acc && acc.status) {
        dispatch(
          setCurrentUser({
            id: acc.$id,
            name: acc.name,
            email: acc.email,
            emailVerification: acc.emailVerification,
          })
        );
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const acc = await account.createEmailSession(
        signInForm.email,
        signInForm.password
      );
      console.log(acc);
      if (acc && acc.userId) {
        const user = await account.get();
        console.log(user);
        if (user && user.$id) {
          dispatch(
            setCurrentUser({
              id: acc.$id,
              name: acc.name,
              email: acc.email,
            })
          );
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
    }
  };

  const getAccount = async () => {
    setLoading(true);
    try {
      const acc = await account.get();
      console.log("USER", acc);
      if (acc && acc.$id) {
        dispatch(
          setCurrentUser({
            id: acc.$id,
            name: acc.name,
            email: acc.email,
          })
        );
        setLoading(false);
        navigate("/");
      } else {
        dispatch(setPageStatus("Welcome"));
      }
    } catch {
      setLoading(false);
      dispatch(setPageStatus("Welcome"));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  return loading ? (
    ""
  ) : (
    <Container>
      {signUp ? (
        <MainBox>
          <HeaderText>Sign Up</HeaderText>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <MuiTextField
            id="standard-basic"
            label="Name"
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleSignUpForm(e, "name")}
          />
          <MuiTextField
            id="standard-basic"
            label="Email"
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleSignUpForm(e, "email")}
          />
          <MuiTextField
            id="standard-basic"
            label="Password"
            type="password"
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleSignUpForm(e, "password")}
          />
          <MuiButton onClick={handleSignUp}>Submit</MuiButton>
          <div
            style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}
          >
            <p>Already have a account? </p>
            <SubText onClick={() => setSignUp(false)}>Sign In</SubText>
          </div>
        </MainBox>
      ) : (
        <MainBox>
          <HeaderText>Sign In</HeaderText>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <MuiTextField
            id="standard-basic"
            label="Email"
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleSignInForm(e, "email")}
          />
          <MuiTextField
            id="standard-basic"
            label="Password"
            type="password"
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleSignInForm(e, "password")}
          />
          <MuiButton onClick={handleSignIn}>Submit</MuiButton>
          <div
            style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}
          >
            <p>Don't have a account? </p>
            <SubText onClick={() => setSignUp(true)}>Sign up</SubText>
          </div>
        </MainBox>
      )}
    </Container>
  );
}

export default Auth;
