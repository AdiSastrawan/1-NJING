import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../axios-client";
import { AlertDanger } from "../components/Alert/Alert";
import Drop from "../components/Form/Drop";
import Loading from "../components/Loading/Loading";
import { UserContext } from "../context/UserAuth";

async function postCreate(payLoad, navigate, setErrors, setLoading) {
    try {
        const response = await axiosClient.post("v1/posts", payLoad, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        navigate("/");
    } catch (error) {
        setLoading(false);
        setErrors(error.response);
    }
}

export default function CreatePost() {
    const { token, user } = useContext(UserContext);
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const title = useRef(null);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (token === null && user === null) {
            navigate("/");
        }
    }, []);
    function submitHandler(e) {
        e.preventDefault();
        setLoading(true);
        const payLoad = new FormData();
        payLoad.append("title", title.current.value);
        payLoad.append("files", image);
        postCreate(payLoad, navigate, setErrors, setLoading);
        URL.revokeObjectURL(previewImage);
        if (!errors) {
        }
    }
    if (loading) {
        return <Loading bg="base" text="Redirecting" screen="screen" />;
    }

    return (
        <div className="p-6 w-full h-fit relative">
            <h1 className="text-left font-bold text-3xl my-4">Make A Post</h1>
            <div className="my-4 ">
                {errors && <AlertDanger errors={errors} />}
                <form onSubmit={submitHandler} className="mx-4 space-y-2">
                    <label className="block text-xl font-semibold">Title</label>
                    <input
                        type="text"
                        ref={title}
                        className="px-2 w-full text-prime rounded-md mb-4"
                    />
                    <label className="block text-xl font-semibold">
                        Image/Video
                    </label>
                    <div className="relative">
                        <Drop
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            setImage={setImage}
                            image={image}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-2 py-1   rounded-md bg-white text-prime"
                    >
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}
