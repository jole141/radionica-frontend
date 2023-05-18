const { validate } = require("./helpers/validationHelper.js");

describe("Validacija", () => {
  it("Validni dio", async () => {
    const test = await validate(
      { naziv_dijela: "test", kolicina_na_lageru: 10 },
      "dijelovi"
    );
    expect(test.naziv_dijela).toBe(undefined);
  });

  it("Naziv dijela je obavezan", async () => {
    const test = await validate(
      { naziv_dijela: "", kolicina_na_lageru: 10 },
      "dijelovi"
    );
    expect(test.naziv_dijela).toBe("Naziv dijela je obavezan");
  });

  it("Naziv dijela mora biti string", async () => {
    const test = await validate(
      { naziv_dijela: "123", kolicina_na_lageru: 10 },
      "dijelovi"
    );
    expect(test.naziv_dijela).toBe("Naziv dijela mora biti string");
  });

  it("Naziv dijela mora biti manji od 50 znakova", async () => {
    const test = await validate(
      {
        naziv_dijela:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        kolicina_na_lageru: 10,
      },
      "dijelovi"
    );
    expect(test.naziv_dijela).toBe(
      "Naziv dijela mora biti manji od 50 znakova"
    );
  });

  it("Količina na lageru je obavezna", async () => {
    const test = await validate(
      { naziv_dijela: "test", kolicina_na_lageru: "" },
      "dijelovi"
    );
    expect(test.kolicina_na_lageru).toBe("Količina na lageru je obavezna");
  });

  it("Količina na lageru mora biti broj", async () => {
    const test = await validate(
      { naziv_dijela: "test", kolicina_na_lageru: "abc" },
      "dijelovi"
    );
    expect(test.kolicina_na_lageru).toBe("Količina na lageru mora biti broj");
  });

  it("Količina na lageru mora biti pozitivan broj", async () => {
    const test = await validate(
      { naziv_dijela: "test", kolicina_na_lageru: -10 },
      "dijelovi"
    );
    expect(test.kolicina_na_lageru).toBe(
      "Količina na lageru mora biti pozitivan broj"
    );
  });

  it("Količina na lageru mora biti manja od 100000", async () => {
    const test = await validate(
      { naziv_dijela: "test", kolicina_na_lageru: 200000 },
      "dijelovi"
    );
    expect(test.kolicina_na_lageru).toBe(
      "Količina na lageru mora biti manja od 100000"
    );
  });

  it("Validni projekt", async () => {
    const test = await validate(
      {
        naziv_projekta: "Testni projekt",
        opis_projekta: "Ovo je testni projekt",
        datum_pocetka: "2023-01-01",
        datum_završetka: "2023-02-01",
      },
      "projekti"
    );
    expect(test).toEqual({});
  });

  it("Naziv projekta je obavezan", async () => {
    const test = await validate(
      {
        naziv_projekta: "",
        opis_projekta: "Ovo je testni projekt",
        datum_pocetka: "2023-01-01",
        datum_završetka: "2023-02-01",
      },
      "projekti"
    );
    expect(test.naziv_projekta).toBe("Naziv projekta je obavezan");
  });

  it("Naziv projekta mora biti manji od 50 znakova", async () => {
    const test = await validate(
      {
        naziv_projekta:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        opis_projekta: "Ovo je testni projekt",
        datum_pocetka: "2023-01-01",
        datum_završetka: "2023-02-01",
      },
      "projekti"
    );
    expect(test.naziv_projekta).toBe(
      "Naziv projekta mora biti manji od 50 znakova"
    );
  });

  it("Opis projekta je obavezan", async () => {
    const test = await validate(
      {
        naziv_projekta: "Testni projekt",
        opis_projekta: "",
        datum_pocetka: "2023-01-01",
        datum_završetka: "2023-02-01",
      },
      "projekti"
    );
    expect(test.opis_projekta).toBe("Opis projekta je obavezan");
  });

  it("Datum projekta", async () => {
    const test = await validate(
      {
        naziv_projekta: "Testni projekt",
        opis_projekta: "Ovo je opis projekta",
        datum_pocetka: "2023-02-01",
        datum_završetka: "2023-01-01",
      },
      "projekti"
    );
    expect(test.datum_pocetka).toBe(
      "Datum početka mora biti prije datuma završetka"
    );
  });
});
