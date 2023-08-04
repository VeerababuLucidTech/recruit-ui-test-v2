import React from "react";
import {
  resourceTableData,
  resourceWidgetsData,
} from "../../services/ResourceServices";
import Widget from "../../components/reusable/Widget";
import { useState } from "react";
import { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import resourceData from "../../__mockdata__/resourceData.json";
import DashboardPendingEmployee from "../../components/skeletons/DashboardPendingEmployee";
import { useContext } from "react";
import { TitleContext } from "../../components/header/TitleContext";

const Dashboard = () => {
  const { setTitle } = useContext(TitleContext);
  useEffect(() => {
    setTitle("Dashboard");
  }, [setTitle]);
  const [widgets, setWidgets] = useState([]);
  const [widgetLoading, setWidgetLoading] = useState(false);
  const [employeeDataLoading, setEmployeeDataLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  console.log(resourceData.companiesResources);

  const handleWidgetData = async () => {
    setWidgetLoading(true);
    const result = await resourceWidgetsData();
    setWidgets(result);
    setWidgetLoading(false);
  };
  const handleEmployeeData = async () => {
    setEmployeeDataLoading(true);
    const result = await resourceTableData();
    const tableData = result?.slice(0, 6);
    setEmployeeData(tableData);
    setEmployeeDataLoading(false);
  };
  useEffect(() => {
    handleWidgetData();
    handleEmployeeData();
  }, []);
  const header1 = (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="fs-5 font-bold">Pending[381]</div>
      <div>
        <Button
          className="company-primary-text"
          label="Create International Employee"
          text
          icon=" pi pi-plus"
        />
        <Button
          className="company-primary-text"
          label="Create Employee"
          text
          icon=" pi pi-plus"
        />
      </div>
    </div>
  );
  const header2 = (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="fs-5 font-bold">Employee[351]</div>
      <div>
        <Button
          className="company-primary-text"
          label="Create International Employee"
          text
          icon=" pi pi-plus"
        />
        <Button
          className="company-primary-text"
          label="Create Employee"
          text
          icon=" pi pi-plus"
        />
      </div>
    </div>
  );
  return (
    <>
      <div className="container-fluid mt-4 mr-0 pr-0  p-2 ">

        <>
          {widgets?.map((item, index) => (
            <div
              key={index}
              className="row row-cols-2 mb-5 row-cols-lg-4 g-2 g-lg-3 align-items-center justify-content-center g-4"
            >
              <div className="col">
                <Widget
                  title="Active Contracts"
                  value={item.billableEmployees}
                  graphData=""
                />
              </div>
              <div className="col">
                <Widget
                  title="Billable Resources"
                  value={item.nonBillableEmployees}
                  graphData=""
                />
              </div>
              <div className="col">
                <Widget
                  title="Pending Invoices"
                  value={item.w2Employees}
                  graphData=""
                />
              </div>
              <div className="col">
                <Widget
                  title="Vender Applications"
                  value={item.c2cEmployees}
                  graphData=""
                />
              </div>
              <div className="col">
                <Widget
                  title="Work Auth. Expiring"
                  value={item.c2cEmployees}
                  graphData=""
                />
              </div>
              <div className="col">
                <Widget
                  title="EMS Notes(Manual)"
                  value={item.c2cEmployees}
                  graphData=""
                />
              </div>
              <div className="col">
                <Widget
                  title="Expired Work Auth."
                  value={item.c2cEmployees}
                  graphData=""
                />
              </div>
              <div className="col">
                <Widget
                  title="EMS Activity(Auto)"
                  value={item.c2cEmployees}
                  graphData=""
                />
              </div>
            </div>
          ))}
        </>

        {/* graph */}
        <div fluid className="container-fluid p-2">
          <div className="row mb-5">
            <div className="col-9">graph</div>
            <div className="col-3 bg-white">
              <div className="p-3">
                <p className="fs-5 fw-bold text-center company-main-text">
                  Company Profile
                </p>

                <div className="mt-5 text-center">
                  <div className="fs-5 company-main-text">
                    Lucid Technologies.inc
                  </div>

                  <div className="fs-6 company-secondary-text">
                    info@lucidtech.com
                  </div>

                  <div className="fs-6 company-secondary-text">
                    8600, freeport Pkwy, STE 300
                  </div>
                </div>

                <div className="w-100 d-flex align-items-center justify-content-center mt-3 ">
                  <Button
                    className="company-primary-text"
                    label="View more"
                    text
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* pending table */}

        <div className=" container-fluid mb-5">
          <div className="row">
            <div className="col-3 bg-white rounded"></div>
            <div className="col-9 rounded">
              {employeeDataLoading ? (
                <DashboardPendingEmployee header1={header1} />
              ) : (
                <DataTable value={employeeData} header={header1} size="small">
                  <Column field="resourceName" header="Full Name" />
                  <Column field="resourceId" header="Employee ID" />
                  <Column field="role" header="Role" />
                  <Column field="status" header="Status" />
                </DataTable>
              )}
            </div>
          </div>
        </div>
        {/*  */}
        <div className=" container-fluid mb-5">
          <div className=" rounded">
            {employeeDataLoading ? (
              <DashboardPendingEmployee header1={header2} />
            ) : (
              <DataTable value={employeeData} header={header2} size="small">
                <Column field="resourceName" header="Full Name" />
                <Column field="resourceId" header="Employee ID" />
                <Column field="role" header="Role" />
                <Column field="status" header="Status" />
              </DataTable>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
