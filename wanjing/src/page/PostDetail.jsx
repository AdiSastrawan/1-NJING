import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosClient } from "../axios-client";
import Loading from "../components/Loading/Loading";
import Post from "../components/Post/Post";
import { UserContext } from "../context/UserAuth";
import profile from "../assets/user.png";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import useTimeFormater from "../costumhooks/useTimeFormater";
import { BiTrash } from "react-icons/bi";
import Comment from "../components/Comment/Comment";
import CommentForm from "../components/Comment/CommentForm";

async function getPost(id, setPost) {
    try {
        const response = await axiosClient.get("v1/posts/" + id);
        setPost(response.data.data);
    } catch (error) {
        console.log(error);
    }
}
async function getComment(id, setComments) {
    try {
        const response = await axiosClient.get("v1/comment/" + id);
        setComments(response.data.data);
    } catch (error) {
        console.log(error);
    }
}

async function deleteComment(id, setLoading) {
    try {
        const response = await axiosClient.delete("v1/comment/" + id);
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
}
export default function PostDetail() {
    let counter = 0;
    const { token, user } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const commentsByParentId = useMemo(() => {
        if (comments.length <= 0) return [];
        const group = {};
        comments.forEach((comment) => {
            group[comment.parent_id] ||= [];
            group[comment.parent_id].push(comment);
        });
        return group;
    }, [comments]);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);
    const { id } = useParams();

    function getReplies(parentId) {
        return commentsByParentId[parentId];
    }
    useEffect(() => {
        getPost(id, setPost);

        getComment(id, setComments);
    }, [token, loading]);
    if (post === null) {
        return <Loading bg="base" text="Loading" screen="screen" />;
    }

    function deleteHandler(id) {
        setLoading(true);
        deleteComment(id, setLoading);
    }
    return (
        <>
            <div className="md:mt-8">
                <Post data={post} comments={comments.length} />
            </div>
            <div className="pb-2">
                <section>
                    <div className="mx-2 mb-4 border-b border-white/80 pt-1 pb-4">
                        <h2 className="font-semibold bg-white/80 w-fit px-2 py-1 rounded-lg text-base/90 text-xl ">
                            Comment <span>{comments.length}</span>
                        </h2>
                    </div>
                    {token != null && user && !loading && (
                        <CommentForm setLoading={setLoading} id={id} />
                    )}
                    {loading && <Loading />}
                    <ul className=" rounded-lg mx-4 py-2 px-1 ">
                        {comments && comments.length <= 0 && (
                            <h1 className="text-center font-semibold text-xl">
                                No comment yet
                            </h1>
                        )}
                        <li>
                            {comments.map((comment, i) => {
                                if (comment.parent_id === null) {
                                    return (
                                        <Comment
                                            key={comment.id}
                                            comment={comment}
                                            counter={counter + 1}
                                            replies={getReplies}
                                            setLoading={setLoading}
                                            deleteHandler={deleteHandler}
                                        />
                                    );
                                }
                            })}
                        </li>
                    </ul>
                </section>
            </div>
        </>
    );
}
