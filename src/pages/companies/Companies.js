import { TitleContext } from "../../components/header/TitleContext";
import { useContext } from "react";
import { companiesTableData } from "../../services/CompaniesServices";
import React, { useEffect, useState, useRef } from "react";
import CommonTabs from "../../components/reusable/CommonTab";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import CompaniesTable from "../../components/userDataTable/CompaniesTable";
import { Sidebar } from "primereact/sidebar";
import AddCompany from "../../components/reusable/addCompany/AddCompany";

function Companies() {
  const tableColumns = [
    {
      header: "Company Name",
      field: "name",
      isSelected: true,
      isChecked: false,
      isPermanent: true,
    },

    {
      header: "Location",
      field: "location",
      isSelected: true,
      isChecked: true,
      isPermanent: false,
    },
    {
      header: "Role",
      field: "orgRoles",
      isSelected: true,
      isChecked: true,
      isPermanent: false,
    },
    {
      header: "CEO Name",
      field: "ceoName",
      isSelected: true,
      isChecked: true,
      isPermanent: false,
    },
    {
      header: "CEO Phone",
      field: "ceoPhone",
      isSelected: true,
      isChecked: true,
      isPermanent: false,
    },
    {
      header: "Created On",
      field: "createdOn",
      isSelected: false,
      isChecked: false,
      isPermanent: false,
    },
  ];
  const companiesModal = "Companies";
  const dataTableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [companiesColumns, setCompaniesColumns] = useState(tableColumns);
  const [companiesData, setCompaniesData] = useState([]);
  const [companiesFilters, setCompaniesFilters] = useState(null);
  const [columnFilterValue, setColumnFilterValue] = useState(false);
  const [exportFormat, setExportFormat] = useState("csv");
  const { setTitle } = useContext(TitleContext);
  const [companiesSidebarVisible, setCompaniesSidebarVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [value, setValue] = useState("");

  const handleCompaniesData = async () => {
    setLoading(true);
    const result = await companiesTableData();

    setCompaniesData(result);
    setLoading(false);
  };

  useEffect(() => {
    handleCompaniesData();
  }, []);

  const exportColumns = companiesColumns?.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const handleExportClick = () => {
    if (exportFormat === "csv") {
      if (dataTableRef.current) {
        dataTableRef.current.exportCSV();
      }
    } else if (exportFormat === "pdf") {
      import("jspdf").then((jsPDF) => {
        import("jspdf-autotable").then(() => {
          const doc = new jsPDF.default(0, 0);
          doc.autoTable(exportColumns, companiesData);
          doc.save("products.pdf");
        });
      });
    }
  };
  const initFilters = (companiesColumns) => {
    const initialFilters = {};
    companiesColumns.forEach((column) => {
      if (column.field === "ceoPhone") {
        initialFilters[column.field] = {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.IN }],
        };
      } else
        initialFilters[column.field] = {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        };
    });

    setCompaniesFilters(initialFilters);
  };
  useEffect(() => {
    if (companiesColumns.length > 0) {
      initFilters(companiesColumns);
    }
  }, [companiesColumns]);

  const handleFilterClick = () => {
    setColumnFilterValue(!columnFilterValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      await companiesTableData();
    };

    fetchData();
    setTitle("Companies");
  }, [setTitle]);

  const tabs = [
    {
      label: "Showing 1 to 15 of 50 entries",
      content: (
        <CompaniesTable
          companiesData={companiesData}
          companiesColumns={companiesColumns}
          setCompaniesColumns={setCompaniesColumns}
          loading={loading}
          filters={companiesFilters}
          columnFilterValue={columnFilterValue}
          setColumnFilterValue={setColumnFilterValue}
          dataTableRef={dataTableRef}
        />
      ),
    },
  ];

  return (
    <>
      <Sidebar
        position="right"
        visible={companiesSidebarVisible}
        showCloseIcon={false}
        onHide={() => {
          setCompaniesSidebarVisible(false);
          setProgress(0);
        }}
        className="custom-sidebar w-100 "
      >
        <AddCompany
          progress={progress}
          value={value}
          setValue={setValue}
          setProgress={setProgress}
          companiesSidebarVisible={companiesSidebarVisible}
          setCompaniesSidebarVisible={setCompaniesSidebarVisible}
        />
      </Sidebar>
      <div className="container-fluid p-2">
        <CommonTabs
          tabs={tabs}
          columns={companiesColumns}
          setColumns={setCompaniesColumns}
          data={companiesData}
          setData={setCompaniesData}
          modalName={companiesModal}
          handleFilterClick={handleFilterClick}
          columnFilterValue={columnFilterValue}
          setColumnFilterValue={setColumnFilterValue}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          handleExportClick={handleExportClick}
          setSidebarVisible={setCompaniesSidebarVisible}
        />
      </div>
    </>
  );
}

export default Companies;
