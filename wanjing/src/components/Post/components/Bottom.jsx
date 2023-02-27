import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
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

    let votedUp = 0;
    let votedDown = 0;
    const [isUpVote, setIsUpVote] = useState(0);
    const [isDownVote, setIsDownVote] = useState(0);
    useEffect(() => {
        if (token == null) {
            setIsDownVote(0);
            setIsUpVote(0);
        } else {
            if (props.data.voted) {
                setIsUpVote(
                    props.data.voted[0] ? props.data.voted[0].votedup : 0
                );

                setIsDownVote(
                    props.data.voted[0] ? props.data.voted[0].voteddown : 0
                );
            }
        }
    }, [token]);

    const [upvote, setUpVote] = useState(props.data.upvote);
    const [downvote, setDownVote] = useState(props.data.downvote);

    function upVoteHandler() {
        let votes = upvote;
        let votedeny = downvote;

        if (isUpVote) {
            votedUp = 0;
            votes = upvote - 1;
            setIsUpVote(votedUp);
            setUpVote(votes);
        } else {
            votedUp = 1;
            votes = upvote + 1;
            setIsUpVote(votedUp);
            setUpVote(votes);
        }

        if (isDownVote == true) {
            votedDown = 0;
            votedeny = downvote - 1;
            setDownVote(votedeny);
        }
        setIsDownVote(0);
        const payload = {
            upvote: votes,
            downvote: votedeny,
            isup: votedUp,
            isdown: votedDown,
        };

        vote(payload, props.data.id);
    }
    function downVoteHandler() {
        let votes = downvote + 1;
        let votedeny = upvote;
        if (isDownVote) {
            votedDown = 0;
            votes = downvote - 1;
            setIsDownVote(votedDown);
            setDownVote(votes);
        } else {
            votedDown = 1;
            votes = downvote + 1;
            setIsDownVote(votedDown);
            setDownVote(votes);
        }

        if (isUpVote == true) {
            votedUp = 0;
            votedeny = upvote - 1;
            setUpVote(votedeny);
        }
        setIsUpVote(0);
        const payload = {
            upvote: votedeny,
            downvote: votes,
            isup: votedUp,
            isdown: votedDown,
        };
        vote(payload, props.data.id);
    }
    return (
        <div className="flex justify-around md:justify-between w-full text-xl py-2">
            <div className="flex space-x-4 md:ml-10">
                <button
                    onClick={token && upVoteHandler}
                    className={`border flex border-white ${
                        isUpVote == 1
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
