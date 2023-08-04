import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";

export default function Message() {
  const menuRight = useRef(null);
  const avtar1 = (
    <Avatar
      image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
      shape="circle"
      className=""
    />
  );

  const Message = [
    {
      avatar: avtar1,
      name: "James Cameron",
      text: "Loreim ipsum is simply dummy text",
      time: "1 hours ago",
    },
    {
      avatar: avtar1,
      name: "Srikant Kandavelu",
      text: "Loreim ipsum is simply dummy text",
      time: "1 Day ago",
    },
    {
      avatar: avtar1,
      name: "Ramesh Balaraju",
      text: "Loreim ipsum is simply dummy text",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="flex justify-content-center">
      <Menu
        model={[
          {
            label: (
              <div className="d-flex justify-content-between">
                <div className="fs-5">Messages</div>
                <div className="fw-normal">unread</div>
              </div>
            ),
            items: Message.map((notification) => ({
              label: (
                <div className="d-flex">
                  <div className="mt-2 p-2">{notification.avatar}</div>
                  <div className="ml-2 mt-3">
                    <span className="fw-bold">{notification.name}</span>
                    <br />
                    <span className="lh-base">{notification.text}</span>
                    <br />
                    <span className="pi pi-clock"> {notification.time}</span>
                  </div>
                </div>
              ),
            })),
          },
          {
            label: (
              <div className="text-center mt-2">
                <span>
                  <i className="pi pi-arrow-right text-xs mr-1 company-primary-text"></i>
                </span>
                <Link className="company-primary-text" to={`/allnotification`}>View More...</Link>
              </div>
            ),
          },
        ]}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
        className="w-25"
      />
      <div
        className="mr-2"
        onClick={(event) => menuRight.current.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      >
        <i className="pi pi-envelope p-overlay-badge" style={{ fontSize: '1.3rem' }}>
          <Badge value={Message.length} severity="danger"></Badge>
        </i>
      </div>
    </div>
  );
}


