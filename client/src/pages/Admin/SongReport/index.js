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
import CustomPopover from "../../../components/CustomPopover";
import { toast } from "react-hot-toast";
import {
  deleteReportSong,
  getAllReportSong,
} from "../../../services/songReport";
import { dateTimeConverter } from "../../../utils/utils";

const columns = [
  { id: "stt", label: "#", minWidth: 50, align: "center" },
  {
    id: "user_email",
    label: "Email người báo cáo",
    minWidth: 170,
    align: "left",
  },
  {
    id: "song_name",
    label: "Tên bài hát",
    minWidth: 170,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "reason",
    label: "Lí do báo cáo",
    minWidth: 170,
    maxWidth: 200,
    align: "left",
  },
  {
    id: "created_day",
    label: "Ngày báo cáo",
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

export default function SongReport() {
  const [listSongReport, setListSongReport] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [popoverId, setPopoverId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getListSongReport = async () => {
    try {
      const res = await getAllReportSong();
      if (res?.data?.success) {
        setListSongReport(res?.data?.payload?.songReport);
      }
    } catch (error) {
      console.log("get list song report error >>> ", error);
    }
  };

  useEffect(() => {
    getListSongReport();
  }, []);

  const deleteSongReport = async (reportId) => {
    try {
      const deleteRes = await deleteReportSong(reportId);
      if (deleteRes?.data?.success) {
        toast.success("Xoá báo cáo thành công");
        getListSongReport();
        setPopoverId("");
      } else {
        toast.error(deleteRes?.data?.error || "Xoá báo cáo thất bại");
      }
    } catch (error) {
      toast.error("Xoá báo cáo thất bại");
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
          Quản lí báo cáo bài hát
        </Typography>
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
              {listSongReport
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
                                  handleSubmit={() =>
                                    deleteSongReport(row?._id)
                                  }
                                  noti="Bạn có xác nhận xoá bản báo này?"
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
                            ) : column.id === "created_day" ? (
                              <div>{dateTimeConverter(value)}</div>
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
          count={listSongReport.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
