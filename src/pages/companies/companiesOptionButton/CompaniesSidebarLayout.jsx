import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import { TabPanel, TabView } from "primereact/tabview";
import { Tag } from "primereact/tag";
import React, { useRef, useState } from "react";
import PayProfile from "../../companies/companiesOptionButton/companiesSidebarTab/PayProfile";

const CompaniesSidebarLayout = ({ visibleRight, setVisibleRight }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const addButtonMenu = useRef(null);
  const sideBarTabMoreButton = useRef(null);

  const sideBarTabMoreOptions = [
    {
      label: <div className="p-2 fw-bold">Leave/Vacation</div>,
    },
    {
      label: <div className="p-2 fw-bold">Documents</div>,
    },
    {
      label: <div className="p-2 fw-bold">Skills</div>,
    },
    {
      label: <div className="p-2 fw-bold">Education</div>,
    },
    {
      label: <div className="p-2 fw-bold">Resume</div>,
    },
    {
      label: <div className="p-2 fw-bold">Emergency Contacts</div>,
    },
    {
      label: <div className="p-2 fw-bold">Dependance</div>,
    },
    {
      label: <div className="p-2 fw-bold">History</div>,
    },
  ];
  const tabButton = () => {
    return (
      <div className="d-flex justify-content-start align-items-center">
        <Menu
          model={sideBarTabMoreOptions}
          className="company-main-text w-auto pl-2 pr-2 pb-2 m-1 p-1"
          popup
          ref={sideBarTabMoreButton}
          id="popup_menu_left"
        />
        <Button
          icon="pi pi-angle-down"
          text
          label="More"
          iconPos="right"
          onClick={(event) => sideBarTabMoreButton.current.toggle(event)}
          className="p-0 w-auto h-auto company-secondary-text  "
          size="small"
        />
      </div>
    );
  };

  const handleTabChange = (e) => {
    setActiveTabIndex(e?.index);
  };

  const addMenuItems = [
    { label: <div className="p-2 fw-bold">Add</div> },
    { label: <div className="p-2 fw-bold">Documents</div> },
    { label: <div className="p-2 fw-bold"> Timesheet</div> },
    { label: <div className="p-2 fw-bold">Notes</div> },
  ];
  const sidebarTab = [
    {
      label: "Profile",
      content: (
        <div className="sidebar-content">
          <PayProfile />
        </div>
      ),
    },
    // {
    //   label: "Notes",
    //   content: (
    //     <div className="sidebar-content">
    //       <NotesTab />
    //     </div>
    //   ),
    // },
    // {
    //   label: "Bill Profile(WO)",
    //   content: (
    //     <div className="sidebar-content">
    //       <BillProfile />
    //     </div>
    //   ),
    // },
    // {
    //   label: "Timesheet",
    //   content: (
    //     <div className="sidebar-content">
    //       <TimeSheet />
    //     </div>
    //   ),
    // },
    // {
    //   label: "Pay Stubs",
    //   content: (
    //     <div className="sidebar-content">
    //       <PayStubs />
    //     </div>
    //   ),
    // },
    // {
    //   label: "Pay Profile(PO)",
    //   content: (
    //     <div className="sidebar-content">
    //       <PayProfile />
    //     </div>
    //   ),
    // },
    // {
    //   label: "Immigration",
    //   content: (
    //     <div className="sidebar-content">
    //       <Immigration />
    //     </div>
    //   ),
    // },
  ];

  return (
    <>
      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
        showCloseIcon={false}
        className="custom-sidebar l-width-80 "
      >
        <div className=" ">
          {/* header */}
          <div className="company-layout-bg p-3 border-bottom m-0   d-flex justify-content-between align-items-center gap-3 p-0  ">
            <div className=" d-flex justify-content-start align-items-center gap-3">
              <Avatar size="xlarge" shape="circle">
                <i className="pi pi-shopping-bag fs-3"></i>
              </Avatar>
              <div className="">
                <div className="d-flex justify-content-start align-items-center gap-2">
                  <div className="company-main-text p-0 fs-6 fw-bold mb-0 mr-2">
                    Abhilash Bande
                  </div>
                  <span className="company-secondary-text">W2 Employee</span>
                  <Tag
                    className="company-secondary-btn "
                    value="Submitted "
                  ></Tag>
                </div>

                <div className=" d-flex justify-content-start align-items-center gap-3 mt-2">
                  <Button
                    text
                    label="Email"
                    size="small"
                    className="bg-white company-secondary-text w-auto p-1"
                    icon="pi pi-envelope "
                  />
                  <Button
                    text
                    label="Call"
                    size="small"
                    icon="pi pi-phone"
                    className="bg-white company-secondary-text w-auto p-1"
                  />
                  <Button
                    text
                    label="Chat"
                    size="small"
                    className="bg-white company-secondary-text w-auto p-1"
                    icon="pi pi-comment"
                  />
                </div>
              </div>
            </div>

            {/* add user drop down */}
            <div className="d-flex justify-content-start align-items-center">
              <Menu
                model={addMenuItems}
                popup
                ref={addButtonMenu}
                id="popup_menu_left"
                className="w-auto pl-2 pr-2 pb-2 m-1"
              />
              <Button
                icon="pi pi-ellipsis-v"
                text
                iconPos="left"
                onClick={(event) => addButtonMenu.current.toggle(event)}
                className="company-main-text m-3"
                size="small"
              />

              <span
                className="pi pi-times-circle fs-5 "
                onClick={() => setVisibleRight(false)}
              ></span>
            </div>
          </div>

          {/* side bar content */}
          <div className="">
            <TabView
              activeIndex={activeTabIndex}
              onTabChange={handleTabChange}
              className="tab-view"
            >
              {sidebarTab?.map((tab, index) => (
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
                headerTemplate={tabButton}
                className="menu-tab d-flex  justify-content-center  align-items-center ms-auto p-2
                "
              ></TabPanel>
            </TabView>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default CompaniesSidebarLayout;
