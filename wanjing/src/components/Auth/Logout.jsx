import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../axios-client";
import { UserContext } from "../../context/UserAuth";

async function logout(setToken, setUser, navigate) {
    try {
        const response = await axiosClient.post("v1/logout");
        setToken(null);
        setUser(null);
        // navigate("/");
    } catch (error) {
        console.log(error);
    }
}

export default function Logout({ dropdownHandler, size }) {
    const { setToken, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    function logoutUser() {
        logout(setToken, setUser, navigate);
        dropdownHandler();
    }
    return (
        <button
            onClick={logoutUser}
            className={`${size ? "text-white/80" : "text-white/90"} space-x-1`}
        >
            <BiLogOut
                className={`inline `}
                size={`${size ? size + "px" : "18px"}`}
            />
            <p className="inline">Logout</p>
        </button>
    );
}
