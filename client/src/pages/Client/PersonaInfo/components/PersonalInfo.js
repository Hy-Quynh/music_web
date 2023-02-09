import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import RTextField from "../../../../components/RedditTextField";
import { getUserById, updateUserInfo } from "../../../../services/user";
import { RANK_ENUM, USER_KEY } from "../../../../utils/constants";
import { formaDateInput, parseJSON } from "../../../../utils/utils";

export default function Personal() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    birdthday: "",
  });
  const userData = parseJSON(localStorage.getItem(USER_KEY), {});

  const getUserInfo = async () => {
    try {
      const result = await getUserById(userData?._id);
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
    if (userData?._id) {
      getUserInfo();
    }
  }, []);

  const handleUpdateUserInfo = async () => {
    try {
      if (userData?._id) {
        const { email, name, birdthday } = userInfo;
        if (!email?.trim()) {
          return toast.error("Email không thể bỏ trống");
        }

        const result = await updateUserInfo(
          userData?._id,
          name,
          email,
          birdthday
        );
        if (result?.data?.success) {
          return toast.success("Cập nhật thông tin thành công");
        }
        return toast.error(result?.data?.error || "Cập nhật thất bại");
      }
      toast.error("Cập nhật thất bại");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Cập nhật thất bại");
    }
  };

  return (
    <div>
      <RTextField
        label="Hạng thành viên"
        defaultValue=""
        id="rank"
        variant="filled"
        style={{ marginTop: 11, width: "100%" }}
        value={RANK_ENUM[userInfo?.rank] || ""}
        sx={{
          ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
            marginTop: "12px",
          },
        }}
        disabled={true}
      />

      <RTextField
        label="Email"
        defaultValue=""
        id="email"
        variant="filled"
        style={{ marginTop: 11, width: "100%" }}
        value={userInfo?.email || ""}
        sx={{
          ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
            marginTop: "12px",
          },
        }}
        onChange={(event) => {
          setUserInfo({ ...userInfo, email: event.target.value });
        }}
      />

      <RTextField
        label="Tên"
        defaultValue=""
        id="name"
        variant="filled"
        style={{ marginTop: 11, width: "100%" }}
        value={userInfo?.name || ""}
        sx={{
          ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
            marginTop: "12px",
          },
        }}
        onChange={(event) => {
          setUserInfo({ ...userInfo, name: event.target.value });
        }}
      />

      <RTextField
        label="Ngày sinh"
        defaultValue=""
        id="birdthday"
        variant="filled"
        style={{ marginTop: 11, width: "100%" }}
        value={userInfo?.birdthday}
        sx={{
          ".css-10botns-MuiInputBase-input-MuiFilledInput-input": {
            marginTop: "12px",
          },
        }}
        type="date"
        onChange={(event) => {
          setUserInfo({
            ...userInfo,
            birdthday: event.target.value,
          });
        }}
      />

      <Box sx={{ marginTop: "30px", display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          sx={{ color: "white !important" }}
          onClick={() => handleUpdateUserInfo()}
        >
          Cập nhật
        </Button>
      </Box>
    </div>
  );
}
