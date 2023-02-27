import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../axios-client";
import { AlertDanger } from "../components/Alert/Alert";
import Loading from "../components/Loading/Loading";
import { UserContext } from "../context/UserAuth";

async function registerUser(
    payload,
    navigate,
    setErrors,
    setToken,
    setLoading
) {
    try {
        const response = await axiosClient.post("v1/register", payload);
        setToken(response.data.data.token);
        navigate("/");
    } catch (error) {
        setErrors(error.response);
        setLoading(false);
    }
}

export default function Register() {
    const { token, user, setToken } = useContext(UserContext);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        if (token !== null && user !== null) {
            navigate("/");
        }
    }, []);
    function submitHandler(e) {
        e.preventDefault();
        const payload = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            confirm_password: confirmPassword.current.value,
        };
        registerUser(payload, navigate, setErrors, setToken, setLoading);
        if (errors === null) {
            setLoading(true);
        }
    }
    if (loading === true) {
        return <Loading screen="screen" text="Redirecting" bg="base" />;
    }
    return (
        <div className="md:flex md:justify-center md:py-6 md:h-screen">
            <div className="w-full h-screen md:h-fit md:w-1/3 md:rounded-md  transition-all flex-col flex items-center justify-center bg-secondary relative ">
                <Link to="/">
                    <AiOutlineArrowLeft
                        className="absolute left-0 top-0 m-2"
                        size="28px"
                        color="white"
                    />
                </Link>
                <div className="w-full">
                    <h1 className="text-center font-bold md:text-lg text-xl my-3 text-white/90">
                        Sign In
                    </h1>
                    {errors && <AlertDanger errors={errors} />}
                    <form onSubmit={submitHandler} className=" my-2 mx-5 pb-3">
                        <label className="block text-white/80">Name</label>
                        <input
                            ref={name}
                            type="text"
                            className="border text-prime rounded-lg px-3 py-1 mt-1 mb-3 text-base w-full"
                        />
                        <label className="block text-white/80">Email</label>
                        <input
                            ref={email}
                            type="email"
                            className="border text-prime rounded-lg px-3 py-1 mt-1 mb-3 text-base w-full"
                        />
                        <label className="block text-white/80">Password</label>
                        <input
                            ref={password}
                            type="password"
                            className="border text-prime rounded-lg px-3 py-1 mt-1 mb-3 text-base w-full"
                        />
                        <label className="block text-white/80">
                            Confirm Password
                        </label>
                        <input
                            ref={confirmPassword}
                            type="password"
                            className="border text-prime rounded-lg px-3 py-1 mt-1 mb-3 text-base w-full"
                        />
                        <div className="flex justify-left px-2">
                            <Link
                                to="/login"
                                className="text-white/80 text-sm "
                            >
                                Sign in
                            </Link>
                        </div>
                        <div className="flex justify-center mt-3">
                            <button className="rounded-lg text-lg bg-blue-400 text-white px-6 py-1">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <div className="border-y px-5 pt-4 pb-6 space-y-3 text-white/80">
                        <h2 className="text-center">Sign in with</h2>
                        <div className="grid  grid-cols-3 text-center gap-1">
                            <div className=" mx-auto ">
                                <FaGoogle size="2em" />
                            </div>
                            <div className=" mx-auto">
                                <FaFacebook size="2em" />
                            </div>
                            <div className="mx-auto">
                                <FaGithub size="2em" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center py-1">
                        <a className="text-center text-white/80">Help</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
