import React from "react";
import Table from "react-bootstrap/Table";
import ContractOptions from "../../pages/contracts/ContractOptions";
import LoaderSkeleton from "../reusable/LoaderSkeleton";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { useRef } from "react";
import { Calendar } from "primereact/calendar";
import ContractSidebarLayout from "../../pages/contracts/contractsOptionButton/ContractSidebarLayout";
import { useEffect } from "react";

function ContractsTableData({
  filters,
  columnFilterValue,
  dataTableRef,
  contractsData,
  loading,
  contractsColumns,
}) {
  const menuLeft = useRef(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const optionLabel = [
    { label: "View", onClick: () => handleViewOPtionClick() },
    { label: "Edit", onClick: () => handleItemClick("Edit") },
    { label: "Status", onClick: () => handleItemClick("Status") },
    { label: "Change Date", onClick: () => handleItemClick("Change Date") },
    { label: "Add Employee", onClick: () => handleItemClick("Add Employee") },
    { label: "Add Document", onClick: () => handleItemClick("Add Document") },
    { label: "Add Invoice", onClick: () => handleItemClick("Add Invoice") },
    { label: "Audit", onClick: () => handleItemClick("Audit") },
  ];
  const handleViewOPtionClick = () => {
    setSidebarVisible(true);
  };

  const handleItemClick = () => {}

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
      label: optionLabel?.map((item, index) => (
        <div
          key={index}
          className="company-main-text p-2 fs-6 fw-bold ml-3 company-main-text"
          onClick={item.onClick}
        >
          {item.label}
        </div>
      )),

      id: "view",
    },
  ];
  const TableRow = 10;
  const TableColumn = 9;
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
  const tableColumns = contractsColumns.map((col, i) => {
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
  useEffect(() => {
    document.body.classList.toggle("hide-scrollbar", sidebarVisible);
  }, [sidebarVisible]);

  return (
    <>
      <ContractSidebarLayout
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
      />
      {loading ? (
        <LoaderSkeleton
          columns={contractsColumns}
          TableRow={TableRow}
          TableColumn={TableColumn}
        />
      ) : (
        <DataTable
          ref={dataTableRef}
          filters={filters}
          stripedRows
          value={contractsData}
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

export default ContractsTableData;
