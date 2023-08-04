import { Skeleton } from "primereact/skeleton";
import React from "react";

function LoaderSkeleton({ columns, TableRow, TableColumn }) {
  const rows = TableRow;
  const column = TableColumn;
  const renderTableSkeleton = () => {
    const skeletonRows = [];

    for (let i = 0; i < rows; i++) {
      const skeletonColumns = [];

      for (let j = 0; j < column; j++) {
        skeletonColumns.push(
          <td key={j}>
            <Skeleton
              shape="rectangle"
              width="auto"
              height="2rem"
              className="m-1 text-start"
            />
          </td>
        );
      }

      skeletonRows.push(<tr key={i}>{skeletonColumns}</tr>);
    }

    return skeletonRows;
  };

  return (
    <>
      <table className="w-100">
        <thead>
          <tr>
            {columns?.map((item, index) => (
              <th key={index} className="p-3">
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderTableSkeleton()}</tbody>
      </table>
    </>
  );
}

export default LoaderSkeleton;
