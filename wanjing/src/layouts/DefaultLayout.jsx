import { useContext, useEffect, useState } from "react";
import { Link, Navigate, NavLink, Outlet } from "react-router-dom";
import SideBar from "../components/Navigation/Sidebar";
import Navbar from "../components/Navigation/Navbar";
import { axiosClient } from "../axios-client";
import { UserContext } from "../context/UserAuth";
import Footer from "../components/Footer/Footer";
import { IoIosCreate } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { BsTrophy } from "react-icons/bs";
import Logout from "../components/Auth/Logout";
import { BiLogIn } from "react-icons/bi";
import { HiTrendingUp } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import Login from "../page/Login";

export default function DefaultLayout() {
    const [sidebar, setSideBar] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [login, setLogin] = useState(false);
    const { token, setUser, user } = useContext(UserContext);
    function sidebarHandler() {
        setSideBar((prevValue) => {
            return !prevValue;
        });
    }

    function dropdownHandler() {
        setDropdown((prevValue) => {
            return !prevValue;
        });
    }

    const payLoad = {
        sidebar,
        dropdown,

        setDropdown,
        sidebarHandler,
        dropdownHandler,
    };
    return (
        <div className="bg-base  h-fit min-h-screen relative text-white/80 ">
            <Login login={login} setLogin={setLogin} />
            <SideBar sidebar={sidebar} sidebarHandler={sidebarHandler} />
            {sidebar && (
                <div
                    onClick={sidebarHandler}
                    className="inset-0 fixed bg-prime z-[39] bg-opacity-30"
                ></div>
            )}
            {dropdown === true && (
                <div
                    onClick={dropdownHandler}
                    className="inset-0 fixed z-10 bg-opacity-0"
                ></div>
            )}
            <div className=" w-full fixed z-[35] md:bg-prime">
                <Navbar payLoad={payLoad} setLogin={setLogin} />
            </div>
            <div className="pt-14 md:mx-28 md:w-1/2  md:relative md:inline-flex">
                <div className="md:w-full">
                    <Outlet />
                </div>
                <div className=" lg:w-1/4 md:w-[200px] hidden md:inline md:right-[9em] md:mt-8  md:rounded-md lg:h-fit lg:min-h-[10vh] md:fixed md:bg-prime ">
                    <div className="">
                        <section>
                            <ul className=" ">
                                <NavLink
                                    to="/"
                                    className={({
                                        isActive,
                                    }) => `hover:bg-secondary transition-colors rounded-t-md  py-2 px-2 font-normal flex items-center text-lg  text-white/90 space-x-1  
                                            ${
                                                isActive &&
                                                "bg-gray-400/30 font-bold"
                                            }`}
                                >
                                    <AiOutlineClockCircle size="22px" />
                                    <h3>Recent</h3>
                                </NavLink>
                                <NavLink
                                    to={`/trending`}
                                    className={({
                                        isActive,
                                    }) => `hover:bg-secondary transition-colors  py-2 px-2 font-normal flex items-center text-lg  text-white/90 space-x-1  
                                        ${
                                            isActive &&
                                            "bg-gray-400/30 font-bold"
                                        }`}
                                >
                                    <HiTrendingUp size="22px" />
                                    <h3>Trending</h3>
                                </NavLink>
                            </ul>
                        </section>
                        <section>
                            <h2 className="font-semibold text-lg text-white/90 py-1 px-2">
                                Ranking
                            </h2>

                            <ul className="">
                                <NavLink
                                    to="/leaderboards"
                                    className={({
                                        isActive,
                                    }) => `hover:bg-secondary transition-colors  py-2 px-6 font-normal flex items-center text-lg  text-white/80 space-x-1  
                                        ${
                                            isActive &&
                                            "bg-gray-400/30 font-bold"
                                        }`}
                                >
                                    <BsTrophy size="22px" />
                                    <p>Leaderboards</p>
                                </NavLink>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-semibold text-lg text-white/90 py-1 px-2">
                                Profile
                            </h2>
                            <ul className="">
                                {user && token ? (
                                    <>
                                        <NavLink
                                            to={"/profile/" + user.id}
                                            className={({
                                                isActive,
                                            }) => `hover:bg-secondary transition-colors  py-2 px-6 font-normal flex items-center text-lg  text-white/80 space-x-1  
                                        ${
                                            isActive &&
                                            "bg-gray-400/30 font-bold"
                                        }`}
                                        >
                                            <CgProfile
                                                className="inline "
                                                size="22px"
                                            />
                                            <p>My Account</p>
                                        </NavLink>
                                        <NavLink
                                            to={"/edit/profile"}
                                            className={({
                                                isActive,
                                            }) => `hover:bg-secondary transition-colors  py-2 px-6 font-normal flex items-center text-lg  text-white/80 space-x-1  
                                        ${
                                            isActive &&
                                            "bg-gray-400/30 font-bold"
                                        }`}
                                        >
                                            <FaUserEdit size="22px" />
                                            <p> Edit Profile</p>
                                        </NavLink>
                                        <NavLink
                                            to={"/create"}
                                            className={({
                                                isActive,
                                            }) => `hover:bg-secondary transition-colors  py-2 px-6 font-normal flex items-center text-lg  text-white/80 space-x-1  
                                        ${
                                            isActive &&
                                            "bg-gray-400/30 font-bold"
                                        }`}
                                        >
                                            <IoIosCreate size="22px" />
                                            <p> Make a post</p>
                                        </NavLink>

                                        <li className="hover:bg-secondary transition-colors  py-2 px-2 rounded-b-md">
                                            <div className="flex items-center text-base text-white/80 space-x-1 font-normal px-4 ">
                                                <Logout size="22" />
                                            </div>
                                        </li>
                                    </>
                                ) : (
                                    <li className="hover:bg-secondary transition-colors  py-2 px-2 rounded-b-md">
                                        <button
                                            onClick={() => {
                                                setLogin(true);
                                            }}
                                            className="flex items-center text-lg  text-white/80 space-x-1 font-normal px-4 "
                                        >
                                            <BiLogIn size="22px" />
                                            <p>Sign in</p>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
