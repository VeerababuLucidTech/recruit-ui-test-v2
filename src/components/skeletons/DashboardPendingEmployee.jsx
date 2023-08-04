import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import React from "react";

function DashboardPendingEmployee({ header1 }) {
  const renderSkeletonBody = () => {
    return <Skeleton width="100%" height="1.5rem" />;
  };
  return (
    <>
      <DataTable
        value={Array.from({ length: 6 })}
        header={header1}
        size="small"
        tableStyle={{ border: "none", marginBottom: "40px" }}
        tableClassName="borderless-table"
      >
        <Column
          field="resourceName"
          header="Full Name"
          body={renderSkeletonBody}
        />
        <Column
          field="resourceId"
          header="Employee ID"
          body={renderSkeletonBody}
        />
        <Column field="role" header="Role" body={renderSkeletonBody} />
        <Column field="status" header="Status" body={renderSkeletonBody} />
      </DataTable>
    </>
  );
}

export default DashboardPendingEmployee;
