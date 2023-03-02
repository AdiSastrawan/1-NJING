import { BiCommentDetail, BiDownvote, BiUpvote } from "react-icons/bi";
import { useContext, useEffect, useRef, useState } from "react";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { axiosClient } from "../../../axios-client";
import { UserContext } from "../../../context/UserAuth";
import { Link } from "react-router-dom";
async function vote(payload, id) {
    try {
        const response = await axiosClient.put("v1/vote/" + id, payload);
    } catch (error) {
        console.log(error);
    }
}
export default function Bottom(props) {
    const { token, url } = useContext(UserContext);

    const [isUpVote, setIsUpVote] = useState(
        props.data.voted && props.data.voted.length > 0
            ? parseInt(props.data.voted[0].votedup)
            : false
    );
    const [isDownVote, setIsDownVote] = useState(
        props.data.voted && props.data.voted.length > 0
            ? parseInt(props.data.voted[0].voteddown)
            : false
    );
    const [upvote, setUpVote] = useState(parseInt(props.data.upvote));
    const [downvote, setDownVote] = useState(parseInt(props.data.downvote));
    console.log(props.data.id, upvote, isUpVote);
    useEffect(() => {
        const payload = {
            upvote: upvote,
            downvote: downvote,
            isup: isUpVote,
            isdown: isDownVote,
            _method: "PUT",
        };
        vote(payload, props.data.id);
    }, [isDownVote, isUpVote]);

    function upVoteHandler(e) {
        if (!isUpVote) {
            setUpVote((prev) => {
                return prev + 1;
            });
            if (isDownVote) {
                setIsDownVote((prev) => {
                    return !prev;
                });
                setDownVote((prev) => {
                    return prev - 1;
                });
            }
        } else {
            setUpVote((prev) => {
                return prev - 1;
            });
        }
        setIsUpVote((prev) => {
            return !prev;
        });
    }
    function downVoteHandler(e) {
        console.log("test");
        if (!isDownVote) {
            setDownVote((prev) => {
                return prev + 1;
            });
            if (isUpVote) {
                setIsUpVote((prev) => {
                    return !prev;
                });
                setUpVote((prev) => {
                    return prev - 1;
                });
            }
        } else {
            setDownVote((prev) => {
                return prev - 1;
            });
        }
        setIsDownVote((prev) => {
            return !prev;
        });
    }
    return (
        <div className="flex justify-around md:justify-between w-full text-xl py-2">
            <div className="flex space-x-4 md:ml-10">
                <button
                    onClick={token && upVoteHandler}
                    className={`border flex border-white ${
                        isUpVote
                            ? "text-blue-600/80 bg-white/80"
                            : "text-white/80"
                    } rounded-lg py-1   px-2 `}
                >
                    <div className=" pr-2  rounded-l-lg border-white">
                        <ImArrowUp ImArrowDown size="24px" />
                    </div>
                    <div className="   border-white">{upvote}</div>
                </button>
                <button
                    onClick={token && downVoteHandler}
                    className={`border flex border-white ${
                        isDownVote == 1
                            ? "text-blue-600/80 bg-white/80"
                            : "text-white/80"
                    } rounded-lg py-1   px-2 `}
                >
                    <div className=" pr-2 rounded-l-lg border-white">
                        <ImArrowDown size="24px" />
                    </div>
                    <div className="  border-white">{downvote}</div>
                </button>
            </div>
            <div className="border flex border-white text-white/80 rounded-lg md:mr-10">
                {props.comment ? (
                    <Link
                        to={`/post/${props.data.id}`}
                        target="_blank"
                        className="border-r px-1 py-1 rounded-l-lg border-white"
                    >
                        <BiCommentDetail size="24px" />
                    </Link>
                ) : (
                    <div className="border-r px-1 py-1 rounded-l-lg border-white">
                        <BiCommentDetail size="24px" />
                    </div>
                )}

                <div className="border-l  px-1 py-1 border-white">
                    {props.comments}
                </div>
            </div>
        </div>
    );
}
