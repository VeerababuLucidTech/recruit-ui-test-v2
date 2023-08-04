import React, { useRef, useEffect } from "react";
import LoaderSkeleton from "../reusable/LoaderSkeleton";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { Calendar } from "primereact/calendar";
import ResourceSidebarLayout from "../../pages/resources/resourceOptionButton/ResourceSidebarLayout";
import EditRowSidebar from "../reusable/EditRowSidebar";
import { ContextMenu } from "primereact/contextmenu";

function ResourceTableData({
  columnFilterValue,
  filters,
  resourceData,
  loading,
  resourceColumns,
  dataTableRef,
  setResourceData,
}) {
  const optionMenu = useRef(null);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [visibleRight, setVisibleRight] = useState(false);
  const [editOptionSidebar, setEditOptionSidebar] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

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

  const optionLabel = [
    { label: "View", onClick: () => handleViewOPtionClick() },
    { label: "Edit", onClick: () => handleEditClick() },
    { label: "Status", onClick: () => handleItemClick("Status") },
    { label: "Change Date", onClick: () => handleItemClick("Change Date") },
    { label: "Add Document", onClick: () => handleItemClick("Add Document") },
    { label: "Add Notes", onClick: () => handleItemClick("Add Notes") },
  ];
  const handleViewOPtionClick = () => {
    setVisibleRight(true);
  };

  const optionItems = [
    {
      label: optionLabel.map((item, index) => (
        <p
          key={index}
          className="company-main-text p-2 fs-6 fw-bold m-1  w-auto  "
          onClick={item.onClick}
        >
          {item.label}
        </p>
      )),

      id: "view",
    },
  ];

  const TableRow = 10;
  const TableColumn = 6;
  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const handleItemClick = () => {};
  const tableColumns = resourceColumns.map((col, i) => {
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
  const handleEditClick = () => {
    if (selectedRowData) {
      // console.log(selectedRowData);
      setEditOptionSidebar(true);
    }
  };

  const showMenu = (event, rowData) => {
    optionMenu.current?.toggle(event, rowData);
    setSelectedRowData(rowData);
  };

  useEffect(() => {
    document.body.classList.toggle("hide-scrollbar", visibleRight);
  }, [visibleRight]);
  return (
    <>
      <EditRowSidebar
        editOptionSidebar={editOptionSidebar}
        setEditOptionSidebar={setEditOptionSidebar}
        selectedRowData={selectedRowData}
        setSelectedRowData={setSelectedRowData}
        resourceData={resourceData}
        setResourceData={setResourceData}
      />
      <ResourceSidebarLayout
        visibleRight={visibleRight}
        setVisibleRight={setVisibleRight}
      />
      {loading ? (
        <>
          <LoaderSkeleton
            columns={resourceColumns}
            TableRow={TableRow}
            TableColumn={TableColumn}
          />
        </>
      ) : (
        <DataTable
          dataKey="resourceId"
          ref={dataTableRef}
          filters={filters}
          stripedRows
          value={resourceData}
          first={first}
          rows={rows}
          onPage={onPageChange}
          paginator
          size="small"
          resizableColumns
          columnResizeMode="fit"
          emptyMessage="No data available"
          editMode="cell"
        >
          {tableColumns}
          <Column
            body={(rowData) => {
              return (
                <div>
                  <Menu
                    model={optionItems}
                    popup
                    ref={optionMenu}
                    id="popup_menu_left"
                  />
                  <i
                    className="pi pi-ellipsis-v"
                    onClick={(event) => {
                      event.stopPropagation();
                      showMenu(event, rowData);
                    }}
                  />
                </div>
              );
            }}
            header="Options"
            rowEditor
          ></Column>
        </DataTable>
      )}
    </>
  );
}

export default ResourceTableData;
