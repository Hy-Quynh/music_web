import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomPopover from "../../../components/CustomPopover";
import { toast } from "react-hot-toast";
import storage from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteSongData, getAllSong, updateSong } from "../../../services/song";
import ControlMusicModal from "./components/ControlMusicModal";
import { createNewSong } from "../../../services/song";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayMusicModal from "./components/PlayMusicModal";

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
    id: "country_name",
    label: "Country",
    minWidth: 170,
    align: "left",
  },
  {
    id: "category_name",
    label: "Category",
    minWidth: 170,
    align: "left",
  },
  {
    id: "album_name",
    label: "Album",
    minWidth: 170,
    align: "left",
  },
  {
    id: "singer",
    label: "Singer",
    minWidth: 170,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

export default function AdminSong() {
  const [listSong, setListSong] = useState([]);
  const [addSongModal, setAddSongModal] = useState({
    status: false,
    type: "",
  });
  const [editSong, setEditSong] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [popoverId, setPopoverId] = useState("");
  const [visiblePlayMusic, setVisiblePlayMusic] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getListSong = async () => {
    try {
      const res = await getAllSong();
      if (res?.data?.success) {
        setListSong(res?.data?.payload);
      }
    } catch (error) {
      console.log("get list song error >>> ", error);
    }
  };

  useEffect(() => {
    getListSong();
  }, []);

  const handleCreateUpdateSong = async (songData) => {
    try {
      const {
        avatar,
        category_id,
        description,
        link,
        name,
        country_id,
        singer,
      } = songData;

      if (
        !name?.trim()?.length ||
        !description?.trim()?.length ||
        category_id === -1 ||
        country_id === -1 ||
        (typeof avatar === "string" && !avatar?.length) ||
        (typeof link === "string" && !link?.length) ||
        !singer?.length
      ) {
        return toast.error("Data can not blank ");
      }

      let newAvatar = avatar;
      if (typeof avatar !== "string") {
        const imageName = "song-avatar-" + new Date().getTime();
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

      let newLink = link;
      if (typeof link !== "string") {
        const songLink = "song-link-" + new Date().getTime();
        const storageRef = ref(storage, songLink);

        const updateImageRes = await uploadBytes(storageRef, link);
        if (updateImageRes) {
          const pathReference = ref(storage, songLink);
          const url = await getDownloadURL(pathReference);
          newLink = url;
        } else {
          return toast.error("Can't upload song");
        }
      }

      if (addSongModal?.type === "add") {
        const song = {
          ...songData,
          avatar: newAvatar,
          link: newLink,
        };
        const createRes = await createNewSong(song);
        if (createRes?.data?.success) {
          toast.success("Add new song success");
          getListSong();
          return setAddSongModal({ status: false, type: "" });
        } else {
          return toast.error(createRes?.data?.error || "Add new song failed");
        }
      }

      if (addSongModal?.type === "update") {
        const song = {
          ...songData,
          avatar: newAvatar,
          link: newLink,
        };
        const updateRes = await updateSong(editSong?._id, song);
        if (updateRes?.data?.success) {
          toast.success("Update song succes");
          getListSong();
          return setAddSongModal({ status: false, type: "" });
        } else {
          return toast.error(updateRes?.data?.error || "Update song failed");
        }
      }
    } catch (error) {
      console.log("Create update song error >>> ", error);
    }
  };

  const deleteSong = async (songId) => {
    try {
      const deleteRes = await deleteSongData(songId);
      if (deleteRes?.data?.success) {
        toast.success("Delete song success");
        getListSong();
        setPopoverId("");
      } else {
        toast.error(deleteRes?.data?.error || "Delete song failed");
      }
    } catch (error) {
      toast.error("Delete song failed");
    }
  };

  return (
    <>
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
          Manage song
        </Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setEditSong({});
              setAddSongModal({ status: true, type: "add" });
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
              {listSong
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
                                  handleSubmit={() => deleteSong(row?._id)}
                                  noti="Are you sure you want to delete the song?"
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
                                    setEditSong({ ...row });
                                    setAddSongModal({
                                      status: true,
                                      type: "update",
                                    });
                                  }}
                                >
                                  <SettingsIcon />
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  color="success"
                                  onClick={() => {
                                    setEditSong({ ...row });
                                    setVisiblePlayMusic(true);
                                  }}
                                >
                                  <VolumeUpIcon />
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
                            ) : column.id === "avatar" ? (
                              <img
                                src={value}
                                alt="avatar"
                                width={70}
                                height={70}
                              />
                            ) : column.id === "singer" ? (
                              <div>
                                {value?.length
                                  ? value.map((item) => item.name).join(",")
                                  : ""}
                              </div>
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
          count={listSong.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {addSongModal?.status && (
        <ControlMusicModal
          visible={addSongModal?.status}
          onClose={() => setAddSongModal({ status: false, type: "" })}
          type={addSongModal?.type}
          handleCreateUpdateSong={(songData) =>
            handleCreateUpdateSong(songData)
          }
          editSong={editSong}
        />
      )}

      {visiblePlayMusic && (
        <PlayMusicModal
          musicData={editSong}
          onClose={() => setVisiblePlayMusic(false)}
          visible={visiblePlayMusic}
        />
      )}
    </>
  );
}
