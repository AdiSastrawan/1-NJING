import { useContext, useEffect, useState } from "react";
import { GoMute, GoUnmute } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserAuth";
import Bottom from "./components/Bottom";
import Top from "./components/Top";

import Video from "./components/Video";

export default function Post(props) {
    const { id } = useParams();
    const { url } = useContext(UserContext);
    const [mute, setMute] = useState(true);
    function muteHandler() {
        setMute((prev) => {
            return !prev;
        });
    }
    return (
        <div className="w-full my-2 flex-col  bg-secondary">
            <Top
                data={props.data}
                setPageNumber={props.setPageNumber}
                pageNumber={props.pageNumber}
                setPosts={props.setPosts}
            />
            <div className="w-full bg-black relative">
                {props.data.format === "video" ? (
                    <>
                        <div className="absolute top-0 z-30  text-gray-300 left-0 m-3 flex items-center">
                            <button type="button" onClick={muteHandler}>
                                {mute ? (
                                    <GoMute size="2em" />
                                ) : (
                                    <GoUnmute size="2em" />
                                )}
                            </button>
                        </div>
                        <Video
                            loop={true}
                            mute={mute}
                            src={url + props.data.file}
                            format={props.data.format}
                        />
                    </>
                ) : id == undefined ? (
                    <Link
                        onClick={() => {
                            setTrending(null);
                        }}
                        className="w-full flex justify-center"
                        to={`/post/${props.data.id}`}
                        target="_blank"
                    >
                        <img
                            className="object-contain"
                            loading="lazy"
                            src={url + props.data.file}
                            alt="post"
                        />
                    </Link>
                ) : (
                    <div className="w-full flex justify-center">
                        <img
                            className="object-contain"
                            src={url + props.data.file}
                            alt="post"
                        />
                    </div>
                )}
            </div>
            <Bottom
                data={props.data}
                comments={props.comments}
                comment={props.comment}
            />
        </div>
    );
}
