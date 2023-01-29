import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { account } from "../../appwrite";
import {
  MuiButton,
  NavbarBox,
  NavbarContainer,
  NavbarHeader,
  NavbarPageStatus,
  NavbarPip,
} from "./navbarStyles";

function Navbar() {
  const pageStatus = useSelector((state) => state.pageStatusReducer);
  const [session, setSession] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getSession = async () => {
    try {
      const response = await account.listSessions();
      console.log(response);
      setSession([...response.sessions]);
      setLoading(false);
    } catch {
      console.log("No active session found");
      setLoading(false);
    }
  };
  const handleSignOut = async () => {
    await Promise.all(
      session.map(async (sess) => {
        await account.deleteSession(sess.$id);
      })
    );
    // setSession([]);
    navigate("/auth");
  };
  useEffect(() => {
    getSession();
  }, []);
  return (
    <NavbarContainer>
      <NavbarBox>
        <NavbarHeader>Admin Panel</NavbarHeader>
        <NavbarPip>|</NavbarPip>
        <NavbarPageStatus>{pageStatus.status}</NavbarPageStatus>
        {pageStatus.status !== "Welcome" &&
          (!loading ? (
            <MuiButton onClick={handleSignOut}>Log out</MuiButton>
          ) : (
            ""
          ))}
      </NavbarBox>
    </NavbarContainer>
  );
}

export default Navbar;
