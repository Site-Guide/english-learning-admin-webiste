import { ID } from "appwrite";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { account, database } from "../../appwrite";
import { setCurrentUser } from "../../redux/actions/authAction";
import { setPageStatus } from "../../redux/actions/pageStatusAction";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Container,
  HeaderText,
  MainBox,
  MuiButton,
  MuiTextField,
  SubText,
} from "./authStyle";
import { InputAdornment } from "@mui/material";
import { baseColor } from "../../utils/constants";

function Auth() {
  const [signUp, setSignUp] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
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
        await database.createDocument("main", "profiles", acc.$id, {
          name: acc.name,
          email: acc.email,
          phone: "",
          whatsapp: "",
          profession: "",
          purpose: "",
          role: "",
          isAdmin: true,
          experience: "",
          haveYou: "",
          lookingFor: "",
          level: "",
        });
        dispatch(
          setCurrentUser({
            id: acc.$id,
            name: acc.name,
            email: acc.email,
            role: "",
            isAdmin: true,
          })
        );
        await account.createEmailSession(signUpForm.email, signUpForm.password);
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
      if (acc && acc.userId) {
        const user = await account.get();
        console.log(user);
        if (user && user.$id) {
          const currUser = await database.getDocument(
            "main",
            "profiles",
            user.$id
          );
          dispatch(
            setCurrentUser({
              id: user.$id,
              name: user.name,
              email: user.email,
              role:
                user.email === "root@engexpert.com"
                  ? { all: "all" }
                  : currUser.role === ""
                  ? ""
                  : JSON.parse(currUser.role),
              isAdmin:
                user.email === "root@engexpert.com" ? 1 : currUser.isAdmin,
              isRootUser: user.email === "root@engexpert.com" ? true : false,
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
      // if (acc && !acc.emailVerification) {
      //   navigate("/");
      // } else {
      if (acc && acc.$id) {
        const currUser = await database.getDocument(
          "main",
          "profiles",
          acc.$id
        );
        dispatch(
          setCurrentUser({
            id: acc.$id,
            name: acc.name,
            email: acc.email,
            role:
              acc.email === "root@engexpert.com"
                ? { all: "all" }
                : currUser.role === ""
                ? ""
                : JSON.parse(currUser.role),
            isAdmin: acc.email === "root@engexpert.com" ? 1 : currUser.isAdmin,
            isRootUser: acc.email === "root@engexpert.com" ? true : false,
          })
        );
        setLoading(false);
        navigate("/");
      } else {
        dispatch(setPageStatus("Welcome"));
      }
      // }
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
            type={showPassword ? "text" : "password"}
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleSignUpForm(e, "password")}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: baseColor, cursor: "pointer" }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ),
            }}
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
            type={showPassword ? "text" : "password"}
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleSignInForm(e, "password")}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ color: baseColor, cursor: "pointer" }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ),
            }}
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
