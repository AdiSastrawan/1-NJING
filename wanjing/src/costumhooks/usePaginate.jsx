import axios from "axios";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { axiosClient } from "../axios-client";
import { UserContext } from "../context/UserAuth";

export default function usePaginate(pageNumber, trending, setPageNumber) {
    const [posts, setPosts] = useState([]);
    console.log(trending);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        setPosts([]);
    }, []);
    useEffect(() => {
        setLoading(true);
        async function getPosts() {
            if (trending === true) {
                try {
                    const response = await axiosClient.get(
                        "v1/posts?page=" + pageNumber
                    );
                    setPosts((prevValue) => {
                        return [
                            ...new Set([...prevValue, ...response.data.data]),
                        ];
                    });
                    setHasMore(
                        response.data.meta.current_page <
                            response.data.meta.last_page
                    );
                    setLoading(false);
                } catch (error) {
                    setError(error);
                }
            } else {
                try {
                    const response = await axiosClient.get(
                        "v1/recent?page=" + pageNumber
                    );
                    setPosts((prevValue) => {
                        return [
                            ...new Set([...prevValue, ...response.data.data]),
                        ];
                    });
                    setHasMore(
                        response.data.meta.current_page <
                            response.data.meta.last_page
                    );
                    setLoading(false);
                } catch (error) {
                    setError(error);
                }
            }
        }
        getPosts();
    }, [pageNumber]);
    return { posts, loading, hasMore, error };
}
