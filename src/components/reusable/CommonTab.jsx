import React, { useRef } from "react";
import { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { TabView, TabPanel } from "primereact/tabview";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import ExportModal from "../reusable/ExportModal";
import plusIcon from "../../assets/plusIcon.svg";

function CommonTab({
  exportFormat,
  setExportFormat,
  tabs,
  columns,
  setColumns,
  handleFilterClick,
  handleExportClick,
  modalName,
  setSidebarVisible,
}) {
  const isAddressPage = window.location.pathname === "/addressbook";
  const menuRight = useRef(null);
  const [openExportModal, setOpenExportModal] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleCheckboxChange = (event) => {
    const updatedColumn = columns?.map((col) => {
      if (col.field === event.target.name) {
        col.isSelected = !col.isSelected;
        col.isChecked = !col.isChecked;
      }
      return col;
    });
    setColumns(updatedColumn);
  };

  const handleTabChange = (e) => {
    setActiveTabIndex(e?.index);
  };
  const onCheckboxClick = (event) => {
    event.stopPropagation();
  };
  //
  const reorderColumns = (fromIndex, toIndex) => {
    const reorderedColumns = [...columns];
    const [removed] = reorderedColumns.splice(fromIndex, 1);
    reorderedColumns.splice(toIndex, 0, removed);
    setColumns(reorderedColumns);
  };
  const menuItems = [
    {
      label: (
        <div
          onClick={onCheckboxClick}
          className=" fs-5 fw-bold text-start mt-2 lh-base"
        >
          Edit Columns
        </div>
      ),
    },

    {
      label: (
        <div
          onClick={onCheckboxClick}
          className="cursorPointer  company-secondary-text text-start mt-2 lh-base fw-normal fs-6 fw-bold"
        >
          Fixed columns
        </div>
      ),
    },
    {
      label: columns?.map((col, i) => {
        if (col.isPermanent) {
          return (
            <div key={i} className="cursorPointer company-main-text fw-normal ">
              {col.header}
            </div>
          );
        }
      }),
    },
    { separator: true },

    {
      label: (
        <div
          onClick={onCheckboxClick}
          className="cursorPointer  company-secondary-text text-start mt-2 lh-base fw-normal fs-6 fw-bold"
        >
          Active columns
        </div>
      ),
    },

    {
      label: columns?.map((col, index) => {
        if (col.isChecked) {
          return (
            <div
              key={index}
              className="cursorPointer menu-item m-2 company-main-text d-flex justify-content-between align-items-center"
            >
              <div
                onClick={onCheckboxClick}
                className="d-flex justify-content-start align-items-center g-4"
              >
                <Checkbox
                  key={index}
                  value={col.field}
                  name={col.field}
                  onChange={(e) => handleCheckboxChange(e, col.field)}
                  checked={col.isChecked}
                  onClick={onCheckboxClick}
                />
                <label
                  className="company-main-text fw-normal"
                  htmlFor="Checkbox"
                >
                  {col.header}
                </label>
              </div>
              <i
                className="pi pi-bars"
                style={{ cursor: "all-scroll" }}
                key={col.field}
                draggable={"true"}
                onDragOver={(e) => e.preventDefault()}
                onDragStart={(e) => e.dataTransfer.setData("text", index)}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = Number(e.dataTransfer.getData("text"));
                  const toIndex = index;
                  reorderColumns(fromIndex, toIndex);
                }}
              />
            </div>
          );
        }
      }),
    },
    { separator: true },
    {
      label: (
        <div className="cursorPointer  company-secondary-text text-start mt-2 lh-base fw-normal fs-6 fw-bold">
          Available Name
        </div>
      ),
    },

    {
      label: columns?.map((col, index) => {
        if (!col.isChecked && !col.isPermanent) {
          return (
            <div
              key={index}
              className=" menu-item m-2 d-flex justify-content-between align-items-center"
            >
              <div className="d-flex justify-content-start align-items-center g-4">
                <Checkbox
                  key={index}
                  value={col.field}
                  name={col.field}
                  onChange={(e) => handleCheckboxChange(e, col.field)}
                  checked={col.isChecked}
                  onClick={onCheckboxClick}
                />
                <label
                  className="company-main-text fw-normal"
                  htmlFor="Checkbox"
                >
                  {col.header}
                </label>
              </div>
            </div>
          );
        }
      }),
    },
  ];

  const toolbarButtons = () => {
    return (
      <div className="d-flex justify-content-between align-items-center gap-1 ">
        {!isAddressPage && (
          <div className="d-flex d-flex justify-content-center align-items-center gap-1">
            <div className="">
              <Button
                icon="pi pi-file-export"
                className="company-tab-btn"
                size="large"
                onClick={() => setOpenExportModal(true)}
                tooltip="Export"
                tooltipOptions={{ position: "bottom" }}
              />

              <ExportModal
                openExportModal={openExportModal}
                setOpenExportModal={setOpenExportModal}
                exportFormat={exportFormat}
                setExportFormat={setExportFormat}
                handleExportClick={handleExportClick}
                modalName={modalName}
              />
            </div>

            <div>
              <Button
                onClick={(event) => {
                  menuRight.current.toggle(event);
                  event.stopPropagation();
                }}
                icon="pi pi-table"
                className="company-tab-btn"
                size="large"
              />

              <Menu
                model={menuItems}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
                className="p-2"
              />
            </div>
            <div>
              <Button
                icon="pi pi-filter-fill"
                className="company-tab-btn"
                onClick={handleFilterClick}
              />
            </div>
          </div>
        )}
        <img
          src={plusIcon}
          alt=""
          className="cursorPointer"
          onClick={() => setSidebarVisible(true)}
        />
        {/* <AddSidebarRight sidebarToBeRender={"addNewResource"} /> */}
        {/* <AddSidebarRight sidebarToBeRender={"newContract"} />
        <AddSidebarRight sidebarToBeRender={"addTimesheet"} />
        {/* <AddSidebarRight sidebarToBeRender={"addCompany"} /> */}
      </div>
    );
  };

  return (
    <div className="container-fluid p-0">
      <div className="">
        <TabView
          activeIndex={activeTabIndex}
          onTabChange={handleTabChange}
          className="company-primary-text tab-view"
        >
          {tabs?.map((tab, index) => (
            <TabPanel
              key={index}
              header={tab.label}
              headerClassName="header"
              className=""
            >
              {tab.content}
            </TabPanel>
          ))}

          <TabPanel
            className="menu-tab d-flex justify-content-center align-items-center ms-auto p-2"
            headerTemplate={toolbarButtons}
          ></TabPanel>
        </TabView>
      </div>
    </div>
  );
}

export default CommonTab;
