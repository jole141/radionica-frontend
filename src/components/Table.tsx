import React, { FC, useCallback, useMemo, useState } from "react";
import MaterialReactTable, {
  type MaterialReactTableProps,
  type MRT_Cell,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { data, states } from "./makeData";
import { validate } from "../validate";

type DataType = (typeof data)[0];

interface Props {
  addButton: string;
  tableData: DataType[];
  setTableData: React.Dispatch<React.SetStateAction<DataType[]>>;
  createNewRow: (values: DataType) => void;
  saveRowEdits: (values: DataType) => void;
  deleteRow: (row: MRT_Row<DataType>) => void;
  columnsData: any[];
  selectData?: any[];
  type: string;
  idMaster?: string;
}

const Table: FC<Props> = ({
  addButton,
  tableData,
  setTableData,
  deleteRow,
  saveRowEdits,
  createNewRow,
  columnsData,
  selectData = [],
  type,
  idMaster = undefined,
}) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const handleCreateNewRow = async (values: DataType) => {
    const errors = await validate(values, type);
    if (Object.keys(errors).length) {
      setValidationErrors(errors);
      return false;
    } else {
      createNewRow(values);
      tableData.push(values);
      setTableData([...tableData]);
      return true;
    }
  };

  const handleSaveRowEdits: MaterialReactTableProps<DataType>["onEditingRowSave"] =
    async ({ exitEditingMode, row, values }) => {
      setValidationErrors({});
      const errors = await validate(values, type, true, idMaster);
      if (!Object.keys(errors).length) {
        tableData[row.index] = values;
        // TODO
        saveRowEdits(values);
        // edit row from table row.index
        // update table data
        setTableData([...tableData]);
        exitEditingMode(); //required to exit editing mode and close modal
      } else {
        setValidationErrors(errors);
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row: MRT_Row<DataType>) => {
      // TODO
      deleteRow(tableData[row.index]);
      // delete row from table row.index
      // update table data
    },
    [tableData]
  );

  // TODO: validation functions
  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<DataType>
    ): MRT_ColumnDef<DataType>["muiTableBodyCellEditTextFieldProps"] => {
      // separate cell_id by "_" and remove only the first part and join the rest
      const column = cell.id.split("_").slice(1).join("_");
      return {
        error: !!validationErrors[column!],
        helperText: validationErrors[column!],
      };
    },
    [validationErrors]
  );

  const columns = useMemo<MRT_ColumnDef<DataType>[]>(
    () =>
      columnsData.map((column) => ({
        ...column,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      })),
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            {addButton}
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        addButton={addButton}
        selectData={selectData}
        validationErrors={validationErrors}
        clearErrors={() => setValidationErrors({})}
      />
    </>
  );
};

interface CreateModalProps {
  columns: MRT_ColumnDef<DataType>[];
  onClose: () => void;
  onSubmit: (values: DataType) => Promise<void>;
  open: boolean;
  addButton: string;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  addButton,
  validationErrors,
  clearErrors,
  selectData = [],
}: CreateModalProps) => {
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );

  const handleSubmit = async () => {
    // TODO: validation
    //put your validation logic here
    const valid = await onSubmit(values);
    if (valid) {
      clearErrors();
      onClose();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">{addButton}</DialogTitle>
      <DialogContent>
        <form
          style={{ margin: "2rem 1rem" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns
              .filter((c) => c.enableAdd == undefined || c.enableAdd)
              .map((column) => {
                if (column.select) {
                  return (
                    <TextField
                      key={column.accessorKey}
                      name={column.accessorKey}
                      label={column.header}
                      select
                      error={validationErrors[column.accessorKey]}
                      helperText={validationErrors[column.accessorKey]}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      {selectData.map((item, indx) => (
                        <MenuItem key={indx} value={item.sifra_dijela}>
                          {item.naziv_dijela}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }

                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    error={validationErrors[column.accessorKey]}
                    helperText={validationErrors[column.accessorKey]}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                );
              })}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            clearErrors();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          {addButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age: number) => age >= 18 && age <= 50;

export default Table;
