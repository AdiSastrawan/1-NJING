import { useContext, useEffect, useState } from "react";
import profile from "../../../assets/user.png";
import { CgProfile } from "react-icons/cg";
import { IoIosCreate } from "react-icons/io";
import { UserContext } from "../../../context/UserAuth";
import Logout from "../../Auth/Logout";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { axiosClient } from "../../../axios-client";

async function getUser(setUser) {
    try {
        const response = await axiosClient.get("user");
        setUser(response.data);
    } catch (error) {
        console.log(error);
    }
}

export default function NavDropdown({ dropdownHandler, dropdown }) {
    const { user, url, setUser } = useContext(UserContext);

    function close() {
        dropdownHandler();
    }
    useEffect(() => {
        getUser(setUser);
    }, []);
    if (!user) {
        return (
            <AiOutlineLoading3Quarters
                size="1em"
                className="animate-spin text-white"
            />
        );
    }

    return (
        <div className="relative ">
            <button onClick={dropdownHandler} className=" ">
                <img
                    src={user.profile_img ? url + user.profile_img : profile}
                    className="object-cover md:w-10 md:h-10 w-8 h-8 rounded-full"
                />
            </button>
            <ul
                className={
                    dropdown
                        ? "absolute w-36 text-sm space-y-2 px-2 py-2  rounded-md transition-all duration-300 text-white/90 right-0 flex-col bg-secondary drop-shadow-lg"
                        : "absolute w-36 text-sm px-2 space-y-2  opacity-0 duration-300 hidden transition-all text-white/90 right-0 flex-col bg-secondary drop-shadow-lg"
                }
            >
                <li>
                    <Link
                        to={`/profile/${user.id}`}
                        onClick={close}
                        className="flex items-center"
                    >
                        <CgProfile
                            className=" mr-1 flex-shrink-0"
                            size="18px"
                        />
                        <h2>{user.name}</h2>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/create"
                        className="flex items-center"
                        onClick={close}
                    >
                        <IoIosCreate
                            className=" mr-1 flex-shrink-0"
                            size="18px"
                        />{" "}
                        <h2>Make a post</h2>
                    </Link>
                </li>
                <li>
                    <Logout dropdownHandler={dropdownHandler} />
                </li>
            </ul>
        </div>
    );
}
