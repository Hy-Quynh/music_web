import { Button } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function UploadMusic() {
  const [visibleCreatePlModal, setVisibleCreatePlModal] = useState(false);

  return (
    <div>
      <div style={{ paddingLeft: "20px" }}>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          onClick={() => {
            setVisibleCreatePlModal(true);
          }}
        >
          Upload bài nhạc
        </Button>
      </div>
    </div>
  );
}
