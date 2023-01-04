import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomModal from "../../../../components/CustomModal";
import LoadingButton from "@mui/lab/LoadingButton";
import { COPPER_RANK, RANK_LIST } from "../../../../utils/constants";
import { toast } from "react-hot-toast";
import { changeUserRank } from "../../../../services/user";

export default function ChangeRankModal(props) {
  const [currentRank, setCurrentRank] = useState(() => {
    if (!props?.user?.rank) return COPPER_RANK;
    return props?.user?.rank;
  });

  useEffect(() => {
    if (!props?.user?.rank) setCurrentRank(COPPER_RANK);
    else {
      setCurrentRank(props?.user?.rank);
    }
  }, [props?.user]);

  const handleChangeRank = async () => {
    try {
      const changeRes = await changeUserRank(props?.user?._id, currentRank);
      if (changeRes?.data?.success) {
        toast.success("Change status success");
        props.onClose();
        return props.handleChangeRank(props?.user?._id, currentRank);
      }
      return toast.error(changeRes?.data?.error || "Change status failed");
    } catch (error) {
      toast.error(error?.data?.error || "Change rank failed");
    }
  };

  return (
    <CustomModal
      onClose={props.onClose}
      visible={props.visible}
      title={"Customer class change"}
      content={
        <div>
          <div>Customer class change confirmation</div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            {RANK_LIST?.map((item) => {
              return (
                <div
                  key={item}
                  onClick={() => {
                    if (item !== currentRank) setCurrentRank(item);
                  }}
                >
                  <Chip
                    sx={{ cursor: "pointer" }}
                    label={item}
                    color="primary"
                    variant={currentRank === item ? "filled" : "outlined"}
                  />
                </div>
              );
            })}
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
            onClick={() => handleChangeRank()}
          >
            Confirm
          </LoadingButton>
        </div>
      }
    />
  );
}
