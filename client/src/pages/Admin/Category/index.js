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
  createNewCategory,
  deleteCategoryData,
  getAllCategory,
  updateCategory,
} from "../../../services/category";

const columns = [
  { id: "stt", label: "#", minWidth: 50, align: "center" },
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

export default function AdminCategory() {
  const [listCategory, setListCategory] = useState([]);
  const [addCategoryModal, setAddCategoryModal] = useState({
    status: false,
    type: "",
  });
  const [editCategory, setEditCategory] = useState({
    categoryName: "",
    description: "",
    categoryId: -1,
  });
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

  const getListCategory = async () => {
    try {
      const res = await getAllCategory();
      if (res?.data?.success) {
        setListCategory(res?.data?.payload?.category);
      }
    } catch (error) {
      console.log("get list category error >>> ", error);
    }
  };

  useEffect(() => {
    getListCategory();
  }, []);

  const handleCreateUpdateCategory = async () => {
    const { categoryName, description } = editCategory;
    if (!categoryName.trim().length || !description.trim().length) {
      return toast.error("Data can not blank ");
    } else if (categoryName.trim().length <= 3) {
      return toast.error("Name must be more than 3 characters");
    } else if (description.length <= 10) {
      return toast.error("Description must be more than 10 characters");
    } else {
      if (addCategoryModal.type === "add") {
        const createRes = await createNewCategory(
          categoryName,
          description
        );
        if (createRes?.data?.success) {
          toast.success("Add new category succes");
          getListCategory();
          return setAddCategoryModal({ status: false, type: "" });
        } else {
          return toast.error(
            createRes?.data?.error || "Add new category failed"
          );
        }
      } else {
        const updateRes = await updateCategory(
          editCategory?.categoryId,
          categoryName,
          description
        );

        if (updateRes?.data?.success) {
          toast.success("Update category success");
          getListCategory();
          setAddCategoryModal({ status: false, type: "" });
        } else {
          toast.error(updateRes?.data?.error || "Update category failed");
        }
      }
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const deleteRes = await deleteCategoryData(categoryId);
      if (deleteRes?.data?.success) {
        toast.success("Delete category success");
        getListCategory();
        setPopoverId("");
      } else {
        toast.error(deleteRes?.data?.error || "Delete category failed");
      }
    } catch (error) {
      toast.error("Delete category failed");
    }
  };

  return (
    <>
      <div>
        <CustomModal
          visible={addCategoryModal.status}
          onClose={() =>
            setAddCategoryModal({ ...addCategoryModal, status: false })
          }
          title={
            addCategoryModal.type === "add"
              ? "Add new category"
              : "Update category"
          }
          content={
            <>
              <RTextField
                label="Name"
                defaultValue={editCategory.categoryName || ""}
                id="post-title"
                variant="filled"
                style={{ marginTop: 11, textAlign: "left" }}
                onChange={(event) =>
                  setEditCategory({
                    ...editCategory,
                    categoryName: event.target.value,
                  })
                }
              />

              <TextareaAutosize
                defaultValue={editCategory.description || ""}
                aria-label="minimum height"
                minRows={10}
                placeholder="Description"
                style={{ width: "100%", marginTop: "20px", padding: "10px" }}
                onChange={(event) =>
                  setEditCategory({
                    ...editCategory,
                    description: event.target.value,
                  })
                }
              />
            </>
          }
          action={
            <LoadingButton
              autoFocus
              onClick={() => {
                handleCreateUpdateCategory();
              }}
            >
              {addCategoryModal.type === "add" ? "Add new" : "Update"}
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
          Manage categories
        </Typography>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setEditCategory({ categoryName: "", description: "" });
              setAddCategoryModal({ status: true, type: "add" });
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
              {listCategory
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
                                  handleSubmit={() => deleteCategory(row?._id)}
                                  noti="Are you sure you want to delete the category?"
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
                                    setEditCategory({
                                      categoryName: row?.name,
                                      description: row?.description,
                                      categoryId: row?._id,
                                    });
                                    setAddCategoryModal({
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
          count={listCategory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
