import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useScreen } from "../../context/ScreenContext";
import store from "../../redux/store";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { isMobile, sidebarOpen } = useScreen();
    const { user } = useSelector(state=>state.auth);
    console.log(isMobile, sidebarOpen);
    
    const logoutHandler = () => {
        localStorage.clear();
        store.dispatch({type: "logout"});
        toast.success("Logout Successful.");
    }

    return (
        <div className={`w-3/12 p-6 flex flex-col justify-between bg-blue-300 ${(isMobile && !sidebarOpen) ? "hidden": ""} ${(isMobile && sidebarOpen) ? "lay absolute w-7/12": ""}`}>
            <div className="flex flex-col">
                <Link to='/' className="p-3">Home</Link>
                {(user?.role==="user" || user?.role==='organizer') && <Link to='/dashboard' className="p-3">Dashboard</Link>}
                {user?.role==="organizer" ? (
                    <Link to='/create-trip' className="p-3">Create Trip</Link>
                ) : (
                    <Link to='/browse-trips' className="p-3">Browse Upcoming Trips</Link>
                    )
                }
            </div>
            <Link to='/login' className="p-3 bg-red-500 rounded-lg border-black border-2" onClick={logoutHandler}>Logout</Link>
        </div>
    )
}

export default Sidebar;