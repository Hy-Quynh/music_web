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
  createNewAlbum,
  deleteAlbumData,
  getAllAlbum,
  updateAlbum,
} from "../../../services/album";
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

export default function AdminAlbum() {
  const [listAlbum, setListAlbum] = useState([]);
  const [addAlbumModal, setAddAlbumModal] = useState({
    status: false,
    type: "",
  });
  const [editAlbum, setEditAlbum] = useState({
    albumName: "",
    description: "",
    avatar: "",
    albumId: -1,
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

  const getListAlbum = async () => {
    try {
      const res = await getAllAlbum();
      if (res?.data?.success) {
        setListAlbum(res?.data?.payload?.album);
      }
    } catch (error) {
      console.log("get list brand error >>> ", error);
    }
  };

  useEffect(() => {
    getListAlbum();
  }, []);

  const handleCreateUpdateAlbum = async () => {
    const { albumName, description, avatar } = editAlbum;
    if (
      !albumName.trim().length ||
      !description.trim().length ||
      (typeof avatar === "string" && !avatar?.length)
    ) {
      return toast.error("Data can not blank ");
    } else if (albumName.trim().length <= 3) {
      return toast.error("Name must be more than 3 characters");
    } else if (description.length <= 10) {
      return toast.error("Description must be more than 10 characters");
    } else {
      let newAvatar = avatar;
      if (typeof avatar !== "string") {
        const imageName = "album-" + new Date().getTime();
        const storageRef = ref(storage, imageName);

        const updateImageRes = await uploadBytes(storageRef, avatar);
        if (updateImageRes) {
          const pathReference = ref(storage, imageName);
          const url = await getDownloadURL(pathReference);
          newAvatar = url;
        } else {
          return toast.error("Can't upload avatar");
        }
      }

      if (addAlbumModal.type === "add") {
        const createRes = await createNewAlbum(
          albumName,
          description,
          newAvatar
        );
        if (createRes?.data?.success) {
          toast.success("Add new album succes");
          getListAlbum();
          return setAddAlbumModal({ status: false, type: "" });
        } else {
          return toast.error(createRes?.data?.error || "Add new album failed");
        }
      } else {
        const updateRes = await updateAlbum(
          editAlbum?.albumId,
          albumName,
          description,
          newAvatar
        );

        if (updateRes?.data?.success) {
          toast.success("Update album success");
          getListAlbum();
          setAddAlbumModal({ status: false, type: "" });
        } else {
          toast.error(updateRes?.data?.error || "Update album failed");
        }
      }
    }
  };

  const deleteAlbum = async (albumId) => {
    try {
      const deleteRes = await deleteAlbumData(albumId);
      if (deleteRes?.data?.success) {
        toast.success("Delete album success");
        getListAlbum();
        setPopoverId("");
      } else {
        toast.error(deleteRes?.data?.error || "Delete album failed");
      }
    } catch (error) {
      toast.error("Delete album failed");
    }
  };

  return (
    <>
      <div>
        <CustomModal
          visible={addAlbumModal.status}
          onClose={() => setAddAlbumModal({ ...addAlbumModal, status: false })}
          title={
            addAlbumModal.type === "add" ? "Add new album" : "Update album"
          }
          content={
            <>
              <RTextField
                label="Name"
                defaultValue={editAlbum.albumName || ""}
                id="post-title"
                variant="filled"
                style={{ marginTop: 11, textAlign: "left" }}
                onChange={(event) =>
                  setEditAlbum({
                    ...editAlbum,
                    albumName: event.target.value,
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
                  setEditAlbum({
                    ...editAlbum,
                    avatar: event.target.files[0],
                  });
                }}
              />

              <TextareaAutosize
                defaultValue={editAlbum.description || ""}
                aria-label="minimum height"
                minRows={10}
                placeholder="Description"
                style={{ width: "100%", marginTop: "20px", padding: "10px" }}
                onChange={(event) =>
                  setEditAlbum({
                    ...editAlbum,
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
                setSubmitLoading(true);
                await handleCreateUpdateAlbum();
                setSubmitLoading(false);
              }}
              loading={submitLoading}
            >
              {addAlbumModal.type === "add" ? "Add new" : "Update"}
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
          Manage Album
        </Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setEditAlbum({ albumName: "", description: "", avatar: "" });
              setAddAlbumModal({ status: true, type: "add" });
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
              {listAlbum
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
                                  handleSubmit={() => deleteAlbum(row?._id)}
                                  noti="Are you sure you want to delete the album?"
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
                                    setEditAlbum({
                                      albumName: row?.name,
                                      description: row?.description,
                                      avatar: row?.avatar,
                                      albumId: row?._id,
                                    });
                                    setAddAlbumModal({
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
                              <img
                                src={value}
                                alt="avatar"
                                width={70}
                                height={70}
                              />
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
          count={listAlbum.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}