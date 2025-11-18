import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  DashboardIcon,
  BookingIcon,
  ContactIcon,
  PhotoListIcon,
  CollectionIcon,
  ExpenditureIcon,
  OtherIcon,
  SettingsIcon,
  LogoutIcon,
} from "../ui/icons/Icons";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuItems = [
  { path: "/", icon: <DashboardIcon />, label: "Dashboard" },
  { path: "/booking", icon: <BookingIcon />, label: "Booking" },
  { path: "/contact", icon: <ContactIcon />, label: "Contact" },
  { path: "/photo-list", icon: <PhotoListIcon />, label: "Photo List" },
  { path: "/collection", icon: <CollectionIcon />, label: "Collection" },
  { path: "/expenditure", icon: <ExpenditureIcon />, label: "Expenditure" },
  { path: "/other", icon: <OtherIcon />, label: "Other" },
  { path: "/settings", icon: <SettingsIcon />, label: "Settings" },
];

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  return (
    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-hidden bg-gray-800 text-gray-300 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className="text-2xl font-bold text-white pt-2.5">
          Asha LensCraft
        </NavLink>
        <button
          onClick={() => setSidebarOpen(false)}
          className="block lg:hidden text-gray-400 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="flex flex-col flex-grow mt-5 px-4 lg:mt-9 lg:px-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-700 ${
                    isActive ? "bg-gray-700 text-white" : "text-gray-400"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto p-4">
          <button
            onClick={logout}
            className="group w-full relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-400 duration-300 ease-in-out hover:bg-red-500 hover:text-white"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
