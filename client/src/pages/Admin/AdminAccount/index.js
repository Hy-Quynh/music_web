import {
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomPopover from "../../../components/CustomPopover";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SwipeableTemporaryDrawer from "./components/ViewUserDrawer";
import AddManagerModal from "./components/AddManagerModal";
import {
  createAdminAccount,
  deleteAdminAccount,
  getAllAdminAccount,
} from "../../../services/admin";
import { toast } from "react-hot-toast";
import { dateTimeConverter } from "../../../utils/utils";

const columns = [
  { id: "stt", label: "#", minWidth: 50 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "created_day",
    label: "Created Date",
    minWidth: 170,
    align: "center",
  },
  {
    id: "action",
    label: "Thao tác",
    align: "center",
  },
];

export default function AdminAccount() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = useState([]);
  const [viewUserData, setViewUserData] = useState({});
  const [visibleUserDrawer, setVisibleUserDrawer] = useState(false);
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [popoverId, setPopoverId] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllAccount = async () => {
    try {
      const listAccount = await getAllAdminAccount();
      if (listAccount?.data?.success) {
        setTableData(listAccount?.data?.payload);
      }
    } catch (error) {
      console.log("get admin account error >>> ", error);
    }
  };

  useEffect(() => {
    getAllAccount();
  }, []);

  const handleCreateManager = async (managerData) => {
    const { email, fullName, password } = managerData;
    const createData = {
      name: fullName,
      email: email,
      password: password,
    };

    const createRes = await createAdminAccount({ ...createData });
    if (createRes?.data?.success) {
      getAllAccount();
      setVisibleAddModal(false);
      toast.success("New successful management staff");
      return { success: true };
    } else {
      toast.error(createRes?.data?.error || "Add new failed management staff");
      return createRes;
    }
  };

  const handleDeleteAccount = async (adminId) => {
    const deleteRes = await deleteAdminAccount(adminId);
    if (deleteRes?.data?.success) {
      getAllAccount();
      toast.success("Delete account successfully");
      setPopoverId("");
    } else {
      toast.error(deleteRes?.data?.error || "Account deletion failed");
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
          Employee Account Management
        </Typography>
        <div>
          <Button variant="contained" onClick={() => setVisibleAddModal(true)}>
            Add new
          </Button>
        </div>
      </Stack>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns?.map((column) => (
                  <TableCell
                    key={column?.id}
                    align={column?.align}
                    style={{ minWidth: column?.minWidth }}
                  >
                    {column?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
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
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                  flexWrap: "nowrap",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => {
                                    setViewUserData(row);
                                    setVisibleUserDrawer(true);
                                  }}
                                  size="small"
                                >
                                  {value}
                                  <RemoveRedEyeIcon />
                                </Button>
                                <CustomPopover
                                  open={popoverId === row._id}
                                  onClose={() => setPopoverId("")}
                                  handleSubmit={() =>
                                    handleDeleteAccount(row._id)
                                  }
                                  noti="Confirm account deletion"
                                >
                                  <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                      if (popoverId === row._id) {
                                        setPopoverId("");
                                      } else {
                                        setPopoverId(row._id);
                                      }
                                    }}
                                    size="small"
                                  >
                                    <DeleteForeverIcon />
                                  </Button>
                                </CustomPopover>
                              </div>
                            ) : column.id === "stt" ? (
                              index + 1
                            ) : column.id === "created_day" ? (
                              dateTimeConverter(value)
                            ) : column.id === "status" ? (
                              value ? (
                                <Chip label="Active" color="success" />
                              ) : (
                                <Chip label="Inactive" color="error" />
                              )
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
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {visibleUserDrawer && (
        <SwipeableTemporaryDrawer
          visible={visibleUserDrawer}
          initData={viewUserData}
          onClose={() => setVisibleUserDrawer(false)}
        />
      )}

      {visibleAddModal && (
        <AddManagerModal
          visible={visibleAddModal}
          onClose={() => setVisibleAddModal(false)}
          handleSubmit={(managerData) => handleCreateManager(managerData)}
        />
      )}
    </>
  );
}
