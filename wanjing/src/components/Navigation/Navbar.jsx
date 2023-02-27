import { useContext, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserAuth";
import NavDropdown from "./components/NavDropdown";

export default function Navbar({ payLoad, setLogin }) {
    const { token, user } = useContext(UserContext);
    return (
        <div className="relative w-full z-20  md:px-28">
            <nav className="bg-prime w-full text-white/90 flex px-4 py-2 drop-shadow-md md:drop-shadow-none ">
                <button
                    onClick={payLoad.sidebarHandler}
                    className="mr-4 md:hidden"
                >
                    <FiMenu size="2em" />
                </button>

                <div className="flex w-full justify-between items-center">
                    <Link
                        to="/"
                        onClick={payLoad.setDropdown.bind(this, false)}
                    >
                        <h1 className="font-bold text-xl text-white/90">
                            1-JING
                        </h1>
                    </Link>

                    {token ? (
                        <div className="md:flex md:space-x-4 md:items-center">
                            <Link
                                to="/create"
                                className="hidden md:flex md:space-x-1 md:items-center md:bg-blue-500 md:px-4 md:rounded-xl md:hover:bg-blue-800 md:h-8"
                            >
                                <IoIosCreate className="inline " size="1em" />{" "}
                                <h2>Post</h2>
                            </Link>
                            <NavDropdown
                                dropdownHandler={payLoad.dropdownHandler}
                                dropdown={payLoad.dropdown}
                                getUser={payLoad.getUser}
                            />
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setLogin(true);
                                }}
                                className=""
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
