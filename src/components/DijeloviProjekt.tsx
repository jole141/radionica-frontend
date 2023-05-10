import React, { FC, useEffect, useState } from "react";
import Table from "./Table";
import { CircularProgress } from "@mui/material";

export type IDio = {
  sifra_dijela: string;
  naziv_dijela: string;
  kolicina_dijelova: number;
};

const DijeloviProjekt: FC<{ id: string }> = ({ id }) => {
  const api = "http://localhost:8080/projekti";
  const apiDijelovi = "http://localhost:8080/dijelovi";
  const [tableData, setTableData] = useState<any>([]);
  const [dijelovi, setDijelovi] = useState<any>([]);

  useEffect(() => {
    getData();
    getDijelovi();
  }, [id]);

  const getDijelovi = async () => {
    fetch(apiDijelovi, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        setDijelovi(d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    console.log(id);
    fetch(api + "/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setTableData(d);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewRow = async (values: IDio | any) => {
    await fetch(api + "/dio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sifraDijela: values.naziv_dijela,
        sifraProjekta: id,
        kolicinaDijelova: values.kolicina_dijelova,
      }),
    });
    await getData();
    await getDijelovi();
  };
  const saveRowEdits = async (values: IDio | any) => {
    await fetch(api + "/dio/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sifraDijela: values.sifra_dijela,
        sifraProjekta: id,
        kolicinaDijelova: values.kolicina_dijelova as number,
      }),
    });
    await getData();
    await getDijelovi();
  };
  const deleteRow = async (values: IDio | any) => {
    console.log(values);
    await fetch(api + "/remove/dio", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sifraDijela: values.sifra_dijela,
        sifraProjekta: id,
      }),
    });
    await getData();
    await getDijelovi();
  };

  const columns = [
    {
      accessorKey: "sifra_dijela",
      header: "Sifra dijela",
      enableEditing: false, //disable editing on this column
      enableAdd: false, //disable editing on this column
      size: 80,
    },
    {
      accessorKey: "naziv_dijela",
      header: "Naziv dijela",
      enableEditing: false, //disable editing on this column
      select: true,
      size: 140,
    },
    {
      accessorKey: "kolicina_dijelova",
      header: "Količina dijelova",
      size: 140,
    },
  ];

  return (
    <>
      {!tableData || tableData.length === 0 ? (
        <CircularProgress />
      ) : (
        <Table
          addButton={"Dodaj dio"}
          tableData={tableData!.dijelovi}
          setTableData={setTableData}
          createNewRow={createNewRow}
          saveRowEdits={saveRowEdits}
          deleteRow={deleteRow}
          columnsData={columns}
          selectData={dijelovi}
        />
      )}
    </>
  );
};

export default DijeloviProjekt;
