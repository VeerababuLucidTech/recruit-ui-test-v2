import {
  RiDashboardLine,
  RiBuildingLine,
  RiContactsBookLine,
  RiUser2Line,
  RiBriefcaseLine,
} from "react-icons/ri";
import { AiOutlineClockCircle, AiOutlineLogout } from "react-icons/ai";
import createIcon from './../../assets/createIcon.svg';
import { BsGraphUpArrow } from "react-icons/bs";

const MenuItems = [
  {
    path: "/createnew",
    name: <div className="createUser"> Create New </div>,
    icon: <img src={createIcon} alt="" className="createIcon" />,
  },
  {
    path: "/",
    name: "Dashboard",
    icon: <RiDashboardLine />,
  },
  {
    path: "/addressbook",
    name: "Address Book",
    icon: <RiContactsBookLine />,
  },

  {
    path: "/resources",
    name: "Resources",
    icon: <RiUser2Line />,
  },
  {
    path: "/contracts",
    name: "Contracts",
    icon: <RiBriefcaseLine />,
  },
  {
    path: "/timesheets",
    name: "Timesheets",
    icon: <AiOutlineClockCircle />,
  },
  {
    path: "/companies",
    name: "Companies",
    icon: <RiBuildingLine />,
  },

  //admin setting
  {
    path: "/admin",
    name: "Admin",
    icon: <i className="pi pi-cog" style={{ fontSize: '1rem' }}></i>,
  },
  {
    path: "/charts",
    name: "Charts",
    icon: <BsGraphUpArrow />
  },
  {
    path: "/login",
    name: "Logout",
    icon: <AiOutlineLogout />,
  },
];

export default MenuItems;
