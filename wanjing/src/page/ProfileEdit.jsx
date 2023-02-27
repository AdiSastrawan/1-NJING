import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosClient } from "../axios-client";
import { AlertDanger } from "../components/Alert/Alert";
import { DropEdit } from "../components/Form/Drop";
import { UserContext } from "../context/UserAuth";
import Loading from "../components/Loading/Loading";
async function getUser(setUser) {
    try {
        const response = await axiosClient.get("user");
        setUser(response.data);
    } catch (error) {
        console.log(error);
    }
}
async function updateProfile(payLoad, navigate, setErrors, user, setUser) {
    try {
        const response = await axiosClient.post("v1/profile", payLoad, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        getUser(setUser);
        navigate("/profile/" + user.id);
    } catch (error) {
        setErrors(error.response);
    }
}

export default function ProfileEdit() {
    const { token, user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (token === null && user === null) {
            navigate("/");
        }
    }, []);
    if (user === null) {
        return <Loading text="Loading" bg="prime" screen="screen" />;
    }
    const [previewImage, setPreviewImage] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState(null);
    const [name, setName] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [email, setEmail] = useState(user.email);
    function submitHandler(e) {
        e.preventDefault();
        const payLoad = new FormData();
        payLoad.append("name", name);
        payLoad.append("email", email);
        payLoad.append("description", description);
        if (image != null) {
            payLoad.append("img", image);
        }
        payLoad.append("_method", "PUT");

        updateProfile(payLoad, navigate, setErrors, user, setUser);
        if (!errors) {
            URL.revokeObjectURL(previewImage);
            e.target.disabled = true;
        }
    }
    return (
        <div className="p-6 w-full h-fit relative">
            <h1 className="text-left font-bold text-3xl my-4">Edit Profile</h1>
            <div className="my-4 ">
                {errors && <AlertDanger errors={errors} />}
                <form onSubmit={submitHandler} className="mx-4 space-y-2">
                    <label className="block text-xl font-semibold">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        className="px-2 w-full text-prime rounded-md mb-4"
                    />
                    <label className="block text-xl font-semibold">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="px-2 w-full text-prime rounded-md mb-4"
                    />
                    <label className="block text-xl font-semibold">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        rows="10"
                        cols="20"
                        className="px-2 w-full text-prime rounded-md mb-4"
                    ></textarea>
                    <label className="block text-xl font-semibold">
                        Profile Image
                    </label>
                    <div className="relative">
                        <DropEdit
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
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}
