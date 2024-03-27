import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import { useContext } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { SortContext } from "./contexts/SortContextProvider";

interface Props {
  name: string;
  isButtoned: boolean;
}

export default function CustomTableCell({ name, isButtoned }: Props) {
  const { sortParam, setSortParam, sortDirection, setSortDirection } =
    useContext(SortContext);

  return (
    <TableCell align="right">
      <Button
        style={{
          backgroundColor: "rgba(172, 172, 172, 0.14)",
          color: "black",
        }}
        disabled={!isButtoned}
        onClick={() => {
          setSortDirection((sortDirection) => sortDirection * -1);
          setSortParam(name);
        }}
        startIcon={
          sortParam == name ? (
            sortDirection == -1 ? (
              <ArrowDownwardIcon />
            ) : (
              <ArrowUpwardIcon />
            )
          ) : null
        }
        variant="text"
      >
        {name}
      </Button>
    </TableCell>
  );
}
