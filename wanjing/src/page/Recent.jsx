import { entries } from "lodash";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { axiosClient } from "../axios-client";
import { AlertDanger } from "../components/Alert/Alert";
import Loading from "../components/Loading/Loading";
import NavTopBar from "../components/Navigation/components/NavTopBar";
import Post from "../components/Post/Post";
import { UserContext } from "../context/UserAuth";
import usePaginate from "../costumhooks/usePaginate";

export default function Recent() {
    const trending = false;
    const [pageNumber, setPageNumber] = useState(1);
    const observer = useRef();
    const { posts, loading, hasMore, error } = usePaginate(
        pageNumber,
        trending,
        setPageNumber
    );

    const lastPostElement = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPageNumber((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    return (
        <>
            <div className="bg-base h-full">
                <NavTopBar />
                {posts.map((post, i) => {
                    return (
                        <Post
                            key={i}
                            data={post}
                            comments={post.comments.length}
                            comment={true}
                        />
                    );
                })}
                {loading && <Loading bg="base" text="Loading" />}
                {error && <AlertDanger errors={error} />}
                <div className="bg-base py-5 w-2" ref={lastPostElement}></div>
            </div>
        </>
    );
}
