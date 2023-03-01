import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiTrendingUp } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

export default function NavTopBar({}) {
    return (
        <div className="flex  justify-around   bg-base w-full">
            <NavLink
                to="/"
                act
                className={({ isActive }) => ` 
                    ${isActive && "text-white font-bold border-b-2"} 
                  px-4 flex items-center space-x-1  w-full text-center py-2 justify-center`}
            >
                <AiOutlineClockCircle size="20px" />
                <h3>Recent</h3>
            </NavLink>
            <NavLink
                to="/trending"
                className={({ isActive }) =>
                    ` ${
                        isActive && "text-white font-bold border-b-2"
                    }  px-4 flex items-center space-x-1  w-full text-center py-2 justify-center`
                }
            >
                <HiTrendingUp size="20px" />
                <h3>Trending</h3>
            </NavLink>{" "}
        </div>
    );
}
