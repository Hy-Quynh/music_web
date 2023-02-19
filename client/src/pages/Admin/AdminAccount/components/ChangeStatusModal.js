import { Chip } from "@mui/material";
import React from "react";
import CustomModal from "../../../../components/CustomModal";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { changeAdminStatus } from "../../../../services/admin";

export default function ChangeStatusModal(props) {
  const handleChangeStatus = async () => {
    try {
      const changeRes = await changeAdminStatus(
        props?.user?._id,
        !props?.user?.status
      );
      if (changeRes?.data?.success) {
        toast.success("Cập nhật trạng thái thành công");
        props.onClose();
        return props.handleChangeStatus(props?.user?._id, !props?.user?.status);
      }
      return toast.error(
        changeRes?.data?.error || "Cập nhật trạng thái thất bại"
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Cập nhật trạng thái thất bại"
      );
    }
  };

  return (
    <CustomModal
      onClose={props.onClose}
      visible={props.visible}
      title={"Change employee status"}
      content={
        <div>
          Employee status change confirmation
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Chip
              label={props?.user?.status ? "Active" : "Inactive"}
              color={props?.user?.status ? "success" : "error"}
            />
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
              <ArrowRightAltIcon />
            </div>
            <Chip
              label={!props?.user?.status ? "Active" : "Inactive"}
              color={!props?.user?.status ? "success" : "error"}
            />
          </div>
        </div>
      }
      action={
        <div>
          <LoadingButton
            autoFocus
            variant="text"
            color="error"
            onClick={() => props.onClose()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            autoFocus
            variant="text"
            onClick={() => handleChangeStatus()}
          >
            Confirm
          </LoadingButton>
        </div>
      }
    />
  );
}
