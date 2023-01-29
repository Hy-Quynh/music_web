import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, TextareaAutosize, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomPopover from "../../../components/CustomPopover";
import CustomModal from "../../../components/CustomModal";
import RTextField from "../../../components/RedditTextField";
import { toast } from "react-hot-toast";
import {
  createNewSinger,
  deleteSingerData,
  getAllSinger,
  updateSinger,
} from "../../../services/singer";
import storage from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const columns = [
  { id: "stt", label: "#", minWidth: 50, align: "center" },
  {
    id: "avatar",
    label: "Avatar",
    minWidth: 170,
    align: "center",
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

export default function AdminSinger() {
  const [listSinger, setListSinger] = useState([]);
  const [addSingerModal, setAddSingerModal] = useState({
    status: false,
    type: "",
  });
  const [editSinger, setEditSinger] = useState({
    singerName: "",
    singerImage: "",
    description: "",
    singerId: -1,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [popoverId, setPopoverId] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getListSinger = async () => {
    try {
      const res = await getAllSinger();
      if (res?.data?.success) {
        setListSinger(res?.data?.payload);
      }
    } catch (error) {
      console.log("get list singer error >>> ", error);
    }
  };

  useEffect(() => {
    getListSinger();
  }, []);

  const handleCreateUpdateSinger = async () => {
    const { singerName, description, singerImage } = editSinger;
    if (
      !singerName.trim().length ||
      !description.trim().length ||
      (addSingerModal.type === "add" && typeof singerImage === "string")
    ) {
      return toast.error("Data can not blank ");
    } else if (singerName.trim().length < 3) {
      return toast.error("Name must be more than 2 characters");
    } else if (description.length <= 10) {
      return toast.error("Description must be more than 10 characters");
    } else {
      let newAvatar = singerImage;
      if (typeof singerImage !== "string") {
        const imageName = "singer-" + new Date().getTime();
        const storageRef = ref(storage, imageName);

        const updateImageRes = await uploadBytes(storageRef, singerImage);
        if (updateImageRes) {
          const pathReference = ref(storage, imageName);
          const url = await getDownloadURL(pathReference);
          newAvatar = url;
        } else {
          return toast.error("Can't upload avatar");
        }
      }

      if (addSingerModal.type === "add") {
        const createRes = await createNewSinger(
          singerName,
          description,
          newAvatar
        );
        if (createRes?.data?.success) {
          toast.success("Add new singer succes");
          getListSinger();
          return setAddSingerModal({ status: false, type: "" });
        } else {
          return toast.error(createRes?.data?.error || "Add new singer failed");
        }
      } else {
        const updateRes = await updateSinger(
          editSinger?.singerId,
          singerName,
          description,
          newAvatar
        );

        if (updateRes?.data?.success) {
          toast.success("Update singer success");
          getListSinger();
          setAddSingerModal({ status: false, type: "" });
        } else {
          toast.error(updateRes?.data?.error || "Update singer failed");
        }
      }
    }
  };

  const deleteSinger = async (singerId) => {
    try {
      const deleteRes = await deleteSingerData(singerId);
      if (deleteRes?.data?.success) {
        toast.success("Delete singer success");
        getListSinger();
        setPopoverId("");
      } else {
        toast.error(deleteRes?.data?.error || "Delete singer failed");
      }
    } catch (error) {
      toast.error("Delete singer failed");
    }
  };

  return (
    <>
      <div>
        <CustomModal
          visible={addSingerModal.status}
          onClose={() =>
            setAddSingerModal({ ...addSingerModal, status: false })
          }
          title={
            addSingerModal.type === "add" ? "Add new singer" : "Update singer"
          }
          content={
            <>
              <RTextField
                label="Name"
                defaultValue={editSinger.singerName || ""}
                id="post-title"
                variant="filled"
                style={{ marginTop: 11, textAlign: "left" }}
                onChange={(event) =>
                  setEditSinger({
                    ...editSinger,
                    singerName: event.target.value,
                  })
                }
              />

              <Typography
                variant="p"
                component="p"
                sx={{
                  fontSize: "17px",
                  color: "black",
                  marginBottom: "-10px",
                  marginTop: "10px",
                }}
              >
                Avatar:
              </Typography>
              <RTextField
                defaultValue=""
                id="post-title"
                variant="filled"
                style={{ marginTop: 11 }}
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setEditSinger({
                    ...editSinger,
                    singerImage: event.target.files[0],
                  });
                }}
              />

              <TextareaAutosize
                defaultValue={editSinger.description || ""}
                aria-label="minimum height"
                minRows={10}
                placeholder="Description"
                style={{ width: "100%", marginTop: "20px", padding: "10px" }}
                onChange={(event) =>
                  setEditSinger({
                    ...editSinger,
                    description: event.target.value,
                  })
                }
              />
            </>
          }
          action={
            <LoadingButton
              autoFocus
              onClick={async() => {
                setSubmitLoading(true)
                await handleCreateUpdateSinger();
                setSubmitLoading(false)
              }}
              loading={submitLoading}
            >
              {addSingerModal.type === "add" ? "Add new" : "Update"}
            </LoadingButton>
          }
        />
      </div>
      <Stack
        flexWrap={"nowrap"}
        flexDirection="row"
        justifyContent={"space-between"}
        sx={{ marginBottom: "20px" }}
      >
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          Manage singer
        </Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setEditSinger({
                singerName: "",
                description: "",
                singerImage: "",
              });
              setAddSingerModal({ status: true, type: "add" });
            }}
          >
            Add new
          </Button>
        </div>
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listSinger
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "action" ? (
                              <Stack
                                flexDirection={"row"}
                                justifyContent="center"
                              >
                                <CustomPopover
                                  open={popoverId === row?._id}
                                  onClose={() => setPopoverId("")}
                                  handleSubmit={() => deleteSinger(row?._id)}
                                  noti="Are you sure you want to delete the singer?"
                                >
                                  <Button
                                    color="error"
                                    variant="contained"
                                    size="small"
                                    onClick={() => {
                                      if (popoverId === row?._id) {
                                        setPopoverId("");
                                      } else {
                                        setPopoverId(row?._id);
                                      }
                                    }}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </CustomPopover>
                                <Button
                                  variant="contained"
                                  size="small"
                                  onClick={() => {
                                    setEditSinger({
                                      singerName: row?.name,
                                      singerImage: row?.avatar,
                                      description: row?.description,
                                      singerId: row?._id,
                                    });
                                    setAddSingerModal({
                                      status: true,
                                      type: "update",
                                    });
                                  }}
                                >
                                  <SettingsIcon />
                                </Button>
                              </Stack>
                            ) : column.id === "stt" ? (
                              <div
                                style={{
                                  textAlign: "center",
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                {index + 1}
                              </div>
                            ) : column.id === "name" ? (
                              <div style={{ fontWeight: 600 }}>{value}</div>
                            ) : column.id === "description" ? (
                              <div
                                style={{
                                  maxWidth: "200px",
                                  overflowWrap: "anywhere",
                                }}
                              >
                                {value}
                              </div>
                            ) : column.id === "avatar" ? (
                              <img src={value} alt="avatar" width={70} height={70}/>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={listSinger.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
