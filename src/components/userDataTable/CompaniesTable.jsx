import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { Calendar } from "primereact/calendar";
import LoaderSkeleton from "../reusable/LoaderSkeleton";
import { useEffect } from "react";
import CompaniesSidebarLayout from "../../pages/companies/companiesOptionButton/CompaniesSidebarLayout";

function CompaniesTable({
  companiesData,
  companiesColumns,
  loading,
  columnFilterValue,
  filters,
  dataTableRef,
}) {
  const menuLeft = useRef(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [visibleRight, setVisibleRight] = useState(false);
  const TableRow = 15;
  const TableColumn = 6;
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };
  const optionLabel = [
    { label: "View", onClick: () => handleViewOPtionClick() },
    { label: "Edit", onClick: () => handleItemClick("Edit") },
    { label: "Add Notes", onClick: () => handleItemClick("Add Notes") },
  ];
  const handleViewOPtionClick = () => {
    setVisibleRight(true);
  };
  const handleItemClick = () => {};
  useEffect(() => {
    document.body.classList.toggle("hide-scrollbar", visibleRight);
  }, [visibleRight]);
  const optionItems = [
    {
      label: optionLabel.map((item, index) => (
        <div
          key={index}
          className="company-main-text p-2 fs-6 fw-bold ml-3 w-auto  "
          onClick={item.onClick}
        >
          {item.label}
        </div>
      )),

      id: "view",
    },
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

  const onRowSelect = (event) => {
    setSelectedRows(event.value);
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
  const tableColumns = companiesColumns.map((col, i) => {
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
      <CompaniesSidebarLayout
        visibleRight={visibleRight}
        setVisibleRight={setVisibleRight}
      />
      {loading ? (
        <LoaderSkeleton
          columns={companiesColumns}
          TableRow={TableRow}
          TableColumn={TableColumn}
        />
      ) : (
        <DataTable
          ref={dataTableRef}
          filters={filters}
          stripedRows
          value={companiesData}
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

export default CompaniesTable;
