import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import backArrowIcon from "../../assets/backArrowIcon.svg";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const EditRowSidebar = ({
  setEditOptionSidebar,
  editOptionSidebar,
  selectedRowData,
  setSelectedRowData,
  setResourceData,
  resourceData,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdateRow = () => {
    console.log("update");
    const updatedRow = resourceData.map((row) =>
      row.resourceId === selectedRowData.resourceId ? selectedRowData : row
    );
    setResourceData(updatedRow);
    setEditOptionSidebar(false);
  };

  const roles = [
    { roleId: "W2Employee", roleName: "W2 Employee" },
    { roleId: "Contractor", roleName: "Contractor" },
    { roleId: "Consultant", roleName: "Consultant" },
  ];
  const status = [
    { statusType: "Submitted", roleId: "submitted" },
    { statusType: "Pending", roleId: "pending" },
    { statusType: "Approved", roleId: "approved" },
  ];
  useEffect(() => {
    document.body.classList.toggle("hide-scrollbar", editOptionSidebar);
  }, [editOptionSidebar]);
  const onJoinDateChange = (e) => {
    setSelectedRowData({ ...selectedRowData, joinDate: e.target.value });
    setIsTouched(true);
  };
  const onRoleChange = (e) => {
    setSelectedRowData({
      ...selectedRowData,
      role: e.value.roleName,
    });
    setIsTouched(true);
  };
  const onStatusChange = (e) => {
    setSelectedRowData({
      ...selectedRowData,
      status: e.value.statusType,
    });
    setIsTouched(true);
  };
  const onResourceNameChange = (e) => {
    setSelectedRowData({
      ...selectedRowData,
      resourceName: e.target.value,
    });
    setIsTouched(true);
  };
  const onVenderChange = (e) => {
    setSelectedRowData({
      ...selectedRowData,
      vendor: e.target.value,
    });
    setIsTouched(true);
  };

  return (
    <>
      <Sidebar
        visible={editOptionSidebar}
        showCloseIcon={false}
        onHide={() => setEditOptionSidebar(false)}
        position="right"
        className="l-width-80 custom-sidebar"
      >
        <div className="w-100 company-layout-bg p-3">
          <div className="d-flex align-items-center justify-content-start gap-4">
            <img
              src={backArrowIcon}
              alt=""
              className="cursorPointer"
              onClick={() => setEditOptionSidebar(false)}
            />
            <div className="company-main-text fs-5 fw-bold">
              Edit Resource {selectedRowData?.resourceId}
            </div>
          </div>
        </div>

        <div className="row  p-3 m-4">
          <div className="col-6 p-2">
            <label htmlFor="" className="company-secondary-text fs-6">
              Resource Name
            </label>

            <InputText
              className="w-100"
              value={selectedRowData?.resourceName}
              onChange={onResourceNameChange}
            />
          </div>
          <div className="col-6 p-2 d-flex flex-column">
            <label htmlFor="" className="company-secondary-text fs-6">
              Role
            </label>

            <Dropdown
              value={selectedRowData?.role}
              options={roles}
              optionLabel="roleName"
              placeholder={selectedRowData?.role}
              className="w-full"
              onChange={onRoleChange}
            />
          </div>
          <div className="col-6 p-2">
            <label htmlFor="" className="company-secondary-text fs-6">
              Vender Name
            </label>

            <InputText
              className="w-100"
              value={selectedRowData?.vendor}
              onChange={onVenderChange}
            />
          </div>
          <div className="col-6 p-2">
            <label htmlFor="" className="company-secondary-text fs-6">
              Start Date
            </label>

            <InputText
              type="date"
              className="w-100"
              value={formatDateToYYYYMMDD(selectedRowData?.joinDate)}
              onInput={onJoinDateChange}
            />
          </div>
          <div className="col-6 p-2 d-flex flex-column">
            <label htmlFor="" className="company-secondary-text fs-6">
              Status
            </label>

            <Dropdown
              value={selectedRowData?.status}
              options={status}
              optionLabel="statusType"
              placeholder={selectedRowData?.status}
              className="w-full"
              onChange={onStatusChange}
            />
          </div>
        </div>
        <div
          className=" company-layout-bg p-3 d-flex align-items-center justify-content-end"
          style={{ marginTop: "135px" }}
        >
          <Button
            label="Cancel"
            className="company-secondary-btn"
            onClick={() => setEditOptionSidebar(false)}
          />
          <Button
            label="Update"
            className="company-primary-btn"
            onClick={() => handleUpdateRow()}
            disabled={!isTouched}
          />
        </div>
      </Sidebar>
    </>
  );
};
export default EditRowSidebar;
