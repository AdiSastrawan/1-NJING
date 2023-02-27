import { useContext, useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import profile from "../../../assets/user.png";
import { axiosClient } from "../../../axios-client";
import { UserContext } from "../../../context/UserAuth";
import useTimeFormater from "../../../costumhooks/useTimeFormater";

async function deletePost(id, setPageNumber, setLoading, setPosts) {
    try {
        const response = await axiosClient.delete("v1/posts/" + id);
        setLoading(false);
        setPageNumber((prev) => {
            prev = 1;
        });
        setPosts([]);
    } catch (error) {
        console.log(error);
    }
}

export default function Top(props) {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { url, user } = useContext(UserContext);
    const date = useTimeFormater(props.data.created_at).date;
    useEffect(() => {
        if (loading === true) {
            if (props.setPageNumber) {
                deletePost(
                    props.data.id,
                    props.setPageNumber,
                    setLoading,
                    props.setPosts
                );
            }
        }
    }, [loading]);
    function deleteHandler() {
        setLoading(true);
    }
    return (
        <div className="flex flex-col px-1 py-1 relative">
            {user && id == user.id && (
                <button
                    onClick={deleteHandler}
                    className="absolute right-0 bg-red-500 px-2 py-1 rounded-md mr-2"
                >
                    <BiTrash size="22px" />
                </button>
            )}

            <div className="flex items-center space-x-2">
                <img
                    src={
                        props.data.user[0].profile_img
                            ? url + props.data.user[0].profile_img
                            : profile
                    }
                    className="object-cover rounded-full w-7 h-7"
                    alt="profile"
                />

                <Link
                    to={`/profile/${props.data.user_id}`}
                    className="text-white/80 font-medium text-lg"
                >
                    {props.data.user[0].name}
                </Link>

                <p className="text-white/30 text-xs">{date}</p>
            </div>
            {id == undefined ? (
                <Link
                    to={`/post/${props.data.id}`}
                    target="_blank"
                    className=""
                >
                    <h2 className="text-white font-semibold text-xl py-2 px-1">
                        {props.data.title}
                    </h2>
                </Link>
            ) : (
                <div>
                    <h2 className="text-white font-semibold text-xl py-2 px-1">
                        {props.data.title}
                    </h2>
                </div>
            )}
        </div>
    );
}
