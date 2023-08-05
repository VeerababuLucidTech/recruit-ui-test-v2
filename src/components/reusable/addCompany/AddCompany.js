import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import backArrowIcon from "../../../assets/backArrowIcon.svg";
import CompanyProfile from "./CompanyProfile";
import Address from "./Address";
import ContactDetails from "./ContactDetails";
import AddCompanyDocument from "./AddCompanyDocument";
import { createCompaniesFormData } from "../../../services/CompaniesServices";
import AddUser from "./AddUser";

function AddCompany({
  setVisible,
  setProgress,
  progress,
  value,
  setValue,
  setCompaniesSidebarVisible,
}) {
  const [currentStep, setCurrentStep] = useState("companyProfile");
  const [formData, setFormData] = useState({
    companyProfile: {},
    contactDetails: {},
    address: {},
    addCompanyDocument: {},
    addUser: {},
  });

  const totalSteps = 5;
  useEffect(() => {
    const getStepIndex = (step) => {
      if (step === "companyProfile") {
        setValue("companyProfile");
        return 1;
      } else if (step === "contactDetails") {
        setValue("contactDetails");
        return 2;
      } else if (step === "address") {
        setValue("address");
        return 3;
      } else if (step === "addCompanyDocument") {
        setValue("addCompanyDocument");
        return 4;
      } else if (step === "addUser") {
        setValue("addUser");
        return 5;
      }
      return 0;
    };

    setProgress((100 / totalSteps) * getStepIndex(currentStep));
  }, [currentStep, setProgress, setValue]);

  const handleNext = (step, data) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(step);
  };

  const handlePrevious = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        fax: formData.fax,
        taxId: formData.taxId,
        description: "Lucid Technologies",
        stateOfIncorporation: formData.stateOfIncorporation,
        taxClassification: formData.taxClassification,
        orgDomains: formData.orgDomains?.map((domainData) => ({
          domain: domainData.domain,
        })),

        organizationDocuments: [
          {
            issuedDt: formData.addCompanyDocument?.issuedDt,
            docNumber: formData.addCompanyDocument?.docNumber,
            documentName: formData.addCompanyDocument?.documentName,
            expirationDate: formData.addCompanyDocument?.expirationDate,
            // Default values for Documents
            documentType: "pdf",
            url: "file_location",
            fileExt: ".pdf",
            fileType: "type",
          },
        ],
        orgCommunications: [
          {
            authSignataryFn: formData.contactDetails.authSignataryFn,
            authSignataryLn: formData.contactDetails.authSignataryLn,
            authSignataryPhone: formData.contactDetails.authSignataryPhone,
            authSignataryEmail: formData.contactDetails.authSignataryEmail,
          },
        ],
        orgAddresses: [
          {
            addressName: formData.address.addressName,
            state: formData.address.state,
            countryCode: formData.address.countryCode,
            postalCode: formData.address.postalCode,
            address1: formData.address.address1,
            address2: formData.address.address2,
            city: formData.address.city,
          }
        ],
      };
      console.log("Payload : ", payload);
      await createCompaniesFormData(payload);

      const path = localStorage.getItem("selectedPath");
      if (path === "/companies") {
        window.location.reload();
      } else if (path === "/contracts" || path === "/resources") {
        setVisible(false);
      }

      toastRef.current.show({
        severity: "success",
        summary: "Success",
        detail: "Company profile has been successfully created.",
        life: 3000,
      });

    } catch (error) {
      console.log("Error while submitting form data:", error.message);

      // Show error toast based on the error code
      if (error.response && error.response.status === 400) {
        toastRef.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: "Please fill in all required fields.",
          life: 1000,
        });
      } else if (error.response && error.response.status === 404) {
        toastRef.current.show({
          severity: "error",
          summary: "Not Found",
          detail: "The requested resource was not found.",
          life: 1000,
        });
      } else {
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "An error occurred while submitting the form.",
          life: 1000,
        });
      }
    }
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

  const toastRef = useRef(null);

  return (
    <>
      <div className="l-width-70 m-auto p-3 d-flex align-items-center justify-content-between border-2  border-bottom mb-2">
        <div className="d-flex align-items-center justify-content-center gap-4">
          <img
            src={backArrowIcon}
            alt="backArrowIcon"
            className="cursorPointer"
            onClick={() => setCompaniesSidebarVisible(false)}
          />
          <div className="company-main-text fs-5 fw-bold">Create Company Profile</div>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <div style={{ width: "130px" }}>
            <label> {progress === 100 ? "Previous" : "Next"}</label>
            <div>{companyNextLabels(value)}</div>
          </div>
          <div style={{ width: 70, height: 70, backgroundColor: "#c3bebe", borderRadius: "35px" }}>
            <CircularProgressbar
              value={progress}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "#ff6600",
              })}
            />
          </div>
        </div>
      </div>
      <div className="l-width-70 m-auto p-2 sidebar-content ">
        {currentStep === "companyProfile" && (
          <CompanyProfile onNext={handleNext} />
        )}
        {currentStep === "contactDetails" && (
          <ContactDetails onPrevious={handlePrevious} onNext={handleNext} />
        )}
        {currentStep === "address" && (
          <Address onPrevious={handlePrevious} onNext={handleNext} />
        )}
        {currentStep === "addCompanyDocument" && (
          <AddCompanyDocument onPrevious={handlePrevious} onNext={handleNext} />
        )}
        {currentStep === "addUser" && (
          <AddUser onPrevious={handlePrevious} onSubmit={handleSubmit} />
        )}
      </div>
      <Toast ref={toastRef} />
    </>
  );
}

export default AddCompany;
