import React, { useContext, useRef, useState } from "react";
import { axiosClient } from "../../axios-client";
import { UserContext } from "../../context/UserAuth";

async function sendComment(id, payload, setLoading) {
    console.log(payload, id);
    try {
        const response = await axiosClient.post("v1/comment/" + id, payload);
        setLoading(false);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}
export default function CommentForm({
    setLoading,
    id,
    replyMode,
    parentId,
    setReplyMode,
}) {
    const { user, url } = useContext(UserContext);
    const [commentArea, setCommentArea] = useState(false);
    const comment = useRef("");
    function textareaHandler() {
        setCommentArea((prev) => {
            return !prev;
        });
    }

    function submitHandler(e) {
        console.log(e.target);
        e.preventDefault();
        setLoading(true);
        const payload = {
            comment: comment.current.value,
            parent_id: parentId ? parentId : null,
        };
        console.log(payload.parent_id);
        console.log(payload.comment);
        sendComment(id, payload, setLoading);
    }
    return (
        <div className="flex w-full my-4 px-2">
            <img
                src={user.profile_img ? url + user.profile_img : profile}
                className="w-8 h-8 object-cover rounded-full flex-shrink-0"
                alt="profile"
            />
            <form
                onSubmit={submitHandler}
                className=" w-full ml-2 mr-4 flex flex-col space-y-2"
            >
                <textarea
                    ref={comment}
                    onClick={
                        commentArea
                            ? () => {
                                  return;
                              }
                            : textareaHandler
                    }
                    placeholder={
                        !commentArea && replyMode
                            ? "Reply a comment"
                            : "Leave a comment"
                    }
                    className={`h-${
                        commentArea ? "24" : "12"
                    }  w-full resize-none outline-none px-2 py-1 text-white/80 bg-transparent border focus:border-blue-500 focus:shadow-sm focus: focus:shadow-blue-400/50 rounded-md`}
                    name="comment"
                    id="text-comment"
                ></textarea>
                {commentArea && (
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="border border-white/80 px-2 rounded-lg"
                            onClick={replyMode ? setReplyMode : textareaHandler}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white/80 px-3 py-1 rounded-lg"
                        >
                            {replyMode ? "Reply" : "Post"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
