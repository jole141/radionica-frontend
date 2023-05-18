async function validate(data, type) {
  const errors = {};
  if (type === "dijelovi") {
    if (!data.naziv_dijela.length) {
      errors.naziv_dijela = "Naziv dijela je obavezan";
    }
    if (data.naziv_dijela.length && !/^[a-zA-Z]+$/.test(data.naziv_dijela)) {
      errors.naziv_dijela = "Naziv dijela mora biti string";
    }
    if (data.naziv_dijela.length && data.naziv_dijela.length > 50) {
      errors.naziv_dijela = "Naziv dijela mora biti manji od 50 znakova";
    }
    if (!data.kolicina_na_lageru) {
      errors.kolicina_na_lageru = "Količina na lageru je obavezna";
    }
    if (data.kolicina_na_lageru && !/^[0-9]+$/.test(data.kolicina_na_lageru)) {
      errors.kolicina_na_lageru = "Količina na lageru mora biti broj";
    }
    if (data.kolicina_na_lageru < 0) {
      errors.kolicina_na_lageru = "Količina na lageru mora biti pozitivan broj";
    }
    if (data.kolicina_na_lageru > 100000) {
      errors.kolicina_na_lageru =
        "Količina na lageru mora biti manja od 100000";
    }
  }
  if (type === "dijeloviProjekt") {
    const dijelovi = await getDijelovi();
    const dio = dijelovi.find((d) => d.sifra_dijela === data.naziv_dijela);
    if (!data.naziv_dijela.length) {
      errors.naziv_dijela = "Dio je obavezan";
    }
    if (!data.kolicina_dijelova.length) {
      errors.kolicina_dijelova = "Količina dijelova je obavezna";
    }
    if (
      data.kolicina_dijelova.length &&
      !/^[0-9]+$/.test(data.kolicina_dijelova)
    ) {
      errors.kolicina_dijelova = "Količina dijelova mora biti broj";
    }
    if (data.kolicina_dijelova.length && data.kolicina_dijelova < 0) {
      errors.kolicina_dijelova = "Količina dijelova mora biti pozitivan broj";
    }
    if (
      data.naziv_dijela.length &&
      /^[0-9]+$/.test(data.kolicina_dijelova) &&
      dio.kolicina_na_lageru < data.kolicina_dijelova
    ) {
      errors.kolicina_dijelova =
        "Nedovoljna količina dijelova na lageru (dostupno: " +
        dio.kolicina_na_lageru +
        ")";
    }
    if (data.kolicina_dijelova.length && data.kolicina_dijelova > 100000) {
      errors.kolicina_dijelova = "Količina dijelova mora biti manja od 100000";
    }
  }
  if (type === "projekti") {
    console.log(!data.naziv_projekta.length);
    if (!data.naziv_projekta.length) {
      errors.naziv_projekta = "Naziv projekta je obavezan";
    }
    if (data.naziv_projekta.length && data.naziv_projekta.length > 50) {
      errors.naziv_projekta = "Naziv projekta mora biti manji od 50 znakova";
    }
    if (!data.opis_projekta.length) {
      errors.opis_projekta = "Opis projekta je obavezan";
    }
    if (data.opis_projekta.length && data.opis_projekta.length > 300) {
      errors.opis_projekta = "Opis projekta mora biti manji od 300 znakova";
    }
    if (!data.datum_pocetka.length) {
      errors.datum_pocetka = "Datum početka je obavezan";
    }
    if (!data.datum_završetka.length) {
      errors.datum_završetka = "Datum završetka je obavezan";
    }
    if (
      data.datum_pocetka.length &&
      !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(data.datum_pocetka)
    ) {
      errors.datum_pocetka = "Datum početka mora biti datum";
    }
    if (
      data.datum_završetka.length &&
      !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(data.datum_završetka)
    ) {
      errors.datum_završetka = "Datum završetka mora biti datum";
    }
    if (
      data.datum_pocetka.length &&
      data.datum_završetka.length &&
      data.datum_pocetka > data.datum_završetka
    ) {
      errors.datum_pocetka = "Datum početka mora biti prije datuma završetka";
    }
  }
  return errors;
}

const getDijelovi = async () => {
  return fetch("http://localhost:8080/dijelovi", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((d) => {
      return d;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { validate };
