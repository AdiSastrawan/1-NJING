import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { axiosClient } from "../axios-client";
import profile from "../assets/user.png";
import { UserContext } from "../context/UserAuth";
import Loading from "../components/Loading/Loading";

async function getMostVoted(
    setLeaderboard,
    pageNumber,
    sethasMore,
    setLoading
) {
    try {
        const response = await axiosClient.get(
            "v1/leaderboards/mostvoted?page=" + pageNumber
        );
        setLeaderboard(response.data.data.data);
        sethasMore(
            response.data.data.current_page < response.data.data.last_page
        );
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
}
export default function Leaderboard() {
    const { url } = useContext(UserContext);
    const [leaderboard, setLeaderboard] = useState([]);
    const [pageNumber, setpageNumber] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, sethasMore] = useState(false);
    useEffect(() => {
        getMostVoted(setLeaderboard, pageNumber, sethasMore, setLoading);
    }, []);
    console.log(leaderboard);
    console.log(loading);
    return (
        <div className="w-full  md:my-5 md:rounded-md min-h-screen h-fit transition-all flex justify-center py-2 flex-col bg-secondary relative ">
            <div className=" flex justify-center py-4">
                {leaderboard.length > 0 && (
                    <div className="flex flex-col">
                        <img
                            className="w-28 h-28 rounded-full object-cover object-center"
                            src={
                                leaderboard[0].profile_img !== null
                                    ? url + leaderboard[0].profile_img
                                    : profile
                            }
                        />
                        <h1 className="text-center text-lg text-white/90 font-bold">
                            Top User
                        </h1>

                        <h2 className="text-center text-xl text-white/90">
                            {leaderboard[0].name}
                        </h2>
                    </div>
                )}
            </div>
            {!loading ? (
                <div className="flex flex-col mt-5 mx-2">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-center text-sm font-light ">
                                    <thead className="border-b  bg-base font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                        <tr className="rounded-md">
                                            <th
                                                scope="col"
                                                className=" px-6 py-3"
                                            >
                                                Ranking
                                            </th>
                                            <th
                                                scope="col"
                                                className=" px-6 py-3"
                                            >
                                                Username
                                            </th>

                                            <th
                                                scope="col"
                                                className=" px-6 py-3"
                                            >
                                                Total Upvote
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="rounded-b-md">
                                        {leaderboard.map((user, i) => {
                                            return (
                                                <tr
                                                    key={user.id}
                                                    className="border-b bg-prime text-white/90 dark:border-neutral-500"
                                                >
                                                    <td className="whitespace-nowrap  px-6 py-3 font-medium">
                                                        {i + 1}
                                                    </td>
                                                    <td className="whitespace-nowrap  px-6 py-3 font-medium flex items-center space-x-1">
                                                        <img
                                                            className="w-7 h-7 rounded-full object-cover object-center"
                                                            src={
                                                                user.profile_img !==
                                                                null
                                                                    ? url +
                                                                      user.profile_img
                                                                    : profile
                                                            }
                                                        />
                                                        <Link
                                                            to={
                                                                "/profile/" +
                                                                user.id
                                                            }
                                                        >
                                                            {user.name}
                                                        </Link>
                                                    </td>

                                                    <td className="whitespace-nowrap  px-6 py-3">
                                                        {user.posts_sum_upvote
                                                            ? user.posts_sum_upvote
                                                            : 0}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading text="loading" />
            )}
        </div>
    );
}
