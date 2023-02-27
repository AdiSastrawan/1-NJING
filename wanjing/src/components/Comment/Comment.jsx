import {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { BiTrash } from "react-icons/bi";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import profile from "../../assets/user.png";
import { axiosClient } from "../../axios-client";
import { UserContext } from "../../context/UserAuth";
import useTimeFormater from "../../costumhooks/useTimeFormater";
import CommentForm from "./CommentForm";
async function updateVote(payload, id) {
    try {
        const response = await axiosClient.put(
            "v1/comment/vote/" + id,
            payload
        );
    } catch (error) {
        console.log(error);
    }
}
export default function Comment({
    comment,
    deleteHandler,
    drop,
    replies,
    counter,
    setLoading,
}) {
    const { user, url, token } = useContext(UserContext);
    const [upvote, setUpVote] = useState(comment.upvote);
    const { id } = useParams();
    const [replydrop, setReplydrop] = useState(false);
    const [isreplying, setIsReplying] = useState(false);
    const [downvote, setDownVote] = useState(comment.downvote);
    const [is_up, setIsUp] = useState(
        comment.voted && comment.voted.length > 0
            ? comment.voted[0].votedup
            : false
    );
    const [is_down, setIsDown] = useState(
        comment.voted && comment.voted.length > 0
            ? comment.voted[0].voteddown
            : false
    );

    useEffect(() => {
        const payload = {
            isdown: is_down,
            isup: is_up,
            downvote: downvote,
            upvote: upvote,
            _method: "PUT",
        };
        updateVote(payload, comment.id);
    }, [downvote, replydrop, upvote]);

    function upVoteHandler(e) {
        if (!is_up) {
            setUpVote((prev) => {
                return prev + 1;
            });
            if (is_down) {
                setIsDown((prev) => {
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
        setIsUp((prev) => {
            return !prev;
        });
    }
    function downVoteHandler(e) {
        if (!is_down) {
            setDownVote((prev) => {
                return prev + 1;
            });
            if (is_up) {
                setIsUp((prev) => {
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
        setIsDown((prev) => {
            return !prev;
        });
    }
    function replyHandler() {
        setReplydrop((prev) => {
            return !prev;
        });
    }
    function isreplyArea() {
        setIsReplying((prev) => {
            return !prev;
        });
    }
    return (
        <div
            className={`flex w-full  justify-start px-1 ${
                drop == false ? "hidden" : ""
            }`}
        >
            <div className="  flex flex-shrink-0">
                <img
                    src={
                        comment.user[0].profile_img !== null
                            ? url + comment.user[0].profile_img
                            : profile
                    }
                    className="w-8  h-8 rounded-full mr-2 object-cover"
                    alt="profile"
                />
            </div>
            <div className="flex flex-col space-y-1 ">
                <div className="flex space-x-2 items-center w-full">
                    <Link to={`/profile/${comment.user_id}`}>
                        {comment.user[0].name}
                    </Link>
                    <p className="text-sm text-white/40">
                        {useTimeFormater(comment.created_at).date}
                    </p>
                </div>
                <div>{comment.comment}</div>
                <div className="flex space-x-4 items-center">
                    <div
                        className={`flex space-x-1 ${is_up && "text-blue-600"}`}
                    >
                        <button onClick={token && upVoteHandler}>
                            <ImArrowUp size="20px" />
                        </button>
                        <h3>{upvote}</h3>
                    </div>
                    <div
                        className={`flex space-x-1 ${
                            is_down && "text-red-600"
                        }`}
                    >
                        <button onClick={token && downVoteHandler}>
                            <ImArrowDown size="20px" />
                        </button>
                        <h3>{downvote}</h3>
                    </div>
                    {counter < 3 && (
                        <button onClick={isreplyArea}>Reply</button>
                    )}
                    {user !== null &&
                        (user.id === comment.user_id ? (
                            <button
                                onClick={deleteHandler.bind(this, comment.id)}
                            >
                                <BiTrash size="20px" />
                            </button>
                        ) : (
                            ""
                        ))}
                </div>
                {isreplying && (
                    <CommentForm
                        replyMode={true}
                        id={id}
                        setLoading={setLoading}
                        setReplyMode={isreplyArea}
                        parentId={comment.id}
                    />
                )}
                {replies(comment.id) && replies(comment.id).length > 0 && (
                    <div className="py-2">
                        <button onClick={replyHandler}>
                            {replydrop ? (
                                <IoMdArrowDropup className="inline" />
                            ) : (
                                <IoMdArrowDropdown className="inline" />
                            )}
                            {replies(comment.id).length}
                            {replies(comment.id).length == 1
                                ? " Reply"
                                : " Replies"}{" "}
                        </button>

                        {replies(comment.id).map((c, i) => {
                            return (
                                <Comment
                                    comment={c}
                                    key={i}
                                    counter={counter + 1}
                                    setLoading={setLoading}
                                    drop={replydrop}
                                    replies={replies}
                                    deleteHandler={deleteHandler}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
