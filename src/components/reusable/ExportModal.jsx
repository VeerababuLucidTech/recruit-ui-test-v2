import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

function ExportModal({
  openExportModal,
  setOpenExportModal,
  exportFormat,
  setExportFormat,
  handleExportClick,
  modalName,
}) {
  const handleModalClose = () => {
    setOpenExportModal();
    setExportFormat("csv");
  };

  return (
    <>
      <Dialog
        header={`Export ${modalName}`}
        visible={openExportModal}
        onHide={() => handleModalClose()}
        className="w-50"
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="d-flex justify-content-center flex-column ">
          {/* No. of Resources */}
          <>
            <p className="company-secondary-text fw-normal mb-4">
              Select the file type you would like to Export
            </p>

            <label htmlFor="myDropdown">File Type</label>
            <div className="card d-flex justify-content-center mt-6">
              <Dropdown
                id="myDropdown"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.value)}
                options={[
                  { fileType: "CSV", value: "csv" },
                  { fileType: "PDF", value: "pdf" },
                ]}
                optionLabel="fileType"
                placeholder="Select a File Type"
                className="w-full md:w-14rem"
                defaultValue={exportFormat === "CSV"}
              />
            </div>
          </>

          {/* buttons */}
          <div className="d-flex justify-content-end mt-5 p-7  gap-4   h-4">
            <Button
              className="company-secondary-btn"
              size="small"
              label="Cancel"
              onClick={() => handleModalClose()}
            />
            <Button
              className="company-primary-btn"
              size="small"
              label="Export"
              onClick={() => handleExportClick()}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ExportModal;
