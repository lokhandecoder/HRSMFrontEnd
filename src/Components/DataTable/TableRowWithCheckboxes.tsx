import React from "react";
import { TableRow, TableCell, Checkbox } from "@mui/material";
import { ColumnHeaderModel } from "../../Model/RoleAssignModels";
import { UserRoleMapping } from "../../Model/UserRoleMapping";
interface TableRowWithCheckboxesProps {
  row: {
    id: number;
    pageName: string;
  };
  columnHeaders: ColumnHeaderModel[];
  selectedData: UserRoleMapping[];
  toggleCell: (rowId: number, columnId: number) => void;
}

const TableRowWithCheckboxes: React.FC<TableRowWithCheckboxesProps> = ({
  row,
  columnHeaders,
  selectedData,
  toggleCell,
}) => (
  <TableRow key={row.id}>
    <TableCell>{row.pageName}</TableCell>
    {columnHeaders.map((column) => (
      <TableCell key={column.roleAssignId}>
        <Checkbox
          checked={selectedData.some(
            (data) => data.applicationPageId === row.id && data.roleAssignId === column.roleAssignId
          )}
          onChange={() => toggleCell(row.id, column.roleAssignId)}
        />
      </TableCell>
    ))}
  </TableRow>
);

export default TableRowWithCheckboxes;
