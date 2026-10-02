import { FaUserAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const TopBar = () => {
  const { user } = useAuth();

  return (
    <div className="w-full h-[10%] bg-[#f2e8cf] rounded-t-lg p-3 flex px-7">
      <a href="/" className="text-2xl font-bold text-gray-800">
        MediFlow
      </a>
      <a
        href="/profile"
        className="ml-auto flex items-center gap-2 text-gray-800"
      >
         <FaUserAlt className="text-2xl text-gray-800" />
        <span className="text-lg font-medium bg-[#ffe092] p-[.5vw_1vw] rounded-[10px]">{user?.name ?? "User"}</span>
       
      </a>
    </div>
  )
}

export default TopBar
