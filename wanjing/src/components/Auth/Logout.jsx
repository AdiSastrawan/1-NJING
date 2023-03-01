import { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../../axios-client";
import { UserContext } from "../../context/UserAuth";
import PopUp from "../Alert/PopUp";

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
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate();
    function logoutUser() {
        logout(setToken, setUser, navigate);
        dropdownHandler();
    }
    return (
        <>
            <PopUp
                func={logoutUser}
                confirm={confirm}
                setConfirm={setConfirm}
                confirmation="Are you sure want to log out?"
            />
            <button
                onClick={() => {
                    setConfirm(true);
                }}
                className={`${
                    size ? "text-white/80" : "text-white/90"
                } space-x-1`}
            >
                <BiLogOut
                    className={`inline `}
                    size={`${size ? size + "px" : "18px"}`}
                />
                <p className="inline">Logout</p>
            </button>
        </>
    );
}
