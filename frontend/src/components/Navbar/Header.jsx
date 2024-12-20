import { useScreen } from "../../context/ScreenContext";
import { BiMenu } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";

const Header = () => {
  const { isMobile, toggleSidebar, sidebarOpen } = useScreen();
  const { user } = useSelector(state=>state.auth);
  
  return (
    <div className="bg-blue-600 font-bold w-[100vw] text-white flex flex-row items-center justify-between p-4">
      {isMobile ? (
        <div>
          {sidebarOpen ? <ImCross className="text-2xl text-white pl-2 cursor-pointer" onClick={toggleSidebar} /> : <BiMenu className="text-3xl text-white cursor-pointer" onClick={toggleSidebar} />}
        </div>
      ) : null}
      <div className="flex justify-between w-full items-center">
        <h1 className="text-center text-3xl ">Travel Application</h1>
        {user ? <p>Welcome, {user.name}</p> : <p>Welcome, Guest</p>}
      </div>
      {isMobile ? <div></div> : null}
    </div>
  )
}

export default Header