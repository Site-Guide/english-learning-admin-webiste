import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageStatus } from "../../redux/actions/pageStatusAction";
import MainPanel from "../MainPanel";
import { Container, DashboardBox } from "./dashboardStyles";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageStatus("Dashboard"));
  }, []);

  return (
    <Container>
      <DashboardBox>
        <MainPanel />
      </DashboardBox>
    </Container>
  );
}

export default Dashboard;
