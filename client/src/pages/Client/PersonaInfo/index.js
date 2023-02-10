import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Personal from "./components/PersonalInfo";

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

export default function PersonalInfo() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <section
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: "url(img/bg-img/breadcumb3.jpg)" }}
      >
        <div className="bradcumbContent">
          <h2>Trang cá nhân</h2>
        </div>
      </section>

      <div style={{padding: '20px 40px'}}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
              <Tab label="Theo dõi" {...a11yProps(1)} />
              <Tab label="Playlist cá nhân" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Personal />
          </TabPanel>
          <TabPanel value={value} index={1}>
            Theo dõi
          </TabPanel>
          <TabPanel value={value} index={2}>
            Playlist cá nhân
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}