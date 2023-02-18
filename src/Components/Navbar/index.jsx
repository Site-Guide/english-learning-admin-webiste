import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite";
import {
  MuiButton,
  NavbarBox,
  NavbarContainer,
  NavbarHeader,
  NavBarImg,
  NavbarPageStatus,
  NavbarPip,
} from "./navbarStyles";
import logo from "../../logo.svg";

function Navbar() {
  const pageStatus = useSelector((state) => state.pageStatusReducer);
  const user = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const response = await account.listSessions();
      console.log(response);
      await account.deleteSession(response.sessions[0].$id);
      navigate("/auth");
    } catch {
      console.log("No active session found");
    }
  };
  return (
    <NavbarContainer>
      <NavbarBox>
        <NavBarImg src={logo}></NavBarImg>
        <NavbarHeader>Admin Panel</NavbarHeader>
        <NavbarPip>|</NavbarPip>
        <NavbarPageStatus>{pageStatus.status}</NavbarPageStatus>
        {pageStatus.status !== "Welcome" &&
          (user && !user.id != null ? (
            <MuiButton onClick={handleSignOut}>Log out</MuiButton>
          ) : (
            ""
          ))}
      </NavbarBox>
    </NavbarContainer>
  );
}

export default Navbar;
