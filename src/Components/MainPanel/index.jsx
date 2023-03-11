import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";
import { baseColor, secondBase } from "../../utils/constants";
import Courses from "../Courses";
import Discussion from "../Discussion";
import SetTimeSlot from "../modals/SetTimeSlot";
import UploadCSV from "../modals/UploadCSV";
import Plans from "../Plans";
import DailyTopics from "../PracticeRoom/DailyTopics";
import FAQ from "../PracticeRoom/FAQ";
import Purchases from "../Purchases";
import Quiz from "../Quiz";
import ActiveUserTable from "../UserTable/ActiveUserTable";
import NonActiveUserTable from "../UserTable/NonActiveUserTable";
import { MuiButton, SubTab } from "./mainPanel";

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
  const [tabs, setTabs] = React.useState({});
  const [nonActiveUserList, setNonActiveUserList] = React.useState([]);
  const user = useSelector((state) => state.authReducer);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    let count = -1;
    let _tabs = {
      user:
        user?.role["User"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
      practice:
        user?.role["Practice Room"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
      courses:
        user?.role["Courses"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
      quiz:
        user?.role["Quiz"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
      discussion:
        user?.role["Discussion"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
      plans:
        user?.role["Plans"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
      purchases:
        user?.role["Purchases"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
      notification:
        user?.role["Notification"] || user?.email === "root@engexpert.com"
          ? ++count
          : -1,
    };
    setTabs(_tabs);
  }, []);

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
          {tabs?.user != -1 && (
            <Tab
              style={{ color: secondBase }}
              label="User"
              {...a11yProps(tabs.user)}
            />
          )}
          {tabs?.practice != -1 && (
            <Tab
              style={{ color: secondBase }}
              label="Practice Room"
              {...a11yProps(tabs.practice)}
            />
          )}
          {tabs?.courses != -1 && (
            <Tab
              style={{ color: secondBase }}
              label="Courses"
              {...a11yProps(tabs.courses)}
            />
          )}
          {tabs?.quiz != -1 && (
            <Tab
              style={{ color: secondBase }}
              label="Quiz"
              {...a11yProps(tabs.quiz)}
            />
          )}
          {tabs?.discussion != -1 && (
            <Tab
              style={{ color: secondBase }}
              label="Discussion"
              {...a11yProps(tabs.discussion)}
            />
          )}
          {tabs?.plans != -1 && (
            <Tab
              style={{ color: secondBase }}
              label="Plans"
              {...a11yProps(tabs.plans)}
            />
          )}
          {tabs?.purchases != -1 && (
            <Tab
              style={{ color: secondBase }}
              label="Purchases"
              {...a11yProps(tabs.purchases)}
            />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={tabs.user}>
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
      <TabPanel value={value} index={tabs.practice}>
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
      <TabPanel value={value} index={tabs.courses}>
        <Courses />
      </TabPanel>
      <TabPanel value={value} index={tabs.quiz}>
        <Quiz />
      </TabPanel>
      <TabPanel value={value} index={tabs.discussion}>
        <Discussion />
      </TabPanel>
      <TabPanel value={value} index={tabs.plans}>
        <Plans />
      </TabPanel>
      <TabPanel value={value} index={tabs.purchases}>
        <Purchases />
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
