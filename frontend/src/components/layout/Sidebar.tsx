import { FaHospital } from "react-icons/fa";
import { MdDashboard, MdPermContactCalendar } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa6";
import { SiFiles } from "react-icons/si";
import { IoSettings, IoLogOut } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

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
        <ul className="text-3xl">

          <li className="mb-14">
            <a href="#" className="hover:text-blue-500">
              <MdDashboard className="text-3xl" />
            </a>
          </li>

          <li className="mb-14">
            <a href="#" className="hover:text-blue-500">
              <FaHospitalUser className="text-3xl" />
            </a>
          </li>

          <li className="mb-14">
            <a href="#" className="hover:text-blue-500">
              <MdPermContactCalendar className="text-3xl" />
            </a>
          </li>

          <li className="mb-14">
            <a href="#" className="hover:text-blue-500">
              <SiFiles className="text-3xl" />
            </a>
          </li>

          <li className="mb-14">
            <a href="#" className="hover:text-blue-500">
              <IoSettings className="text-3xl" />
            </a>
          </li>

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
