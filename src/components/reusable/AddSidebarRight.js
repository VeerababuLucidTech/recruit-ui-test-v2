import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import plusIcon from "../../assets/plusIcon.svg";
import AddCompany from "./addCompany/AddCompany";
import AddTimesheet from "../../pages/timesheets/addTimesheet/AddTimesheet";
import AddNewContract from "../../pages/contracts/contractAdd/AddNewContract";
import AddNewResource from "../../pages/resources/resourceAdd/AddNewResource";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function AddSidebarRight({ sidebarToBeRender }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState("");

  const resourceNextLable = (value) => {
    const valueMap = {
      w2Employee: <h6>Assign Documents</h6>,
      c2cEmployee: <h6>Select Vendor</h6>,
      emp1099: <h6>Select Vendor</h6>,

      // resourceForm: <h6>Select Vendor</h6>,
      selectVendor: <h6>Assign Documents</h6>,
      assignDocuments: <h6>Resource</h6>,
    };
    const content = valueMap[value] || null;
    return content;
  };

  useEffect(() => {
    document.body.classList.toggle("hide-scrollbar", visible);
  }, [visible]);

  const ContractNextLabels = (value) => {
    const valueMap = {
      existing: <h6>WO Rate</h6>,
      newContract: <h6>Contract Details</h6>,
      endClient: <h6>Add End Client</h6>,
      yes: <h6>Add Client</h6>,
      no: <h6>WO Rate</h6>,
      addClient: <h6> </h6>,
      addMSA: <h6>Add MSA</h6>,
      woRateOptions: <h6>WO Rate</h6>,
      woRate: <h6>Work Order</h6>,
      supervaisor: <h6>supervaisor Info</h6>,
      document: <h6>Add Documents</h6>,
      manager: <h6>Manager Info</h6>,
    };
    const content = valueMap[value] || null;
    return content;
  };

  const companyNextLabels = (value) => {
    const valueMap = {
      companyProfile: <h6>Contact Details</h6>,
      contactDetails: <h6>Add Address</h6>,
      address: <h6>Add Documents</h6>,
      addCompanyDocument: <h6>Add User</h6>,
      addUser: <h6>Add Documents</h6>,
    };
    const content = valueMap[value] || null;
    return content;
  };
  const timesheetNextLabels = (value) => {
    const valueMap = {
      timesheet: <h6>Hours</h6>,
      hours: <h6>Expenses</h6>,
      expenses: <h6>Hours</h6>,
    };
    const content = valueMap[value] || null;
    return content;
  };

  const customIcons = (
    <React.Fragment>
      <div style={{ marginRight: "35%" }}>
        {sidebarToBeRender === "newContract" && <h4>Create Contract </h4>}
        {sidebarToBeRender === "addNewResource" && <h4>Create Resource</h4>}
        {sidebarToBeRender === "addCompany" && <h4>Create Company </h4>}
        {sidebarToBeRender === "addClientInAddContract" && (
          <h4>Create Client </h4>
        )}
        {sidebarToBeRender === "addTimesheet" && <h4>Create Timesheet</h4>}
        {sidebarToBeRender === "addVendorInAddResource" && <h4>Add Vendor</h4>}
      </div>

      <div style={{ width: "130px" }}>
        <label> {progress === 100 ? "Previous" : "Next"}</label>
        {sidebarToBeRender === "newContract" && ContractNextLabels(value)}
        {sidebarToBeRender === "addNewResource" && resourceNextLable(value)}
        {sidebarToBeRender === "addCompany" && companyNextLabels(value)}
        {sidebarToBeRender === "addClientInAddContract" &&
          companyNextLabels(value)}
        {sidebarToBeRender === "addTimesheet" && timesheetNextLabels(value)}
        {sidebarToBeRender === "addVendorInAddResource" &&
          companyNextLabels(value)}
      </div>

      <div style={{ width: 70, height: 70, marginRight: "16%" }}>
        <CircularProgressbar
          value={progress}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: "#ff6600",
          })}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div className="flex justify-content-center custom-scrollbar">
      <Sidebar
        position="right"
        visible={visible}
        onHide={() => {
          setVisible(false);
          setProgress(0);
        }}
        className="l-width-100"
        icons={customIcons}
      >
        <hr className="horizontalLine" />

        {sidebarToBeRender === "addNewResource" && (
          <AddNewResource setValue={setValue} setProgress={setProgress} />
        )}
        {sidebarToBeRender === "newContract" && (
          <AddNewContract setProgress={setProgress} setValue={setValue} />
        )}
        {sidebarToBeRender === "addVendorInAddResource" && (
          <AddCompany
            setVisible={setVisible}
            setProgress={setProgress}
            setValue={setValue}
            addCompanyStepsView="companies"
          />
        )}
        {sidebarToBeRender === "addClientInAddContract" && (
          <AddCompany
            setVisible={setVisible}
            setProgress={setProgress}
            setValue={setValue}
            addCompanyStepsView="companies"
          />
        )}
        {sidebarToBeRender === "addCompany" && (
          <AddCompany
            setVisible={setVisible}
            setProgress={setProgress}
            setValue={setValue}
            addCompanyStepsView="companies"
          />
        )}
        {sidebarToBeRender === "addTimesheet" && (
          <AddTimesheet setProgress={setProgress} setValue={setValue} />
        )}
        {/* </ScrollPanel> */}
      </Sidebar>

      {sidebarToBeRender === "addNewResource" && (
        <img
          src={plusIcon}
          alt="plusIcon"
          className="cursorPointer"
          onClick={() => setVisible(true)}
        />
      )}
      {sidebarToBeRender === "newContract" && (
        <img
          src={plusIcon}
          alt="plusIcon"
          className="cursorPointer"
          onClick={() => setVisible(true)}
        />
      )}
      {sidebarToBeRender === "addCompany" && (
        <img
          src={plusIcon}
          alt="plusIcon"
          className="cursorPointer"
          onClick={() => setVisible(true)}
        />
      )}
      {sidebarToBeRender === "addTimesheet" && (
        <img
          src={plusIcon}
          alt="plusIcon"
          className="cursorPointer"
          onClick={() => setVisible(true)}
        />
      )}
      {sidebarToBeRender === "addVendorInAddResource" && (
        <span
          className="pe-2 l-color-orange l-fw-500 cursorPointer"
          onClick={() => setVisible(true)}
        >
          + ADD VENDOR
        </span>
      )}
      {sidebarToBeRender === "addClientInAddContract" && (
        <span
          className="pe-2 l-color-orange l-fw-500 cursorPointer"
          onClick={() => setVisible(true)}
        >
          + ADD
        </span>
      )}
      {sidebarToBeRender === "addResource" && (
        <span
          className="pe-2 l-color-orange l-fw-500 cursorPointer"
          onClick={() => setVisible(true)}
        >
          + ADD RESOURCE
        </span>
      )}
    </div>
  );
}
