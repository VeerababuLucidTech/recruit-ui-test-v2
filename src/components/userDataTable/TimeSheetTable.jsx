import React, { useRef, useState } from "react";
import LoaderSkeleton from "../reusable/LoaderSkeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { Calendar } from "primereact/calendar";

function TimeSheetTableData({
  timeSheetData,
  timeSheetColumns,
  loading,
  columnFilterValue,
  filters,
  dataTableRef,
}) {
  const menuLeft = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const TableRow = 9;
  const TableColumn = 10;
  const optionLabel = [
    "View",
    "Edit",
    "Status",
    "Change Date",
    "Add Timesheet",
    "Add Document",
    "Add Notes",
  ];
  const filterDateTemplate = (column) => {
    const handleDateChange = (e) => {
      column.onChange(e.value, column.field);
    };
    return (
      <Calendar
        value={column.value}
        onChange={handleDateChange}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };
  const optionItems = [
    {
      label: optionLabel.map((item, index) => (
        <div key={index} className="company-main-text p-2 fs-6 fw-bold ml-2">
          {item}
        </div>
      )),

      id: "view",
    },
  ];
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const onRowSelect = (event) => {
    setSelectedRows(event.value);
  };

  const handleCheckboxChange = (rowData, checked) => {
    let updatedSelectedRows = [...selectedRows];
    if (checked) {
      updatedSelectedRows.push(rowData);
    } else {
      updatedSelectedRows = updatedSelectedRows.filter(
        (row) => row.id !== rowData.id
      );
    }

    setSelectedRows(updatedSelectedRows);
  };
  const checkboxSelectionTemplate = (rowData) => {
    const isSelected = selectedRows.some((row) => row.id === rowData.id);

    return (
      <div className="p-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => handleCheckboxChange(rowData, e.target.checked)}
        />
        <label className="p-checkbox-label"></label>
      </div>
    );
  };
  const optionsColumn = () => {
    return (
      <div onClick={(e) => e.stopPropagation}>
        <Menu model={optionItems} popup ref={menuLeft} id="popup_menu_left" />
        <i
          className="pi pi-ellipsis-v"
          onClick={(event) => {
            event.stopPropagation();
            menuLeft.current?.toggle(event);
          }}
        />
      </div>
    );
  };
  const tableColumns = timeSheetColumns.map((col, i) => {
    if (col.field === "joinDate") {
      return (
        <Column
          className={!col.isSelected && "d-none"}
          filter={columnFilterValue}
          filterField={col.field}
          key={i}
          field={col.field}
          header={col.header}
          filterPlaceholder={`Search By ${col.header}`}
          dataType="date"
          filterElement={(options) =>
            filterDateTemplate({
              ...options,
              onChange: (value, field) => {},
            })
          }
        />
      );
    } else {
      return (
        <Column
          className={!col.isSelected && "d-none"}
          filter={columnFilterValue}
          filterField={col.field}
          key={i}
          field={col.field}
          header={col.header}
          filterPlaceholder={`Search By ${col.header}`}
        />
      );
    }
  });
  return (
    <>
      {loading ? (
        <LoaderSkeleton
          columns={timeSheetColumns}
          TableRow={TableRow}
          TableColumn={TableColumn}
        />
      ) : (
        <DataTable
          ref={dataTableRef}
          filters={filters}
          stripedRows
          value={timeSheetData}
          first={first}
          rows={rows}
          onPage={onPageChange}
          paginator
          size="small"
          selection={selectedRows}
          onSelectionChange={onRowSelect}
          columnResizeMode="fit"
          emptyMessage="No data available"
        >
          {tableColumns}

          <Column body={optionsColumn} header="Options"></Column>
        </DataTable>
      )}
    </>
  );
}

export default TimeSheetTableData;
