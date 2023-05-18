import React from "react";
import styled from "styled-components";

interface ProjektPodatciProps {
  tableData: any[]; // Promijenite tip podataka za tableData prema vašim potrebama
  index: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  height: 2.5rem;
`;

const ProjektPodatci: React.FC<ProjektPodatciProps> = ({
  tableData,
  index,
}) => {
  return (
    <Container>
      <StyledDiv>
        <strong>Sifra projekta:</strong>
        <p>{tableData[index].sifra_projekta}</p>
      </StyledDiv>
      <StyledDiv>
        <strong>Naziv projekta:</strong>
        <p>{tableData[index].naziv_projekta}</p>
      </StyledDiv>
      <StyledDiv>
        <strong>Opis projekta:</strong>
        <p>{tableData[index].opis_projekta}</p>
      </StyledDiv>
      <StyledDiv>
        <strong>Datum početka:</strong>
        <p>
          {new Date(tableData[index].datum_pocetka).toLocaleDateString("hr-HR")}
        </p>
      </StyledDiv>
      <StyledDiv>
        <strong>Datum završetka:</strong>
        <p>
          {new Date(tableData[index].datum_završetka).toLocaleDateString(
            "hr-HR"
          )}
        </p>
      </StyledDiv>
      <StyledDiv>
        <strong>Dijelovi:</strong>
      </StyledDiv>
    </Container>
  );
};

export default ProjektPodatci;
