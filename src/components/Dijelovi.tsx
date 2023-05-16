import React, { FC, useEffect, useState } from "react";
import Table from "./Table";
import { CircularProgress } from "@mui/material";

export type IDio = {
  sifra_dijela: string;
  naziv_dijela: string;
  kolicina_na_lageru: number;
};

const Dijelovi: FC = () => {
  const api = "http://localhost:8080/dijelovi";
  const [tableData, setTableData] = useState<any>([]);

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

  const createNewRow = async (values: IDio | any) => {
    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nazivDio: values.naziv_dijela,
        kolicinaNaLageru: values.kolicina_na_lageru,
      }),
    });
    await getData();
  };
  const saveRowEdits = async (values: IDio | any) => {
    await fetch(api + "/" + values.sifra_dijela, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nazivDio: values.naziv_dijela,
        kolicinaNaLageru: values.kolicina_na_lageru,
      }),
    });
    await getData();
  };
  const deleteRow = async (values: IDio | any) => {
    await fetch(api + "/" + values.sifra_dijela, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await getData();
  };

  const columns = [
    {
      accessorKey: "sifra_dijela",
      header: "Sifra dijela",
      enableAdd: false, //disable add
      enableEditing: false, //disable editing on this column
      size: 80,
    },
    {
      accessorKey: "naziv_dijela",
      header: "Naziv dijela",
      size: 140,
    },
    {
      accessorKey: "kolicina_na_lageru",
      header: "Kolicina na lageru",
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
          tableData={tableData!}
          setTableData={setTableData}
          createNewRow={createNewRow}
          saveRowEdits={saveRowEdits}
          deleteRow={deleteRow}
          columnsData={columns}
          type={"dijelovi"}
        />
      )}
    </>
  );
};

export default Dijelovi;
