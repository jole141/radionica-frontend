import React, { FC, useEffect, useState } from "react";
import Table from "./Table";
import { data, states } from "./makeData";

export type IDio = {
  sifra_dijela: string;
  naziv_dijela: string;
  kolicina_na_lageru: number;
};

const Dijelovi: FC = () => {
  const jwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgyNTIxNjQzLCJleHAiOjE2ODI3ODA4NDN9._UWoi5psa4jy-8rqZejG1DLuqh5zvHU1BGGdVY4WOeI";
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
        Authorization: `Bearer ${jwt}`,
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
        Authorization: `Bearer ${jwt}`,
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
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        nazivDio: values.naziv_dijela,
        kolicinaNaLageru: values.kolicina_na_lageru,
      }),
    });
    await getData();
  };
  const deleteRow = async (values: IDio | any) => {
    await fetch(api + "/" + values.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    await getData();
  };

  const columns = [
    {
      accessorKey: "sifra_dijela",
      header: "Sifra dijela",
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

  if (!tableData || tableData.length === 0) return null;

  return (
    <>
      {!tableData || tableData.length === 0 ? (
        <div>ucitavanje</div>
      ) : (
        <Table
          addButton={"Dodaj dio"}
          tableData={tableData!}
          setTableData={setTableData}
          createNewRow={createNewRow}
          saveRowEdits={saveRowEdits}
          deleteRow={deleteRow}
          columnsData={columns}
        />
      )}
    </>
  );
};

export default Dijelovi;
