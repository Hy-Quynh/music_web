import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../services/user";
import {
  checkUserFollower,
  createUserFollow,
  deleteUserFollow,
} from "../../../services/user-follow";
import { USER_KEY } from "../../../utils/constants";
import { formaDateInput, parseJSON } from "../../../utils/utils";
import "./style.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Personal from "./components/PersonalInfo";
import PersonalPlaylist from "./components/PlaylistList";
import { toast } from "react-hot-toast";
import CustomModal from "../../../components/CustomModal";
import LoadingButton from "@mui/lab/LoadingButton";

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

export default function MemberDetail() {
  const [userInfo, setUserInfo] = useState({});
  const [memberHaveFollow, setMemberHaveFollow] = useState(false);
  const { id } = useParams();
  const userData = parseJSON(localStorage.getItem(USER_KEY), {});
  const [tabValue, setTabValue] = React.useState(0);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const checkMemberFollow = async () => {
    try {
      const result = await checkUserFollower(userData?._id, id);
      if (result?.data?.success) {
        setMemberHaveFollow(result?.data?.payload);
      }
    } catch (error) {
      console.log("check member follow error >>> ", error);
    }
  };

  const getUserInfo = async () => {
    try {
      const result = await getUserById(id);
      if (result?.data?.success) {
        setUserInfo({
          ...result?.data?.payload,
          birdthday: formaDateInput(result?.data?.payload?.birdthday),
        });
      }
    } catch (error) {
      console.log("get user info error >>> ", error);
    }
  };

  useEffect(() => {
    getUserInfo();
    checkMemberFollow();
  }, []);

  const handleUserFollower = async () => {
    try {
      let result = false;
      if (memberHaveFollow) {
        result = await deleteUserFollow(userData?._id, id);
      } else {
        result = await createUserFollow(userData?._id, id);
      }

      if (result?.data?.success) {
        checkMemberFollow();
        setVisibleConfirmModal(false);
        return toast.success("Xử lí tác vụ thành công");
      }
      return toast.error("Xử lí tác vụ thất bại");
    } catch (error) {
      return toast.error("Xử lí yêu cầu thất bại");
    }
  };

  return (
    <div>
      {visibleConfirmModal && (
        <CustomModal
          visible={visibleConfirmModal}
          onClose={() => {
            setVisibleConfirmModal(false);
          }}
          title={"Báo cáo bài hát"}
          content={
            <div style={{ minWidth: "400px", textAlign: "center" }}>
              Xác nhận thực hiện tác vụ
            </div>
          }
          action={
            <LoadingButton
              autoFocus
              onClick={() => {
                handleUserFollower();
              }}
            >
              {"Xác nhận"}
            </LoadingButton>
          }
        />
      )}

      <section
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: "url(/img/bg-img/breadcumb3.jpg)" }}
      >
        <div className="bradcumbContent">
          <h2>Chi tiết thành viên</h2>
        </div>
      </section>

      <div className="member-detail-head">
        <div className="left">
          <div className="member-avatar">{userInfo?.email?.[0] || "!"}</div>
        </div>
        <div className="right">
          <div className="member-email">{userInfo?.email}</div>
          <div className="member-control">
            <div>
              <button
                onClick={() => setVisibleConfirmModal(true)}
                style={{ cursor: "pointer" }}
              >
                {memberHaveFollow ? "Huỷ theo dõi" : "Theo dõi"}
              </button>
            </div>
            <div>
              <button style={{ cursor: "pointer" }}>Nhắn tin</button>
            </div>
            <div>
              <button style={{ cursor: "pointer" }}>Báo cáo thành viên</button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 50px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
              <Tab label="Playlist cá nhân" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Personal userId={id} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <PersonalPlaylist userId={id} />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
