import { FaHospital } from "react-icons/fa";
import { MdDashboard, MdPermContactCalendar } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { SiFiles } from "react-icons/si";
import { IoSettings, IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  const navigation = [
    {
      to: "/dashboard",
      icon: <MdDashboard />,
      label: "Dashboard",
    },
    {
      to: "/patients",
      icon: <FaHospitalUser />,
      label: "Patients",
    },
    {
      to: "/appointments",
      icon: <MdPermContactCalendar />,
      label: "Appointments",
    },
    {
      to: "/documents",
      icon: <SiFiles />,
      label: "Documents",
    },
    {
      to: "/settings",
      icon: <IoSettings />,
      label: "Settings",
    },
  ];

  return (
    <div className="w-[8%] h-screen text-white p-4 pt-[2vw] flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center items-start mb-8 h-[20%]">
        <button className="flex h-[6vh] w-[3vw] items-center justify-center text-[#252422] text-lg font-bold bg-[#f2e8cf] rounded-lg cursor-pointer">
          <FaHospital className="text-[2vw]" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex h-[50%] flex-col items-center">
        <ul className="text-3xl flex flex-col gap-14">
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                aria-label={item.label}
                title={item.label}
                className={({ isActive }) =>
                  `w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-blue-500 bg-white/10"
                      : "text-white hover:text-blue-500 hover:bg-white/5"
                  }`
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="flex justify-center items-center h-[30%]">
        <button
          type="button"
          onClick={logout}
          aria-label="Log out"
          title="Log out"
          className="hover:text-red-500 cursor-pointer h-[10%]"
        >
          <IoLogOut className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
