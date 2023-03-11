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
import ManageAdmins from "../modals/ManageAdmins";
import chroma from "chroma-js";
import { baseColor } from "../../utils/constants";

function Navbar() {
  const pageStatus = useSelector((state) => state.pageStatusReducer);
  const user = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [openAdmins, setOpenAdmins] = React.useState(false);
  const handleSignOut = async () => {
    try {
      const response = await account.listSessions();
      await account.deleteSession(response.sessions[0].$id);
      navigate("/auth");
    } catch {
      console.log("No active session found");
      navigate("/auth");
    }
  };
  return (
    <NavbarContainer>
      <NavbarBox>
        <NavBarImg src={logo}></NavBarImg>
        <NavbarHeader>Admin Panel</NavbarHeader>
        {user.name && (
          <NavbarPip style={{ color: chroma(baseColor).darken(0.5).hex() }}>
            |
          </NavbarPip>
        )}
        <NavbarPageStatus
          style={{ color: chroma(baseColor).darken(0.5).hex() }}
        >
          {user.name}
        </NavbarPageStatus>
        <NavbarPip>|</NavbarPip>
        <NavbarPageStatus>{pageStatus.status}</NavbarPageStatus>

        {user.isRootUser && (
          <MuiButton onClick={() => setOpenAdmins(true)}>
            Manage Admins
          </MuiButton>
        )}
        {pageStatus.status !== "Welcome" &&
          (user && !user.id != null ? (
            <MuiButton
              style={{ marginLeft: user.isRootUser && "20px" }}
              onClick={handleSignOut}
            >
              Log out
            </MuiButton>
          ) : (
            ""
          ))}
      </NavbarBox>
      {openAdmins && (
        <ManageAdmins
          open={openAdmins}
          handleClose={() => setOpenAdmins(false)}
        />
      )}
    </NavbarContainer>
  );
}

export default Navbar;
