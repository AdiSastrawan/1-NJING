import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserAuth";
import profile from "../assets/user.png";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { axiosClient } from "../axios-client";
import useTimeFormater from "../costumhooks/useTimeFormater";
import Post from "../components/Post/Post";
import Loading from "../components/Loading/Loading";
import { set } from "lodash";
import { AlertDanger } from "../components/Alert/Alert";

async function getUser(setProfileData, id, setError, setLoading) {
    try {
        const response = await axiosClient.get("v1/profile/" + id);
        setProfileData(response.data.data);
        setLoading(false);
    } catch (error) {
        setError(error.response);
    }
}
async function getUserPosts(
    setPosts,
    id,
    setLoading,
    pageNumber,
    setHasMore,
    setError
) {
    try {
        const response = await axiosClient.get(
            "v1/profile/posts/" + id + `?page=${pageNumber}`
        );
        setPosts((prev) => {
            return [...new Set([...prev, ...response.data.data])];
        });
        setHasMore(
            response.data.meta.current_page < response.data.meta.last_page
        );
        setLoading(false);
    } catch (error) {
        setError(error.response);
    }
}
export default function Profile() {
    const { user, url } = useContext(UserContext);
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [deleted, setdeleted] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const observer = useRef();
    let userId = 0;
    if (user !== null) {
        userId = user.id;
    }
    const bottomPage = useCallback(
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

    useEffect(() => {
        console.log("kontol");

        setLoading(true);
        getUser(setProfileData, id, setError, setLoading);
        getUserPosts(
            setPosts,
            id,
            setLoading,
            pageNumber,
            setHasMore,
            setError
        );
    }, [id, pageNumber]);
    if (error) {
        if (error.status === 404) {
            navigate("/notfound");
        }
    }
    return (
        <div className="p-4 w-full h-fit ">
            {profileData !== null && (
                <>
                    <h1 className="text-left font-bold text-2xl mb-2">
                        {userId === profileData.id
                            ? "My Profile"
                            : "User Profile"}
                    </h1>

                    <div className="flex  flex-col items-center relative">
                        {user && user.id === profileData.id && (
                            <Link
                                to="/edit/profile"
                                className="px-2 py-1 bg-white rounded-md absolute top-0 right-0 text-prime"
                            >
                                Edit
                            </Link>
                        )}

                        <img
                            className="w-28 h-28 rounded-full object-cover object-center"
                            src={
                                profileData.profile_img !== null
                                    ? url + profileData.profile_img
                                    : profile
                            }
                        />
                        <div className="my-4 flex flex-col text-base text-white/80">
                            <div>Name : {profileData.name}</div>
                            <div>Email : {profileData.email} </div>
                            <div>
                                Description :{" "}
                                {profileData.description != null ? (
                                    profileData.description
                                ) : (
                                    <p className="inline text-white/50 font-light">
                                        No description yet
                                    </p>
                                )}{" "}
                            </div>
                            <div>
                                Joined at :{" "}
                                {useTimeFormater(profileData.created_at).date}
                            </div>{" "}
                        </div>
                    </div>
                </>
            )}

            <div className="flex flex-col ">
                {profileData && (
                    <h1 className="font-bold text-xl">
                        {user && user.id === profileData.id
                            ? "My Post"
                            : "User Post"}
                    </h1>
                )}
                {posts.length > 0 && (
                    <section className="">
                        {posts.map((post, i) => {
                            return (
                                <Post
                                    key={i}
                                    data={post}
                                    comments={post.comments.length}
                                    comment={true}
                                    setPageNumber={setPageNumber}
                                    pageNumber={pageNumber}
                                    setPosts={setPosts}
                                />
                            );
                        })}
                    </section>
                )}
            </div>
            {loading && <Loading text="Loading" bg="base" />}
            {error != null && <AlertDanger errors={error} />}
            <div ref={bottomPage} className="w-full my-2 bg-base"></div>
        </div>
    );
}
