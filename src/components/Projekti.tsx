import React, { FC, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DijeloviProjekt from "./DijeloviProjekt";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { validate } from "../validate";

const Projekti: FC = () => {
  const api = "http://localhost:8080/projekti";
  const [tableData, setTableData] = useState<any>([]);
  const [index, setIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpen2, setModalOpen2] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setTableData(d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = async () => {
    await fetch(api + "/" + tableData[index].sifra_projekta, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await getData();
    setIndex(0);
  };

  const columnsProjekti = [
    {
      accessorKey: "sifra_projekta",
      header: "Sifra projekta",
      enableAdd: false, //disable add
      enableEditing: false, //disable editing on this column
      size: 80,
    },
    {
      accessorKey: "naziv_projekta",
      header: "Naziv projekta",
      size: 140,
    },
    {
      accessorKey: "opis_projekta",
      header: "Opis projekta",
      size: 500,
    },
    {
      accessorKey: "datum_pocetka",
      header: "Datum početka",
      size: 140,
    },
    {
      accessorKey: "datum_završetka",
      header: "Datum završetka",
      size: 140,
    },
  ];

  return (
    <>
      {!tableData || tableData.length === 0 ? (
        <CircularProgress />
      ) : (
        <>
          <CreateNewAccountModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            columns={columnsProjekti}
            getData={getData}
            data={tableData[index]}
          />
          <CreateNewAccountModal
            edit
            open={modalOpen2}
            onClose={() => setModalOpen2(false)}
            columns={columnsProjekti}
            getData={getData}
            data={tableData[index]}
            id={tableData[index].sifra_projekta}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              <Button
                color="primary"
                sx={{ marginRight: "0.5rem" }}
                onClick={() => setIndex(index - 1)}
                variant="contained"
                disabled={index === 0}
              >
                Prethodni
              </Button>
              <Button
                color="primary"
                onClick={() => setIndex(index + 1)}
                variant="contained"
                disabled={index === tableData.length - 1}
              >
                Sljedeci
              </Button>
            </span>
            <span>
              <Button
                color="primary"
                sx={{ marginRight: "0.5rem" }}
                onClick={() => setModalOpen(true)}
                variant="contained"
              >
                Dodaj novi projekt
              </Button>
              <Button
                color="primary"
                sx={{ marginRight: "0.5rem" }}
                onClick={() => setModalOpen2(true)}
                variant="contained"
              >
                Uredi projekt
              </Button>
              <Button
                color="error"
                sx={{ marginRight: "0.5rem" }}
                onClick={() => deleteData()}
                variant="contained"
              >
                Izbrisi projekt
              </Button>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                height: "2.5rem",
              }}
            >
              <strong>Sifra projekta:</strong>
              <p>{tableData[index].sifra_projekta}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                height: "2.5rem",
              }}
            >
              <strong>Naziv projekta:</strong>
              <p>{tableData[index].naziv_projekta}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                height: "2.5rem",
              }}
            >
              <strong>Opis projekta:</strong>
              <p>{tableData[index].opis_projekta}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                height: "2.5rem",
              }}
            >
              <strong>Datum početka:</strong>
              <p>
                {new Date(tableData[index].datum_pocetka).toLocaleDateString(
                  "hr-HR"
                )}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                height: "2.5rem",
              }}
            >
              <strong>Datum završetka:</strong>
              <p>
                {new Date(tableData[index].datum_završetka).toLocaleDateString(
                  "hr-HR"
                )}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
                alignItems: "center",
                height: "2.5rem",
              }}
            >
              <strong>Dijelovi:</strong>
            </div>
          </div>
          <div>
            <DijeloviProjekt id={tableData[index].sifra_projekta} />
          </div>
        </>
      )}
    </>
  );
};

export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  getData,
  edit = false,
  data,
  id,
}: any) => {
  const api = "http://localhost:8080/projekti";
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});
  const [values, setValues] = useState<any>(() =>
    columns.reduce((acc, column) => {
      if (edit) {
        if (column.accessorKey.includes("datum")) {
          acc[column.accessorKey ?? ""] =
            data[column.accessorKey ?? ""].split("T")[0];
        } else {
          acc[column.accessorKey ?? ""] = data[column.accessorKey ?? ""];
        }

        return acc;
      }
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any)
  );

  const clearErrors = () => {
    setValidationErrors({});
  };

  const handleSubmit = async () => {
    clearErrors();
    const errors = await validate(values, "projekti");
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    if (edit) {
      await fetch(api + "/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nazivProjekta: values.naziv_projekta,
          opisProjekta: values.opis_projekta,
          datumPocetka: values.datum_pocetka,
          datumZavršetka: values.datum_završetka,
        }),
      });
    } else {
      //put your validation logic here
      await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nazivProjekta: values.naziv_projekta,
          opisProjekta: values.opis_projekta,
          datumPocetka: values.datum_pocetka,
          datumZavršetka: values.datum_završetka,
        }),
      });
    }
    await getData();
    const defaultValues = helper();
    setValues(defaultValues);
    onClose();
  };

  const helper = () => {
    return columns.reduce((acc, column) => {
      if (edit) {
        if (column.accessorKey.includes("datum")) {
          acc[column.accessorKey ?? ""] =
            data[column.accessorKey ?? ""].split("T")[0];
        } else {
          acc[column.accessorKey ?? ""] = data[column.accessorKey ?? ""];
        }

        return acc;
      }
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as any);
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {edit ? "Uredi projekt" : "Dodaj novi projekt"}
      </DialogTitle>
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
                if (
                  column.accessorKey === "datum_pocetka" ||
                  column.accessorKey === "datum_završetka"
                ) {
                  return (
                    <>
                      <p style={{ margin: "0" }}>{column.header}</p>
                      <TextField
                        type="date"
                        key={column.accessorKey}
                        name={column.accessorKey}
                        error={!!validationErrors[column.accessorKey]}
                        helperText={validationErrors[column.accessorKey]}
                        value={values[column.accessorKey]}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </>
                  );
                }

                return (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    error={!!validationErrors[column.accessorKey]}
                    helperText={validationErrors[column.accessorKey]}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                    value={values[column.accessorKey]}
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
            const defaultValues = helper();
            setValues(defaultValues);
          }}
        >
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          {edit ? "Uredi projekt" : "Dodaj novi projekt"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Projekti;
