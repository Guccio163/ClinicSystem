
import SortContextProvider from "./components/contexts/SortContextProvider";
import FilterContextProvider from "./components/contexts/FilterContextProvider";
import FiltersBar from "./components/FiltersBar";
import { Paper, Table, TableContainer, TableHead, TableRow } from "@mui/material";
import CustomTableCell from "./components/CustomTableCell";
import CustomTableBody from "./components/CustomTableBody";
import PatientsContextProvider from "./components/contexts/PatientsContextProvider";

function App() {

  return (
    <div
      style={{
        alignItems: "center",
        width: "100%",
        height: window.innerHeight * 0.8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <PatientsContextProvider>
        <SortContextProvider>
          <FilterContextProvider>
            <FiltersBar />
            <TableContainer
              component={Paper}
              style={{
                alignSelf: "center",
                width: "70%",
                marginLeft: "20px",
              }}
            >
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <CustomTableCell name="firstName" isButtoned={true} />
                    <CustomTableCell name="lastName" isButtoned={true} />
                    <CustomTableCell name="pesel" isButtoned={true} />
                    <CustomTableCell name="Address" isButtoned={false} />
                    <CustomTableCell name="Options" isButtoned={false} />
                  </TableRow>
                </TableHead>
                <CustomTableBody />
              </Table>
            </TableContainer>
          </FilterContextProvider>
        </SortContextProvider>
      </PatientsContextProvider>
    </div>
  );
}

export default App;
