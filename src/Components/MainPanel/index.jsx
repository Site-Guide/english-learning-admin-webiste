import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container, MuiButton, SubTab } from "./mainPanel";
import { baseColor, secondBase } from "../../utils/constants";
import UploadCSV from "../modals/UploadCSV";
import UserTable from "../UserTable/NonActiveUserTable";
import ActiveUserTable from "../UserTable/ActiveUserTable";
import NonActiveUserTable from "../UserTable/NonActiveUserTable";
import DailyTopics from "../PracticeRoom/DailyTopics";
import SetTimeSlot from "../modals/SetTimeSlot";
import FAQ from "../PracticeRoom/FAQ";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function MainPanel() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openTimeSlotModal, setOpenTimeSlotModal] = React.useState(false);
  const [activeUsers, setActiveUsers] = React.useState(true);
  const [topicTab, setTopicTab] = React.useState(true);
  const [nonActiveUserList, setNonActiveUserList] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "90%" }}>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Tabs value={value} onChange={handleChange}>
          <Tab style={{ color: secondBase }} label="User" {...a11yProps(0)} />
          <Tab
            style={{ color: secondBase }}
            label="Practice Room"
            {...a11yProps(1)}
          />
          <Tab
            style={{ color: secondBase }}
            label="Notification"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div style={{ display: "flex" }}>
          <SubTab
            onClick={() => setActiveUsers(true)}
            style={{
              color: activeUsers && baseColor,
            }}
          >
            Active users
          </SubTab>
          <SubTab
            onClick={() => setActiveUsers(false)}
            style={{
              marginLeft: "1rem",
              color: !activeUsers && baseColor,
            }}
          >
            Non Active users
          </SubTab>
          <MuiButton onClick={() => setOpen(true)}>Upload CSV Data</MuiButton>
        </div>
        {activeUsers ? (
          <ActiveUserTable />
        ) : (
          <NonActiveUserTable
            nonActiveUserList={nonActiveUserList}
            setNonActiveUserList={setNonActiveUserList}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ display: "flex" }}>
          <SubTab
            onClick={() => setTopicTab(true)}
            style={{
              color: topicTab && baseColor,
            }}
          >
            Topics
          </SubTab>
          <SubTab
            onClick={() => setTopicTab(false)}
            style={{
              marginLeft: "1rem",
              color: !topicTab && baseColor,
            }}
          >
            FAQs
          </SubTab>
          <MuiButton onClick={() => setOpenTimeSlotModal(true)}>
            Set time slots
          </MuiButton>
        </div>
        {topicTab ? <DailyTopics /> : <FAQ />}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Container>Notification</Container>
      </TabPanel>
      {open && (
        <UploadCSV
          open={open}
          handleClose={() => setOpen(false)}
          setNonActiveUserList={setNonActiveUserList}
        />
      )}
      {openTimeSlotModal && (
        <SetTimeSlot
          open={openTimeSlotModal}
          handleClose={() => setOpenTimeSlotModal(false)}
        />
      )}
    </Box>
  );
}
