import { BsTrophy } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosCreate, IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useContext } from "react";
import { UserContext } from "../../context/UserAuth";
import { BiLogIn } from "react-icons/bi";
import Footer from "../Footer/Footer";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiTrendingUp } from "react-icons/hi";
export default function SideBar({ sidebar, sidebarHandler }) {
    const { user } = useContext(UserContext);
    return (
        <div
            className={
                sidebar
                    ? "fixed translate-x-0 h-screen md:hidden bg-base transition-all duration-300 z-40 w-3/5 overflow-y-scroll"
                    : "-translate-x-[2000px] fixed  h-screen md:hidden bg-base transition-all duration-300 z-40 w-3/5 overflow-y-scroll"
            }
        >
            <div className="pl-2 border-b border-white/90 py-2 relative">
                <button
                    onClick={sidebarHandler}
                    className="absolute right-0 top-1/4 mx-1"
                >
                    <IoMdClose size="22px" />
                </button>
                <h1 className="font-bold text-xl text-white/90">1-JING</h1>
            </div>
            <div className="">
                <section>
                    <ul className=" ">
                        <NavLink
                            to="/"
                            onClick={sidebarHandler}
                            className={({
                                isActive,
                            }) => `hover:bg-secondary transition-colors  py-2 px-2 font-normal flex items-center text-lg  text-white/90 space-x-1  
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
                            onClick={sidebarHandler}
                            className={({
                                isActive,
                            }) => `hover:bg-secondary transition-colors py-2 px-2 font-normal flex items-center text-lg  text-white/90 space-x-1  
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
                            onClick={sidebarHandler}
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
                        {user ? (
                            <>
                                <NavLink
                                    onClick={sidebarHandler}
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
                                    onClick={sidebarHandler}
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
                                    onClick={sidebarHandler}
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
                                <Link
                                    onClick={sidebarHandler}
                                    to="/login"
                                    className="flex items-center text-base text-white/80 space-x-1 font-normal px-4 "
                                >
                                    <BiLogIn size="22px" />
                                    <p>Login</p>
                                </Link>
                            </li>
                        )}
                    </ul>
                </section>
                <Footer />
            </div>
        </div>
    );
}
