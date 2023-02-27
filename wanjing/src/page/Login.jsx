import { useContext, useEffect, useRef, useState } from "react";
import { React } from "react-dom";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosClient } from "../axios-client";
import { AlertDanger } from "../components/Alert/Alert";
import Loading from "../components/Loading/Loading";
import { UserContext } from "../context/UserAuth";

async function loginUser(payload, setToken, setError, setLoading, setLogin) {
    try {
        const response = await axiosClient.post("v1/login", payload);
        setLoading(false);

        setLogin(false);
        console.log("try");
        setError(null);
        setToken(response.data.data.token);
    } catch (error) {
        setError(error.response);
        setLoading(false);
    }
}
async function loginUserPage(
    payload,
    setToken,
    setError,
    navigate,
    setLoading
) {
    try {
        const response = await axiosClient.post("v1/login", payload);
        setLoading(false);

        console.log("try");
        navigate("/");
        setError(null);
        setToken(response.data.data.token);
    } catch (error) {
        setError(error.response);
        setLoading(false);
    }
}

export default function Login({ login, setLogin }) {
    const password = useRef();
    const email = useRef();
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);
    const { setToken, token } = useContext(UserContext);

    function submitHandler(e) {
        console.log(password.current.value, email.current.value);
        e.preventDefault();
        const payload = {
            email: email.current.value,
            password: password.current.value,
        };
        loginUser(payload, setToken, setError, setLoading, setLogin);
        if (errors == null) {
            setLoading(true);
            email.current.value = "";
            password.current.value = "";
        }
    }

    return (
        <>
            <div
                onClick={() => {
                    setLogin(false);
                }}
                className={` inset-0 ${
                    login ? "inline-block opacity-100" : "hidden opacity-0"
                } transition-all bg-prime/40 z-[1000] fixed`}
            ></div>
            <div
                className={`w-full  md:w-[40vw] ${
                    login
                        ? " "
                        : "md:hidden translate-y-[1000px] md:translate-y-0"
                } md:h-fit h-screen md:my-20   fixed md:py-2 md:rounded-md z-[1000] md:mx-[32vw] transition-all flex items-center justify-center bg-secondary  `}
            >
                <button
                    onClick={() => {
                        setLogin(false);
                    }}
                >
                    <AiOutlineClose
                        className="absolute left-0 top-0 m-2"
                        size="28px"
                        color="white"
                    />
                </button>
                <div className="w-full">
                    {loading && <Loading />}
                    <h1 className="text-center font-bold text-xl my-3 text-white/90">
                        Sign In
                    </h1>
                    {errors && <AlertDanger errors={errors} />}
                    <form onSubmit={submitHandler} className=" my-2 mx-5 pb-3">
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
                        <div className="flex justify-between px-2">
                            <a className="text-white/80 text-sm ">
                                Forgot Password?
                            </a>
                            <Link
                                to="/register"
                                className="text-white/80 text-sm "
                            >
                                Sign up
                            </Link>
                        </div>
                        <div className="flex justify-center mt-3">
                            <button
                                type="submit"
                                className="rounded-lg text-lg bg-blue-400 text-white px-6 py-1"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="border-y px-5 pt-4 pb-6 space-y-3 text-white/80">
                        <h2 className="text-center">Sign in with</h2>
                        <div className="grid  grid-cols-3 text-center justify-center ">
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
                    <div className="flex justify-center py-1 text-white/80">
                        <a className="text-center ">Help</a>
                    </div>
                </div>
            </div>
        </>
    );
}
export function LoginPage() {
    const password = useRef();
    const email = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);
    const { setToken, token } = useContext(UserContext);

    function submitHandler(e) {
        console.log(password.current.value, email.current.value);
        e.preventDefault();
        const payload = {
            email: email.current.value,
            password: password.current.value,
        };
        loginUserPage(payload, setToken, setError, navigate, setLoading);
        if (errors == null) {
            setLoading(true);
            email.current.value = "";
            password.current.value = "";
        }
    }

    return (
        <div className="md:flex md:justify-center md:py-6 md:h-screen md:items-center">
            <div className="w-full h-screen md:h-fit md:w-1/3  md:rounded-md transition-all flex-col flex items-center justify-center bg-secondary relative ">
                <Link to="/">
                    <AiOutlineArrowLeft
                        className="absolute left-0 top-0 m-2"
                        size="28px"
                        color="white"
                    />
                </Link>
                <div className="w-full">
                    {loading && <Loading />}
                    <h1 className="text-center font-bold text-xl my-3 text-white/90">
                        Sign In
                    </h1>
                    {errors && <AlertDanger errors={errors} />}
                    <form onSubmit={submitHandler} className=" my-2 mx-5 pb-3">
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
                        <div className="flex justify-between px-2">
                            <a className="text-white/80 text-sm ">
                                Forgot Password?
                            </a>
                            <Link
                                to="/register"
                                className="text-white/80 text-sm "
                            >
                                Sign up
                            </Link>
                        </div>
                        <div className="flex justify-center mt-3">
                            <button
                                type="submit"
                                className="rounded-lg text-lg bg-blue-400 text-white px-6 py-1"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="border-y px-5 pt-4 pb-6 space-y-3 text-white/80">
                        <h2 className="text-center">Sign in with</h2>
                        <div className="grid  grid-cols-3 text-center justify-center ">
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
                    <div className="flex justify-center py-1 text-white/80">
                        <a className="text-center ">Help</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
